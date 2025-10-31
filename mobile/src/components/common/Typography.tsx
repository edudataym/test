/**
 * Typography Components
 */

import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { theme } from '@theme/theme';

interface TypographyProps {
  children: React.ReactNode;
  style?: TextStyle;
  numberOfLines?: number;
}

export const Title: React.FC<TypographyProps> = ({
  children,
  style,
  numberOfLines,
}) => {
  return (
    <Text style={[styles.title, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export const Heading: React.FC<TypographyProps> = ({
  children,
  style,
  numberOfLines,
}) => {
  return (
    <Text style={[styles.heading, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export const Subtitle: React.FC<TypographyProps> = ({
  children,
  style,
  numberOfLines,
}) => {
  return (
    <Text style={[styles.subtitle, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export const Body: React.FC<TypographyProps> = ({
  children,
  style,
  numberOfLines,
}) => {
  return (
    <Text style={[styles.body, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export const Caption: React.FC<TypographyProps> = ({
  children,
  style,
  numberOfLines,
}) => {
  return (
    <Text style={[styles.caption, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.typography.fontFamily.serifBold,
    fontSize: theme.typography.fontSize['3xl'],
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },

  heading: {
    fontFamily: theme.typography.fontFamily.sansBold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },

  subtitle: {
    fontFamily: theme.typography.fontFamily.sansMedium,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },

  body: {
    fontFamily: theme.typography.fontFamily.sans,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    lineHeight: theme.typography.fontSize.base * theme.typography.lineHeight.normal,
  },

  caption: {
    fontFamily: theme.typography.fontFamily.sans,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.light,
  },
});
