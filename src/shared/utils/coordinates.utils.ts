import type { LatLng } from '@/shared/types'

export function parseLatLng(raw: string): LatLng | null {
  const parts = raw.split(',').map((s) => parseFloat(s.trim()))
  if (parts.length !== 2 || parts.some(isNaN)) return null
  const [latitude, longitude] = parts
  if (latitude < -90 || latitude > 90) return null
  if (longitude < -180 || longitude > 180) return null
  return { latitude, longitude }
}

export function formatLatLng(coords: LatLng, format: 'decimal' | 'dms' = 'decimal'): string {
  if (format === 'decimal') {
    return `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`
  }
  return `${toDMS(coords.latitude, 'lat')}, ${toDMS(coords.longitude, 'lng')}`
}

function toDMS(decimal: number, axis: 'lat' | 'lng'): string {
  const dir = axis === 'lat' ? (decimal >= 0 ? 'N' : 'S') : decimal >= 0 ? 'E' : 'W'
  const abs = Math.abs(decimal)
  const deg = Math.floor(abs)
  const minFull = (abs - deg) * 60
  const min = Math.floor(minFull)
  const sec = ((minFull - min) * 60).toFixed(1)
  return `${deg}°${min}'${sec}"${dir}`
}
