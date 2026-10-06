<script setup lang="ts">
import { computed } from 'vue'
import { KIND_LABEL, type Item } from '../types'
import { formatYen } from '../utils'
import MapLink from './MapLink.vue'
import TaxiButton from './TaxiButton.vue'

const props = defineProps<{ item: Item; state?: 'past' | 'now' }>()

const hasBody = computed(() => {
  const it = props.item
  return Boolean(it.facts || it.menu || it.tip || it.map || it.alt || it.taxi)
})
</script>

<template>
  <li class="item" :class="[`k-${item.k}`, state]">
    <div class="time">{{ item.t }}</div>
    <div class="rail">
      <span class="dot"></span>
      <component :is="hasBody ? 'details' : 'div'" class="card">
        <component :is="hasBody ? 'summary' : 'div'" class="head">
          <div class="chiprow">
            <span class="chip">{{ KIND_LABEL[item.k] }}</span>
            <span v-if="item.dur" class="dur">{{ item.dur }}</span>
            <span v-if="state === 'now'" class="chip now">지금</span>
          </div>
          <div class="title">
            {{ item.title }}
            <span v-if="item.ja" class="ja">{{ item.ja }}</span>
          </div>
          <div v-if="item.note" class="note">{{ item.note }}</div>
          <span v-if="hasBody" class="more">자세히 보기</span>
        </component>

        <div v-if="hasBody" class="body">
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
            <div class="lbl">대안</div>
            <div class="t">
              {{ item.alt.title }}
              <span class="ja">{{ item.alt.ja }}</span>
            </div>
            <div class="note">{{ item.alt.note }}</div>
            <div class="actions">
              <MapLink :query="item.alt.map" />
            </div>
          </div>
        </div>
      </component>
    </div>
  </li>
</template>
