import type { VaultState } from '../types'
import { emptyVault } from '../types'

const DB_NAME = 'mv-student-vault'
const DB_VERSION = 1
const STORE = 'vault'

const openDb = () => new Promise<IDBDatabase>((resolve, reject) => {
  const request = indexedDB.open(DB_NAME, DB_VERSION)
  request.onupgradeneeded = () => { request.result.createObjectStore(STORE) }
  request.onsuccess = () => resolve(request.result)
  request.onerror = () => reject(request.error)
})

export async function loadVault(): Promise<VaultState> {
  try {
    const db = await openDb()
    const value = await new Promise<VaultState | undefined>((resolve, reject) => {
      const req = db.transaction(STORE, 'readonly').objectStore(STORE).get('state')
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => reject(req.error)
    })
    return value ? { ...emptyVault(), ...value } : emptyVault()
  } catch (error) {
    console.warn('Vault storage unavailable', error)
    return emptyVault()
  }
}

export async function saveVault(state: VaultState) {
  try {
    const db = await openDb()
    await new Promise<void>((resolve, reject) => {
      const req = db.transaction(STORE, 'readwrite').objectStore(STORE).put(state, 'state')
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
    return { ok: true as const }
  } catch (error) {
    return { ok: false as const, error: error instanceof Error ? error.message : 'Storage quota or browser error' }
  }
}

export function getPrefs() {
  try {
    return { theme: (localStorage.getItem('mv-theme') || 'ivory') as string, scale: Number(localStorage.getItem('mv-scale') || 100), motion: localStorage.getItem('mv-motion') !== 'reduced', sidebar: localStorage.getItem('mv-sidebar') !== 'collapsed' }
  } catch { return { theme: 'ivory', scale: 100, motion: true, sidebar: true } }
}
export function setPref(key: string, value: string | number | boolean) { try { localStorage.setItem(key, String(value)) } catch { /* best effort */ } }

export function makeBackup(state: VaultState) {
  return JSON.stringify({ format: 'mv-student-vault-backup', version: 1, exportedAt: new Date().toISOString(), vault: state })
}
export function parseBackup(text: string): VaultState {
  const parsed = JSON.parse(text)
  if (parsed?.format !== 'mv-student-vault-backup' || parsed?.version !== 1 || !parsed?.vault?.pomodoro) throw new Error('This file is not a valid MV Student Vault backup.')
  return { ...emptyVault(), ...parsed.vault }
}
