<template>
  <div class="flex items-start justify-between gap-4 py-2.5 border-b border-theme last:border-0">
    <span class="text-sm text-theme-muted shrink-0">{{ label }}</span>
    <span class="text-sm text-theme text-right font-medium">
      <slot>{{ value ?? '—' }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value?: string | number | null
}>()
</script>
