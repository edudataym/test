# 📱 Wellness Butler Mobile App

React Native 기반 모바일 앱

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- React Native development environment
- iOS: Xcode 14+
- Android: Android Studio

### Installation

```bash
# Install dependencies
npm install

# iOS only
cd ios && pod install && cd ..
```

### Running

```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 📂 Project Structure

```
src/
├── @types/          # TypeScript types
├── assets/          # Images, fonts, animations
├── components/      # Reusable components
├── screens/         # Screen components
├── navigation/      # Navigation configuration
├── store/           # Redux state management
├── services/        # API and services
├── hooks/           # Custom hooks
├── utils/           # Utility functions
├── constants/       # Constants
├── theme/           # Theme configuration
└── locales/         # i18n translations
```

## 🛠️ Tech Stack

- React Native 0.72+
- TypeScript
- React Navigation 6
- Redux Toolkit
- React Native Paper
- i18next

## 📝 Development

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format

# Run tests
npm test
```

## 🎨 Design System

Colors, typography, and components follow the design specifications in `/docs/design/`.

## 🌐 Localization

Currently supports Korean (ko). Translations are in `src/locales/`.

---

**Built with ❤️ by Sebastian**
