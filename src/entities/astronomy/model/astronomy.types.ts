export type ObjectType =
  | 'galaxy'
  | 'nebula'
  | 'open-cluster'
  | 'globular-cluster'
  | 'planetary-nebula'
  | 'supernova-remnant'
  | 'double-star'
  | 'star'
  | 'planet'
  | 'moon'
  | 'comet'
  | 'asteroid'

export type MoonPhase =
  | 'new'
  | 'waxing-crescent'
  | 'first-quarter'
  | 'waxing-gibbous'
  | 'full'
  | 'waning-gibbous'
  | 'last-quarter'
  | 'waning-crescent'

export interface EquatorialCoordinates {
  ra: number  // часы (0–24)
  dec: number // градусы (-90–+90)
}

export interface HorizonCoordinates {
  azimuth: number  // градусы (0–360)
  altitude: number // градусы (-90–+90)
}

export interface AstronomyContext {
  date: Date
  latitude: number
  longitude: number
}
