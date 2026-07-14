import { computed, ref } from 'vue'
import type { AstronomyContext } from '../model/astronomy.types'

// Реактивный контекст текущего момента наблюдения.
// Используется будущими слоями вычислений — не содержит самих вычислений.
const _date = ref(new Date())
const _latitude = ref<number | null>(null)
const _longitude = ref<number | null>(null)

export function useAstronomyContext() {
  const context = computed<AstronomyContext | null>(() => {
    if (_latitude.value === null || _longitude.value === null) return null
    return {
      date: _date.value,
      latitude: _latitude.value,
      longitude: _longitude.value,
    }
  })

  function setLocation(latitude: number, longitude: number) {
    _latitude.value = latitude
    _longitude.value = longitude
  }

  function setDate(date: Date) {
    _date.value = date
  }

  function syncToNow() {
    _date.value = new Date()
  }

  return {
    context,
    setLocation,
    setDate,
    syncToNow,
  }
}
