import { useObservationStore } from '../model/observation.store'
import type { ObservationFilters } from '../model/observation.types'

export function useObservations() {
  const store = useObservationStore()

  return {
    items: store.items,
    current: store.current,
    loading: store.loading,
    filters: store.filters,
    load: (filters?: ObservationFilters) => store.load(filters),
    loadOne: (id: string) => store.loadOne(id),
    remove: (id: string) => store.remove(id),
    clearCurrent: store.clearCurrent,
  }
}
