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

export type WayMode = 'walk' | 'subway' | 'bus' | 'train' | 'taxi'

export const WAY_LABEL: Record<WayMode, string> = {
  walk: '도보',
  subway: '지하철',
  bus: '버스',
  train: '전철',
  taxi: '택시',
}

/** 이동 구간의 교통수단 선택지 하나 */
export interface Way {
  mode: WayMode
  /** 예: '히가시야마선 2정거장' */
  label: string
  /** 문에서 문까지 걸리는 시간 */
  time: string
  /** 1인 요금, 택시는 1대 요금 */
  cost?: string
  steps?: string[]
  note?: string
  /** 이 일정의 기본 선택 */
  best?: boolean
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
  ways?: Way[]
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

export interface TipGroup {
  title: string
  items: [head: string, body: string][]
}

export interface CheckItem {
  id: string
  title: string
  detail: string
}
