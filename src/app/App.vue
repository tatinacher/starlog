<template>
  <div class="flex flex-col h-dvh" style="background: var(--bg-base); color: var(--text-base)">
    <main class="flex-1 overflow-y-auto">
      <RouterView />
    </main>

    <nav class="flex border-t" style="background: var(--bg-surface); border-color: var(--border)">
      <RouterLink
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        class="flex flex-col items-center justify-center gap-1 flex-1 py-3 text-xs transition-colors"
        :style="{ color: 'var(--text-base)', opacity: '0.5' }"
        :active-class="'!opacity-100'"
      >
        <span class="text-xl leading-none">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSettingsStore } from '@/entities/settings'
import { useTheme } from '@/shared/lib/theme/useTheme'

const settingsStore = useSettingsStore()

onMounted(() => settingsStore.load())
useTheme()

const nav = [
  { to: '/journal',  icon: '📓', label: 'Журнал'    },
  { to: '/catalog',  icon: '🔭', label: 'Каталог'   },
  { to: '/settings', icon: '⚙️',  label: 'Настройки' },
]
</script>
