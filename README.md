# 🤵 나의 귀족님 웰니스 집사 (My Lord's Wellness Butler)

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.72+-61dafb.svg)

> "바쁜 현대의 귀족님, 집사가 건강을 책임지겠습니다"

대영제국의 전통을 이어받은 귀족이지만, 현대 사회의 분주함 속에서 식습관이 흐트러진 사용자를 위한 AI 집사 앱입니다. 우아하고 품위있는 톤으로 수분·식이섬유 섭취를 관리하고 장 건강을 개선합니다.

---

## 📱 프로젝트 개요

**My Lord's Wellness Butler**는 건강 관리를 게임처럼 즐겁게 만드는 모바일 앱입니다. AI 집사 "Sebastian"이 귀족님의 건강을 우아하게 관리해드립니다.

### 🎯 핵심 가치

- **유머러스한 접근**: 민감한 건강 주제를 우아하게 포장
- **AI 기반 개인화**: LLM을 활용한 맞춤형 건강 조언
- **게이미피케이션**: 귀족 작위 시스템으로 동기부여
- **현대인 공감**: 바쁜 일상 속 건강 관리의 어려움 이해

---

## 🚀 주요 기능

### 1. 🤵 AI 집사 "Sebastian"
- 영국식 집사 캐릭터로 공손하지만 단호한 건강 관리
- 상황별 맞춤형 대화 및 조언
- 우아한 표현으로 민감한 주제 다루기

### 2. 💧 수분 섭취 관리
- 정중한 알림으로 물 마시기 습관 형성
- 귀족 레벨 시스템 (Baron → Viscount → Earl → Duke)
- 차, 생수, 스파클링워터 등 음료별 분류 기록

### 3. 🥗 식이섬유 추적
- 음식 사진 촬영으로 섬유질 함량 자동 분석
- 집사의 우아한 식단 평가
- 섬유질 풍부한 식품 추천

### 4. 📔 배변 활동 일지
- 우아한 표현으로 민감한 기록 관리
- Bristol Stool Chart 기반 건강 분석
- 패턴 분석 후 맞춤형 식단 개선 제안

### 5. 📊 집사의 주간 보고서
- 매주 격식있는 건강 리포트
- 개선점과 칭찬을 우아하게 전달
- 데이터 기반 건강 인사이트

---

## 🛠️ 기술 스택

### Frontend (Mobile)
- **React Native** - 크로스 플랫폼 모바일 개발
- **TypeScript** - 타입 안정성
- **React Navigation** - 네비게이션
- **Redux Toolkit** - 상태 관리
- **React Native Reanimated** - 우아한 애니메이션

### Backend
- **Node.js + Express** - API 서버
- **PostgreSQL** - 데이터베이스
- **Prisma** - ORM
- **OpenAI API / Anthropic Claude** - AI 집사 대화

### Infrastructure
- **AWS / Firebase** - 클라우드 호스팅
- **React Native AsyncStorage** - 로컬 데이터 저장
- **Push Notifications** - 집사의 알림

---

## 📂 프로젝트 구조

```
wellness-butler/
├── docs/                    # 문서
│   ├── planning/           # 기획 문서
│   ├── design/             # 디자인 스펙
│   └── technical/          # 기술 문서
├── mobile/                 # React Native 앱
│   ├── src/
│   │   ├── components/    # 재사용 컴포넌트
│   │   ├── screens/       # 화면
│   │   ├── navigation/    # 네비게이션 설정
│   │   ├── services/      # API 통신
│   │   ├── store/         # Redux 상태 관리
│   │   ├── utils/         # 유틸리티
│   │   ├── assets/        # 이미지, 폰트
│   │   └── locales/       # 다국어 (한국어)
│   └── ...
├── backend/               # Node.js API 서버
│   ├── src/
│   │   ├── routes/       # API 라우트
│   │   ├── controllers/  # 컨트롤러
│   │   ├── services/     # 비즈니스 로직
│   │   ├── models/       # 데이터 모델
│   │   └── utils/        # 유틸리티
│   └── ...
└── README.md
```

---

## 🎨 디자인 가이드

### 컬러 팔레트
- **Primary**: `#1A2332` (Deep Navy)
- **Secondary**: `#D4AF37` (Gold)
- **Background**: `#F5F1E8` (Cream)
- **Accent**: `#8B4513` (Saddle Brown)
- **Text**: `#2C2C2C` (Dark Gray)

### 타이포그래피
- **제목**: 우아한 세리프체 (예: Playfair Display)
- **본문**: 깔끔한 산세리프 (예: Noto Sans KR)

### UI 요소
- 문장(紋章), 왁스 인장 아이콘
- 깃털 펜 인터페이스 요소
- 집사가 편지 전달하는 애니메이션

---

## 🎯 MVP 기능 (1차 출시)

- [x] 프로젝트 구조 설정
- [ ] AI 집사 챗봇 (기본 대화 + 건강 조언)
- [ ] 수분 섭취 기록 + 알림
- [ ] 식이섬유 수동 입력 기능
- [ ] 간단한 배변 활동 체크
- [ ] 주간 리포트
- [ ] 귀족 레벨 시스템

---

## 🎭 타겟 유저

- **연령대**: 20~40대 바쁜 직장인
- **페르소나**: 건강 관리 필요성은 느끼지만 재미가 없어서 작심삼일
- **선호도**: 유머러스한 접근을 좋아하는 사람들
- **문화**: 영국 문화, 집사 컨셉에 호감

---

## 📝 개발 로드맵

### Phase 1: MVP (1-2개월)
- 기본 집사 챗봇 구현
- 수분/식이섬유 트래킹
- 배변 일지 기록
- 주간 리포트

### Phase 2: 고도화 (3-4개월)
- 음식 사진 AI 분석
- 고급 건강 인사이트
- 소셜 기능 (친구와 경쟁)
- 더 풍부한 집사 대화

### Phase 3: 확장 (5-6개월)
- 웨어러블 기기 연동
- 프리미엄 구독 모델
- 커뮤니티 기능
- 다국어 지원 확대

---

## 🤝 기여하기

이 프로젝트는 현재 개발 초기 단계입니다. 기여를 원하시면 이슈를 열어주세요.

---

## 📄 라이선스

TBD

---

## 👔 Contact

프로젝트 관련 문의: [Contact Information]

---

**"주인님, 건강한 하루 되시길 바랍니다." - Sebastian**
