import type { InjectionKey } from 'vue'
import type { Place } from './types'

export const mapUrl = (q: string) =>
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q)

const pad = (n: number) => String(n).padStart(2, '0')

export const localDate = (d = new Date()) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export const formatYen = (y: string) => (/\d/.test(y) ? '¥' + y : y)

/** 사파리 비공개 모드 등에서 localStorage 접근이 실패해도 앱은 동작해야 한다 */
export const store = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value)
    } catch {
      /* 저장 실패는 무시 */
    }
  },
}

export const openTaxiKey: InjectionKey<(place: Place) => void> = Symbol('openTaxi')
