import { ref } from 'vue'
import { useObservationStore } from '@/entities/observation'
import { useLocationStore } from '@/entities/location'
import { ObservationStatus } from '@/shared/types/enums'
import type {
  CreateObservationDto,
  ObservationConditions,
  ObservationInstrument,
  ObservationCoordinates,
} from '@/entities/observation'
import type { ObservationRating, UUID } from '@/shared/types'
import { toISODate } from '@/shared/utils/date.utils'

export function useLogObservation() {
  const observationStore = useObservationStore()
  const locationStore = useLocationStore()

  const submitting = ref(false)

  async function submit(params: {
    celestialObjectId: UUID
    conditions?: ObservationConditions
    instrument?: ObservationInstrument
    note?: string
    rating?: ObservationRating
    tags?: string[]
    locationId?: UUID
    observationCoordinates?: ObservationCoordinates
    date?: Date
  }) {
    submitting.value = true
    try {
      const dto: CreateObservationDto = {
        celestialObjectId: params.celestialObjectId,
        observedAt: toISODate(params.date ?? new Date()),
        locationId: params.locationId ?? locationStore.activeId,
        observationCoordinates: params.observationCoordinates ?? null,
        instrument: params.instrument ?? null,
        conditions: params.conditions ?? null,
        note: params.note ?? null,
        status: ObservationStatus.Completed,
        rating: params.rating ?? null,
        photos: [],
        tags: params.tags ?? [],
      }
      return await observationStore.create(dto)
    } finally {
      submitting.value = false
    }
  }

  return {
    submitting,
    submit,
  }
}
