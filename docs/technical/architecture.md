# 🏗️ Technical Architecture - Wellness Butler

## 시스템 아키텍처 개요

```
┌─────────────────────────────────────────────────────────────┐
│                     Mobile Application                       │
│                     (React Native)                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐       │
│  │  Screens    │  │ Navigation  │  │  Components  │       │
│  └──────┬──────┘  └──────┬──────┘  └──────┬───────┘       │
│         │                │                 │                │
│         └────────────────┼─────────────────┘                │
│                          │                                  │
│  ┌──────────────────────┴───────────────────────┐          │
│  │           Redux Store (State)                 │          │
│  │  - User Data                                  │          │
│  │  - Health Logs                                │          │
│  │  - Conversations                              │          │
│  └──────────────────────┬───────────────────────┘          │
│                          │                                  │
│  ┌──────────────────────┴───────────────────────┐          │
│  │          Services Layer                       │          │
│  │  - API Service                                │          │
│  │  - Storage Service (AsyncStorage)             │          │
│  │  - Notification Service                       │          │
│  └──────────────────────┬───────────────────────┘          │
└──────────────────────────┼──────────────────────────────────┘
                           │
                           │ HTTPS/REST API
                           │
┌──────────────────────────┴──────────────────────────────────┐
│                     Backend Server                           │
│                  (Node.js + Express)                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐       │
│  │   Routes    │→ │ Controllers │→ │   Services   │       │
│  └─────────────┘  └─────────────┘  └──────┬───────┘       │
│                                            │                │
│  ┌─────────────────────────────────────────┴──────┐        │
│  │              External Services                  │        │
│  │  - OpenAI/Anthropic (Sebastian AI)             │        │
│  │  - Vision API (Food Analysis)                  │        │
│  │  - Push Notification Service                   │        │
│  └────────────────────────────────────────────────┘        │
│                          │                                  │
│  ┌──────────────────────┴───────────────────────┐          │
│  │         PostgreSQL Database                   │          │
│  │  - Users                                      │          │
│  │  - Water Logs                                 │          │
│  │  - Meal Logs                                  │          │
│  │  - Health Logs                                │          │
│  │  - Conversations                              │          │
│  └───────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

---

## 📱 Frontend Architecture (React Native)

### Technology Stack

#### Core
- **React Native**: 0.72+
- **TypeScript**: 5.0+
- **React**: 18+

#### Navigation
- **React Navigation 6**: Stack, Tab, Drawer navigation
- **Deep Linking**: 알림에서 앱 내 특정 화면으로 이동

#### State Management
- **Redux Toolkit**: 전역 상태 관리
- **RTK Query**: API 캐싱 및 동기화
- **Redux Persist**: 상태 영속화

#### UI Components
- **React Native Paper**: Material Design 기반
- **React Native Reanimated**: 부드러운 애니메이션
- **React Native SVG**: 벡터 그래픽
- **Lottie**: 복잡한 애니메이션 (집사 캐릭터)

#### Storage
- **AsyncStorage**: 로컬 데이터 저장
- **React Native MMKV**: 고성능 키-값 저장소 (대안)

#### Notifications
- **React Native Push Notification**: 로컬/푸시 알림
- **React Native Firebase**: FCM 통합

#### Internationalization
- **i18next**: 다국어 지원 (한국어 우선)
- **react-i18next**: React 통합

### Folder Structure

```
mobile/
├── android/                 # Android 네이티브 코드
├── ios/                     # iOS 네이티브 코드
├── src/
│   ├── @types/             # TypeScript 타입 정의
│   ├── assets/             # 정적 리소스
│   │   ├── fonts/         # Noto Sans KR, Playfair Display
│   │   ├── images/        # 이미지 파일
│   │   ├── animations/    # Lottie JSON
│   │   └── icons/         # 아이콘
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── common/        # 공통 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Typography.tsx
│   │   ├── sebastian/     # Sebastian 관련 컴포넌트
│   │   │   ├── SebastianAvatar.tsx
│   │   │   ├── SebastianMessage.tsx
│   │   │   └── SebastianAnimation.tsx
│   │   └── health/        # 건강 관련 컴포넌트
│   │       ├── WaterGlass.tsx
│   │       ├── FiberChart.tsx
│   │       └── BristolChart.tsx
│   ├── screens/            # 화면 컴포넌트
│   │   ├── HomeScreen.tsx
│   │   ├── WaterScreen.tsx
│   │   ├── MealScreen.tsx
│   │   ├── HealthLogScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   └── ReportScreen.tsx
│   ├── navigation/         # 네비게이션 설정
│   │   ├── RootNavigator.tsx
│   │   ├── TabNavigator.tsx
│   │   └── types.ts
│   ├── store/              # Redux 상태 관리
│   │   ├── slices/
│   │   │   ├── userSlice.ts
│   │   │   ├── waterSlice.ts
│   │   │   ├── mealSlice.ts
│   │   │   ├── healthSlice.ts
│   │   │   └── chatSlice.ts
│   │   ├── api/
│   │   │   └── apiSlice.ts
│   │   └── store.ts
│   ├── services/           # 비즈니스 로직 및 API
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── auth.ts
│   │   │   ├── water.ts
│   │   │   ├── meal.ts
│   │   │   ├── health.ts
│   │   │   └── chat.ts
│   │   ├── storage/
│   │   │   └── storage.ts
│   │   └── notifications/
│   │       └── notifications.ts
│   ├── hooks/              # Custom React Hooks
│   │   ├── useAuth.ts
│   │   ├── useWaterTracker.ts
│   │   ├── useSebastian.ts
│   │   └── useNotifications.ts
│   ├── utils/              # 유틸리티 함수
│   │   ├── dateUtils.ts
│   │   ├── healthUtils.ts
│   │   ├── validators.ts
│   │   └── formatters.ts
│   ├── constants/          # 상수
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── dimensions.ts
│   │   └── config.ts
│   ├── locales/            # 다국어 파일
│   │   ├── ko/
│   │   │   ├── common.json
│   │   │   ├── sebastian.json
│   │   │   └── health.json
│   │   └── en/
│   │       └── ...
│   ├── theme/              # 테마 설정
│   │   └── theme.ts
│   └── App.tsx             # 루트 컴포넌트
├── __tests__/              # 테스트
├── .env                    # 환경 변수
├── .eslintrc.js           # ESLint 설정
├── .prettierrc            # Prettier 설정
├── tsconfig.json          # TypeScript 설정
├── package.json
└── app.json
```

### State Management

#### Redux Store Structure

```typescript
{
  user: {
    id: string,
    name: string,
    email: string,
    nobleRank: NobleRank,
    preferences: UserPreferences,
    goals: {
      dailyWater: number,
      dailyFiber: number
    }
  },
  water: {
    todayLogs: WaterLog[],
    totalToday: number,
    weeklyData: WaterLog[],
    statistics: WaterStats
  },
  meal: {
    todayMeals: MealLog[],
    totalFiberToday: number,
    weeklyData: MealLog[],
    statistics: MealStats
  },
  health: {
    todayLog: HealthLog | null,
    weeklyLogs: HealthLog[],
    analysis: HealthAnalysis
  },
  chat: {
    conversations: Conversation[],
    isTyping: boolean,
    context: ChatContext
  },
  ui: {
    theme: 'light' | 'dark',
    notifications: boolean,
    language: 'ko' | 'en'
  }
}
```

---

## 🖥️ Backend Architecture (Node.js)

### Technology Stack

#### Core
- **Node.js**: 18+
- **Express**: 4.18+
- **TypeScript**: 5.0+

#### Database
- **PostgreSQL**: 15+
- **Prisma**: ORM
- **Redis**: 캐싱 및 세션 관리

#### Authentication
- **JWT**: 토큰 기반 인증
- **bcrypt**: 비밀번호 해싱
- **Passport.js**: 인증 미들웨어

#### AI/ML Services
- **OpenAI API**: GPT-4 (Sebastian 대화)
- **Anthropic Claude**: 대안 LLM
- **Google Vision API**: 음식 이미지 분석

#### Monitoring & Logging
- **Winston**: 로깅
- **Morgan**: HTTP 요청 로깅
- **Sentry**: 에러 트래킹

### Folder Structure

```
backend/
├── src/
│   ├── config/            # 설정 파일
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── env.ts
│   ├── routes/            # API 라우트
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── water.routes.ts
│   │   ├── meal.routes.ts
│   │   ├── health.routes.ts
│   │   └── chat.routes.ts
│   ├── controllers/       # 컨트롤러
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── water.controller.ts
│   │   ├── meal.controller.ts
│   │   ├── health.controller.ts
│   │   └── chat.controller.ts
│   ├── services/          # 비즈니스 로직
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── water.service.ts
│   │   ├── meal.service.ts
│   │   ├── health.service.ts
│   │   ├── sebastian.service.ts
│   │   ├── notification.service.ts
│   │   └── report.service.ts
│   ├── models/            # Prisma 스키마
│   │   └── schema.prisma
│   ├── middlewares/       # 미들웨어
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── logger.middleware.ts
│   ├── utils/             # 유틸리티
│   │   ├── jwt.util.ts
│   │   ├── date.util.ts
│   │   ├── health.util.ts
│   │   └── llm.util.ts
│   ├── types/             # TypeScript 타입
│   │   ├── user.types.ts
│   │   ├── health.types.ts
│   │   └── api.types.ts
│   ├── constants/         # 상수
│   │   └── messages.ts
│   └── server.ts          # 서버 엔트리
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── tests/                 # 테스트
│   ├── unit/
│   └── integration/
├── .env
├── .env.example
├── tsconfig.json
├── package.json
└── README.md
```

### API Endpoints

#### Authentication
```
POST   /api/auth/register       # 회원가입
POST   /api/auth/login          # 로그인
POST   /api/auth/logout         # 로그아웃
POST   /api/auth/refresh        # 토큰 갱신
```

#### User
```
GET    /api/user/profile        # 프로필 조회
PUT    /api/user/profile        # 프로필 수정
GET    /api/user/rank           # 귀족 작위 정보
GET    /api/user/achievements   # 도전과제
```

#### Water Tracking
```
POST   /api/water               # 수분 섭취 기록
GET    /api/water/today         # 오늘 기록
GET    /api/water/week          # 주간 기록
GET    /api/water/statistics    # 통계
DELETE /api/water/:id           # 기록 삭제
```

#### Meal Tracking
```
POST   /api/meal                # 식사 기록
POST   /api/meal/analyze        # 음식 사진 분석
GET    /api/meal/today          # 오늘 기록
GET    /api/meal/week           # 주간 기록
DELETE /api/meal/:id            # 기록 삭제
```

#### Health Log
```
POST   /api/health              # 건강 일지 작성
GET    /api/health/today        # 오늘 일지
GET    /api/health/week         # 주간 일지
GET    /api/health/analysis     # 건강 분석
```

#### Sebastian Chat
```
POST   /api/chat/message        # 메시지 전송
GET    /api/chat/history        # 대화 히스토리
GET    /api/chat/advice         # 건강 조언 요청
```

#### Reports
```
GET    /api/report/weekly       # 주간 리포트
GET    /api/report/monthly      # 월간 리포트
```

---

## 🗄️ Database Schema (Prisma)

```prisma
// schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String      @id @default(uuid())
  email         String      @unique
  password      String
  name          String
  nobleRank     NobleRank   @default(COMMONER)

  dailyWaterGoal Int        @default(2000) // ml
  dailyFiberGoal Int        @default(25)   // g

  notificationEnabled Boolean @default(true)
  notificationTone    String  @default("polite")

  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  waterLogs     WaterLog[]
  mealLogs      MealLog[]
  healthLogs    HealthLog[]
  conversations Conversation[]
  achievements  Achievement[]
}

