/**
 * Custom Button Component
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme } from '@theme/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`${size}Button`],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'primary'
              ? theme.colors.text.inverse
              : theme.colors.primary.navy
          }
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  // Variants
  primary: {
    backgroundColor: theme.colors.primary.navy,
    ...theme.shadows.sm,
  },
  primaryText: {
    color: theme.colors.text.inverse,
  },

  secondary: {
    backgroundColor: theme.colors.primary.gold,
    ...theme.shadows.sm,
  },
  secondaryText: {
    color: theme.colors.text.inverse,
  },

  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary.navy,
  },
  outlineText: {
    color: theme.colors.primary.navy,
  },

  text: {
    backgroundColor: 'transparent',
  },
  textText: {
    color: theme.colors.primary.navy,
  },

  // Sizes
  smButton: {
    height: theme.dimensions.button.heightSm,
    paddingHorizontal: theme.spacing.md,
  },
  smText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.sansMedium,
  },

  mdButton: {
    height: theme.dimensions.button.heightMd,
    paddingHorizontal: theme.spacing.lg,
  },
  mdText: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.sansMedium,
  },

  lgButton: {
    height: theme.dimensions.button.heightLg,
    paddingHorizontal: theme.spacing.xl,
  },
  lgText: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.sansBold,
  },

  // States
  disabled: {
    opacity: theme.opacity.disabled,
  },
  disabledText: {
    opacity: theme.opacity.disabled,
  },
});
