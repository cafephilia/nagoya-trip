<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { CHECKLIST, FLIGHTS, HOTEL } from '../data/trip'
import { store } from '../utils'
import MapLink from './MapLink.vue'
import TaxiButton from './TaxiButton.vue'

const checked = reactive<Record<string, boolean>>(
  Object.fromEntries(CHECKLIST.map(c => [c.id, store.get('nagoya-ck-' + c.id) === '1'])),
)
watch(checked, v => {
  for (const [id, on] of Object.entries(v)) store.set('nagoya-ck-' + id, on ? '1' : '0')
})
const doneCount = computed(() => CHECKLIST.filter(c => checked[c.id]).length)

const fares: [string, string][] = [
  ['μSKY 공항 ↔ 메이테쓰 나고야 (29분)', '¥1,430'],
  ['지하철 1구간 (사카에 ↔ 나고야 등)', '¥210'],
  ['택시 기본 (0.91km, 이후 232m당 100엔)', '¥500'],
  ['택시 호텔 ↔ 나고야역', '¥1,400–1,730'],
  ['택시 호텔 ↔ 아쓰타 신궁', '¥2,500–2,900'],
  ['도니치 에코 킷푸 (8일·토·일, 지하철·시버스 무제한)', '¥620'],
]

const events: [string, string][] = [
  ['오스 다이도초닌 축제 · 오스 상점가 (오이란 행렬 10/10–11 11:00·14:00)', '10/9–11'],
  ['월드 페스티벌 in 아이치 · 히사야오도리 공원', '10/10–12'],
  ['이모(고구마) 페스 · 오아시스21', '10/10–12'],
  ['가을 홋카이도 물산전 · 마쓰자카야 7층', '~10/12'],
]

const contacts: [string, string][] = [
  ['경찰', '110'],
  ['구급 · 화재', '119'],
  ['JNTO 방문객 핫라인 (24시간, 한국어)', '050-3816-2787'],
  ['주나고야 대한민국 총영사관', '052-586-9221'],
  ['총영사관 근무시간 외 긴급', '080-4221-9500'],
]
</script>

