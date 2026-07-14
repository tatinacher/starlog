import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CelestialObject } from './object.types'
import { objectRepository } from '../api/object.repository'

export const useObjectStore = defineStore('celestial-object', () => {
  const catalog = ref<CelestialObject[]>([])
  const observedIds = ref<Set<string>>(new Set())
  const favoriteIds = ref<Set<string>>(new Set())
  const loading = ref(false)

  const observedObjects = computed(() =>
    catalog.value.filter((o) => observedIds.value.has(o.id)),
  )

  const favoriteObjects = computed(() =>
    catalog.value.filter((o) => favoriteIds.value.has(o.id)),
  )

  function isObserved(id: string): boolean {
    return observedIds.value.has(id)
  }

  function isFavorite(id: string): boolean {
    return favoriteIds.value.has(id)
  }

  async function load() {
    loading.value = true
    try {
      const [objects, observed, favorites] = await Promise.all([
        objectRepository.getAll(),
        objectRepository.getObservedIds(),
        objectRepository.getFavoriteIds(),
      ])
      catalog.value = objects
      observedIds.value = new Set(observed)
      favoriteIds.value = new Set(favorites)
    } finally {
      loading.value = false
    }
  }

  async function markObserved(id: string) {
    await objectRepository.markObserved(id)
    observedIds.value = new Set([...observedIds.value, id])
  }

  async function unmarkObserved(id: string) {
    await objectRepository.unmarkObserved(id)
    const next = new Set(observedIds.value)
    next.delete(id)
    observedIds.value = next
  }

  async function toggleFavorite(id: string) {
    if (favoriteIds.value.has(id)) {
      await objectRepository.removeFavorite(id)
      const next = new Set(favoriteIds.value)
      next.delete(id)
      favoriteIds.value = next
    } else {
      await objectRepository.addFavorite(id)
      favoriteIds.value = new Set([...favoriteIds.value, id])
    }
  }

  return {
    catalog,
    observedIds,
    favoriteIds,
    loading,
    observedObjects,
    favoriteObjects,
    isObserved,
    isFavorite,
    load,
    markObserved,
    unmarkObserved,
    toggleFavorite,
  }
})
