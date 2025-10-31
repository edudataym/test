/**
 * App Configuration
 * 앱 전역 설정 상수
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: Number(process.env.API_TIMEOUT) || 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Health Goals - 건강 목표 기본값
export const HEALTH_GOALS = {
  DAILY_WATER_ML: 2000, // 일일 수분 섭취 목표 (ml)
  DAILY_FIBER_G: 25, // 일일 식이섬유 목표 (g)
  WEEKLY_LOG_DAYS: 7, // 주간 기록 목표 (일)
} as const;

// Noble Ranks - 귀족 작위
export enum NobleRank {
  COMMONER = 'COMMONER', // 평민
  BARON = 'BARON', // 남작
  VISCOUNT = 'VISCOUNT', // 자작
  EARL = 'EARL', // 백작
  DUKE = 'DUKE', // 공작
}

// Rank Requirements - 작위 승급 조건
export const RANK_REQUIREMENTS = {
  [NobleRank.COMMONER]: {
    daysRequired: 0,
    waterGoalDays: 0,
    fiberGoalDays: 0,
  },
  [NobleRank.BARON]: {
    daysRequired: 7,
    waterGoalDays: 7,
    fiberGoalDays: 0,
  },
  [NobleRank.VISCOUNT]: {
    daysRequired: 14,
    waterGoalDays: 14,
    fiberGoalDays: 7,
  },
  [NobleRank.EARL]: {
    daysRequired: 30,
    waterGoalDays: 30,
    fiberGoalDays: 20,
  },
  [NobleRank.DUKE]: {
    daysRequired: 60,
    waterGoalDays: 60,
    fiberGoalDays: 50,
  },
} as const;

// Beverage Types - 음료 종류
export enum BeverageType {
  WATER = 'WATER', // 물
  TEA = 'TEA', // 차
  SPARKLING = 'SPARKLING', // 탄산수
  OTHER = 'OTHER', // 기타
}

// Bristol Stool Scale - 브리스톨 대변 척도
export const BRISTOL_TYPES = [
  { type: 1, name: '단단한 덩어리', description: '견과류 같은 단단한 변' },
  { type: 2, name: '소시지 모양', description: '울퉁불퉁한 소시지 모양' },
  { type: 3, name: '균열이 있는 소시지', description: '표면에 균열이 있는 변' },
  { type: 4, name: '부드러운 소시지', description: '부드럽고 매끄러운 변' },
  { type: 5, name: '부드러운 덩어리', description: '경계가 선명한 부드러운 변' },
  { type: 6, name: '흐물흐물한', description: '가장자리가 불규칙한 변' },
  { type: 7, name: '액체 상태', description: '물처럼 묽은 변' },
] as const;

// Notification Settings - 알림 설정
export const NOTIFICATION_CONFIG = {
  WATER_REMINDER_INTERVAL: 2 * 60 * 60 * 1000, // 2시간 (ms)
  MORNING_TIME: '08:00',
  LUNCH_TIME: '12:00',
  DINNER_TIME: '18:00',
  EVENING_CHECKIN: '21:00',
  WEEKLY_REPORT_DAY: 1, // 월요일 (0: 일요일)
  WEEKLY_REPORT_TIME: '09:00',
} as const;

// Sebastian Tones - 집사 말투 스타일
export enum SebastianTone {
  POLITE = 'polite', // 격식있음
  FRIENDLY = 'friendly', // 친근함
  STRICT = 'strict', // 엄격함
}

// Achievement Types - 도전과제 종류
export const ACHIEVEMENTS = {
  PERFECT_DAY: {
    id: 'perfect_day',
    title: '완벽한 하루',
    description: '모든 건강 목표 달성',
  },
  WATER_MASTER: {
    id: 'water_master',
    title: '수분 마스터',
    description: '7일 연속 수분 섭취 목표 달성',
  },
  FIBER_NOBLE: {
    id: 'fiber_noble',
    title: '채식의 귀족',
    description: '식이섬유 목표 초과 달성 3일',
  },
  DILIGENT_RECORDER: {
    id: 'diligent_recorder',
    title: '성실한 기록자',
    description: '30일 연속 일지 작성',
  },
  SEBASTIAN_TRUST: {
    id: 'sebastian_trust',
    title: '집사의 신뢰',
    description: 'Sebastian과 100회 대화',
  },
} as const;

// App Info
export const APP_INFO = {
  NAME: '나의 귀족님 웰니스 집사',
  NAME_EN: "My Lord's Wellness Butler",
  VERSION: '0.1.0',
  SEBASTIAN_NAME: 'Sebastian',
  SUPPORT_EMAIL: 'support@wellnessbutler.com',
  PRIVACY_POLICY_URL: 'https://wellnessbutler.com/privacy',
  TERMS_URL: 'https://wellnessbutler.com/terms',
} as const;

// Storage Keys - AsyncStorage 키
export const STORAGE_KEYS = {
  USER_TOKEN: '@wellness_butler:user_token',
  USER_DATA: '@wellness_butler:user_data',
  WATER_LOGS: '@wellness_butler:water_logs',
  MEAL_LOGS: '@wellness_butler:meal_logs',
  HEALTH_LOGS: '@wellness_butler:health_logs',
  CONVERSATIONS: '@wellness_butler:conversations',
  SETTINGS: '@wellness_butler:settings',
  ONBOARDING_COMPLETE: '@wellness_butler:onboarding_complete',
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY_DATE: 'yyyy년 MM월 dd일',
  DISPLAY_TIME: 'HH:mm',
  DISPLAY_DATETIME: 'yyyy-MM-dd HH:mm',
  API_DATE: 'yyyy-MM-dd',
  API_DATETIME: "yyyy-MM-dd'T'HH:mm:ss",
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  UNAUTHORIZED: '로그인이 필요합니다.',
  NOT_FOUND: '요청하신 정보를 찾을 수 없습니다.',
  VALIDATION_ERROR: '입력 정보를 확인해주세요.',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
} as const;

export default {
  API_CONFIG,
  HEALTH_GOALS,
  NobleRank,
  RANK_REQUIREMENTS,
  BeverageType,
  BRISTOL_TYPES,
  NOTIFICATION_CONFIG,
  SebastianTone,
  ACHIEVEMENTS,
  APP_INFO,
  STORAGE_KEYS,
  DATE_FORMATS,
  ERROR_MESSAGES,
};
