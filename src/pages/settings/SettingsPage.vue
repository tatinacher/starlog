<template>
  <div class="flex flex-col h-full bg-base">
    <header class="px-4 pt-6 pb-4 border-b bg-surface border-theme">
      <h1 class="text-lg font-semibold text-theme">Настройки</h1>
    </header>

    <div class="flex-1 overflow-y-auto divide-theme">
      <section class="px-4 py-4">
        <h2 class="text-xs text-theme-muted uppercase tracking-wider mb-3">Внешний вид</h2>
        <div class="flex gap-2">
          <button
            v-for="t in themes"
            :key="t.value"
            class="flex-1 py-2 rounded-lg text-sm border transition-colors"
            :class="settings.theme === t.value ? 'border-theme text-accent bg-muted' : 'border-theme text-theme-muted hover-muted'"
            @click="save({ theme: t.value })"
          >
            {{ t.label }}
          </button>
        </div>
      </section>

      <section class="px-4 py-4">
        <h2 class="text-xs text-theme-muted uppercase tracking-wider mb-3">Каталог</h2>
        <div class="text-theme-muted text-sm">
          Объектов в каталоге: <span class="text-theme font-medium">{{ objectCount }}</span>
        </div>
      </section>

      <section class="px-4 py-4">
        <h2 class="text-xs text-theme-muted uppercase tracking-wider mb-3">О приложении</h2>
        <div class="text-sm text-theme-muted space-y-1">
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
  { value: 'dark' as const,      label: '🌑 Тёмная'  },
  { value: 'night-red' as const, label: '🔴 Ночная'  },
  { value: 'light' as const,     label: '☀️ Светлая' },
]
</script>
