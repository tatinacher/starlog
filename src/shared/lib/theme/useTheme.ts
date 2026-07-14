import { watch, onMounted } from 'vue'
import { useSettingsStore } from '@/entities/settings'

type Theme = 'dark' | 'night-red' | 'light'

const THEME_CLASSES: Record<Theme, string> = {
  'dark':      'theme-dark',
  'night-red': 'theme-night-red',
  'light':     'theme-light',
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  Object.values(THEME_CLASSES).forEach((cls) => root.classList.remove(cls))
  root.classList.add(THEME_CLASSES[theme])
}

export function useTheme() {
  const store = useSettingsStore()

  onMounted(() => applyTheme(store.theme as Theme))
  watch(() => store.theme, (t) => applyTheme(t as Theme))
}
