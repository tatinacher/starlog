import * as Astronomy from 'astronomy-engine'
import type { CelestialObject } from '@/entities/celestial-object'
import type { GeoLocation, AltAz, SkyObject } from './astronomy.types'

// Объекты Солнечной системы из нашего каталога, поддерживаемые библиотекой.
// Ключ — slug из catalog.json.
const SOLAR_SYSTEM_BODIES: Readonly<Partial<Record<string, Astronomy.Body>>> = {
  moon:    Astronomy.Body.Moon,
  saturn:  Astronomy.Body.Saturn,
  jupiter: Astronomy.Body.Jupiter,
}

class AstronomyService {
  /**
   * Вычисляет высоту над горизонтом и азимут объекта в заданный момент времени.
   * Возвращает null если объект неизвестен библиотеке (например, пользовательский).
   */
  getAltAz(object: CelestialObject, location: GeoLocation, date: Date): AltAz | null {
    const observer = new Astronomy.Observer(location.lat, location.lon, location.altitudeMeters)

    if (object.coordinates !== null) {
      const hor = Astronomy.Horizon(
        date,
        observer,
        object.coordinates.raHours,
        object.coordinates.decDegrees,
        'normal',
      )
      return { altitude: hor.altitude, azimuth: hor.azimuth }
    }

    const body = SOLAR_SYSTEM_BODIES[object.slug]
    if (body === undefined) return null

    const eq = Astronomy.Equator(body, date, observer, true, true)
    const hor = Astronomy.Horizon(date, observer, eq.ra, eq.dec, 'normal')
    return { altitude: hor.altitude, azimuth: hor.azimuth }
  }

  /** Возвращает true если объект сейчас выше горизонта. */
  isAboveHorizon(object: CelestialObject, location: GeoLocation, date: Date): boolean {
    const altaz = this.getAltAz(object, location, date)
    return altaz !== null && altaz.altitude > 0
  }

  /**
   * Возвращает видимые объекты, отсортированные по высоте (самые высокие первыми).
   */
  getVisibleObjects(
    objects: readonly CelestialObject[],
    location: GeoLocation,
    date: Date,
  ): SkyObject[] {
    const result: SkyObject[] = []

    for (const obj of objects) {
      const altaz = this.getAltAz(obj, location, date)
      if (altaz !== null && altaz.altitude > 0) {
        result.push({
          id: obj.id,
          slug: obj.slug,
          name: obj.name,
          nameRu: obj.nameRu,
          type: obj.type,
          altitude: altaz.altitude,
          azimuth: altaz.azimuth,
        })
      }
    }

    return result.sort((a, b) => b.altitude - a.altitude)
  }

  /**
   * Время ближайшего восхода для объектов Солнечной системы.
   * Для звёзд возвращает null (требует отдельной реализации).
   */
  getRiseTime(object: CelestialObject, location: GeoLocation, date: Date): Date | null {
    const body = SOLAR_SYSTEM_BODIES[object.slug]
    if (body === undefined) return null

    const observer = new Astronomy.Observer(location.lat, location.lon, location.altitudeMeters)
    const result = Astronomy.SearchRiseSet(body, observer, +1, date, 1)
    return result?.date ?? null
  }

  /**
   * Время ближайшего захода для объектов Солнечной системы.
   * Для звёзд возвращает null.
   */
  getSetTime(object: CelestialObject, location: GeoLocation, date: Date): Date | null {
    const body = SOLAR_SYSTEM_BODIES[object.slug]
    if (body === undefined) return null

    const observer = new Astronomy.Observer(location.lat, location.lon, location.altitudeMeters)
    const result = Astronomy.SearchRiseSet(body, observer, -1, date, 1)
    return result?.date ?? null
  }
}

export const astronomyService = new AstronomyService()
