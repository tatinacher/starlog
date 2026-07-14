import type { App } from 'vue'
import { createPinia } from 'pinia'
import { router } from '../router'
import { initDatabase } from '@/entities/storage'

export function setupApp(app: App): void {
  initDatabase()

  const pinia = createPinia()
  app.use(pinia)
  app.use(router)
}
