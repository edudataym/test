# 🎨 UI/UX Design Specifications

## 디자인 철학

**"우아함과 기능성의 조화"**

웰니스 집사 앱은 영국 귀족 저택의 품격과 현대적 사용성을 결합합니다. 사용자는 Sebastian 집사와의 상호작용을 통해 건강 관리를 즐겁고 우아하게 경험합니다.

---

## 🎨 Color Palette

### Primary Colors

```
Navy (네이비)    #1A2332  ███████  주요 UI 요소, 헤더
Gold (골드)      #D4AF37  ███████  강조, CTA 버튼, 작위
Cream (크림)     #F5F1E8  ███████  배경, 카드
Brown (브라운)   #8B4513  ███████  보조 강조
```

### Text Colors

```
Primary          #2C2C2C  ███████  본문 텍스트
Secondary        #666666  ███████  보조 텍스트
Light            #999999  ███████  비활성화 텍스트
Inverse          #FFFFFF  ███████  어두운 배경용
```

### Status Colors

```
Success          #4CAF50  ███████  목표 달성
Warning          #FF9800  ███████  주의 필요
Error            #F44336  ███████  오류, 위험
Info             #2196F3  ███████  정보 표시
```

### Feature Colors

**Water Tracking**
```
Glass            #4FC3F7  ███████  물잔 색상
Wave             #29B6F6  ███████  물결 애니메이션
Drop             #03A9F4  ███████  물방울 아이콘
```

**Meal Tracking**
```
Fiber            #8BC34A  ███████  식이섬유 표시
Plate            #F5F5DC  ███████  접시 배경
Food             #FFA726  ███████  음식 아이콘
```

**Noble Ranks**
```
Commoner         #9E9E9E  ███████  평민
Baron            #A1887F  ███████  남작
Viscount         #7E57C2  ███████  자작
Earl             #5C6BC0  ███████  백작
Duke             #D4AF37  ███████  공작
```

---

## 📝 Typography

### Font Families

#### 제목용 - Playfair Display (세리프)
- 우아하고 클래식한 느낌
- 헤더, 중요 메시지, Sebastian 대사

#### 본문용 - Noto Sans KR (산세리프)
- 가독성 높은 한글 폰트
- 본문, 설명, 버튼 텍스트

### Font Sizes

```
5XL (48px)  ██████  스플래시, 온보딩 타이틀
4XL (36px)  █████   메인 타이틀
3XL (30px)  ████    섹션 헤더
2XL (24px)  ███     서브 헤더
XL  (20px)  ██      중요 텍스트
LG  (18px)  ██      강조 텍스트
Base(16px)  █       본문
SM  (14px)  █       보조 텍스트
XS  (12px)  ▌       캡션, 레이블
```

### Font Weights

- **Light (300)**: 부드러운 텍스트
- **Regular (400)**: 일반 본문
- **Medium (500)**: 약간 강조
- **Bold (700)**: 제목, 중요 정보

---

## 🖼️ Component Specifications

### 1. Sebastian Avatar

**크기 변형**
```
Small   (32px)  집사 아이콘, 알림
Medium  (48px)  메시지 말풍선
Large   (64px)  프로필, 인사
XLarge  (96px)  온보딩, 중요 메시지
```

**상태**
- Default: 기본 집사 표정
- Happy: 칭찬할 때
- Concerned: 걱정될 때
- Strict: 엄격한 조언
- Thinking: 응답 생각 중

**애니메이션**
- 등장: 우아하게 fade in + 약간의 bow
- 말할 때: 미묘한 bounce
- 퇴장: fade out + 뒤로 물러남

### 2. Water Glass Component

**디자인**
```
┌─────────────┐
│   2000ml    │ ← 목표량 텍스트
├─────────────┤
│             │
│   ▓▓▓▓▓▓▓   │ ← 물 애니메이션 (파란 그라데이션)
│   ▓▓▓▓▓▓▓   │
│   ▓▓▓▓▓▓▓   │ ← 현재량: 1200ml (60%)
│             │
└─────────────┘
```

