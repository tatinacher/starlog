import { ref } from 'vue'
import { useObservationStore } from '@/entities/observation'
import { useLocationStore } from '@/entities/location'
import type { CreateObservationDto, ObservationEntry, SkyConditions } from '@/entities/observation'
import { toISODate } from '@/shared/utils/date.utils'

export function useLogObservation() {
  const observationStore = useObservationStore()
  const locationStore = useLocationStore()

  const submitting = ref(false)

  async function submit(params: {
    entries: ObservationEntry[]
    conditions: SkyConditions
    notes?: string
    equipment?: string
    locationId?: string
    date?: Date
  }) {
    submitting.value = true
    try {
      const dto: CreateObservationDto = {
        date: toISODate(params.date ?? new Date()),
        locationId: params.locationId ?? locationStore.activeId,
        objects: params.entries,
        conditions: params.conditions,
        notes: params.notes ?? '',
        equipment: params.equipment,
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