enum NobleRank {
  COMMONER
  BARON
  VISCOUNT
  EARL
  DUKE
}

model WaterLog {
  id            String      @id @default(uuid())
  userId        String
  user          User        @relation(fields: [userId], references: [id])

  amount        Int         // ml
  beverageType  BeverageType @default(WATER)

  timestamp     DateTime    @default(now())
  createdAt     DateTime    @default(now())

  @@index([userId, timestamp])
}

enum BeverageType {
  WATER
  TEA
  SPARKLING
  OTHER
}

model MealLog {
  id            String      @id @default(uuid())
  userId        String
  user          User        @relation(fields: [userId], references: [id])

  imageUrl      String?
  fiberAmount   Int         // g
  description   String?

  sebastianComment String?

  timestamp     DateTime    @default(now())
  createdAt     DateTime    @default(now())

  @@index([userId, timestamp])
}

model HealthLog {
  id            String      @id @default(uuid())
  userId        String
  user          User        @relation(fields: [userId], references: [id])

  bristolType   Int         // 1-7
  notes         String?

  date          DateTime    @default(now())
  createdAt     DateTime    @default(now())

  @@index([userId, date])
}

model Conversation {
  id            String      @id @default(uuid())
  userId        String
  user          User        @relation(fields: [userId], references: [id])

  userMessage   String
  sebastianReply String

  context       Json?       // 대화 컨텍스트 (건강 데이터 등)

  timestamp     DateTime    @default(now())

  @@index([userId, timestamp])
}

