/**
 * Sebastian Message Bubble Component
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Body, Caption } from '@components/common/Typography';
import { SebastianAvatar } from './SebastianAvatar';
import { theme } from '@theme/theme';
import { format } from 'date-fns';

interface SebastianMessageProps {
  message: string;
  timestamp?: string;
  expression?: 'default' | 'happy' | 'concerned' | 'strict';
}

export const SebastianMessage: React.FC<SebastianMessageProps> = ({
  message,
  timestamp,
  expression = 'default',
}) => {
  const formattedTime = timestamp
    ? format(new Date(timestamp), 'HH:mm')
    : '';

  return (
    <View style={styles.container}>
      <SebastianAvatar size="sm" expression={expression} />
      <View style={styles.bubbleContainer}>
        <View style={styles.bubble}>
          <Body style={styles.message}>{message}</Body>
        </View>
        {formattedTime && (
          <Caption style={styles.timestamp}>{formattedTime}</Caption>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },

  bubbleContainer: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },

  bubble: {
    backgroundColor: theme.colors.primary.cream,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.primary.gold,
    padding: theme.spacing.md,
    maxWidth: '85%',
  },

  message: {
    color: theme.colors.text.primary,
  },

  timestamp: {
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.sm,
    color: theme.colors.text.light,
  },
});
