export type UUID = string
export type ISODateString = string

export interface LatLng {
  latitude: number
  longitude: number
}

export interface PaginationParams {
  page: number
  perPage: number
}

export interface AsyncState<T> {
  data: T
  loading: boolean
  error: string | null
}
