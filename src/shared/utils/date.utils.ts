import type { ISODateString } from '@/shared/types'

export function toISODate(date: Date): ISODateString {
  return date.toISOString()
}

export function formatDate(iso: ISODateString, locale = 'ru-RU'): string {
  return new Date(iso).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDateTime(iso: ISODateString, locale = 'ru-RU'): string {
  return new Date(iso).toLocaleString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function isToday(iso: ISODateString): boolean {
  const d = new Date(iso)
  const now = new Date()
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  )
}

export function getDaysBetween(a: ISODateString, b: ISODateString): number {
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.abs(Math.floor((new Date(a).getTime() - new Date(b).getTime()) / msPerDay))
}