**상태 색상**
- 0-25%: 연한 파랑 (#E3F2FD)
- 25-50%: 중간 파랑 (#90CAF9)
- 50-75%: 진한 파랑 (#42A5F5)
- 75-100%: 완료 파랑 (#2196F3)
- 100%+: 골드 (축하 효과)

**애니메이션**
- 추가 시: 물결 효과와 함께 fill up
- 목표 달성: 반짝이는 골드 효과
- 탭: 물방울이 튀는 효과

### 3. Noble Rank Badge

**디자인**
```
    ╔═══════╗
    ║  👑   ║
    ║ DUKE  ║
    ╚═══════╝
```

**작위별 아이콘**
- Commoner: 🙂 (평민)
- Baron: 🎩 (남작 - 모자)
- Viscount: 🏛️ (자작 - 작은 저택)
- Earl: 🏰 (백작 - 성)
- Duke: 👑 (공작 - 왕관)

**배지 스타일**
- Border: 작위별 색상 (2px)
- Background: 크림색 또는 흰색
- Shadow: 우아한 그림자
- Size: 80x100px

### 4. Message Bubble (Sebastian)

**Sebastian 메시지**
```
┌────────────────────────────┐
│  🤵                        │
│  ┌──────────────────────┐ │
│  │ 주인님, 물을 드실    │ │
│  │ 시간입니다.          │ │
│  └──────────────────────┘ │
│         09:30              │
└────────────────────────────┘
```

**스타일**
- Background: 크림색 (#F5F1E8)
- Border: 골드 (1px)
- Font: Noto Sans KR Regular
- Padding: 12px
- Border Radius: 12px
- Shadow: 부드러운 그림자

**사용자 메시지**
```
┌────────────────────────────┐
│                        😊  │
│  ┌──────────────────────┐ │
│  │ Sebastian, 오늘     │ │
│  │ 어땠어?              │ │
│  └──────────────────────┘ │
│              09:31         │
└────────────────────────────┘
```

**스타일**
- Background: 네이비 (#1A2332)
- Text Color: 흰색
- Border Radius: 12px
- Padding: 12px

### 5. Progress Bar

**수평 진행 바**
```
Baron → Viscount
[████████░░░░] 67%
12일 남음
```

**스타일**
- Height: 8px
- Background: #E0E0E0
- Fill: 골드 그라데이션
- Border Radius: 4px
- Animation: 부드러운 fill 애니메이션

**원형 진행 바 (대시보드용)**
```
    ┌───────┐
   ╱         ╲
  │    67%    │
  │  Viscount │
   ╲         ╱
    └───────┘
```

### 6. Card Components

**기본 카드**
```
┌─────────────────────────┐
│  Title                  │
├─────────────────────────┤
│                         │
│  Content                │
│                         │
└─────────────────────────┘
```

**스타일**
- Background: 흰색
- Border Radius: 12px
- Shadow: elevation 2
- Padding: 16px
- Margin: 8px

**귀족 카드 (특별한 정보)**
```
╔═══════════════════════════╗
║  🏛️ Title                 ║
╠═══════════════════════════╣
║                           ║
║  Premium Content          ║
║                           ║
╚═══════════════════════════╝
```

**스타일**
- Border: 골드 (2px)
- Background: 크림색
- Double border 효과

---

## 📱 Screen Layouts

### 1. Home Screen (메인 홀)

```
┌─────────────────────────────────┐
│  🏛️ The Manor Hall              │ Header
├─────────────────────────────────┤
│                                 │
│         [Sebastian]             │ Sebastian Avatar
│                                 │
│   "좋은 아침입니다, 주인님"      │ Greeting
│                                 │
├─────────────────────────────────┤
│  오늘의 미션                     │ Daily Goals
│  ┌───────────────────────────┐ │
│  │ 💧 물 2L 마시기            │ │
│  │ [████████░░] 60%          │ │
│  └───────────────────────────┘ │
│  ┌───────────────────────────┐ │
│  │ 🥗 식이섬유 25g            │ │
│  │ [█████░░░░░] 40%          │ │
│  └───────────────────────────┘ │
│  ┌───────────────────────────┐ │
│  │ 📔 건강 일지 작성          │ │
│  │ ✓ 완료                    │ │
│  └───────────────────────────┘ │
├─────────────────────────────────┤
│  현재 작위: Viscount 🎩         │ Rank Status
│  다음 레벨까지: 12일             │
└─────────────────────────────────┘
│ [🏠] [💧] [🍽️] [📔] [💬]     │ Tab Bar
└─────────────────────────────────┘
```

### 2. Water Tracking Screen

```
┌─────────────────────────────────┐
│  ← 💧 수분 섭취                  │ Header
├─────────────────────────────────┤
│                                 │
│         [물잔 애니메이션]         │ Water Glass
│         1200ml / 2000ml         │ Current/Goal
│            60%                  │ Percentage
│                                 │
├─────────────────────────────────┤
│  빠른 추가                       │ Quick Actions
│  [250ml] [500ml] [맞춤]         │
│                                 │
│  음료 종류                       │ Beverage Types
│  [💧물] [🍵차] [✨탄산수]        │
├─────────────────────────────────┤
│  오늘의 기록                     │ Today's Log
│  ┌───────────────────────────┐ │
│  │ 08:30  물 250ml           │ │
│  │ 11:00  녹차 200ml         │ │
│  │ 14:00  물 500ml           │ │
│  │ 16:30  물 250ml           │ │
│  └───────────────────────────┘ │
└─────────────────────────────────┘
```

### 3. Meal Tracking Screen

```
┌─────────────────────────────────┐
│  ← 🍽️ 식사 기록                  │ Header
├─────────────────────────────────┤
│  식이섬유                        │
│  [████████░░] 18g / 25g         │ Fiber Progress
│                                 │
├─────────────────────────────────┤
│  [📷 사진 촬영] [✏️ 수동 입력]   │ Add Options
├─────────────────────────────────┤
│  오늘의 식사                     │ Meal List
│  ┌───────────────────────────┐ │
│  │ 🍚 아침                    │ │
│  │ 현미밥, 나물, 된장찌개      │ │
│  │ 섬유질: 8g                │ │
│  │ "훌륭한 선택입니다!"       │ │ Sebastian Comment
│  └───────────────────────────┘ │
│  ┌───────────────────────────┐ │
│  │ 🥗 점심                    │ │
│  │ 샐러드, 닭가슴살           │ │
│  │ 섬유질: 10g               │ │
│  └───────────────────────────┘ │
└─────────────────────────────────┘
```

### 4. Health Log Screen

```
┌─────────────────────────────────┐
│  ← 📔 건강 일지                  │ Header
├─────────────────────────────────┤
│  주인님의 일상이 원활하십니까?   │ Subtitle
│                                 │
│  상태 선택                       │ Bristol Scale
│  ┌─┬─┬─┬─┬─┬─┬─┐            │
│  │1│2│3│4│5│6│7│              │ Bristol Types
│  └─┴─┴─┴─┴─┴─┴─┘            │
│                                 │
│  부드러운 소시지 (이상적)        │ Description
│                                 │
├─────────────────────────────────┤
│  추가 메모                       │ Notes
│  ┌───────────────────────────┐ │
│  │                           │ │ Text Input
│  │                           │ │
│  └───────────────────────────┘ │
│                                 │
│         [기록하기]               │ Save Button
├─────────────────────────────────┤
│  주간 패턴                       │ Weekly Pattern
│  ┌───────────────────────────┐ │
│  │ Mon Tue Wed Thu Fri Sat.. │ │ Chart
│  │  ✓   ✓   ✓   ✓          │ │
│  └───────────────────────────┘ │
└─────────────────────────────────┘
```

### 5. Chat Screen

```
┌─────────────────────────────────┐
│  ← 💬 Sebastian과 대화           │ Header
├─────────────────────────────────┤
│                                 │
│  🤵 "주인님, 오늘 수분 섭취가   │ Sebastian
│     부족하십니다."               │ Message
│     09:30                       │
│                                 │
│              "알겠어, Sebastian" │ User
│                 09:31        😊 │ Message
│                                 │
│  🤵 "훌륭합니다. 지금 물 한 잔  │ Sebastian
│     드시는 것은 어떠십니까?"     │ Message
│     09:32                       │
│                                 │
│              (typing...)        │ Typing indicator
│                                 │
├─────────────────────────────────┤
│ [주인님, 무엇을...]  [📎] [🎤]  │ Input Bar
└─────────────────────────────────┘
```

### 6. Weekly Report Screen

```
┌─────────────────────────────────┐
│  ← 📊 주간 리포트                │ Header
├─────────────────────────────────┤
│                                 │
│         [Sebastian]             │ Sebastian Avatar
│                                 │
│  "존경하는 주인님께,             │ Report Intro
│   지난주 건강 관리 현황을        │
│   보고드립니다."                 │
│                                 │
├─────────────────────────────────┤
│  📊 주요 지표                    │ Statistics
│  ┌───────────────────────────┐ │
│  │ 수분: 일평균 1.8L         │ │
│  │ [████████░] 90%           │ │
│  │                           │ │
│  │ 식이섬유: 일평균 22g      │ │
│  │ [█████████] 88%           │ │
│  │                           │ │
│  │ 규칙적 기록: 6/7일        │ │
│  └───────────────────────────┘ │
├─────────────────────────────────┤
│  💡 개선 제안                    │ Suggestions
│  • 오후 3시경 수분 섭취 부족    │
│  • 티타임 권장                  │
├─────────────────────────────────┤
│  🏆 이번 주 성과                 │ Achievements
│  Baron → Viscount 승급!         │
└─────────────────────────────────┘
```

---

## 🎭 Animations & Transitions

### Screen Transitions
- **Stack Navigation**: 슬라이드 (우→좌)
- **Tab Navigation**: 페이드
- **Modal**: 바텀 시트 (아래→위)

### Component Animations

**Sebastian Avatar**
```
Enter: opacity 0→1 (300ms) + scale 0.8→1 (300ms)
Bow: rotate 0→-15→0 (500ms)
Exit: opacity 1→0 (300ms)
```

**Water Glass Fill**
```
Fill Up: height 0→current% (800ms, easeOut)
Wave: continuous sine wave (2000ms loop)
Celebration: scale pulse + color shift (gold)
```

**Card Appearance**
```
Stagger: 각 카드 100ms 간격
Animation: translateY(20)→0 + opacity 0→1
Duration: 300ms per card
```

**Button Press**
```
Press: scale 1→0.95 (100ms)
Release: scale 0.95→1 (100ms)
Haptic: light feedback
```

---

## 🔔 Notification Design

### Push Notification

```
┌─────────────────────────────────┐
│  🤵 Sebastian                   │ Title
│                                 │
│  "주인님, 물을 드실 시간입니다."│ Message
│                                 │
│  방금 전                         │ Time
└─────────────────────────────────┘
```

### In-App Banner

```
┌─────────────────────────────────┐
│  ┌───┐                          │
│  │🤵 │ Sebastian                │ Avatar + Name
│  └───┘                          │
│  "훌륭합니다! 오늘 목표 달성!"   │ Message
│                            [×]  │ Close
└─────────────────────────────────┘
```

**스타일**
- Background: 크림색 with 골드 border
- Duration: 3초 자동 닫힘
- Position: 상단 (SafeArea 아래)
- Animation: 위에서 슬라이드 in

---

## 🎨 Iconography

### Custom Icons

**Navigation Icons**
- 🏠 Home: 저택 아이콘
- 💧 Water: 물잔
- 🍽️ Meal: 나이프&포크
- 📔 Health: 가죽 노트
- 💬 Chat: 말풍선

**Feature Icons**
- 🎩 Rank Badge
- 📊 Statistics
- 🏆 Achievements
- ⚙️ Settings
- 👤 Profile

**Style Guide**
- Stroke Width: 2px
- Corner Radius: 약간 둥글게
- Color: 기본 네이비, 활성화 시 골드
- Size: 24x24px (탭바), 32x32px (기능)

---

## 🌙 Dark Mode (Future)

현재는 Light Mode만 지원하지만, 향후 Dark Mode 추가 시:

```
Navy → Lighter Navy (#2C3E50)
Cream → Dark Gray (#1E1E1E)
Text → Light Gray (#E0E0E0)
Cards → Dark Surface (#2A2A2A)
Gold → Keep (Gold shines in dark!)
```

---

## 📐 Spacing System

```
XS   4px   ▌
SM   8px   ▐
MD   16px  ▐▌
LG   24px  ▐▌▌
XL   32px  ▐▌▌▌
2XL  48px  ▐▌▌▌▌▌
```

**Usage**
- Card Padding: MD (16px)
- Screen Margin: MD-LG (16-24px)
- Element Spacing: SM-MD (8-16px)
- Section Spacing: LG-XL (24-32px)

---

## 🎯 Accessibility

### Color Contrast
- 모든 텍스트는 WCAG AA 기준 충족
- 최소 대비 비율: 4.5:1 (본문), 3:1 (큰 텍스트)

### Touch Targets
- 최소 크기: 44x44px (iOS 권장)
- 버튼 간 간격: 최소 8px

### Font Scaling
- 시스템 폰트 크기 설정 지원
- 최대 200% 확대까지 레이아웃 유지

### Screen Reader
- 모든 인터랙티브 요소에 label
- Sebastian 메시지는 읽기 쉽게

---

**"디자인은 귀족의 품위를 표현하는 것입니다." - Sebastian**
