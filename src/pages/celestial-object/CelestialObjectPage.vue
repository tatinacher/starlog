<template>
  <div class="flex flex-col h-full bg-base">

    <!-- Шапка с навигацией -->
    <header class="flex items-center gap-3 px-4 pt-6 pb-4 bg-surface border-b border-theme shrink-0">
      <button
        class="w-8 h-8 flex items-center justify-center rounded-lg hover-muted text-theme-muted transition-colors"
        @click="router.back()"
      >
        ‹
      </button>
      <span class="text-sm text-theme-muted truncate flex-1">Каталог</span>
    </header>

    <!-- Загрузка -->
    <div v-if="loading" class="flex-1 flex items-center justify-center text-theme-muted text-sm">
      Загрузка...
    </div>

    <!-- Не найден -->
    <div v-else-if="notFound" class="flex-1 flex flex-col items-center justify-center gap-2 text-center px-8">
      <span class="text-4xl">🔭</span>
      <p class="text-theme font-medium">Объект не найден</p>
      <p class="text-theme-muted text-sm">{{ slug }}</p>
    </div>

    <!-- Контент -->
    <template v-else-if="object">
      <div class="flex-1 overflow-y-auto">

        <!-- Hero -->
        <div class="px-6 py-8 bg-surface border-b border-theme">
          <div class="text-5xl mb-4">{{ typeIcon }}</div>
          <h1 class="text-3xl font-bold text-theme tracking-tight">{{ object.name }}</h1>
          <p v-if="object.nameRu" class="text-lg text-theme-muted mt-1 font-light">{{ object.nameRu }}</p>
          <div class="flex items-center gap-2 mt-2 flex-wrap">
            <span class="text-theme-muted text-sm">{{ typeLabel }}</span>
            <span v-if="constellationName" class="text-theme-subtle text-sm">·</span>
            <span v-if="constellationName" class="text-theme-muted text-sm">{{ constellationName }}</span>
          </div>
          <div v-if="object.magnitude !== null" class="mt-3">
            <span class="text-accent text-lg font-semibold font-mono">
              {{ formatMagnitude(object.magnitude) }}
            </span>
          </div>
        </div>

        <!-- Карточки -->
        <div class="px-4 py-5 flex flex-col gap-4">

          <!-- Основная информация -->
          <InfoCard title="Основная информация">
            <InfoRow label="Тип" :value="typeLabel" />
            <InfoRow label="Созвездие" :value="constellationName ?? '—'" />
            <InfoRow label="Звёздная величина" :value="object.magnitude !== null ? formatMagnitude(object.magnitude) : null" />
            <InfoRow label="Расстояние" :value="distanceLabel" />
            <InfoRow v-if="object.coordinates" label="RA" :value="formatRA(object.coordinates.raHours)" />
            <InfoRow v-if="object.coordinates" label="Dec" :value="formatDec(object.coordinates.decDegrees)" />
            <InfoRow v-if="object.spectralClass" label="Спектральный класс" :value="object.spectralClass" />
            <InfoRow
              v-if="object.surfaceTemperatureK"
              label="Температура"
              :value="`${object.surfaceTemperatureK.toLocaleString('ru-RU')} K`"
            />
            <InfoRow v-if="object.angularSize" label="Угловой размер" :value="angularSizeLabel" />
          </InfoCard>

          <!-- Описание -->
          <InfoCard v-if="object.description" title="Описание">
            <p class="text-sm text-theme leading-relaxed">{{ object.description }}</p>
          </InfoCard>

          <!-- Каталожные обозначения -->
          <InfoCard v-if="object.catalogIds.length" title="Каталожные обозначения">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="cat in object.catalogIds"
                :key="`${cat.catalog}-${cat.id}`"
                class="px-2.5 py-1 rounded-full text-xs font-mono border border-theme text-theme-muted"
              >
                {{ cat.id }}
              </span>
            </div>
          </InfoCard>

          <!-- Наблюдения -->
          <InfoCard title="Наблюдения">
            <div class="flex items-center gap-3">
              <span class="text-3xl">📓</span>
              <div>
                <p class="text-theme font-medium text-sm">Observed 0 times</p>
                <p class="text-theme-muted text-xs mt-0.5">История наблюдений появится здесь</p>
              </div>
            </div>
          </InfoCard>

        </div>
      </div>

      <!-- Кнопка действия — вне скролла, над нижним табом -->
      <div class="px-4 pb-4 pt-3 border-t border-theme shrink-0" style="background: var(--bg-base)">
        <button
          class="w-full py-4 rounded-2xl font-semibold text-sm transition-opacity active:opacity-70"
          style="background: var(--accent); color: #fff"
        >
          ✓ Отметить как наблюдаемый
        </button>
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCelestialObject } from '@/entities/celestial-object'
import { OBJECT_TYPE_LABELS, CONSTELLATION_NAMES } from '@/shared/config/catalog.config'
import { formatMagnitude } from '@/shared/utils/format.utils'
import { formatRA, formatDec, formatDistance } from '@/shared/utils/astronomy.utils'
import { CelestialObjectType } from '@/shared/types/enums'
import InfoCard from '@/shared/ui/InfoCard.vue'
import InfoRow from '@/shared/ui/InfoRow.vue'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string

const { object, loading, notFound } = useCelestialObject(slug)

const TYPE_ICONS: Record<CelestialObjectType, string> = {
  [CelestialObjectType.Star]:              '⭐',
  [CelestialObjectType.VariableStar]:      '✦',
  [CelestialObjectType.DoubleStar]:        '⊕',
  [CelestialObjectType.Planet]:            '🪐',
  [CelestialObjectType.Moon]:              '🌙',
  [CelestialObjectType.Sun]:               '☀️',
  [CelestialObjectType.Asteroid]:          '🪨',
  [CelestialObjectType.Comet]:             '☄️',
  [CelestialObjectType.Galaxy]:            '🌀',
  [CelestialObjectType.Nebula]:            '🌌',
  [CelestialObjectType.PlanetaryNebula]:   '◎',
  [CelestialObjectType.SupernovaRemnant]:  '💥',
  [CelestialObjectType.OpenCluster]:       '✶',
  [CelestialObjectType.GlobularCluster]:   '⊛',
}

const typeIcon = computed(() =>
  object.value ? (TYPE_ICONS[object.value.type] ?? '?') : '',
)

const typeLabel = computed(() =>
  object.value ? OBJECT_TYPE_LABELS[object.value.type] : '',
)

const constellationName = computed(() =>
  object.value?.constellation ? (CONSTELLATION_NAMES[object.value.constellation] ?? object.value.constellation) : null,
)

const distanceLabel = computed(() =>
  object.value ? formatDistance(object.value.distance) : '—',
)

const angularSizeLabel = computed(() => {
  const size = object.value?.angularSize
  if (!size) return null
  const major = `${size.majorAxisArcmin}'`
  return size.minorAxisArcmin ? `${major} × ${size.minorAxisArcmin}'` : major
})
</script>
