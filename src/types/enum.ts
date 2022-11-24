export const API_URL = {
  LOGIN: '/api/login',
  LOGOUT: '/api/logout',
  GET_ACCOUNT_LIST: '/api/accounts',
} as const;

export const ACCESS_TOKEN = 'accessToken';

export const NAVIGATE_URL = {
  MAIN: '/',
  LOGIN: '/login',
} as const;

export const QUERY_PARAM_KEYWORD = {
  PAGE: 'page',
  Q: 'q',
} as const;

export const SIDER = [
  { id: 1, name: '대시보드', keyword: 'dashboard' },
  { id: 2, name: '계좌 목록', keyword: 'accounts' },
  { id: 3, name: '사용자 목록', keyword: 'users' },
  { id: 9999, name: '로그아웃', keyword: 'logout' },
] as const;

export const ACCOUNT_COLUMN = [
  '고객명',
  '증권사',
  '계좌번호',
  '계좌상태',
  '계좌명',
  '평가금액',
  '입금금액',
  '계좌활성여부',
  '계좌개설일',
] as const;

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
export type BrokersFormatType =
  typeof BROKER_FORMAT[keyof typeof BROKER_FORMAT];
export type BrokerType = typeof BROKERS[keyof typeof BROKERS];
export type AccountStatus = typeof ACCOUNT_STATUS[keyof typeof ACCOUNT_STATUS];
