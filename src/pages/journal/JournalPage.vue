<template>
  <div class="flex flex-col h-full bg-base">

    <header class="px-4 pt-6 pb-4 border-b bg-surface border-theme shrink-0">
      <h1 class="text-lg font-semibold text-theme">Журнал</h1>
    </header>

    <div class="flex-1 overflow-y-auto">

      <!-- ─── Видно сейчас ─────────────────────────────────────────────── -->
      <section class="px-4 pt-5 pb-4">
        <h2 class="text-xs font-semibold text-theme-muted uppercase tracking-widest mb-3">
          Видно сейчас
        </h2>

        <!-- GPS не поддерживается -->
        <div
          v-if="!isSupported"
          class="rounded-2xl border border-theme px-4 py-5 text-center"
          style="background: var(--bg-surface)"
        >
          <p class="text-theme text-sm font-medium">GPS не поддерживается</p>
          <p class="text-theme-muted text-xs mt-1">Устройство не предоставляет геолокацию</p>
        </div>

        <!-- Ошибка / нет разрешения -->
        <div
          v-else-if="gpsError && !locatedAt"
          class="rounded-2xl border border-theme px-4 py-5 text-center"
          style="background: var(--bg-surface)"
        >
          <span class="text-3xl block mb-2">📍</span>
          <p class="text-theme text-sm font-medium">Нет доступа к геолокации</p>
          <p class="text-theme-muted text-xs mt-1">Разреши доступ к местоположению в настройках браузера</p>
        </div>

        <!-- Ожидаем GPS -->
        <div
          v-else-if="!locatedAt"
          class="rounded-2xl border border-theme px-4 py-5 flex items-center gap-3"
          style="background: var(--bg-surface)"
        >
          <div class="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin shrink-0" />
          <p class="text-theme-muted text-sm">Определяем местоположение…</p>
        </div>

        <!-- Есть данные -->
        <template v-else>

          <!-- Нет объектов -->
          <div
            v-if="!computing && visibleObjects.length === 0"
            class="rounded-2xl border border-theme px-4 py-5 text-center"
            style="background: var(--bg-surface)"
          >
            <span class="text-3xl block mb-2">🌅</span>
            <p class="text-theme text-sm font-medium">Объектов над горизонтом нет</p>
            <p class="text-theme-muted text-xs mt-1">Попробуй позже или в другом месте</p>
          </div>

          <!-- Список видимых объектов -->
          <div
            v-else
            class="rounded-2xl border border-theme overflow-hidden"
            style="background: var(--bg-surface)"
          >
            <RouterLink
              v-for="item in visibleObjects"
              :key="item.id"
              :to="`/celestial-object/${item.slug}`"
              class="flex items-center gap-3 px-4 py-3 hover-muted transition-colors border-b border-theme last:border-b-0"
            >
              <!-- Иконка типа -->
              <span class="text-xl w-7 text-center shrink-0">{{ typeIcon(item.type) }}</span>

              <!-- Название -->
              <div class="flex-1 min-w-0">
                <div class="text-theme text-sm font-medium truncate">
                  {{ item.nameRu ?? item.name }}
                </div>
                <div class="text-theme-muted text-xs truncate">{{ item.name }}</div>
              </div>

              <!-- Высота и азимут -->
              <div class="text-right shrink-0">
                <div class="text-accent text-sm font-semibold font-mono">
                  {{ formatAltitude(item.altitude) }}
                </div>
                <div class="text-theme-muted text-xs font-mono">
                  {{ azimuthToDirection(item.azimuth) }} {{ formatAzimuth(item.azimuth) }}
                </div>
              </div>
            </RouterLink>
          </div>

        </template>
      </section>

      <!-- ─── Журнал наблюдений ──────────────────────────────────────── -->
      <section class="px-4 pb-5">
        <h2 class="text-xs font-semibold text-theme-muted uppercase tracking-widest mb-3">
          Мои наблюдения
        </h2>

        <div v-if="obsLoading" class="text-theme-muted text-sm py-4 text-center">
          Загрузка…
        </div>

        <div
          v-else-if="items.length === 0"
          class="rounded-2xl border border-theme px-4 py-5 text-center"
          style="background: var(--bg-surface)"
        >
          <p class="text-theme text-sm font-medium">Журнал пуст</p>
          <p class="text-theme-muted text-xs mt-1">Добавь первое наблюдение из каталога</p>
        </div>

        <div
          v-else
          class="rounded-2xl border border-theme overflow-hidden"
          style="background: var(--bg-surface)"
        >
          <div
            v-for="obs in items"
            :key="obs.id"
            class="px-4 py-3 border-b border-theme last:border-b-0"
          >
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1 min-w-0">
                <div class="text-theme text-sm font-medium truncate">
                  {{ objectName(obs.celestialObjectId) }}
                </div>
                <div class="text-theme-muted text-xs mt-0.5">
                  {{ formatDateTime(obs.observedAt) }}
                </div>
                <div v-if="obs.note" class="text-theme-muted text-xs mt-1 line-clamp-2">
                  {{ obs.note }}
                </div>
              </div>
              <div class="flex flex-col items-end gap-1 shrink-0">
                <div v-if="obs.rating" class="text-xs" style="color: var(--accent)">
                  {{ '★'.repeat(obs.rating) }}{{ '☆'.repeat(5 - obs.rating) }}
                </div>
                <div v-if="obs.conditions?.bortle" class="text-theme-muted text-xs">
                  Bortle {{ obs.conditions.bortle }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useObservationStore } from '@/entities/observation'
import { useObjectStore } from '@/entities/celestial-object'
import { useSkyNow } from '@/features/sky-now'
import { formatDateTime } from '@/shared/utils/date.utils'
import { formatAltitude, formatAzimuth, azimuthToDirection } from '@/shared/utils/astronomy.utils'

const obsStore = useObservationStore()
const objStore = useObjectStore()

const items = computed(() => obsStore.items)
const obsLoading = computed(() => obsStore.loading)

const { visibleObjects, computing, locatedAt, error: gpsError, isSupported } = useSkyNow()

onMounted(async () => {
  await objStore.load()
  await obsStore.load()
})

function objectName(id: string): string {
  return objStore.catalog.find((o) => o.id === id)?.nameRu
    ?? objStore.catalog.find((o) => o.id === id)?.name
    ?? id
}

const TYPE_ICONS: Record<string, string> = {
  star: '⭐',
  variable_star: '✦',
  double_star: '⊕',
  planet: '🪐',
  moon: '🌙',
  sun: '☀️',
  asteroid: '🪨',
  comet: '☄️',
  galaxy: '🌀',
  nebula: '🌌',
  planetary_nebula: '◎',
  supernova_remnant: '💥',
  open_cluster: '✶',
  globular_cluster: '⊛',
}

function typeIcon(type: string): string {
  return TYPE_ICONS[type] ?? '?'
}
</script>
