/**
 * Root App Component
 * My Lord's Wellness Butler
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar, StyleSheet } from 'react-native';

import { store } from '@store/store';
import { RootNavigator } from '@navigation/RootNavigator';
import { theme } from '@theme/theme';
import './locales/i18n';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <PaperProvider theme={paperTheme}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor={theme.colors.background.default}
            />
            <RootNavigator />
          </PaperProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

// React Native Paper theme customization
const paperTheme = {
  colors: {
    primary: theme.colors.primary.navy,
    accent: theme.colors.primary.gold,
    background: theme.colors.background.default,
    surface: theme.colors.background.card,
    text: theme.colors.text.primary,
    disabled: theme.colors.text.disabled,
    placeholder: theme.colors.text.light,
    backdrop: theme.colors.background.modal,
  },
  fonts: {
    regular: {
      fontFamily: theme.typography.fontFamily.sans,
      fontWeight: '400' as const,
    },
    medium: {
      fontFamily: theme.typography.fontFamily.sansMedium,
      fontWeight: '500' as const,
    },
    light: {
      fontFamily: theme.typography.fontFamily.sansLight,
      fontWeight: '300' as const,
    },
    thin: {
      fontFamily: theme.typography.fontFamily.sansLight,
      fontWeight: '300' as const,
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
