import { contextBridge, ipcRenderer } from 'electron'
import type { AiBobbyApi, UpdateInfo, UpdateProgress } from '../shared/api'

const api: AiBobbyApi = {
  getAppInfo: () => ipcRenderer.invoke('app:get-info'),
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
