import { contextBridge, ipcRenderer } from 'electron'
import type { AiBobbyApi, UpdateInfo, UpdateProgress } from '../shared/api'

const api: AiBobbyApi = {
  getAppInfo: () => ipcRenderer.invoke('app:get-info'),
  getStatus: () => ipcRenderer.invoke('app:get-status'),
  copyApiKey: () => ipcRenderer.invoke('app:copy-api-key'),
  refresh: () => ipcRenderer.invoke('app:refresh'),
  startLogin: provider => ipcRenderer.invoke('account:login', provider),
  importPreview: (target, selection) => ipcRenderer.invoke('import:preview', target, selection),
  importApply: (target, selection) => ipcRenderer.invoke('import:apply', target, selection),
  importRollback: target => ipcRenderer.invoke('import:rollback', target),
  checkForUpdates: manual => ipcRenderer.invoke('update:check', Boolean(manual)),
  setAutoCheck: enabled => ipcRenderer.invoke('app:set-auto-check', Boolean(enabled)),
  downloadUpdate: () => ipcRenderer.invoke('update:download'),
  installUpdate: () => ipcRenderer.invoke('update:install'),
  onUpdateAvailable: listener => {
    const handler = (_event: Electron.IpcRendererEvent, info: UpdateInfo) => listener(info)
    ipcRenderer.on('update:available', handler)
    return () => ipcRenderer.removeListener('update:available', handler)
  },
  onUpdateProgress: listener => {
    const handler = (_event: Electron.IpcRendererEvent, progress: UpdateProgress) => listener(progress)
    ipcRenderer.on('update:progress', handler)
    return () => ipcRenderer.removeListener('update:progress', handler)
  },
  openExternal: url => ipcRenderer.invoke('app:open-external', url),
  copyText: text => ipcRenderer.invoke('app:copy-text', text),
  quit: () => ipcRenderer.invoke('app:quit'),
}

contextBridge.exposeInMainWorld('aiBobby', api)