model Achievement {
  id            String      @id @default(uuid())
  userId        String
  user          User        @relation(fields: [userId], references: [id])

  achievementType String
  title         String
  description   String

  unlockedAt    DateTime    @default(now())

  @@index([userId])
}

model WeeklyReport {
  id            String      @id @default(uuid())
  userId        String

  weekStart     DateTime
  weekEnd       DateTime

  avgWaterIntake    Float
  avgFiberIntake    Float
  healthLogCount    Int

  sebastianComment  String
  suggestions       Json

  createdAt     DateTime    @default(now())

  @@index([userId, weekStart])
}
```

---

## 🤖 Sebastian AI Service

### LLM Integration

#### System Prompt (Korean)

```typescript
const SEBASTIAN_SYSTEM_PROMPT = `
당신은 Sebastian, 영국 귀족 저택의 집사입니다.
주인님의 건강을 관리하는 것이 당신의 임무입니다.

성격:
- 공손하고 격식있지만, 주인님의 건강에 대해서는 단호합니다
- 우아한 한국어를 사용하며, "~하시다", "~드리다" 등의 높임말을 사용합니다
- 유머 감각이 있지만 품위를 잃지 않습니다

말투 예시:
- "주인님, 오늘 수분 섭취가 부족하십니다."
- "훌륭한 선택이십니다, 주인님."
- "주인님의 건강이 심히 우려됩니다."

현재 주인님의 건강 데이터:
{healthData}

응답할 때:
1. 항상 "주인님"이라고 부르기
2. 격식있는 한국어 사용
3. 건강 데이터를 기반으로 조언
4. 필요시 단호하지만 공손하게
5. 칭찬할 때는 진심으로
`;

