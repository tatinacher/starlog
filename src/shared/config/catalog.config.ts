import { CelestialObjectType } from '@/shared/types/enums'

export const OBJECT_TYPE_LABELS: Record<CelestialObjectType, string> = {
  [CelestialObjectType.Star]: 'Звезда',
  [CelestialObjectType.DoubleStar]: 'Двойная звезда',
  [CelestialObjectType.VariableStar]: 'Переменная звезда',
  [CelestialObjectType.Planet]: 'Планета',
  [CelestialObjectType.Moon]: 'Спутник',
  [CelestialObjectType.Sun]: 'Солнце',
  [CelestialObjectType.Asteroid]: 'Астероид',
  [CelestialObjectType.Comet]: 'Комета',
  [CelestialObjectType.Galaxy]: 'Галактика',
  [CelestialObjectType.Nebula]: 'Туманность',
  [CelestialObjectType.PlanetaryNebula]: 'Планетарная туманность',
  [CelestialObjectType.SupernovaRemnant]: 'Остаток сверхновой',
  [CelestialObjectType.OpenCluster]: 'Рассеянное скопление',
  [CelestialObjectType.GlobularCluster]: 'Шаровое скопление',
}

export const BORTLE_LABELS: Record<number, string> = {
  1: 'Безупречно тёмное небо',
  2: 'Истинно тёмное небо',
  3: 'Сельское небо',
  4: 'Сельско-пригородный переход',
  5: 'Пригородное небо',
  6: 'Яркое пригородное небо',
  7: 'Пригородно-городской переход',
  8: 'Городское небо',
  9: 'Внутренний город',
}
