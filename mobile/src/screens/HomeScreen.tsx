/**
 * Home Screen - The Manor Hall
 * Main dashboard showing today's goals and Sebastian's greeting
 */

import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootState } from '@store/store';
import { theme } from '@theme/theme';
import { Card } from '@components/common/Card';
import { Title, Heading, Body, Caption } from '@components/common/Typography';
import { SebastianAvatar } from '@components/sebastian/SebastianAvatar';
import { HEALTH_GOALS } from '@constants/config';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const { t } = useTranslation(['common', 'sebastian', 'health']);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { todayTotal: waterTotal } = useSelector((state: RootState) => state.water);
  const { todayTotal: fiberTotal } = useSelector((state: RootState) => state.meal);
  const { todayLog } = useSelector((state: RootState) => state.health);

  const waterGoal = currentUser?.dailyWaterGoal || HEALTH_GOALS.DAILY_WATER_ML;
  const fiberGoal = currentUser?.dailyFiberGoal || HEALTH_GOALS.DAILY_FIBER_G;

  const waterPercentage = Math.min((waterTotal / waterGoal) * 100, 100);
  const fiberPercentage = Math.min((fiberTotal / fiberGoal) * 100, 100);

  const greeting = getGreeting();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Icon
            name="home-variant-outline"
            size={24}
            color={theme.colors.primary.gold}
          />
          <Title style={styles.headerTitle}>The Manor Hall</Title>
        </View>

        {/* Sebastian Greeting */}
        <Card variant="noble" style={styles.greetingCard}>
          <View style={styles.greetingContent}>
            <SebastianAvatar size="lg" expression="default" />
            <View style={styles.greetingText}>
              <Body style={styles.greeting}>
                {t(`sebastian:greeting.${greeting}`)}
              </Body>
              {currentUser && (
                <Caption style={styles.userName}>{currentUser.name}</Caption>
              )}
            </View>
          </View>
        </Card>

        {/* Today's Missions */}
        <Heading style={styles.sectionTitle}>오늘의 미션</Heading>

        {/* Water Goal */}
        <Card style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <View style={styles.goalTitleRow}>
              <Icon
                name="water-outline"
                size={24}
                color={theme.colors.water.glass}
              />
              <Body style={styles.goalTitle}>물 {waterGoal}ml 마시기</Body>
            </View>
            <Caption style={styles.goalPercentage}>
              {Math.round(waterPercentage)}%
            </Caption>
          </View>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${waterPercentage}%`,
                  backgroundColor: theme.colors.water.glass,
                },
              ]}
            />
          </View>
          <Caption style={styles.goalStatus}>
            {waterTotal}ml / {waterGoal}ml
          </Caption>
        </Card>

        {/* Fiber Goal */}
        <Card style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <View style={styles.goalTitleRow}>
              <Icon
                name="food-apple-outline"
                size={24}
                color={theme.colors.meal.fiber}
              />
              <Body style={styles.goalTitle}>식이섬유 {fiberGoal}g</Body>
            </View>
            <Caption style={styles.goalPercentage}>
              {Math.round(fiberPercentage)}%
            </Caption>
          </View>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${fiberPercentage}%`,
                  backgroundColor: theme.colors.meal.fiber,
                },
              ]}
            />
          </View>
          <Caption style={styles.goalStatus}>
            {fiberTotal}g / {fiberGoal}g
          </Caption>
        </Card>

        {/* Health Log */}
        <Card style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <View style={styles.goalTitleRow}>
              <Icon
                name="book-outline"
                size={24}
                color={theme.colors.primary.brown}
              />
              <Body style={styles.goalTitle}>건강 일지 작성</Body>
            </View>
            {todayLog ? (
              <Icon
                name="check-circle"
                size={24}
                color={theme.colors.status.success}
              />
            ) : (
              <Icon
                name="circle-outline"
                size={24}
                color={theme.colors.border.medium}
              />
            )}
          </View>
          <Caption style={styles.goalStatus}>
            {todayLog ? '✓ 완료' : '미완료'}
          </Caption>
        </Card>

        {/* Noble Rank */}
        <Card variant="noble" style={styles.rankCard}>
          <View style={styles.rankContent}>
            <View style={styles.rankLeft}>
              <Caption style={styles.rankLabel}>현재 작위</Caption>
              <Heading style={styles.rankTitle}>
                {getRankName(currentUser?.nobleRank || 'BARON')}
                {getRankIcon(currentUser?.nobleRank || 'BARON')}
              </Heading>
            </View>
            <Icon
              name="chevron-right"
              size={24}
              color={theme.colors.primary.gold}
            />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper functions
const getGreeting = (): 'morning' | 'afternoon' | 'evening' | 'night' => {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  if (hour < 22) return 'evening';
  return 'night';
};

const getRankName = (rank: string): string => {
  const rankNames: Record<string, string> = {
    COMMONER: '평민',
    BARON: '남작',
    VISCOUNT: '자작',
    EARL: '백작',
    DUKE: '공작',
  };
  return rankNames[rank] || '남작';
};

const getRankIcon = (rank: string): string => {
  const rankIcons: Record<string, string> = {
    COMMONER: '🙂',
    BARON: '🎩',
    VISCOUNT: '🏛️',
    EARL: '🏰',
    DUKE: '👑',
  };
  return rankIcons[rank] || '🎩';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: theme.spacing.md,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },

  headerTitle: {
    marginLeft: theme.spacing.sm,
    marginBottom: 0,
    color: theme.colors.primary.navy,
  },

  greetingCard: {
    marginBottom: theme.spacing.lg,
  },

  greetingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  greetingText: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },

  greeting: {
    fontFamily: theme.typography.fontFamily.sansMedium,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.primary.navy,
  },

  userName: {
    marginTop: theme.spacing.xs,
    color: theme.colors.text.secondary,
  },

  sectionTitle: {
    marginBottom: theme.spacing.md,
    color: theme.colors.primary.navy,
  },

  goalCard: {
    marginBottom: theme.spacing.md,
  },

  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },

  goalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  goalTitle: {
    marginLeft: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily.sansMedium,
  },

  goalPercentage: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.sansBold,
    color: theme.colors.primary.gold,
  },

  progressBarContainer: {
    height: 8,
    backgroundColor: theme.colors.border.light,
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
    marginBottom: theme.spacing.xs,
  },

  progressBar: {
    height: '100%',
    borderRadius: theme.borderRadius.sm,
  },

  goalStatus: {
    textAlign: 'right',
    color: theme.colors.text.secondary,
  },

  rankCard: {
    marginTop: theme.spacing.md,
  },

  rankContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rankLeft: {
    flex: 1,
  },

  rankLabel: {
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },

  rankTitle: {
    color: theme.colors.primary.navy,
    fontSize: theme.typography.fontSize['2xl'],
  },
});

export default HomeScreen;
