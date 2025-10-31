/**
 * Theme Configuration for Wellness Butler
 * 앱 전체의 테마 설정
 */

import { Colors } from '@constants/colors';

export const theme = {
  colors: Colors,

  // Typography - 타이포그래피
  typography: {
    fontFamily: {
      // 세리프 폰트 (우아한 제목용)
      serif: 'PlayfairDisplay-Regular',
      serifBold: 'PlayfairDisplay-Bold',
      serifItalic: 'PlayfairDisplay-Italic',

      // 산세리프 폰트 (본문용)
      sans: 'NotoSansKR-Regular',
      sansBold: 'NotoSansKR-Bold',
      sansMedium: 'NotoSansKR-Medium',
      sansLight: 'NotoSansKR-Light',
    },

    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
    },

    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8,
    },

    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  // Spacing - 간격
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },

  // Border Radius - 둥근 모서리
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },

  // Shadows - 그림자
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.25,
      shadowRadius: 24,
      elevation: 12,
    },
  },

  // Dimensions - 치수
  dimensions: {
    // Screen sizes
    screen: {
      xs: 320,
      sm: 375,
      md: 414,
      lg: 768,
      xl: 1024,
    },

    // Component sizes
    button: {
      heightSm: 32,
      heightMd: 44,
      heightLg: 56,
    },

    input: {
      height: 48,
    },

    icon: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 32,
      xl: 48,
    },

    avatar: {
      sm: 32,
      md: 48,
      lg: 64,
      xl: 96,
    },
  },

  // Animation - 애니메이션
  animation: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },

    easing: {
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },

  // Opacity - 투명도
  opacity: {
    disabled: 0.5,
    overlay: 0.6,
    pressed: 0.8,
  },
} as const;

// Type exports
export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeSpacing = keyof typeof theme.spacing;
export type ThemeFontSize = keyof typeof theme.typography.fontSize;

export default theme;
