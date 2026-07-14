import { ref, computed } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useObjectStore } from '@/entities/celestial-object'
import type { CelestialObjectType } from '@/shared/types/enums'

export function useObjectSearch() {
  const store = useObjectStore()
  const query = ref('')
  const typeFilter = ref<CelestialObjectType | null>(null)

  const results = computed(() => {
    const q = query.value.trim().toLowerCase()
    return store.catalog.filter((obj) => {
      const matchesType = !typeFilter.value || obj.type === typeFilter.value
      const matchesQuery =
        !q ||
        obj.name.toLowerCase().includes(q) ||
        obj.slug.toLowerCase().includes(q) ||
        obj.aliases.some((n) => n.toLowerCase().includes(q)) ||
        obj.catalogIds.some((c) => c.id.toLowerCase().includes(q))
      return matchesType && matchesQuery
    })
  })

  const setQuery = useDebounceFn((value: string) => {
    query.value = value
  }, 300)

  function setTypeFilter(type: CelestialObjectType | null) {
    typeFilter.value = type
  }

  return {
    query,
    typeFilter,
    results,
    setQuery,
    setTypeFilter,
  }
}
