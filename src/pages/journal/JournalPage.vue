<template>
  <div class="flex flex-col h-full">
    <header class="px-4 pt-6 pb-4 border-b flex items-center justify-between" style="background: var(--bg-surface); border-color: var(--border)">
      <h1 class="text-lg font-semibold" style="color: var(--text-base)">Журнал</h1>
      <span class="text-sm" style="color: var(--text-base); opacity: 0.5">{{ items.length }} наблюдений</span>
    </header>

    <div v-if="loading" class="flex-1 flex items-center justify-center text-slate-500 text-sm">
      Загрузка...
    </div>

    <div v-else-if="items.length === 0" class="flex-1 flex flex-col items-center justify-center gap-3 px-8 text-center">
      <span class="text-5xl">🔭</span>
      <p class="text-white font-medium">Журнал пуст</p>
      <p class="text-slate-500 text-sm">Добавь первое наблюдение из каталога</p>
    </div>

    <div v-else class="flex-1 overflow-y-auto divide-y divide-slate-800">
      <div
        v-for="obs in items"
        :key="obs.id"
        class="px-4 py-3"
      >
        <div class="flex items-start justify-between gap-2">
          <div class="flex-1 min-w-0">
            <div class="text-white text-sm font-medium">
              {{ objectName(obs.celestialObjectId) }}
            </div>
            <div class="text-slate-500 text-xs mt-0.5">
              {{ formatDateTime(obs.observedAt) }}
            </div>
            <div v-if="obs.note" class="text-slate-400 text-xs mt-1 line-clamp-2">
              {{ obs.note }}
            </div>
          </div>
          <div class="flex flex-col items-end gap-1 shrink-0">
            <div v-if="obs.rating" class="text-yellow-400 text-xs">
              {{ '★'.repeat(obs.rating) }}{{ '☆'.repeat(5 - obs.rating) }}
            </div>
            <div v-if="obs.conditions?.bortle" class="text-slate-500 text-xs">
              Bortle {{ obs.conditions.bortle }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useObservationStore } from '@/entities/observation'
import { useObjectStore } from '@/entities/celestial-object'
import { formatDateTime } from '@/shared/utils/date.utils'

const obsStore = useObservationStore()
const objStore = useObjectStore()

const items = computed(() => obsStore.items)
const loading = computed(() => obsStore.loading)

onMounted(async () => {
  await objStore.load()
  await obsStore.load()
})

function objectName(id: string): string {
  return objStore.catalog.find((o) => o.id === id)?.name ?? id
}
</script>
