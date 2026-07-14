import { computed } from 'vue'
import { useObjectStore } from '../model/object.store'

export function useObjectStatus(objectId: string) {
  const store = useObjectStore()

  return {
    isObserved: computed(() => store.isObserved(objectId)),
    isFavorite: computed(() => store.isFavorite(objectId)),
    markObserved: () => store.markObserved(objectId),
    unmarkObserved: () => store.unmarkObserved(objectId),
    toggleFavorite: () => store.toggleFavorite(objectId),
  }
}
