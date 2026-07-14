export function formatMagnitude(mag: number | null): string {
  if (mag === null) return '—'
  return `${mag >= 0 ? '+' : ''}${mag.toFixed(1)}m`
}

export function formatAperture(mm: number): string {
  return `${mm} мм`
}

export function formatFocalLength(mm: number): string {
  return `${mm} мм`
}

export function formatFocalRatio(apertureMm: number, focalLengthMm: number): string {
  return `f/${(focalLengthMm / apertureMm).toFixed(1)}`
}
