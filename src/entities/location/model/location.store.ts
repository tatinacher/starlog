import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Location, CreateLocationDto, UpdateLocationDto } from './location.types'
import { locationRepository } from '../api/location.repository'

export const useLocationStore = defineStore('location', () => {
  const items = ref<Location[]>([])
  const activeId = ref<string | null>(null)
  const loading = ref(false)

  const activeLocation = computed(
    () => items.value.find((l) => l.id === activeId.value) ?? null,
  )

  const defaultLocation = computed(
    () => items.value.find((l) => l.isDefault) ?? null,
  )

  async function load() {
    loading.value = true
    try {
      items.value = await locationRepository.getAll()
      if (!activeId.value && defaultLocation.value) {
        activeId.value = defaultLocation.value.id
      }
    } finally {
      loading.value = false
    }
  }

  async function create(dto: CreateLocationDto) {
    const created = await locationRepository.create(dto)
    items.value.push(created)
    return created
  }

  async function update(id: string, dto: UpdateLocationDto) {
    await locationRepository.update(id, dto)
    const index = items.value.findIndex((l) => l.id === id)
    if (index !== -1) {
      items.value[index] = { ...items.value[index], ...dto }
    }
  }

  async function remove(id: string) {
    await locationRepository.delete(id)
    items.value = items.value.filter((l) => l.id !== id)
    if (activeId.value === id) activeId.value = null
  }

  async function setDefault(id: string) {
    await locationRepository.setDefault(id)
    items.value = items.value.map((l) => ({ ...l, isDefault: l.id === id }))
  }

  function setActive(id: string | null) {
    activeId.value = id
  }

  return {
    items,
    activeId,
    loading,
    activeLocation,
    defaultLocation,
    load,
    create,
    update,
    remove,
    setDefault,
    setActive,
  }
})
