import { useSettingsStore } from '../model/settings.store'
import type { UserSettings } from '../model/settings.types'

export function useSettings() {
  const store = useSettingsStore()

  return {
    data: store.data,
    loaded: store.loaded,
    theme: store.theme,
    language: store.language,
    defaultLocationId: store.defaultLocationId,
    load: store.load,
    save: (patch: Partial<UserSettings>) => store.save(patch),
    reset: store.reset,
  }
}
