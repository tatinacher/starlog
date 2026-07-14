<template>
  <div class="flex flex-col h-full bg-base">
    <header class="px-4 pt-6 pb-3 bg-surface border-b border-theme">
      <h1 class="text-lg font-semibold text-theme">Каталог</h1>
      <input
        v-model="query"
        type="search"
        placeholder="Поиск объекта..."
        class="mt-3 w-full text-sm rounded-lg px-3 py-2 input-theme"
      />
    </header>

    <div class="flex-1 overflow-y-auto divide-theme">
      <button
        v-for="obj in results"
        :key="obj.id"
        class="w-full flex items-center gap-3 px-4 py-3 text-left hover-muted transition-colors"
      >
        <span class="text-2xl w-8 text-center shrink-0">{{ typeIcon(obj.type) }}</span>
        <div class="flex-1 min-w-0">
          <div class="flex items-baseline gap-2">
            <span class="text-theme font-medium text-sm">{{ obj.name }}</span>
            <span class="text-theme-muted text-xs truncate">{{ obj.aliases[0] }}</span>
          </div>
          <div class="flex items-center gap-2 mt-0.5">
            <span class="text-theme-muted text-xs">{{ OBJECT_TYPE_LABELS[obj.type as CelestialObjectType] }}</span>
            <span v-if="obj.constellation" class="text-theme-subtle text-xs">· {{ obj.constellation }}</span>
          </div>
        </div>
        <div class="text-right shrink-0">
          <div class="text-theme text-sm font-mono">
            {{ obj.magnitude !== null ? formatMagnitude(obj.magnitude) : '—' }}
          </div>
          <div v-if="observedIds.has(obj.id)" class="text-xs mt-0.5" style="color: var(--accent)">
            ✓ видел
          </div>
        </div>
      </button>

      <div v-if="results.length === 0" class="px-4 py-12 text-center text-theme-muted text-sm">
        Ничего не найдено
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useObjectStore } from '@/entities/celestial-object'
import { OBJECT_TYPE_LABELS } from '@/shared/config/catalog.config'
import { formatMagnitude } from '@/shared/utils/format.utils'
import { CelestialObjectType } from '@/shared/types/enums'

const store = useObjectStore()
const query = ref('')

onMounted(() => store.load())

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return store.catalog
  return store.catalog.filter(
    (o) =>
      o.name.toLowerCase().includes(q) ||
      o.aliases.some((a) => a.toLowerCase().includes(q)) ||
      o.catalogIds.some((c) => c.id.toLowerCase().includes(q)),
  )
})

const observedIds = computed(() => store.observedIds)

const TYPE_ICONS: Record<string, string> = {
  star: '★',
  variable_star: '✦',
  double_star: '⊕',
  planet: '○',
  moon: '☽',
  sun: '☀',
  galaxy: '🌀',
  nebula: '☁',
  planetary_nebula: '◎',
  supernova_remnant: '💥',
  open_cluster: '✶',
  globular_cluster: '⊛',
  asteroid: '·',
  comet: '☄',
}

function typeIcon(type: string): string {
  return TYPE_ICONS[type] ?? '?'
}
</script>
