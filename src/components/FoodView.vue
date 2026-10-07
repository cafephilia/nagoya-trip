<script setup lang="ts">
import { computed, ref } from 'vue'
import { FOOD_SPOTS } from '../data/foodspots'
import { formatYen } from '../utils'
import MapLink from './MapLink.vue'

const ALL = '전체'
const genre = ref(ALL)
const area = ref(ALL)

const uniq = (xs: string[]) => [ALL, ...new Set(xs)]
const genres = computed(() => uniq(FOOD_SPOTS.map(s => s.genre)))
const areas = computed(() => uniq(FOOD_SPOTS.map(s => s.area)))

const spots = computed(() =>
  FOOD_SPOTS.filter(s => (genre.value === ALL || s.genre === genre.value) && (area.value === ALL || s.area === area.value)),
)
</script>

<template>
  <section class="dayhead">
    <div class="overline"><span class="day-no">맛집</span><span>SNS · 유튜브</span></div>
    <h2>SNS에서 유명한 나고야 맛집</h2>
    <p class="note food-lead">일정에 없는 곳도 함께 모았어요. 시간이 남거나 계획이 바뀔 때 골라 가세요.</p>
  </section>

  <div class="filters" role="group" aria-label="종류">
    <button v-for="g in genres" :key="g" type="button" class="fchip" :aria-pressed="genre === g" @click="genre = g">{{ g }}</button>
  </div>
  <div class="filters" role="group" aria-label="지역">
    <button v-for="a in areas" :key="a" type="button" class="fchip area" :aria-pressed="area === a" @click="area = a">{{ a }}</button>
  </div>

  <p v-if="!FOOD_SPOTS.length" class="note">맛집 목록을 준비하고 있어요.</p>
  <p v-else-if="!spots.length" class="note">조건에 맞는 곳이 없어요. 필터를 바꿔 보세요.</p>

  <ul class="spots">
    <li v-for="s in spots" :key="s.id">
      <details class="card spot">
        <summary class="head">
          <div class="meta">
            <span class="kind">{{ s.genre }}</span>
            <span class="dur">{{ s.area }}</span>
            <span v-if="s.inItinerary" class="opt-pill">일정에 있음</span>
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <div class="title">{{ s.name }}</div>
          <div class="ja sub">{{ s.ja }}</div>
          <div class="note">{{ s.why }}</div>
          <div class="spot-price">1인 {{ s.price }}<template v-if="s.fromHotel"> · 호텔에서 {{ s.fromHotel }}</template></div>
        </summary>
        <div class="body">
          <ul class="menu">
            <li v-for="[ko, ja, yen] in s.orders" :key="ko">
              <span>{{ ko }} <span class="ja sub">{{ ja }}</span></span>
              <span class="yen">{{ formatYen(yen) }}</span>
            </li>
          </ul>
          <dl class="facts">
            <dt>영업</dt><dd>{{ s.hours }}</dd>
            <dt>휴무</dt><dd>{{ s.closed }}</dd>
            <dt>가는 길</dt><dd>{{ s.access }}</dd>
          </dl>
          <div class="tip">{{ s.tips }}</div>
          <div class="actions">
            <MapLink :query="s.map" solid />
          </div>
          <p class="credit">
            출처:
            <template v-for="(src, i) in s.sources" :key="src">
              <a :href="src" target="_blank" rel="noopener">{{ i + 1 }}</a><span v-if="i < s.sources.length - 1">, </span>
            </template>
          </p>
        </div>
      </details>
    </li>
  </ul>
</template>
