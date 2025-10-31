/**
 * i18n Configuration
 * Internationalization setup for Korean language
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import commonKo from './ko/common.json';
import sebastianKo from './ko/sebastian.json';
import healthKo from './ko/health.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'ko',
  fallbackLng: 'ko',
  resources: {
    ko: {
      common: commonKo,
      sebastian: sebastianKo,
      health: healthKo,
    },
  },
  ns: ['common', 'sebastian', 'health'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
