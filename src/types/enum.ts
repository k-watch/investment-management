export const API_URL = {
  LOGIN: '/api/login',
  LOGOUT: '/api/logout',
} as const;

export const ACCESS_TOKEN = 'accessToken';

export const NAVIGATE_URL = {
  MAIN: '/',
  LOGIN: '/login',
} as const;

export const TITLE_TEXT = {
  MAIN: '전체차량',
  DETAIL: '차량상세',
} as const;

export const SEGMENT = {
  ALL: '전체',
  C: '소형',
  D: '중형',
  E: '대형',
  SUV: 'SUV',
} as const;

export const FUEL_TYPE = {
  gasoline: '가솔린',
  hybrid: '하이브리드',
  ev: '전기',
} as const;

export const DEFAULT_SEO = {
  title: '알티모빌리티 - 차량대여 서비스',
  description: '세상과 사람, 자동차의 교집합',
  canonical: 'http://www.raidea.io',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'http://www.raidea.io',
    title: '알티모빌리티 - 차량대여 서비스',
    site_name: '알티모빌리티 - 차량대여 서비스',
    images: [
      {
        url: 'https://static.wanted.co.kr/images/wdes/0_4.1efa9680.png',
        width: 1200,
        height: 630,
        alt: 'image',
      },
    ],
  },
} as const;

export type ApiUrlType = typeof API_URL[keyof typeof API_URL];
export type TitleTextType = typeof TITLE_TEXT[keyof typeof TITLE_TEXT];
export type SegmentType = keyof typeof SEGMENT;
export type FuelType = keyof typeof FUEL_TYPE;
