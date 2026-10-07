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
} satisfies Record<string, Photo>
