import { ref, onMounted } from 'vue'
import type { CelestialObject } from '../model/object.types'
import { objectRepository } from '../api/object.repository'

/**
 * Загружает один объект по slug через репозиторий.
 * Страница не знает об источнике данных — только через этот composable.
 */
export function useCelestialObject(slug: string) {
  const object = ref<CelestialObject | null>(null)
  const loading = ref(false)
  const notFound = ref(false)

  onMounted(async () => {
    loading.value = true
    try {
      const result = await objectRepository.getBySlug(slug)
      object.value = result ?? null
      notFound.value = !result
    } finally {
      loading.value = false
    }
  })

  return { object, loading, notFound }
}
