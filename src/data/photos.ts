// 위키미디어 커먼즈 사진. 960px로 줄여 public/photos에 저장했고, 원본과 라이선스는 source 링크에서 확인할 수 있다
import type { Photo } from '../types'

const base = import.meta.env.BASE_URL + 'photos/'

export const PHOTOS = {
  mirai: { src: base + 'mirai.jpg', author: 'Brücke-Osteuropa', license: 'CC0', licenseUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en', source: 'https://commons.wikimedia.org/wiki/File:Nagoya_TV_Tower_4.JPG' },
  oasis: { src: base + 'oasis.jpg', author: 'Emran Kassim', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0', source: 'https://commons.wikimedia.org/wiki/File:Nagoya_TV_Tower_%26_Oasis_21_(3279104534).jpg' },
  castle: { src: base + 'castle.jpg', author: 'Tomio344456', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', source: 'https://commons.wikimedia.org/wiki/File:Main_Tower_Keep_in_Meijo_Park,_Hommaru_Naka_Ward_Nagoya_2021.jpg' },
  kinshachi: { src: base + 'kinshachi.jpg', author: 'Bariston', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', source: 'https://commons.wikimedia.org/wiki/File:Kinshachi_Yokocho.jpg' },
  atsuta: { src: base + 'atsuta.jpg', author: 'Bariston', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', source: 'https://commons.wikimedia.org/wiki/File:Atsuta_Shrine.jpg' },
  osu: { src: base + 'osu.jpg', author: 'Bariston', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', source: 'https://commons.wikimedia.org/wiki/File:Osu1.JPG' },
  osukannon: { src: base + 'osukannon.jpg', author: 'Asturio Cantabrio', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', source: 'https://commons.wikimedia.org/wiki/File:Osu_Kannon_main_hall_2025-02_ac_(1).jpg' },
  hirugano: { src: base + 'hirugano.jpg', author: 'KAMUI', license: 'CC BY-SA 3.0', licenseUrl: 'http://creativecommons.org/licenses/by-sa/3.0/', source: 'https://commons.wikimedia.org/wiki/File:Hirugano-kogen-SA.jpg' },
  shirakawago: { src: base + 'shirakawago.jpg', author: 'DimiTalen', license: 'CC0', licenseUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en', source: 'https://commons.wikimedia.org/wiki/File:Overview_of_Ogimachi,_Shirakawa,_from_the_Ogimachi_Castle_observation_point.jpg' },
  takayama: { src: base + 'takayama.jpg', author: 'Sjaak Kempe', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0', source: 'https://commons.wikimedia.org/wiki/File:20131010_22_Takayama_-_Autumn_festival_(10491439093).jpg' },
  gujo: { src: base + 'gujo.jpg', author: 'Asturio Cantabrio', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', source: 'https://commons.wikimedia.org/wiki/File:Gujo-Hachiman_Yoshida_River_2019-08_ac.jpg' },
  yamachan: { src: base + 'yamachan.jpg', author: 'Nissy-KITAQ', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', source: 'https://commons.wikimedia.org/wiki/File:Sekai_no_Yamachan_tebasaki.JPG', example: '세카이노 야마짱 다른 지점의 데바사키 사진이에요' },
  tebasaki: { src: base + 'tebasaki.jpg', author: 'Geographer', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', source: 'https://commons.wikimedia.org/wiki/File:Nagoya_chicken_wings.jpg', example: '고미토리가 아닌 다른 가게의 데바사키 사진이에요' },
  hobamiso: { src: base + 'hobamiso.jpg', author: 'Gofukuji', license: 'CC0', licenseUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en', source: 'https://commons.wikimedia.org/wiki/File:Hida_beef_with_Hoba-miso.jpg', example: '하쿠스이엔이 아닌 다른 가게의 히다규 호바미소 사진이에요' },
  yamamotoya: { src: base + 'yamamotoya.jpg', author: 'Asturio Cantabrio', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', source: 'https://commons.wikimedia.org/wiki/File:Yamamotoya_Sohonke_Misonikomi_Udon_2020-11_ac.jpg', example: '야마모토야 소혼케 다른 지점의 미소니코미 우동 사진이에요' },
  yabaton: { src: base + 'yabaton.jpg', author: 'Akahito Yamabe', license: 'CC0', licenseUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en', source: 'https://commons.wikimedia.org/wiki/File:Yabaton%27s_misokatsu_%EF%BC%88Nagoya_soul_food%EF%BC%89.jpg' },
  maruha: { src: base + 'maruha.jpg', author: 'Kanesue', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0', source: 'https://commons.wikimedia.org/wiki/File:%E3%81%BE%E3%82%8B%E3%81%AF%E9%A3%9F%E5%A0%82_-_13993916259.jpg', example: '마루하 식당 사진이지만 공항점인지는 확인하지 못했어요' },
} satisfies Record<string, Photo>
