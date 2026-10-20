import { app, BrowserWindow, clipboard, ipcMain, Menu, nativeImage, shell, Tray } from 'electron'
import { join } from 'node:path'
import type { UpdateCheckResult, UpdateInfo } from '../shared/api'
import { checkForUpdates, downloadUpdate, installUpdate, updateSource } from './updater'
import { openAlbumPage, playSongInNetease } from './music-app'
import { Services } from './services'
import { appVersion } from './version'
import { DEV_PORT, PROD_PORT } from '../shared/dev'

const isMac = process.platform === 'darwin'
const DEV_MODE = process.env.AI_BOBBY_DEV === '1' || Boolean(process.env.ELECTRON_RENDERER_URL)
const APP_NAME = DEV_MODE ? 'AI Bobby Dev' : 'AI Bobby'
const DEFAULT_PORT = DEV_MODE ? DEV_PORT : PROD_PORT
let mainWindow: BrowserWindow | undefined
let tray: Tray | undefined
let isQuitting = false
let availableUpdate: UpdateInfo | undefined
let autoCheckEnabled = true
let services: Services | undefined

function trayIconPath(): string {
  return app.isPackaged
    ? join(process.resourcesPath, 'trayTemplate.png')
    : join(__dirname, '../../build/trayTemplate.png')
}

function createWindow(): BrowserWindow {
  const window = new BrowserWindow({
    width: 1160,
    height: 860,
    minWidth: 900,
    minHeight: 640,
    show: false,
    backgroundColor: '#1b1b1d',
    title: APP_NAME,
    titleBarStyle: isMac ? 'hiddenInset' : 'default',
    trafficLightPosition: isMac ? { x: 18, y: 15 } : undefined,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false,
    },
  })

  window.once('ready-to-show', () => window.show())
  window.on('close', event => {
    if (!isQuitting) {
      event.preventDefault()
      window.hide()
    }
  })
  window.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) void shell.openExternal(url)
    return { action: 'deny' }
  })

  if (process.env.ELECTRON_RENDERER_URL) {
    void window.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    void window.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return window
}

function showWindow(): void {
  if (!mainWindow) {
    mainWindow = createWindow()
    mainWindow.once('ready-to-show', () => mainWindow?.show())
    return
  }
  if (mainWindow.isMinimized()) mainWindow.restore()
  mainWindow.show()
  mainWindow.focus()
}

function notifyUpdate(info: UpdateInfo): void {
  availableUpdate = info
  mainWindow?.webContents.send('update:available', info)
}

async function autoCheck(): Promise<void> {
  if (!autoCheckEnabled) return
  const result = await checkForUpdates()
  if (result.ok && result.update) notifyUpdate(result.update)
}

function createTray(): void {
  const image = nativeImage.createFromPath(trayIconPath())
  if (isMac) image.setTemplateImage(true)
  tray = new Tray(image)
  tray.setToolTip(APP_NAME)
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: `显示 ${APP_NAME}`, click: showWindow },
      { type: 'separator' },
      {
        label: '刷新模型',
        click: () => {
          showWindow()
          void services?.refresh()
        },
      },
      {
        label: '检查更新',
        click: () => {
          showWindow()
          void autoCheck()
        },
      },
      { type: 'separator' },
      {
        label: '退出',
        click: () => {
          isQuitting = true
          app.quit()
        },
      },
    ]),
  )
  tray.on('click', showWindow)
}

