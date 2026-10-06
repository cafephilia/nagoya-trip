<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { DAYS } from './data/trip'
import type { Place } from './types'
import { localDate, openTaxiKey, store } from './utils'
import DayView from './components/DayView.vue'
import InfoView from './components/InfoView.vue'
import TaxiCard from './components/TaxiCard.vue'

const TAB_KEY = 'nagoya-tab'
const today = localDate()

const tabs = [
  ...DAYS.map(d => ({ id: d.id, label: d.label, short: d.short, isToday: d.date === today })),
  { id: 'info', label: '정보', short: '준비', isToday: false },
]
const isTab = (id: string | null): id is string => !!id && tabs.some(t => t.id === id)

/** 주소의 #d2 같은 해시 → 여행 당일 → 마지막으로 본 탭 → 1일차 */
function initialTab(): string {
  const hash = location.hash.slice(1)
  if (isTab(hash)) return hash
  const todayDay = DAYS.find(d => d.date === today)
  if (todayDay) return todayDay.id
  const saved = store.get(TAB_KEY)
  return isTab(saved) ? saved : 'd1'
}

const active = ref(initialTab())
const activeDay = computed(() => DAYS.find(d => d.id === active.value))

// 탭을 누르면 주소의 해시도 맞춰 둔다. replaceState는 hashchange를 일으키지 않고 방문 기록도 쌓지 않는다
watch(active, id => {
  store.set(TAB_KEY, id)
  if (location.hash.slice(1) !== id) history.replaceState(null, '', '#' + id)
  window.scrollTo({ top: 0 })
})

const onHashChange = () => {
  const hash = location.hash.slice(1)
  if (isTab(hash)) active.value = hash
}

const taxi = ref<Place | null>(null)
provide(openTaxiKey, place => {
  taxi.value = place
})

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') taxi.value = null
}
onMounted(() => {
  document.addEventListener('keydown', onKey)
  window.addEventListener('hashchange', onHashChange)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  window.removeEventListener('hashchange', onHashChange)
})
</script>

<template>
  <div class="wrap">
    <header class="top">
      <div class="eyebrow">NGO · 2026.10.08–10.11 · 3명</div>
      <h1>나고야 <span class="gold">3박 4일</span></h1>
      <p class="sub">부모님과 함께, 많이 걷지 않는 도시 여행</p>
    </header>

    <nav class="tabs" aria-label="날짜 선택">
      <div class="tabrow" role="tablist">
        <button
          v-for="t in tabs"
          :id="'tab-' + t.id"
          :key="t.id"
          class="tab"
          role="tab"
          type="button"
          :aria-selected="active === t.id"
          aria-controls="view"
          @click="active = t.id"
        >
          <b>{{ t.label }}</b>
          <span>{{ t.short }}</span>
          <i v-if="t.isToday" class="today-dot" aria-label="오늘"></i>
        </button>
      </div>
    </nav>

    <main id="view">
      <DayView v-if="activeDay" :key="activeDay.id" :day="activeDay" />
      <InfoView v-else />
    </main>

    <p class="foot">
      정보 확인일 2026-10-06. 영업시간·가격은 바뀔 수 있으니 방문 전에 지도 링크에서 한 번 더 확인하세요.
      시간은 일본 시각이며 한국과 시차가 없습니다.
    </p>
  </div>

  <TaxiCard v-if="taxi" :place="taxi" @close="taxi = null" />
</template>
