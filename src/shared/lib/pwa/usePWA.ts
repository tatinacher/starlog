import { useRegisterSW } from 'virtual:pwa-register/vue'

export function usePWA() {
  const { needRefresh, updateServiceWorker } = useRegisterSW({
    onRegistered(registration: ServiceWorkerRegistration | undefined) {
      console.info('[PWA] Service worker registered', registration)
    },
    onRegisterError(error: unknown) {
      console.error('[PWA] Service worker registration error', error)
    },
  })

  function applyUpdate() {
    updateServiceWorker(true)
  }

  return {
    needRefresh,
    applyUpdate,
  }
}
