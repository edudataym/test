/**
 * Card Component
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '@theme/theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'noble';
  style?: ViewStyle;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  style,
}) => {
  const cardStyles = [styles.base, styles[variant], style];

  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },

  default: {
    backgroundColor: theme.colors.background.card,
    ...theme.shadows.sm,
  },

  noble: {
    backgroundColor: theme.colors.primary.cream,
    borderWidth: 2,
    borderColor: theme.colors.primary.gold,
    ...theme.shadows.md,
  },
});