<template>
  <section class="dayhead">
    <div class="overline"><span class="day-no">정보</span><span>출발 전에 확인</span></div>
    <h2>여행 정보</h2>
    <ul class="route plain">
      <li>항공권</li><li>숙소</li><li>준비물</li><li>교통</li><li>연락처</li>
    </ul>
  </section>

  <div class="sec">
    <h3>항공권 · Peach Standard Plus</h3>
    <div v-for="f in FLIGHTS" :key="f.code" class="pass">
      <div class="main">
        <div class="legs">
          <div>
            <div class="city">{{ f.from.city }}</div>
            <div class="apt">{{ f.from.code }}</div>
            <div class="tm">{{ f.from.time }}</div>
          </div>
          <div class="mid">{{ f.duration }}<br>──✈</div>
          <div class="r">
            <div class="city">{{ f.to.city }}</div>
            <div class="apt">{{ f.to.code }}</div>
            <div class="tm">{{ f.to.time }}</div>
          </div>
        </div>
        <div class="meta"><span v-for="m in f.meta" :key="m">{{ m }}</span></div>
      </div>
      <div class="stub">
        <div class="d">{{ f.dir }}</div>
        <div class="code">{{ f.code }}</div>
        <div class="d">{{ f.date }}</div>
      </div>
    </div>
    <div class="box">
      <h4>Standard Plus 포함 사항 (1인)</h4>
      <ul>
        <li>기내 수하물 2개 합계 7kg, 세 변 합 115cm 이내</li>
        <li>위탁 수하물 1개 20kg, 세 변 합 203cm 이내</li>
        <li>좌석 지정 무료 (Fast 구역 제외)</li>
        <li>변경 수수료 없음 (출발 1시간 전까지, 운임 차액은 부담)</li>
      </ul>
    </div>
  </div>

  <div class="sec">
    <h3>숙소</h3>
    <div class="box">
      <h4>호텔 마이스테이즈 나고야 니시키 <span class="ja sub-ja">{{ HOTEL.ja }}</span></h4>
      <dl class="facts spaced">
        <dt>주소</dt><dd class="ja">{{ HOTEL.addr }}</dd>
        <dt>전화</dt><dd class="mono">{{ HOTEL.tel }}</dd>
        <dt>시간</dt><dd>체크인 15:00 · 체크아웃 11:00</dd>
        <dt>역</dt><dd>사카에역 1번 출구 · 히사야오도리역 4번 출구 도보 3분</dd>
        <dt>조식</dt><dd>뷔페 06:30–09:30, 약 1,500엔</dd>
      </dl>
      <div class="actions">
        <MapLink query="ホテルマイステイズ名古屋錦 名古屋市中区錦3-8-21" solid />
        <TaxiButton :place="HOTEL" />
      </div>
    </div>
  </div>

  <div class="sec">
    <h3>출발 전 체크리스트<span class="prog">{{ doneCount }}/{{ CHECKLIST.length }}</span></h3>
    <div class="box">
      <ul class="check">
        <li v-for="c in CHECKLIST" :key="c.id">
          <label :for="'c-' + c.id">
            <input :id="'c-' + c.id" v-model="checked[c.id]" type="checkbox">
            <span>{{ c.title }}<small>{{ c.detail }}</small></span>
          </label>
        </li>
      </ul>
    </div>
  </div>

  <div class="sec">
    <h3>교통 요금</h3>
    <div class="box">
      <table class="tbl">
        <tbody>
          <tr v-for="[name, fare] in fares" :key="name"><td>{{ name }}</td><td>{{ fare }}</td></tr>
        </tbody>
      </table>
    </div>
    <div class="box">
      <ul>
        <li>나고야 지하철은 2026년 9월부터 전 역에서 신용카드 터치 승차 가능 (Visa·Master·JCB 등)</li>
        <li>Suica·PASMO 등 교통 IC 카드도 그대로 쓸 수 있어요</li>
        <li>이 일정은 하루 지하철 이용이 2–3번이라 1일권보다 카드 터치가 더 싸요</li>
        <li>3명이면 짧은 거리는 택시 1대가 지하철과 큰 차이가 없고 훨씬 편해요</li>
      </ul>
    </div>
  </div>

  <div class="sec">
    <h3>여행 기간 나고야 행사</h3>
    <div class="box">
      <table class="tbl">
        <tbody>
          <tr v-for="[name, when] in events" :key="name"><td>{{ name }}</td><td>{{ when }}</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="sec">
    <h3>날씨와 쇼핑</h3>
    <div class="box">
      <ul>
        <li>평년 기온 낮 24℃ · 밤 16℃. 반팔에 얇은 겉옷</li>
        <li>10월 초는 태풍이 올 수 있어요. 출발 전 예보 확인</li>
        <li>면세는 같은 가게·같은 날 5,000엔 이상, 여권 실물 필요. 소모품 봉투는 출국 전까지 개봉 금지</li>
        <li>비 오는 날 대안: 도요타 산업기술기념관 (성인 1,000엔 · 65세 이상 600엔, 9:30–17:00, 월요일 휴관)</li>
      </ul>
      <div class="actions top-gap">
        <MapLink query="トヨタ産業技術記念館" />
      </div>
    </div>
  </div>

  <div class="sec">
    <h3>긴급 연락처</h3>
    <div class="box">
      <table class="tbl">
        <tbody>
          <tr v-for="[name, tel] in contacts" :key="name"><td>{{ name }}</td><td>{{ tel }}</td></tr>
        </tbody>
      </table>
      <p class="note consulate">총영사관 주소: <span class="ja">名古屋市中村区名駅南1-19-12</span></p>
      <div class="actions">
        <MapLink query="駐名古屋大韓民国総領事館" />
      </div>
    </div>
  </div>
</template>
