import type { ObjectType } from '@/entities/astronomy'

export const OBJECT_TYPE_LABELS: Record<ObjectType, string> = {
  galaxy: 'Галактика',
  nebula: 'Туманность',
  'open-cluster': 'Рассеянное скопление',
  'globular-cluster': 'Шаровое скопление',
  'planetary-nebula': 'Планетарная туманность',
  'supernova-remnant': 'Остаток сверхновой',
  'double-star': 'Двойная звезда',
  star: 'Звезда',
  planet: 'Планета',
  moon: 'Спутник',
  comet: 'Комета',
  asteroid: 'Астероид',
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
