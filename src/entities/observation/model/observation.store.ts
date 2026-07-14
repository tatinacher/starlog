import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  Observation,
  ObservationFilters,
  CreateObservationDto,
  UpdateObservationDto,
} from './observation.types'
import { observationRepository } from '../api/observation.repository'

export const useObservationStore = defineStore('observation', () => {
  const items = ref<Observation[]>([])
  const current = ref<Observation | null>(null)
  const loading = ref(false)
  const filters = ref<ObservationFilters>({})

  async function load(appliedFilters?: ObservationFilters) {
    loading.value = true
    try {
      filters.value = appliedFilters ?? {}
      items.value = await observationRepository.getAll(filters.value)
    } finally {
      loading.value = false
    }
  }

  async function loadOne(id: string) {
    loading.value = true
    try {
      current.value = (await observationRepository.getById(id)) ?? null
    } finally {
      loading.value = false
    }
  }

  async function create(dto: CreateObservationDto): Promise<Observation> {
    const created = await observationRepository.create(dto)
    items.value.unshift(created)
    return created
  }

  async function update(id: string, dto: UpdateObservationDto): Promise<void> {
    await observationRepository.update(id, dto)
    const index = items.value.findIndex((o) => o.id === id)
    if (index !== -1) {
      items.value[index] = { ...items.value[index], ...dto }
    }
    if (current.value?.id === id) {
      current.value = { ...current.value, ...dto }
    }
  }

  async function remove(id: string): Promise<void> {
    await observationRepository.delete(id)
    items.value = items.value.filter((o) => o.id !== id)
    if (current.value?.id === id) current.value = null
  }

  function setFilters(next: ObservationFilters) {
    filters.value = next
  }

  function clearCurrent() {
    current.value = null
  }

  return {
    items,
    current,
    loading,
    filters,
    load,
    loadOne,
    create,
    update,
    remove,
    setFilters,
    clearCurrent,
  }
})
