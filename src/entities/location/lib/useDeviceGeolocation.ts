import { useGeolocation } from '@vueuse/core'
import { computed } from 'vue'
import type { LatLng } from '@/shared/types'

export function useDeviceGeolocation() {
  const { coords, isSupported, error } = useGeolocation()

  const position = computed<LatLng | null>(() => {
    if (!isSupported.value || error.value || !isFinite(coords.value.latitude)) return null
    return {
      latitude: coords.value.latitude,
      longitude: coords.value.longitude,
    }
  })

  return {
    position,
    isSupported,
    error,
  }
}
