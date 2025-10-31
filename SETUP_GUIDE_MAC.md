# 🍎 Mac에서 웰니스 집사 앱 실행하기 (초보자용 완전 가이드)

**"걱정하지 마세요, 주인님. 제가 단계별로 안내해드리겠습니다." - Sebastian** 🤵

---

## 📋 목차

1. [필요한 프로그램 설치하기](#1-필요한-프로그램-설치하기)
2. [프로젝트 준비하기](#2-프로젝트-준비하기)
3. [앱 실행하기](#3-앱-실행하기)
4. [문제 해결](#4-문제-해결)

---

## ⏱️ 예상 소요 시간

- 처음 설치: **약 1-2시간**
- 이미 설치되어 있다면: **약 10분**

---

## 1. 필요한 프로그램 설치하기

### 1-1. Homebrew 설치 (Mac용 프로그램 설치 도구)

**Homebrew가 뭔가요?**
Mac에서 프로그램을 쉽게 설치할 수 있게 해주는 도구입니다.

**설치 방법:**

1. **Spotlight 검색** (화면 오른쪽 위 돋보기 🔍) 을 클릭하고 "터미널"이라고 입력
2. **터미널** 앱을 실행
3. 아래 명령어를 **복사해서 붙여넣기** 하고 **Enter**

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

4. 비밀번호를 입력하라고 나오면 Mac 로그인 비밀번호 입력 (입력할 때 화면에 안보이는게 정상입니다!)
5. 설치가 끝날 때까지 기다리기 (5-10분 정도 소요)

**확인 방법:**
```bash
brew --version
```
버전 번호가 나오면 성공! ✅

---

### 1-2. Node.js 설치 (JavaScript 실행 환경)

**Node.js가 뭔가요?**
앱을 만들기 위한 JavaScript 실행 프로그램입니다.

**설치 방법:**

터미널에서 아래 명령어 입력:

```bash
brew install node@18
```

**확인 방법:**
```bash
node --version
npm --version
```

버전 번호가 두 개 모두 나오면 성공! ✅

---

### 1-3. Watchman 설치 (파일 변경 감지 도구)

```bash
brew install watchman
```

---

### 1-4. Xcode 설치 (iPhone 시뮬레이터 실행용)

**Xcode가 뭔가요?**
iPhone/iPad 앱을 만들고 테스트할 수 있는 Apple의 공식 프로그램입니다.

**설치 방법:**

1. **App Store** 열기
2. "Xcode" 검색
3. **다운로드** 클릭 (용량이 크니 시간이 오래 걸립니다! 약 10-15GB)
4. 설치 완료 후 **Xcode를 한 번 실행**하고 라이센스 동의
5. Xcode를 닫기

**Command Line Tools 설치:**

터미널에서:
```bash
sudo xcode-select --install
```

비밀번호 입력 후 설치

---

### 1-5. CocoaPods 설치 (iOS 라이브러리 관리 도구)

```bash
sudo gem install cocoapods
```

**확인 방법:**
```bash
pod --version
```

---

## 2. 프로젝트 준비하기

### 2-1. 프로젝트 폴더로 이동

터미널에서:

```bash
cd /home/user/test/mobile
```

**※ 주의**: 실제 경로는 프로젝트가 있는 위치에 맞게 수정하세요!

예를 들어:
```bash
cd ~/Desktop/wellness-butler/mobile
```

---

### 2-2. 필요한 패키지 설치

```bash
npm install
```

이 명령어는 앱 실행에 필요한 모든 라이브러리를 자동으로 설치합니다.
(처음엔 시간이 좀 걸려요! 5-10분 정도)

---

### 2-3. React Native 프로젝트 초기화

현재 프로젝트에 iOS/Android 네이티브 파일이 없으므로 생성해야 합니다.

**옵션 1: 수동 초기화 (권장)**

터미널에서:

```bash
npx react-native init WellnessButler --skip-install
```

그 다음 생성된 ios, android 폴더를 현재 프로젝트로 복사

**옵션 2: 자동 스크립트 사용**

아래 "자동 설치 스크립트" 섹션 참고

---

### 2-4. iOS 의존성 설치

```bash
cd ios
pod install
cd ..
```

"Pod installation complete!"이 나오면 성공! ✅

---

## 3. 앱 실행하기

### 3-1. 첫 번째 터미널: Metro 시작

새 터미널 창을 열고:

```bash
cd /home/user/test/mobile
npm start
```

이렇게 나오면 성공:
```
Welcome to Metro!
Fast - Scalable - Integrated
```

**※ 이 터미널 창은 닫지 마세요!** 앱이 실행되는 동안 계속 켜두어야 합니다.

---

### 3-2. 두 번째 터미널: iOS 시뮬레이터 실행

**새로운 터미널 창**을 하나 더 열고:

```bash
cd /home/user/test/mobile
npm run ios
```

잠시 기다리면... 🎉

iPhone 시뮬레이터가 자동으로 열리고 **"나의 귀족님 웰니스 집사"** 앱이 실행됩니다!

---

## 4. 문제 해결

### 문제 1: "command not found"

**원인**: 프로그램이 제대로 설치되지 않았습니다.

**해결**:
```bash
# Homebrew 경로 추가
echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

---

### 문제 2: "No provisioning profile"

**원인**: iOS 개발자 인증서 문제

**해결**:
1. Xcode 실행
2. Preferences → Accounts → 자신의 Apple ID 추가
3. 다시 실행

---

### 문제 3: "Pod install failed"

**해결**:
```bash
cd ios
pod deintegrate
pod install
cd ..
```

---

### 문제 4: "Metro bundler가 시작되지 않습니다"

**해결**:
```bash
# 캐시 삭제
npm start -- --reset-cache
```

---

### 문제 5: 빌드는 되는데 앱 화면이 빨간색 에러

**원인**: JavaScript 코드 오류

**해결**:
1. Metro 터미널에서 `r` 키를 눌러 새로고침
2. 시뮬레이터에서 `Cmd + D` → "Reload" 클릭

---

## 🎉 성공했나요?

앱이 실행되면 다음과 같은 화면이 보입니다:

```
┌─────────────────────────────┐
│  🏛️ The Manor Hall          │
│                             │
│  [Sebastian 집사 아바타]     │
│  "좋은 아침입니다, 주인님"   │
│                             │
│  오늘의 미션                 │
│  💧 물 2L 마시기            │
│  🥗 식이섬유 25g            │
│  📔 건강 일지 작성          │
└─────────────────────────────┘
```

---

## 🔧 유용한 단축키

### 시뮬레이터에서:
- **Cmd + D**: 개발자 메뉴 열기
- **Cmd + R**: 앱 새로고침
- **Cmd + Shift + H**: 홈 버튼
- **Cmd + ←/→**: 기기 회전

### Metro 터미널에서:
- **r**: 앱 새로고침
- **d**: 개발자 메뉴 열기
- **i**: iOS 시뮬레이터 실행
- **Ctrl + C**: Metro 종료

---

## 📱 다른 iPhone 모델로 테스트하기

```bash
# iPhone 14 Pro
npx react-native run-ios --simulator="iPhone 14 Pro"

# iPhone SE
npx react-native run-ios --simulator="iPhone SE (3rd generation)"

# iPad
npx react-native run-ios --simulator="iPad Pro (12.9-inch)"
```

---

## 🆘 그래도 안되면?

### 완전 초기화 방법:

```bash
# 프로젝트 폴더에서
rm -rf node_modules
rm -rf ios/Pods
rm -rf ios/build
npm install
cd ios && pod install && cd ..
npm start -- --reset-cache
```

새 터미널에서:
```bash
npm run ios
```

---

## 💡 팁

### 1. 더 빠른 시뮬레이터 부팅
Xcode를 먼저 실행해서 시뮬레이터를 켜두면 `npm run ios`가 더 빠릅니다.

### 2. 코드 변경 시
대부분의 변경사항은 자동으로 반영됩니다 (Fast Refresh).
안되면 시뮬레이터에서 `Cmd + R`로 새로고침하세요.

### 3. 에러 메시지 읽기
빨간 화면에 나오는 에러 메시지를 잘 읽어보세요. 대부분 해결 방법이 적혀있습니다!

---

## 📚 더 자세한 정보

- React Native 공식 문서: https://reactnative.dev
- Troubleshooting: https://reactnative.dev/docs/troubleshooting

---

**"주인님, 앱 실행에 성공하셨기를 바랍니다. 궁금한 점이 있으시면 언제든 말씀해주세요!" - Sebastian** 🤵✨
