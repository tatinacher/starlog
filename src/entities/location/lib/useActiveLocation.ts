import { useLocationStore } from '../model/location.store'

export function useActiveLocation() {
  const store = useLocationStore()

  return {
    activeLocation: store.activeLocation,
    activeId: store.activeId,
    setActive: store.setActive,
  }
}
