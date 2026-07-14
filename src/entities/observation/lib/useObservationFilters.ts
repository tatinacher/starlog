import { ref, watch } from 'vue'
import { useObservationStore } from '../model/observation.store'
import type { ObservationFilters } from '../model/observation.types'

export function useObservationFilters() {
  const store = useObservationStore()
  const filters = ref<ObservationFilters>({ ...store.filters })

  function apply() {
    store.load(filters.value)
  }

  function reset() {
    filters.value = {}
    store.load({})
  }

  watch(filters, apply, { deep: true })

  return {
    filters,
    apply,
    reset,
  }
}
