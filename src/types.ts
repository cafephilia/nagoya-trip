export type Kind = 'flight' | 'move' | 'sight' | 'shop' | 'food' | 'stay'

export const KIND_LABEL: Record<Kind, string> = {
  flight: '항공',
  move: '이동',
  sight: '관광',
  shop: '쇼핑',
  food: '식사',
  stay: '숙소',
}

/** 택시 기사에게 보여줄 일본어 목적지 */
export interface Place {
  ja: string
  addr: string
  tel?: string
}

export interface Alt {
  title: string
  ja: string
  note: string
  map: string
}

export interface Item {
  /** 일본 시각 HH:MM */
  t: string
  k: Kind
  title: string
  ja?: string
  note?: string
  dur?: string
  facts?: [label: string, value: string][]
  menu?: [name: string, yen: string][]
  tip?: string
  tipWarn?: boolean
  /** 구글 지도 검색어 */
  map?: string
  taxi?: Place
  alt?: Alt
}

export interface Callout {
  strong: string
  text: string
}

export interface Day {
  id: string
  /** YYYY-MM-DD */
  date: string
  label: string
  short: string
  title: string
  route: string[]
  callout?: Callout
  items: Item[]
}

export interface Flight {
  code: string
  dir: string
  date: string
  from: { code: string; city: string; time: string }
  to: { code: string; city: string; time: string }
  duration: string
  meta: string[]
}

export interface CheckItem {
  id: string
  title: string
  detail: string
}
