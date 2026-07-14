import { ref } from 'vue'
import { useLocationStore } from '@/entities/location'
import type { ObservationLocation, CreateLocationDto, UpdateLocationDto } from '@/entities/location'

export function useLocationEditor() {
  const store = useLocationStore()
  const saving = ref(false)

  async function createLocation(dto: CreateLocationDto): Promise<ObservationLocation> {
    saving.value = true
    try {
      return await store.create(dto)
    } finally {
      saving.value = false
    }
  }

  async function updateLocation(id: string, dto: UpdateLocationDto): Promise<void> {
    saving.value = true
    try {
      await store.update(id, dto)
    } finally {
      saving.value = false
    }
  }

  async function deleteLocation(id: string): Promise<void> {
    await store.remove(id)
  }

  async function makeDefault(id: string): Promise<void> {
    await store.setDefault(id)
  }

  return {
    saving,
    createLocation,
    updateLocation,
    deleteLocation,
    makeDefault,
  }
}
