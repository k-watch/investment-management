export const API_URL = {
  LOGIN: '/api/login',
  LOGOUT: '/api/logout',
  GET_ACCOUNT_LIST: '/api/accounts',
} as const;

export const ACCESS_TOKEN = 'accessToken';

export const NAVIGATE_URL = {
  LOGIN: '/login',
  ACCOUNT: '/accounts',
  USERS: '/users',
  USER: '/user',
} as const;

export const QUERY_PARAM_KEYWORD = {
  PAGE: 'page',
  Q: 'q',
} as const;

export const PAGE_LIMIT = 12;

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
