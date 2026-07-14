export interface GeoLocation {
  readonly lat: number
  readonly lon: number
  readonly altitudeMeters: number
}

export interface AltAz {
  readonly altitude: number
  readonly azimuth: number
}

export interface SkyObject {
  readonly id: string
  readonly slug: string
  readonly name: string
  readonly nameRu: string | null
  readonly type: string
  readonly altitude: number
  readonly azimuth: number
}
