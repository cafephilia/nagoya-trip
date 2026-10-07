# 나고야 3박 4일

가족 3명의 나고야 3박 4일 여행 일정표입니다. 가까운 곳은 걸어 다니며 시장, 성, 상점가를 둘러봅니다.

사이트: https://cafephilia.github.io/nagoya-trip/

## 일정

| 날짜 | 주제 | 주요 일정 |
|---|---|---|
| 1일차 | 도착, 사카에의 밤 | 벤으로 김포 → 스카이허브 라운지 → 리무진 버스로 사카에 → 체크인 → 오카후지 히쓰마부시 → 미라이타워 → 오아시스21 |
| 2일차 | 시라카와고 · 다카야마 · 구조하치만 버스투어 | 08:00 미라이타워 출발 → 시라카와고 점심 → 다카야마 축제 → 구조하치만 → 고미토리 저녁 |
| 3일차 | 나고야성, 아쓰타 신궁, 오스, 사카에 | 나고야성·긴샤치요코초 → 아쓰타 신궁 → 오스 상점가 → 야바톤 본점 → 오아시스21 → 돈키호테 |
| 4일차 | 귀국 | 호텔 조식 → 리무진 버스로 공항 → 공항 새우튀김 정식 → 귀국 |

## 기능

- **날짜별 타임라인**: 일정 종류별 아이콘, 여행 당일에는 지금 할 일 표시
- **장소 상세**: 관광지 사진, 영업시간, 휴무일, 메뉴와 가격, 대안 장소, 구글 지도 링크
- **이동 방법 비교**: 도보·지하철·전철·버스·택시별 경로, 승강장·출구, 소요 시간, 요금
- **동선 지도**: 날짜마다 일정 순서대로 번호를 찍은 지도(OpenStreetMap)와 구글 지도 길찾기 버튼. 목록을 누르면 해당 일정 카드로 이동
- **출발 전 챙길 것**: 상단 버튼으로 여는 짐 목록 창. 체크 상태는 휴대폰에 저장
- **수하물 규정**: 공항 체크인·보안검색 카드와 정보 탭에서 여는 창. Peach 무료 수하물, 보조배터리, 액체, 반입 금지 물품, 귀국 면세 한도
- **맛집 탭**: SNS·유튜브에서 유명한 나고야 맛집 27곳(유튜버 추천 9곳 포함)을 종류·지역별로 걸러 보기
- **예약·대기 배지**: 식당·맛집 카드에 예약 필수, 예약 추천, 예약 불가, 줄 김 표시
- **메뉴판**: 식당·맛집 카드의 메뉴판 버튼을 누르면 메뉴·가격·설명·주문 팁을 아래에서 올라오는 창으로 표시
- **택시용 주소 카드**: 기사에게 보여줄 일본어 목적지를 크게 표시
- **정보 탭**: 항공권, 수하물 규정, 숙소, 출발 전 할 일, 처음 일본 여행 팁(접어서 표시), 교통 요금, 걸어서 가는 거리, 행사, 긴급 연락처
- **오프라인 지원**: 한 번 열면 일정·사진·메뉴판을 휴대폰에 저장해 인터넷 없이도 열림, 홈 화면에 추가 가능
- **편의 기능**: D-day 표시, 주소 해시로 날짜 탭 바로 열기(`#d1`–`#d4`, `#info`), 다크 모드

## 구조

```
src/
  data/trip.ts        일정, 항공편, 체크리스트, 여행 팁 데이터
  data/menus.json     식당 메뉴판 데이터
  data/foodspots.json SNS·유튜브 맛집 데이터
  data/photos.ts      관광지 사진과 출처
  types.ts            데이터 타입
  App.vue             상단 요약 카드, 하단 날짜 바, 탭 전환
  components/
    DayView.vue       하루 일정 헤더와 타임라인
    DayMap.vue        동선 지도 (Leaflet, 처음 펼칠 때 불러옴)
    PackSheet.vue     출발 전 챙길 것 창
    BaggageSheet.vue  수하물 규정 창
    TimelineItem.vue  일정 카드 (상세, 지도, 대안)
    WayList.vue       이동 방법 비교
    InfoView.vue      정보 탭
    TaxiCard.vue      택시용 주소 카드
    MenuSheet.vue     메뉴판 창
    FoodView.vue      맛집 탭
```

