import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/journal',
  },
  {
    path: '/journal',
    name: 'journal',
    component: () => import('@/pages/journal/JournalPage.vue'),
    meta: { title: 'Журнал' },
  },
  {
    path: '/journal/:id',
    name: 'observation',
    component: () => import('@/pages/observation/ObservationPage.vue'),
    meta: { title: 'Наблюдение' },
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import('@/pages/catalog/CatalogPage.vue'),
    meta: { title: 'Каталог' },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/pages/settings/SettingsPage.vue'),
    meta: { title: 'Настройки' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/not-found/NotFoundPage.vue'),
  },
]
