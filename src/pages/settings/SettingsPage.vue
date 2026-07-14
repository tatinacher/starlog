<template>
  <div class="flex flex-col h-full">
    <header class="px-4 pt-6 pb-4 border-b" style="background: var(--bg-surface); border-color: var(--border)">
      <h1 class="text-lg font-semibold" style="color: var(--text-base)">Настройки</h1>
    </header>

    <div class="flex-1 overflow-y-auto divide-y divide-slate-800">
      <section class="px-4 py-4">
        <h2 class="text-xs text-slate-500 uppercase tracking-wider mb-3">Внешний вид</h2>
        <div class="flex gap-2">
          <button
            v-for="t in themes"
            :key="t.value"
            class="flex-1 py-2 rounded-lg text-sm border transition-colors"
            :class="
              settings.theme === t.value
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
                : 'border-slate-700 text-slate-400'
            "
            @click="save({ theme: t.value })"
          >
            {{ t.label }}
          </button>
        </div>
      </section>

      <section class="px-4 py-4">
        <h2 class="text-xs text-slate-500 uppercase tracking-wider mb-3">Каталог</h2>
        <div class="text-slate-400 text-sm">
          Объектов в каталоге: <span class="text-white font-medium">{{ objectCount }}</span>
        </div>
      </section>

      <section class="px-4 py-4">
        <h2 class="text-xs text-slate-500 uppercase tracking-wider mb-3">О приложении</h2>
        <div class="text-slate-500 text-sm space-y-1">
          <div>Starlog v0.1.0</div>
          <div>Личный журнал наблюдений звёздного неба</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useSettingsStore } from '@/entities/settings'
import { useObjectStore } from '@/entities/celestial-object'
import type { UserSettings } from '@/entities/settings'

const settingsStore = useSettingsStore()
const objStore = useObjectStore()

onMounted(async () => {
  await settingsStore.load()
  await objStore.load()
})

const settings = computed(() => settingsStore.data)
const objectCount = computed(() => objStore.catalog.length)

function save(patch: Partial<UserSettings>) {
  settingsStore.save(patch)
}

const themes = [
  { value: 'dark' as const, label: '🌑 Тёмная' },
  { value: 'night-red' as const, label: '🔴 Ночная' },
  { value: 'light' as const, label: '☀️ Светлая' },
]
</script>
