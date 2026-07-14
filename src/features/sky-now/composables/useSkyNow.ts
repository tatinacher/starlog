import { ref, watch, onUnmounted } from 'vue'
import { useGeolocation } from '@vueuse/core'
import { useObjectStore } from '@/entities/celestial-object'
import { astronomyService } from '@/shared/lib/astronomy'
import type { SkyObject, GeoLocation } from '@/shared/lib/astronomy'

const REFRESH_INTERVAL_MS = 60_000

export function useSkyNow() {
  const objectStore = useObjectStore()
  const { coords, error, isSupported, locatedAt } = useGeolocation({ immediate: true })

  const visibleObjects = ref<SkyObject[]>([])
  const computing = ref(false)

  function compute(): void {
    if (locatedAt.value === null) return

    computing.value = true
    const location: GeoLocation = {
      lat: coords.value.latitude,
      lon: coords.value.longitude,
      altitudeMeters: coords.value.altitude ?? 0,
    }

    visibleObjects.value = astronomyService.getVisibleObjects(
      objectStore.catalog,
      location,
      new Date(),
    )
    computing.value = false
  }

  // Пересчёт при получении координат.
  watch(locatedAt, async () => {
    if (!objectStore.catalog.length) await objectStore.load()
    compute()
  })

  // Автообновление каждую минуту — позиции объектов меняются.
  const timer = setInterval(() => {
    if (locatedAt.value !== null) compute()
  }, REFRESH_INTERVAL_MS)

  onUnmounted(() => clearInterval(timer))

  return {
    visibleObjects,
    computing,
    locatedAt,
    error,
    isSupported,
  } as const
}