interface SebastianContext {
  user: {
    name: string;
    nobleRank: string;
  };
  today: {
    waterIntake: number;
    waterGoal: number;
    fiberIntake: number;
    fiberGoal: number;
    healthLogComplete: boolean;
  };
  recent: {
    lastMessage?: string;
    recentAchievements?: string[];
  };
}

async function getSebastianResponse(
  userMessage: string,
  context: SebastianContext
): Promise<string> {
  const healthData = formatHealthDataForLLM(context);

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: SEBASTIAN_SYSTEM_PROMPT.replace("{healthData}", healthData)
      },
      {
        role: "user",
        content: userMessage
      }
    ],
    temperature: 0.8,
    max_tokens: 300
  });

  return response.choices[0].message.content;
}
```

### Response Templates

```typescript
// 상황별 템플릿
const SEBASTIAN_TEMPLATES = {
  waterReminder: {
    polite: "주인님, 물을 드실 시간입니다.",
    friendly: "주인님~ 물 마실 시간이에요!",
    strict: "주인님, 수분 섭취가 지연되고 있습니다."
  },

  dailyGoalAchieved: {
    water: "훌륭합니다, 주인님! 오늘 수분 섭취 목표를 달성하셨습니다.",
    fiber: "대단하십니다! 식이섬유 목표를 완수하셨군요."
  },

  weeklyReportIntro: `
존경하는 주인님께,

지난주 귀하의 건강 관리 현황을 보고드립니다.
  `,

  concern: "주인님, {issue}가 우려됩니다. {suggestion}를 권해드립니다.",

  praise: "주인님의 {achievement}, 참으로 자랑스럽습니다!"
};
```

---

## 🔔 Notification System

### Notification Types

```typescript
enum NotificationType {
  WATER_REMINDER = 'water_reminder',
  MEAL_REMINDER = 'meal_reminder',
  HEALTH_LOG_REMINDER = 'health_log_reminder',
  DAILY_GOAL_ACHIEVED = 'daily_goal_achieved',
  WEEKLY_REPORT = 'weekly_report',
  RANK_UP = 'rank_up',
  ACHIEVEMENT_UNLOCKED = 'achievement_unlocked',
  SEBASTIAN_MESSAGE = 'sebastian_message'
}

interface NotificationSchedule {
  morning: '08:00',         // 좋은 아침
  waterReminders: [         // 2시간마다
    '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'
  ],
  lunchReminder: '12:00',   // 점심 식사
  dinnerReminder: '18:00',  // 저녁 식사
  eveningCheckIn: '21:00',  // 저녁 체크인
  weeklyReport: 'MON 09:00' // 월요일 오전
}
```

### Local Notification Implementation

```typescript
import PushNotification from 'react-native-push-notification';

