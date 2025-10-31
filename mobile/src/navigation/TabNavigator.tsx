/**
 * Tab Navigator
 * Bottom tab navigation for main app screens
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

import { theme } from '@theme/theme';
import HomeScreen from '@screens/HomeScreen';
import WaterScreen from '@screens/WaterScreen';
import MealScreen from '@screens/MealScreen';
import HealthLogScreen from '@screens/HealthLogScreen';
import ChatScreen from '@screens/ChatScreen';

const Tab = createBottomTabNavigator();

export const TabNavigator: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: theme.colors.primary.gold,
        tabBarInactiveTintColor: theme.colors.text.light,
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('navigation.home'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Water"
        component={WaterScreen}
        options={{
          tabBarLabel: t('navigation.water'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="water-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Meal"
        component={MealScreen}
        options={{
          tabBarLabel: t('navigation.meal'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="silverware-fork-knife" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="HealthLog"
        component={HealthLogScreen}
        options={{
          tabBarLabel: t('navigation.health'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: t('navigation.chat'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="chat-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.background.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
    ...theme.shadows.sm,
  },
  tabBarLabel: {
    fontFamily: theme.typography.fontFamily.sans,
    fontSize: theme.typography.fontSize.xs,
  },
});