function registerIpc(): void {
  ipcMain.handle('import:preview', async (_event, target: import('../shared/api').ImportTargetName, selection: import('../shared/api').ImportSelectionPayload) => {
    if (!services) throw new Error('服务尚未启动')
    return services.importPreview(target, selection)
  })

  ipcMain.handle('import:apply', async (_event, target: import('../shared/api').ImportTargetName, selection: import('../shared/api').ImportSelectionPayload) => {
    if (!services) throw new Error('服务尚未启动')
    return services.importApply(target, selection)
  })

  ipcMain.handle('import:rollback', async (_event, target: import('../shared/api').ImportTargetName) => {
    if (!services) throw new Error('服务尚未启动')
    return services.importRollback(target)
  })

  ipcMain.handle('import:history', async () => {
    if (!services) throw new Error('服务尚未启动')
    return services.getImportHistory()
  })

  ipcMain.handle('import:installed-models', async () => {
    if (!services) throw new Error('服务尚未启动')
    return services.importedModelIds()
  })

  ipcMain.handle('codex:metadata', async () => {
    if (!services) throw new Error('服务尚未启动')
    return services.getCodexMetadata()
  })

  ipcMain.handle('settings:get', async () => {
    if (!services) throw new Error('服务尚未启动')
    return services.getSettings()
  })

  ipcMain.handle('settings:nvidia-key', async (_event, apiKey: string) => {
    if (!services) throw new Error('服务尚未启动')
    return services.setNvidiaKey(String(apiKey))
  })

  ipcMain.handle('settings:probe-nvidia', async () => {
    if (!services) throw new Error('服务尚未启动')
    return services.probeNvidia()
  })

  ipcMain.handle('settings:proxy', async (_event, proxy: import('../shared/api').DesktopSettings['proxy']) => {
    if (!services) throw new Error('服务尚未启动')
    return services.setProxy(proxy)
  })

  ipcMain.handle('settings:locale', async (_event, locale: import('../shared/api').LocaleChoice) => {
    if (!services) throw new Error('服务尚未启动')
    return services.setLocale(locale)
  })

  ipcMain.handle('import:backup-versions', async (_event, target: import('../shared/api').ImportTargetName) => {
    if (!services) throw new Error('服务尚未启动')
    return services.backupVersions(target)
  })

  ipcMain.handle('import:restore-version', async (_event, id: string) => {
    if (!services) throw new Error('服务尚未启动')
    return services.restoreBackupVersion(String(id))
  })

  ipcMain.handle('import:restore-backup', async (_event, id: string) => {
    if (!services) throw new Error('服务尚未启动')
    return services.restoreImportBackup(id)
  })

  ipcMain.handle('app:copy-api-key', () => {
    if (services) clipboard.writeText(services.apiKey())
  })

  ipcMain.handle('app:get-status', async () => {
    if (!services) throw new Error('服务尚未启动')
    return services.snapshot()
  })

  ipcMain.handle('app:refresh', async () => {
    if (!services) throw new Error('服务尚未启动')
    return services.refresh()
  })

  ipcMain.handle('account:login', async (_event, provider: 'workbuddy' | 'workbuddy-ai') => {
    if (!services) throw new Error('服务尚未启动')
    return services.login(provider)
  })

  ipcMain.handle('account:reorder', async (_event, provider: 'workbuddy' | 'workbuddy-ai', uids: string[]) => {
    if (!services) throw new Error('服务尚未启动')
    return services.reorderAccounts(provider, uids)
  })

  ipcMain.handle('app:get-info', () => ({
    version: appVersion(),
    platform: process.platform,
    arch: process.arch,
    packaged: app.isPackaged,
    devMode: DEV_MODE,
    defaultPort: DEFAULT_PORT,
    updateSource: updateSource(),
  }))

  ipcMain.handle('app:set-auto-check', (_event, enabled: boolean) => {
    autoCheckEnabled = Boolean(enabled)
  })

  ipcMain.handle('update:check', async (_event, manual: boolean): Promise<UpdateCheckResult> => {
    const result = await checkForUpdates()
    if (result.ok && result.update) notifyUpdate(result.update)
    if (!manual && !result.ok) return { ok: true, update: null }
    return result
  })

  ipcMain.handle('update:download', async event => {
    if (!availableUpdate) return { ok: false, error: '没有可用更新，请先检查更新' }
    return downloadUpdate(availableUpdate, progress => {
      event.sender.send('update:progress', progress)
    })
  })

  ipcMain.handle('update:install', async () => installUpdate())

  ipcMain.handle('app:play-music', async (_event, songId: string) => playSongInNetease(String(songId)))

  ipcMain.handle('app:open-album', async (_event, href: string) => openAlbumPage(String(href)))

  ipcMain.handle('app:open-external', async (_event, url: string) => {
    if (/^https?:\/\//i.test(url)) await shell.openExternal(url)
  })

  ipcMain.handle('app:open-directory', (_event, path: string) => {
    if (String(path).trim() !== '') shell.showItemInFolder(String(path))
  })

  ipcMain.handle('app:copy-text', (_event, text: string) => {
    clipboard.writeText(String(text))
  })

  ipcMain.handle('app:quit', () => {
    isQuitting = true
    app.quit()
  })
}

app.setName(APP_NAME)
if (DEV_MODE) {
  // Keep the developer instance completely separate from the installed app.
  app.setPath('userData', join(app.getPath('appData'), 'AI Bobby Dev'))
}

const gotLock = app.requestSingleInstanceLock()
if (!gotLock) {
  app.quit()
} else {
  app.on('second-instance', showWindow)
  app.whenReady().then(() => {
    services = new Services(() => mainWindow, DEV_MODE)
    registerIpc()
    mainWindow = createWindow()
    createTray()
    void services.start().catch(error => console.error('[ai-bobby] services start failed', error))

    if (!DEV_MODE) {
      setTimeout(() => void autoCheck(), 8_000)
      setInterval(() => void autoCheck(), 6 * 60 * 60 * 1000)
    }

    app.on('activate', showWindow)
  })

  app.on('before-quit', () => {
    isQuitting = true
    void services?.stop()
  })

  app.on('window-all-closed', () => {
    if (!isMac) app.quit()
  })
}
