# 🚀 빠른 시작 가이드 (Quick Start)

**완전 초보자를 위한 5분 요약 버전!**

---

## ✅ 필수 프로그램 설치 (처음 한 번만)

Mac 터미널을 열고 아래 명령어를 **순서대로** 복사 붙여넣기:

```bash
# 1. Homebrew 설치
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Node.js 설치
brew install node@18

# 3. Watchman 설치
brew install watchman

# 4. CocoaPods 설치
sudo gem install cocoapods
```

**Xcode는 App Store에서 설치하세요!** (시간이 오래 걸립니다)

---

## 🏃‍♂️ 앱 실행하기

### Step 1: 프로젝트 폴더로 이동

```bash
cd [프로젝트 경로]/mobile
```

예: `cd ~/Desktop/wellness-butler/mobile`

### Step 2: 패키지 설치

```bash
npm install
cd ios && pod install && cd ..
```

### Step 3: 앱 실행!

**터미널 1번 (Metro 서버):**
```bash
npm start
```

**터미널 2번 (새 창 열어서):**
```bash
npm run ios
```

---

## 🎉 완료!

iPhone 시뮬레이터에서 "나의 귀족님 웰니스 집사" 앱이 실행됩니다!

---

## ❌ 에러가 나요?

1. **"command not found"**
   ```bash
   brew --version  # Homebrew 확인
   node --version  # Node 확인
   ```

2. **"No provisioning profile"**
   - Xcode 실행 → Preferences → Accounts → Apple ID 추가

3. **앱 화면이 빨간색**
   - Metro 터미널에서 `r` 키 눌러서 새로고침

4. **그래도 안되면 완전 초기화:**
   ```bash
   rm -rf node_modules
   rm -rf ios/Pods
   npm install
   cd ios && pod install && cd ..
   npm start -- --reset-cache
   ```

---

## 📖 더 자세한 가이드

자세한 설명은 `SETUP_GUIDE_MAC.md` 파일을 참고하세요!

---

**"주인님, 성공하셨기를 바랍니다!" - Sebastian** 🤵
