<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Map as LeafletMap } from 'leaflet'
import type { Day, Kind, LatLng } from '../types'
import { dirUrl, store } from '../utils'

const props = defineProps<{ day: Day }>()
const emit = defineEmits<{ focus: [index: number] }>()

interface Stop {
  pos: LatLng
  t: string
  title: string
  kind: Kind
  /** 구글 지도 길찾기에 넣을 장소 */
  query: string
  /** day.items 안의 위치 */
  index: number
}

/** 위치가 있는 일정을 순서대로 모으고, 같은 곳에 이어지는 일정은 하나로 합친다 */
const stops = computed(() => {
  const out: Stop[] = []
  props.day.items.forEach((it, index) => {
    if (!it.pos) return
    const prev = out[out.length - 1]
    if (prev && prev.pos[0] === it.pos[0] && prev.pos[1] === it.pos[1]) return
    out.push({ pos: it.pos, t: it.t, title: it.title, kind: it.k, query: it.map ?? it.pos.join(','), index })
  })
  return out
})

/** 출발·도착 + 경유지 3곳씩 끊고, 다음 구간은 앞 구간의 도착지에서 시작한다 */
const links = computed(() => {
  const s = stops.value
  const out: { url: string; label: string }[] = []
  for (let i = 0; i < s.length - 1; i += 4) {
    const part = s.slice(i, i + 5)
    out.push({ url: dirUrl(part.map(p => p.query)), label: `${part[0].t}–${part[part.length - 1].t}` })
  }
  return out
})

const OPEN_KEY = 'nagoya-map-open'
const open = ref(store.get(OPEN_KEY) !== '0')
const canvas = ref<HTMLDivElement>()
const failed = ref(false)
let map: LeafletMap | undefined

/** 지도를 처음 펼칠 때 Leaflet을 불러온다. 지도를 안 보는 사람은 내려받지 않는다 */
async function draw() {
  if (map || !canvas.value) return
  try {
    const [{ default: L }] = await Promise.all([import('leaflet'), import('leaflet/dist/leaflet.css')])
    if (map || !canvas.value) return
    const css = getComputedStyle(document.documentElement)
    const color = (k: string) => css.getPropertyValue('--k-' + k).trim()

    map = L.map(canvas.value, {
      scrollWheelZoom: false,
      // 휴대폰에서는 한 손가락으로 페이지를 내리고, 두 손가락으로 지도를 움직인다
      dragging: !L.Browser.mobile,
      attributionControl: true,
    })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    const pts = stops.value.map(s => s.pos)
    L.polyline(pts, { color: css.getPropertyValue('--accent').trim(), weight: 3, opacity: .75, dashArray: '6 7' }).addTo(map)
    stops.value.forEach((s, i) => {
      const icon = L.divIcon({
        className: 'stop-pin',
        html: `<span style="background:${color(s.kind)}">${i + 1}</span>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      })
      const popup = document.createElement('div')
      popup.className = 'stop-pop'
      popup.innerHTML = '<b></b> <span></span>'
      popup.querySelector('b')!.textContent = s.t
      popup.querySelector('span')!.textContent = s.title
      L.marker(s.pos, { icon, title: `${i + 1}. ${s.title}` }).bindPopup(popup).addTo(map!)
    })
    map.fitBounds(L.latLngBounds(pts), { padding: [28, 28], maxZoom: 15 })
  } catch {
    failed.value = true
  }
}

function onToggle(e: Event) {
  open.value = (e.target as HTMLDetailsElement).open
  store.set(OPEN_KEY, open.value ? '1' : '0')
  if (open.value) {
    if (map) map.invalidateSize()
    else draw()
  }
}

onMounted(() => {
  if (open.value) draw()
})
onBeforeUnmount(() => map?.remove())
</script>

<template>
  <details v-if="stops.length > 1" class="box daymap" :open="open" @toggle="onToggle">
    <summary>
      <svg class="dm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" /><path d="M9 4v14M15 6v14" />
      </svg>
      <span class="tg-title">동선 지도</span>
      <span class="tg-count">{{ stops.length }}곳</span>
      <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </summary>
    <div class="dm-body">
      <div ref="canvas" class="dm-canvas" role="img" :aria-label="day.label + ' 동선 지도'"></div>
      <p v-if="failed" class="dm-note">지도를 불러오지 못했어요. 인터넷에 연결된 뒤 다시 열어 주세요.</p>
      <ol class="stops">
        <li v-for="(s, i) in stops" :key="s.index">
          <button type="button" @click="emit('focus', s.index)">
            <span class="stop-no" :style="{ background: `var(--k-${s.kind})` }">{{ i + 1 }}</span>
            <span class="stop-t">{{ s.t }}</span>
            <span class="stop-title">{{ s.title }}</span>
          </button>
        </li>
      </ol>
      <div class="actions">
        <a v-for="l in links" :key="l.url" class="btn solid" :href="l.url" target="_blank" rel="noopener">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M3 13c0-4 2-6 6-6h4M10 4l3 3-3 3" />
          </svg>
          구글 지도 길찾기
          <span v-if="links.length > 1" class="dm-range">{{ l.label }}</span>
        </a>
      </div>
      <p class="dm-note">지도의 점선은 순서만 이은 직선이에요. 실제 길과 교통편은 구글 지도 길찾기에서 보세요. 지도 그림은 인터넷이 있어야 보여요.</p>
    </div>
  </details>
</template>
