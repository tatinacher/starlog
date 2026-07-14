import { useLocationStore } from '../model/location.store'
import type { CreateLocationDto, UpdateLocationDto } from '../model/location.types'

export function useLocations() {
  const store = useLocationStore()

  return {
    items: store.items,
    loading: store.loading,
    activeLocation: store.activeLocation,
    defaultLocation: store.defaultLocation,
    load: store.load,
    create: (dto: CreateLocationDto) => store.create(dto),
    update: (id: string, dto: UpdateLocationDto) => store.update(id, dto),
    remove: (id: string) => store.remove(id),
    setDefault: (id: string) => store.setDefault(id),
  }
}
