#!/bin/bash

# 🤵 Wellness Butler - Automated Setup Script for Mac
# "주인님, 자동으로 설정해드리겠습니다." - Sebastian

set -e  # Exit on error

echo "🤵 =================================="
echo "   Wellness Butler 자동 설치 시작"
echo "   =================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running on Mac
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo -e "${RED}❌ 이 스크립트는 Mac에서만 실행할 수 있습니다.${NC}"
    exit 1
fi

echo "✅ Mac 운영체제 확인 완료"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Homebrew
echo "📦 Homebrew 확인 중..."
if ! command_exists brew; then
    echo -e "${YELLOW}⚠️  Homebrew가 설치되어 있지 않습니다.${NC}"
    echo "🔧 Homebrew를 설치하시겠습니까? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        echo -e "${GREEN}✅ Homebrew 설치 완료${NC}"
    else
        echo -e "${RED}❌ Homebrew가 필요합니다. 설치를 취소합니다.${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Homebrew가 이미 설치되어 있습니다${NC}"
fi
echo ""

# Check Node.js
echo "📦 Node.js 확인 중..."
if ! command_exists node; then
    echo "🔧 Node.js를 설치합니다..."
    brew install node@18
    echo -e "${GREEN}✅ Node.js 설치 완료${NC}"
else
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js가 이미 설치되어 있습니다 ($NODE_VERSION)${NC}"
fi
echo ""

# Check Watchman
echo "📦 Watchman 확인 중..."
if ! command_exists watchman; then
    echo "🔧 Watchman을 설치합니다..."
    brew install watchman
    echo -e "${GREEN}✅ Watchman 설치 완료${NC}"
else
    echo -e "${GREEN}✅ Watchman이 이미 설치되어 있습니다${NC}"
fi
echo ""

# Check CocoaPods
echo "📦 CocoaPods 확인 중..."
if ! command_exists pod; then
    echo "🔧 CocoaPods를 설치합니다..."
    sudo gem install cocoapods
    echo -e "${GREEN}✅ CocoaPods 설치 완료${NC}"
else
    POD_VERSION=$(pod --version)
    echo -e "${GREEN}✅ CocoaPods가 이미 설치되어 있습니다 ($POD_VERSION)${NC}"
fi
echo ""

# Check Xcode
echo "📦 Xcode 확인 중..."
if ! command_exists xcodebuild; then
    echo -e "${YELLOW}⚠️  Xcode가 설치되어 있지 않습니다.${NC}"
    echo "📱 App Store에서 Xcode를 설치해주세요."
    echo "   설치 후 이 스크립트를 다시 실행하세요."
    exit 1
else
    echo -e "${GREEN}✅ Xcode가 설치되어 있습니다${NC}"
fi
echo ""

# Install npm packages
echo "📦 npm 패키지 설치 중..."
if [ -f "package.json" ]; then
    npm install
    echo -e "${GREEN}✅ npm 패키지 설치 완료${NC}"
else
    echo -e "${RED}❌ package.json 파일을 찾을 수 없습니다.${NC}"
    echo "   mobile 폴더에서 스크립트를 실행해주세요."
    exit 1
fi
echo ""

# Install iOS dependencies
echo "📦 iOS 의존성 설치 중..."
if [ -d "ios" ]; then
    cd ios
    pod install
    cd ..
    echo -e "${GREEN}✅ iOS 의존성 설치 완료${NC}"
else
    echo -e "${YELLOW}⚠️  ios 폴더가 없습니다.${NC}"
    echo "   React Native 프로젝트 초기화가 필요합니다."
    echo ""
    echo "🔧 React Native 프로젝트를 초기화하시겠습니까? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo "📱 React Native 프로젝트 초기화 중..."
        npx react-native init WellnessButlerTemp --skip-install

        # Move ios and android folders
        if [ -d "WellnessButlerTemp/ios" ]; then
            mv WellnessButlerTemp/ios ./
            echo -e "${GREEN}✅ iOS 폴더 생성 완료${NC}"
        fi
        if [ -d "WellnessButlerTemp/android" ]; then
            mv WellnessButlerTemp/android ./
            echo -e "${GREEN}✅ Android 폴더 생성 완료${NC}"
        fi

        # Clean up
        rm -rf WellnessButlerTemp

        # Install pods
        cd ios
        pod install
        cd ..
        echo -e "${GREEN}✅ iOS 의존성 설치 완료${NC}"
    else
        echo -e "${YELLOW}⚠️  iOS 폴더 없이 계속 진행합니다.${NC}"
    fi
fi
echo ""

# Final message
echo ""
echo "🎉 =================================="
echo "   설치가 완료되었습니다!"
echo "   =================================="
echo ""
echo "📱 앱을 실행하려면:"
echo ""
echo "   터미널 1:"
echo "   $ npm start"
echo ""
echo "   터미널 2 (새 창):"
echo "   $ npm run ios"
echo ""
echo -e "${GREEN}🤵 \"주인님, 모든 준비가 완료되었습니다!\" - Sebastian${NC}"
echo ""
