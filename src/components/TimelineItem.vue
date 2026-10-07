<script setup lang="ts">
import { computed } from 'vue'
import { KIND_LABEL, type Item } from '../types'
import { formatYen } from '../utils'
import KindIcon from './KindIcon.vue'
import MapLink from './MapLink.vue'
import TaxiButton from './TaxiButton.vue'
import WayList from './WayList.vue'

const props = defineProps<{ item: Item; state?: 'past' | 'now' }>()

const hasBody = computed(() => {
  const it = props.item
  return Boolean(it.ways || it.facts || it.menu || it.tip || it.map || it.alt || it.taxi)
})
</script>

<template>
  <li class="item" :class="[`k-${item.k}`, state]">
    <div class="node"><KindIcon :kind="item.k" /></div>
    <component :is="hasBody ? 'details' : 'div'" class="card">
      <component :is="hasBody ? 'summary' : 'div'" class="head">
        <div class="meta">
          <span class="time">{{ item.t }}</span>
          <span class="kind">{{ KIND_LABEL[item.k] }}</span>
          <span v-if="item.dur" class="dur">{{ item.dur }}</span>
          <span v-if="state === 'now'" class="now-pill">지금</span>
          <svg v-if="hasBody" class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        <div class="title">{{ item.title }}</div>
        <div v-if="item.ja" class="ja sub">{{ item.ja }}</div>
        <div v-if="item.note" class="note">{{ item.note }}</div>
      </component>

      <div v-if="hasBody" class="body">
        <WayList v-if="item.ways" :ways="item.ways" />
        <dl v-if="item.facts" class="facts">
          <template v-for="[label, value] in item.facts" :key="label">
            <dt>{{ label }}</dt>
            <dd>{{ value }}</dd>
          </template>
        </dl>
        <ul v-if="item.menu" class="menu">
          <li v-for="[name, yen] in item.menu" :key="name">
            <span>{{ name }}</span>
            <span class="yen">{{ formatYen(yen) }}</span>
          </li>
        </ul>
        <div v-if="item.tip" class="tip" :class="{ warn: item.tipWarn }">
          <b v-if="item.tipWarn">중요</b>
          {{ item.tip }}
        </div>
        <div v-if="item.map || item.taxi" class="actions">
          <MapLink v-if="item.map" :query="item.map" solid />
          <TaxiButton v-if="item.taxi" :place="item.taxi" />
        </div>
        <div v-if="item.alt" class="alt">
          <div class="alt-label">대안</div>
          <div class="alt-title">{{ item.alt.title }}</div>
          <div class="ja sub">{{ item.alt.ja }}</div>
          <div class="note">{{ item.alt.note }}</div>
          <div class="actions">
            <MapLink :query="item.alt.map" />
          </div>
        </div>
      </div>
    </component>
  </li>
</template>
