/**
 * Root Navigator
 * Main navigation structure for the app
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@store/store';
import { mockLogin } from '@store/slices/userSlice';
import { TabNavigator } from './TabNavigator';
import { RootStackParamList } from '@/@types';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  // Auto-login for development
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(mockLogin());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthPlaceholder} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Placeholder for Auth screen (will be implemented later)
const AuthPlaceholder: React.FC = () => {
  return null;
};
