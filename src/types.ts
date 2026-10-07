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

/** 예약·대기 상태 배지 */
export type Badge = '예약 필수' | '예약 추천' | '예약 불가' | '줄 김'

export interface Alt {
  title: string
  ja: string
  note: string
  map: string
  /** MENUS의 키 */
  menuId?: string
  badges?: Badge[]
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

/** 위키미디어 커먼즈 등 자유 라이선스 사진 */
export interface Photo {
  src: string
  author: string
  license: string
  licenseUrl: string
  /** 원본 파일 페이지 */
  source: string
  /** 이 가게에서 찍은 사진이 아닐 때 알려 주는 문구 */
  example?: string
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
  photo?: Photo
  /** MENUS의 키. 카드에 메뉴판 버튼을 보여준다 */
  menuId?: string
  badges?: Badge[]
  /** 기분과 체력에 따라 고르는 선택 일정 */
  optional?: boolean
  /** 선택 일정에서 고를 수 있는 장소 목록 */
  picks?: Pick[]
  /** 카드에 수하물 규정 버튼을 보여준다 (공항 체크인·보안검색) */
  baggage?: boolean
  /** 동선 지도에 찍을 위치 [위도, 경도]. 없으면 지도에서 빠진다 */
  pos?: LatLng
  /** 앞 장소에서 이번(또는 다음) 지도 장소까지 역·정류장 단위 경로 */
  path?: Path
}

export type LatLng = [lat: number, lng: number]

/** 동선 지도에 찍는 역·정류장·출입구 */
export interface PathStop {
  name: string
  pos: LatLng
  /** 내리지 않고 지나가는 역 */
  pass?: boolean
}

/** 다음 지점까지 타고 가는 수단 */
export interface PathMode {
  mode: WayMode
  /** 노선 이름. 예: '메이조선' */
  line?: string
  /** 노선 색 */
  color?: string
}

/**
 * 앞 장소에서 이 장소까지의 세부 경로. 수단과 지점을 번갈아 적고 수단으로 끝난다.
 * 예: [도보, 사카에역, 히가시야마선, 후시미역, 도보]
 */
export type Path = (PathMode | PathStop)[]

export interface Pick {
  title: string
  ja: string
  /** 한 줄 소개 */
  kind: string
  note: string
  facts: [label: string, value: string][]
  map: string
  menuId?: string
  badges?: Badge[]
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

/** 짐 챙기기 목록의 한 묶음 */
export interface PackGroup {
  title: string
  items: CheckItem[]
}

export interface MenuItem {
  ko: string
  ja: string
  /** 숫자 문자열(예: '1,265', '660–880') 또는 '미확인' */
  yen: string
  desc?: string
  tag?: '추천' | '매움' | '인기' | '한정'
}

export interface MenuSection {
  name: string
  items: MenuItem[]
}

export interface MenuBoard {
  title: string
  ja: string
  /** 가격 기준 등 한 줄 안내 */
  note?: string
  sections: MenuSection[]
  tips?: string[]
  sources?: string[]
}

export type FoodGenre = '나고야메시' | '라멘·면' | '고기' | '해산물·스시' | '카페·디저트' | '길거리 음식'
export type FoodArea = '사카에' | '오스' | '나고야역' | '나고야성' | '아쓰타' | '기타'

/** SNS·유튜브에서 유명한 맛집 */
export interface FoodSpot {
  id: string
  name: string
  ja: string
  genre: FoodGenre
  area: FoodArea
  /** 왜 유명한지 */
  why: string
  /** [한국어, 일본어, 엔] */
  orders: [ko: string, ja: string, yen: string][]
  price: string
  hours: string
  closed: string
  access: string
  fromHotel?: string
  tips: string
  /** 구글 지도 검색어 */
  map: string
  sources: string[]
  inItinerary?: boolean
  badges?: Badge[]
  /** 사용자가 받은 유튜버 추천 리스트에 있던 곳 */
  youtuber?: boolean
}
