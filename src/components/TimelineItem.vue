<script setup lang="ts">
import { computed } from 'vue'
import { KIND_LABEL, type Item } from '../types'
import { formatYen } from '../utils'
import KindIcon from './KindIcon.vue'
import MapLink from './MapLink.vue'
import MenuButton from './MenuButton.vue'
import TaxiButton from './TaxiButton.vue'
import WayList from './WayList.vue'

const props = defineProps<{ item: Item; state?: 'past' | 'now' }>()

const hasBody = computed(() => {
  const it = props.item
  return Boolean(it.ways || it.facts || it.menu || it.tip || it.map || it.alt || it.taxi || it.picks || it.menuId)
})
</script>

<template>
  <li class="item" :class="[`k-${item.k}`, state, { optional: item.optional }]">
    <div class="node"><KindIcon :kind="item.k" /></div>
    <component :is="hasBody ? 'details' : 'div'" class="card">
      <component :is="hasBody ? 'summary' : 'div'" class="head">
        <figure v-if="item.photo" class="photo">
          <img :src="item.photo.src" :alt="item.title" loading="lazy" decoding="async">
          <figcaption><template v-if="item.photo.example">예시 사진 · </template>{{ item.photo.author }} · {{ item.photo.license }}</figcaption>
        </figure>
        <div class="meta">
          <span class="time">{{ item.t }}</span>
          <span class="kind">{{ KIND_LABEL[item.k] }}</span>
          <span v-if="item.optional" class="opt-pill">선택</span>
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
        <ol v-if="item.picks" class="picks">
          <li v-for="p in item.picks" :key="p.title" class="pick">
            <div class="pick-kind">{{ p.kind }}</div>
            <div class="alt-title">{{ p.title }}</div>
            <div class="ja sub">{{ p.ja }}</div>
            <div class="note">{{ p.note }}</div>
            <dl class="facts">
              <template v-for="[label, value] in p.facts" :key="label">
                <dt>{{ label }}</dt>
                <dd>{{ value }}</dd>
              </template>
            </dl>
            <div class="actions">
              <MenuButton v-if="p.menuId" :id="p.menuId" />
              <MapLink :query="p.map" />
            </div>
          </li>
        </ol>
        <div v-if="item.tip" class="tip" :class="{ warn: item.tipWarn }">
          <b v-if="item.tipWarn">중요</b>
          {{ item.tip }}
        </div>
        <div v-if="item.map || item.taxi || item.menuId" class="actions">
          <MenuButton v-if="item.menuId" :id="item.menuId" />
          <MapLink v-if="item.map" :query="item.map" solid />
          <TaxiButton v-if="item.taxi" :place="item.taxi" />
        </div>
        <div v-if="item.alt" class="alt">
          <div class="alt-label">대안</div>
          <div class="alt-title">{{ item.alt.title }}</div>
          <div class="ja sub">{{ item.alt.ja }}</div>
          <div class="note">{{ item.alt.note }}</div>
          <div class="actions">
            <MenuButton v-if="item.alt.menuId" :id="item.alt.menuId" />
            <MapLink :query="item.alt.map" />
          </div>
        </div>
        <p v-if="item.photo" class="credit">
          사진: <a :href="item.photo.source" target="_blank" rel="noopener">{{ item.photo.author }}</a>,
          <a :href="item.photo.licenseUrl" target="_blank" rel="noopener">{{ item.photo.license }}</a>,
          위키미디어 커먼즈 (크기 조정)
          <template v-if="item.photo.example"><br>{{ item.photo.example }}.</template>
        </p>
      </div>
    </component>
  </li>
</template>
