<template>
  <div class="rounded-2xl p-5 border border-theme" style="background: var(--bg-surface)">
    <h3 v-if="title" class="text-xs text-theme-muted uppercase tracking-widest mb-4">
      {{ title }}
    </h3>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ title?: string }>()
</script>
