import { ref, reactive } from 'vue'
import { useSettingsStore } from '@/entities/settings'
import type { UserSettings } from '@/entities/settings'

export function useSettingsEditor() {
  const store = useSettingsStore()
  const saving = ref(false)

  const draft = reactive<Partial<UserSettings>>({})

  function patch<K extends keyof UserSettings>(key: K, value: UserSettings[K]) {
    ;(draft as UserSettings)[key] = value
  }

  async function save() {
    saving.value = true
    try {
      await store.save(draft)
    } finally {
      saving.value = false
    }
  }

  async function resetToDefaults() {
    await store.reset()
  }

  return {
    saving,
    draft,
    data: store.data,
    patch,
    save,
    resetToDefaults,
  }
}
