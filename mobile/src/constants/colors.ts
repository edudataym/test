/**
 * Color Constants for Wellness Butler
 * 영국 귀족 저택 테마 컬러
 */

export const Colors = {
  // Primary Colors - 주요 색상
  primary: {
    navy: '#1A2332', // Deep Navy - 고급스러운 네이비
    gold: '#D4AF37', // Gold - 귀족의 골드
    cream: '#F5F1E8', // Cream - 부드러운 크림색
    brown: '#8B4513', // Saddle Brown - 가죽 같은 브라운
  },

  // Text Colors - 텍스트 색상
  text: {
    primary: '#2C2C2C', // 주요 텍스트
    secondary: '#666666', // 보조 텍스트
    light: '#999999', // 연한 텍스트
    inverse: '#FFFFFF', // 반전 텍스트 (어두운 배경용)
    disabled: '#CCCCCC', // 비활성화 텍스트
  },

  // Background Colors - 배경 색상
  background: {
    default: '#F5F1E8', // 기본 배경 (크림)
    card: '#FFFFFF', // 카드 배경
    elevated: '#FAFAFA', // 약간 올라온 배경
    modal: 'rgba(0, 0, 0, 0.5)', // 모달 오버레이
  },

  // Status Colors - 상태 색상
  status: {
    success: '#4CAF50', // 성공 (녹색)
    warning: '#FF9800', // 경고 (주황)
    error: '#F44336', // 에러 (빨강)
    info: '#2196F3', // 정보 (파랑)
  },

  // Water Tracking - 수분 트래킹 관련
  water: {
    glass: '#4FC3F7', // 물잔 색상
    wave: '#29B6F6', // 물결 색상
    drop: '#03A9F4', // 물방울 색상
  },

  // Meal Tracking - 식사 트래킹 관련
  meal: {
    fiber: '#8BC34A', // 식이섬유 색상 (녹색)
    plate: '#F5F5DC', // 접시 색상 (베이지)
    food: '#FFA726', // 음식 색상 (주황)
  },

  // Noble Ranks - 귀족 작위 색상
  rank: {
    commoner: '#9E9E9E', // 평민 (회색)
    baron: '#A1887F', // 남작 (갈색)
    viscount: '#7E57C2', // 자작 (보라)
    earl: '#5C6BC0', // 백작 (파랑)
    duke: '#D4AF37', // 공작 (골드)
  },

  // Borders & Dividers - 테두리 & 구분선
  border: {
    light: '#E0E0E0',
    medium: '#BDBDBD',
    dark: '#757575',
  },

  // Shadows - 그림자 색상
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.2)',
    dark: 'rgba(0, 0, 0, 0.3)',
  },

  // Gradients - 그라데이션 (배열 형식)
  gradients: {
    gold: ['#D4AF37', '#C5A028', '#B6911A'], // 골드 그라데이션
    navy: ['#1A2332', '#2C3E50', '#34495E'], // 네이비 그라데이션
    water: ['#4FC3F7', '#29B6F6', '#039BE5'], // 물 그라데이션
    sunset: ['#FFB74D', '#FF9800', '#F57C00'], // 석양 그라데이션
  },
} as const;

// Type export for TypeScript
export type ColorPalette = typeof Colors;
