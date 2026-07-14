import { ref, computed, watch } from 'vue'
import { useObservationStore } from '@/entities/observation'
import type { ObservationFilters } from '@/entities/observation'

export function useObservationFilter() {
  const store = useObservationStore()
  const filters = ref<ObservationFilters>({})

  const hasActiveFilters = computed(() => Object.values(filters.value).some(Boolean))

  function setFilter<K extends keyof ObservationFilters>(key: K, value: ObservationFilters[K]) {
    filters.value = { ...filters.value, [key]: value }
  }

  function clearFilter(key: keyof ObservationFilters) {
    const next = { ...filters.value }
    delete next[key]
    filters.value = next
  }

  function clearAll() {
    filters.value = {}
  }

  watch(filters, (next) => store.load(next), { deep: true })

  return {
    filters,
    hasActiveFilters,
    items: store.items,
    loading: store.loading,
    setFilter,
    clearFilter,
    clearAll,
  }
}
