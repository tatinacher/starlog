import { computed } from 'vue'
import { useObjectStore } from '../model/object.store'
import type { ObjectType } from '@/entities/astronomy'

export function useCelestialObjects(typeFilter?: ObjectType) {
  const store = useObjectStore()

  const objects = computed(() => {
    if (!typeFilter) return store.catalog
    return store.catalog.filter((o) => o.type === typeFilter)
  })

  return {
    objects,
    loading: store.loading,
    load: store.load,
  }
}