일정을 고칠 때는 `src/data/trip.ts`만 수정하면 됩니다. 이동 카드에 교통수단을 더하려면 해당 일정의 `ways` 배열에 항목을 추가합니다. 동선 지도에 장소를 넣으려면 일정에 `pos: POS.이름`을 붙이고, 새 장소는 `POS`에 좌표를 추가합니다.

## 개발

Vue 3 + TypeScript + Vite로 만들었고, Node 20.19 이상이 필요합니다.

```bash
npm install
npm run dev     # 로컬 개발 서버
npm run build   # 타입 검사 + dist 빌드
```

`main`에 push하면 GitHub Actions가 빌드해서 GitHub Pages에 배포합니다.

## 참고

- 정보 확인일은 2026-10-07입니다. 영업시간과 가격은 바뀔 수 있습니다.
- 지하철 시각과 운임은 Yahoo!路線情報(2026년 9–10월판), 도보 시간은 구글 지도 기준입니다.
- 택시 요금은 2025년 10월 개정 나고야 운임으로 계산한 추정치입니다.

## 사진 출처

관광지·식당·맛집 카드 사진은 위키미디어 커먼즈의 자유 라이선스 사진을 960px로 줄여 `public/photos`에 넣었습니다.

| 장소 | 작가 | 라이선스 | 원본 |
|---|---|---|---|
| 미라이타워 | Brücke-Osteuropa | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) | [Commons](https://commons.wikimedia.org/wiki/File:Nagoya_TV_Tower_4.JPG) |
| 오아시스21 | Emran Kassim | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Nagoya_TV_Tower_%26_Oasis_21_(3279104534).jpg) |
| 나고야성 | Tomio344456 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Main_Tower_Keep_in_Meijo_Park,_Hommaru_Naka_Ward_Nagoya_2021.jpg) |
| 긴샤치요코초 | Bariston | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Kinshachi_Yokocho.jpg) |
| 아쓰타 신궁 | Bariston | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Atsuta_Shrine.jpg) |
| 오스 상점가 | Bariston | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Osu1.JPG) |
| 오스 칸논 | Asturio Cantabrio | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Osu_Kannon_main_hall_2025-02_ac_(1).jpg) |
| 히루가노 고원 휴게소 | KAMUI | [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/) | [Commons](https://commons.wikimedia.org/wiki/File:Hirugano-kogen-SA.jpg) |
| 시라카와고 | DimiTalen | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) | [Commons](https://commons.wikimedia.org/wiki/File:Overview_of_Ogimachi,_Shirakawa,_from_the_Ogimachi_Castle_observation_point.jpg) |
| 가을 다카야마 마쓰리 | Sjaak Kempe | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:20131010_22_Takayama_-_Autumn_festival_(10491439093).jpg) |
| 구조하치만 | Asturio Cantabrio | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Gujo-Hachiman_Yoshida_River_2019-08_ac.jpg) |
| 세카이노 야마짱 (데바사키) | Nissy-KITAQ | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) | [Commons](https://commons.wikimedia.org/wiki/File:Sekai_no_Yamachan_tebasaki.JPG) |
| 고미토리 카드 (데바사키 예시) | Geographer | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) | [Commons](https://commons.wikimedia.org/wiki/File:Nagoya_chicken_wings.jpg) |
| 하쿠스이엔 카드 (호바미소 예시) | Gofukuji | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) | [Commons](https://commons.wikimedia.org/wiki/File:Hida_beef_with_Hoba-miso.jpg) |
| 야마모토야 소혼케 (미소니코미 우동) | Asturio Cantabrio | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Yamamotoya_Sohonke_Misonikomi_Udon_2020-11_ac.jpg) |
| 야바톤 (미소카츠) | Akahito Yamabe | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) | [Commons](https://commons.wikimedia.org/wiki/File:Yabaton%27s_misokatsu_%EF%BC%88Nagoya_soul_food%EF%BC%89.jpg) |
| 마루하 식당 | Kanesue | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:%E3%81%BE%E3%82%8B%E3%81%AF%E9%A3%9F%E5%A0%82_-_13993916259.jpg) |
| 맛집 · 미센 | Kanesue | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Misen_Taiwan_Ramen_20180929.jpg) |
| 맛집 · 노라덴 (미소오뎅 예시) | jetalone | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Miso_oden_by_jetalone_in_Mount_Takao,_Hachioji.jpg) |
| 맛집 · 오카후지 (히쓰마부시 예시) | akira yamada | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:%E3%81%B2%E3%81%A4%E3%81%BE%E3%81%B6%E3%81%97_(8866834170).jpg) |
| 맛집 · 요코이 | Asturio Cantabrio | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Ankake_Spaghetti_Yokoi_2021-08_ac.jpg) |
| 맛집 · 센쥬 | 円周率３パーセント | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Tenmusu_Senju_Kita_20161107.jpg) |
| 맛집 · 멘야 하나비 | LR0725 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Mazesoba_of_Menya_Hanabi.jpg) |
| 맛집 · 콘파루 | Lombroso | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) | [Commons](https://commons.wikimedia.org/wiki/File:Fried_prawn_sandwich,_at_Konparu_(2013.06.22).jpg) |
| 맛집 · 하브스 | bryan... | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:HARBS,_Nagoya,_Aichi,_Japan,_%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%89%E3%83%9E%E3%83%AD%E3%83%B3%E3%82%B1%E3%83%BC%E3%82%AD,_%E3%83%9E%E3%83%AD%E3%83%B3%E3%82%BF%E3%83%AB%E3%83%88,_%E3%83%9F%E3%83%AB%E3%82%AF%E3%83%AC%E3%83%BC%E3%83%97,_%E3%83%8F%E3%83%BC%E3%83%96%E3%82%B9,_%E6%A0%84%E6%9C%AC%E5%BA%97_(15869571285).jpg) |
| 맛집 · 킷사 마운틴 | Hiroaki Sakuma | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Kissa_Mountain%27s_Meat_Spa_in_Nagoya_2011.jpg) |
| 맛집 · 피요린 | Cyukon | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Piyorin.jpg) |
| 맛집 · 신스즈메 (당고 예시) | Ocdp | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) | [Commons](https://commons.wikimedia.org/wiki/File:Mitarashi_dango_001.jpg) |
| 맛집 · 키요메모치 총본가 | Gnsin | [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/) | [Commons](https://commons.wikimedia.org/wiki/File:Kiyomemochi_Sohonke.JPG) |
| 맛집 · 마코토야 (미소니코미 예시) | 円周率３パーセント | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Misonikomiudon_20201201-10.jpg) |
| 맛집 · 모치츠키안 (떡 예시) | Syced | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) | [Commons](https://commons.wikimedia.org/wiki/File:Mochi_with_kinako_and_sauce.jpg) |
| 맛집 · 마츠무라 (건물) | JKT-c | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) | [Commons](https://commons.wikimedia.org/wiki/File:Dai-Nagoya_Building_-_01.JPG) |
| 맛집 · 포파이 (정식 예시) | 円周率３パーセント | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Roast_katsu_%26_fried_salmon_set_20200522-02.jpg) |
| 맛집 · 아지사이 (완탕면 예시) | ジョンドウ | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:%E6%9D%A5%E6%9D%A5%E8%BB%92%E3%83%AF%E3%83%B3%E3%82%BF%E3%83%B3%E9%BA%BA.jpg) |
