/**
 * Sebastian Avatar Component
 * The butler's avatar with different expressions
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '@theme/theme';

interface SebastianAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  expression?: 'default' | 'happy' | 'concerned' | 'strict';
}

export const SebastianAvatar: React.FC<SebastianAvatarProps> = ({
  size = 'md',
  expression = 'default',
}) => {
  const avatarSize = sizeMap[size];
  const iconName = expressionMap[expression];

  return (
    <View style={[styles.container, { width: avatarSize, height: avatarSize }]}>
      <Icon
        name={iconName}
        size={avatarSize * 0.6}
        color={theme.colors.primary.navy}
      />
    </View>
  );
};

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

const expressionMap = {
  default: 'account-tie',
  happy: 'emoticon-happy-outline',
  concerned: 'emoticon-confused-outline',
  strict: 'account-tie-voice',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary.cream,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: theme.colors.primary.gold,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
});
