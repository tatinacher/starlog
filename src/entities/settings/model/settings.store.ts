import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserSettings } from './settings.types'
import { DEFAULT_SETTINGS } from './settings.types'
import { settingsRepository } from '../api/settings.repository'

export const useSettingsStore = defineStore('settings', () => {
  const data = ref<UserSettings>({ ...DEFAULT_SETTINGS })
  const loaded = ref(false)

  const theme = computed(() => data.value.theme)
  const language = computed(() => data.value.language)
  const defaultLocationId = computed(() => data.value.defaultLocationId)

  async function load() {
    data.value = await settingsRepository.get()
    loaded.value = true
  }

  async function save(patch: Partial<UserSettings>) {
    const next = { ...data.value, ...patch }
    await settingsRepository.save(next)
    data.value = next
  }

  async function reset() {
    await settingsRepository.reset()
    data.value = { ...DEFAULT_SETTINGS }
  }

  return {
    data,
    loaded,
    theme,
    language,
    defaultLocationId,
    load,
    save,
    reset,
  }
})