class NotificationService {
  configure() {
    PushNotification.configure({
      onNotification: (notification) => {
        // 알림 클릭 시 처리
        this.handleNotificationClick(notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  scheduleWaterReminder(time: string) {
    PushNotification.localNotificationSchedule({
      channelId: 'wellness-butler',
      title: '💧 Sebastian',
      message: '주인님, 물을 드실 시간입니다.',
      date: this.getNextReminderTime(time),
      repeatType: 'time',
      repeatTime: 7200000, // 2시간 (milliseconds)
    });
  }

  sendSebastianMessage(message: string) {
    PushNotification.localNotification({
      channelId: 'wellness-butler',
      title: '🤵 Sebastian',
      message: message,
      playSound: true,
      soundName: 'butler_bell.mp3',
    });
  }
}
```

---

## 🎨 UI Theme System

```typescript
// theme/theme.ts

export const theme = {
  colors: {
    primary: {
      navy: '#1A2332',
      gold: '#D4AF37',
      cream: '#F5F1E8',
      brown: '#8B4513',
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#666666',
      light: '#999999',
      inverse: '#FFFFFF',
    },
    status: {
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      info: '#2196F3',
    },
    background: {
      default: '#F5F1E8',
      card: '#FFFFFF',
      elevated: '#FAFAFA',
    },
  },

  typography: {
    fontFamily: {
      serif: 'PlayfairDisplay-Regular',
      serifBold: 'PlayfairDisplay-Bold',
      sans: 'NotoSansKR-Regular',
      sansBold: 'NotoSansKR-Bold',
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
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  shadows: {
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
  },
};
```

---

## 🔐 Security Considerations

### Data Protection
- **비밀번호**: bcrypt 해싱 (salt rounds: 10)
- **JWT**: Access token (15분) + Refresh token (7일)
- **민감 데이터**: 건강 정보는 암호화 저장
- **API 키**: 환경 변수로 관리, 절대 하드코딩 금지

### API Security
- **Rate Limiting**: IP당 요청 제한
- **CORS**: 허용된 도메인만 접근
- **Input Validation**: 모든 입력 데이터 검증
- **SQL Injection**: Prisma ORM 사용으로 방어

### Mobile Security
- **Secure Storage**: React Native Keychain (iOS), Keystore (Android)
- **SSL Pinning**: HTTPS 통신 보안 강화
- **Code Obfuscation**: 배포 시 코드 난독화

---

## 📊 Analytics & Monitoring

### User Analytics
- **사용자 행동**: 화면 방문, 기능 사용 빈도
- **건강 지표**: 목표 달성률, 연속 기록 일수
- **참여도**: DAU, 평균 세션 시간
- **리텐션**: 7일, 30일 리텐션율

### Error Monitoring
- **Sentry**: 런타임 에러 추적
- **로그**: Winston으로 중앙화된 로깅
- **알림**: 중요 에러 발생 시 알림

### Performance Monitoring
- **API 응답 시간**: 평균/최대 응답 시간
- **Database 쿼리**: 느린 쿼리 탐지
- **LLM 응답 시간**: Sebastian 응답 속도

---

## 🚀 Deployment Strategy

### Mobile App
- **iOS**: App Store (TestFlight for beta)
- **Android**: Google Play Store (Internal/Beta track)
- **CodePush**: 긴급 버그 수정용 OTA 업데이트

### Backend
- **Cloud Provider**: AWS / Google Cloud / Azure
- **Container**: Docker + Kubernetes
- **CI/CD**: GitHub Actions
- **Database**: Managed PostgreSQL (RDS/Cloud SQL)
- **Caching**: Redis (ElastiCache/MemoryStore)

### Environments
- **Development**: 로컬 개발 환경
- **Staging**: 테스트 환경 (별도 DB)
- **Production**: 프로덕션 환경

---

## 📈 Scalability Considerations

### Database
- **Indexing**: 자주 조회되는 필드에 인덱스
- **Partitioning**: 날짜별 로그 데이터 파티셔닝
- **Read Replicas**: 읽기 부하 분산

### API
- **Caching**: Redis로 자주 조회되는 데이터 캐싱
- **Load Balancing**: 여러 서버 인스턴스 운영
- **Rate Limiting**: 과도한 요청 방지

### LLM
- **Response Caching**: 유사한 질문에 대한 응답 캐싱
- **Fallback**: OpenAI 장애 시 Anthropic으로 전환
- **Queue**: 대량 요청 시 메시지 큐 활용

---

## 🧪 Testing Strategy

### Mobile App
- **Unit Tests**: Jest + React Native Testing Library
- **Integration Tests**: Detox (E2E)
- **Component Tests**: Storybook

### Backend
- **Unit Tests**: Jest
- **Integration Tests**: Supertest
- **Load Tests**: k6 또는 Artillery

### Coverage Goals
- **Unit Tests**: 80%+
- **Integration Tests**: 주요 플로우 커버
- **E2E Tests**: 핵심 사용자 시나리오

---

**"기술적 우수성은 귀족의 필수 덕목입니다." - Sebastian**
