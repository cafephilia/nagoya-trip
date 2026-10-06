<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import type { Day } from '../types'
import { localDate, toMinutes } from '../utils'
import TimelineItem from './TimelineItem.vue'

const props = defineProps<{ day: Day }>()

const now = new Date()
const isToday = props.day.date === localDate(now)
const nowMin = now.getHours() * 60 + now.getMinutes()

/** 오늘 일정이면 이미 시작한 마지막 항목을 '지금'으로 본다 */
const currentIndex = computed(() => {
  if (!isToday) return -1
  let cur = -1
  props.day.items.forEach((it, i) => {
    if (toMinutes(it.t) <= nowMin) cur = i
  })
  return cur
})

const stateOf = (i: number) =>
  i === currentIndex.value ? 'now' : i < currentIndex.value ? 'past' : undefined

const list = ref<HTMLOListElement>()

onMounted(async () => {
  if (currentIndex.value <= 0) return
  await nextTick()
  list.value?.children[currentIndex.value]?.scrollIntoView({ block: 'center' })
})
</script>

<template>
  <section class="dayhead">
    <div class="eyebrow">{{ day.label }} · {{ day.short }}</div>
    <h2>{{ day.title }}</h2>
    <ul class="route">
      <li v-for="stop in day.route" :key="stop">{{ stop }}</li>
    </ul>
    <div v-if="day.callout" class="callout">
      <strong>{{ day.callout.strong }}</strong>{{ day.callout.text }}
    </div>
  </section>
  <ol ref="list" class="tl">
    <TimelineItem
      v-for="(item, i) in day.items"
      :key="item.t + item.title"
      :item="item"
      :state="stateOf(i)"
    />
  </ol>
</template>
