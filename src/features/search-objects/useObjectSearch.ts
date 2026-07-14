import { ref, computed } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useObjectStore } from '@/entities/celestial-object'
import type { ObjectType } from '@/entities/astronomy'

export function useObjectSearch() {
  const store = useObjectStore()
  const query = ref('')
  const typeFilter = ref<ObjectType | null>(null)

  const results = computed(() => {
    const q = query.value.trim().toLowerCase()
    return store.catalog.filter((obj) => {
      const matchesType = !typeFilter.value || obj.type === typeFilter.value
      const matchesQuery =
        !q ||
        obj.name.toLowerCase().includes(q) ||
        obj.catalogId.toLowerCase().includes(q) ||
        obj.altNames.some((n) => n.toLowerCase().includes(q))
      return matchesType && matchesQuery
    })
  })

  const setQuery = useDebounceFn((value: string) => {
    query.value = value
  }, 300)

  function setTypeFilter(type: ObjectType | null) {
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
