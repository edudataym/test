module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@services': './src/services',
          '@store': './src/store',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@constants': './src/constants',
          '@theme': './src/theme',
          '@types': './src/@types',
          '@assets': './src/assets',
          '@locales': './src/locales',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
