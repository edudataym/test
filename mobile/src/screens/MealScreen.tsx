/**
 * Meal Tracking Screen
 * Track fiber intake and meals
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';

import { RootState } from '@store/store';
import { addMealLog } from '@store/slices/mealSlice';
import { theme } from '@theme/theme';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Title, Heading, Body, Caption } from '@components/common/Typography';
import { HEALTH_GOALS } from '@constants/config';

const MealScreen: React.FC = () => {
  const { t } = useTranslation(['common', 'health']);
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.user);
  const { logs, todayTotal } = useSelector((state: RootState) => state.meal);

  const fiberGoal = currentUser?.dailyFiberGoal || HEALTH_GOALS.DAILY_FIBER_G;
  const percentage = Math.min((todayTotal / fiberGoal) * 100, 100);

  const [fiberAmount, setFiberAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleAddMeal = () => {
    const amount = parseInt(fiberAmount, 10);
    if (amount > 0) {
      dispatch(
        addMealLog({
          fiberAmount: amount,
          description: description || undefined,
        })
      );
      setFiberAmount('');
      setDescription('');
    }
  };

  const todayLogs = logs.filter(
    log => new Date(log.timestamp).toDateString() === new Date().toDateString()
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Icon
            name="food-apple-outline"
            size={24}
            color={theme.colors.meal.fiber}
          />
          <Title style={styles.headerTitle}>{t('health:meal.title')}</Title>
        </View>

        {/* Fiber Progress */}
        <Card style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Body style={styles.progressTitle}>
              {t('health:meal.fiber')}
            </Body>
            <Caption style={styles.progressPercentage}>
              {Math.round(percentage)}%
            </Caption>
          </View>

          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${percentage}%`,
                  backgroundColor: theme.colors.meal.fiber,
                },
              ]}
            />
          </View>

          <View style={styles.progressFooter}>
            <Heading style={styles.progressAmount}>
              {todayTotal}g / {fiberGoal}g
            </Heading>
          </View>
        </Card>

        {/* Add Meal Section */}
        <Card style={styles.addMealCard}>
          <Heading style={styles.sectionTitle}>
            {t('health:meal.add')}
          </Heading>

          <Caption style={styles.inputLabel}>
            {t('health:meal.description')}
          </Caption>
          <TextInput
            style={styles.textInput}
            placeholder="예: 현미밥, 샐러드, 견과류"
            value={description}
            onChangeText={setDescription}
          />

          <Caption style={styles.inputLabel}>
            {t('health:meal.amount')} (g)
          </Caption>
          <TextInput
            style={styles.textInput}
            placeholder="식이섬유 함량 (g)"
            keyboardType="numeric"
            value={fiberAmount}
            onChangeText={setFiberAmount}
          />

          <Button
            title={t('health:meal.add')}
            onPress={handleAddMeal}
            disabled={!fiberAmount || parseInt(fiberAmount) <= 0}
            style={styles.addButton}
          />

          <Caption style={styles.helpText}>
            💡 참고: 사과 1개 ≈ 4g, 현미밥 1공기 ≈ 3g, 샐러드 1접시 ≈ 5g
          </Caption>
        </Card>

        {/* Today's Meals */}
        <Heading style={styles.sectionTitle}>
          {t('health:meal.history')}
        </Heading>

        {todayLogs.length > 0 ? (
          <View>
            {todayLogs.map(log => (
              <Card key={log.id} style={styles.mealCard}>
                <View style={styles.mealHeader}>
                  <View style={styles.mealLeft}>
                    <Icon
                      name="food-variant"
                      size={20}
                      color={theme.colors.meal.fiber}
                    />
                    <Body style={styles.mealDescription}>
                      {log.description || '식사'}
                    </Body>
                  </View>
                  <Caption style={styles.mealTime}>
                    {format(new Date(log.timestamp), 'HH:mm')}
                  </Caption>
                </View>

                <View style={styles.mealFooter}>
                  <Caption style={styles.fiberLabel}>
                    섬유질: {log.fiberAmount}g
                  </Caption>
                </View>

                {log.sebastianComment && (
                  <View style={styles.commentContainer}>
                    <Icon
                      name="account-tie"
                      size={16}
                      color={theme.colors.primary.gold}
                    />
                    <Caption style={styles.comment}>
                      {log.sebastianComment}
                    </Caption>
                  </View>
                )}
              </Card>
            ))}
          </View>
        ) : (
          <Card>
            <Body style={styles.emptyText}>
              오늘 식사 기록이 없습니다
            </Body>
          </Card>
        )}

        {/* Recommendations */}
        <Card variant="noble" style={styles.recommendCard}>
          <Heading style={styles.recommendTitle}>
            🥗 식이섬유 풍부한 식품
          </Heading>
          <Body style={styles.recommendText}>
            • 채소: 브로콜리, 시금치, 양배추{'\n'}
            • 과일: 사과, 배, 베리류{'\n'}
            • 곡물: 현미, 귀리, 통밀{'\n'}
            • 견과류: 아몬드, 호두, 땅콩
          </Body>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
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
  },

  progressCard: {
    marginBottom: theme.spacing.lg,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },

  progressTitle: {
    fontFamily: theme.typography.fontFamily.sansMedium,
    fontSize: theme.typography.fontSize.lg,
  },

  progressPercentage: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.sansBold,
    color: theme.colors.meal.fiber,
  },

  progressBarContainer: {
    height: 12,
    backgroundColor: theme.colors.border.light,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.sm,
  },

  progressBar: {
    height: '100%',
    borderRadius: theme.borderRadius.md,
  },

  progressFooter: {
    alignItems: 'center',
  },

  progressAmount: {
    color: theme.colors.primary.navy,
  },

  addMealCard: {
    marginBottom: theme.spacing.lg,
  },

  sectionTitle: {
    marginBottom: theme.spacing.md,
  },

  inputLabel: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.text.secondary,
  },

  textInput: {
    height: theme.dimensions.input.height,
    borderWidth: 1,
    borderColor: theme.colors.border.medium,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    fontFamily: theme.typography.fontFamily.sans,
    fontSize: theme.typography.fontSize.base,
    marginBottom: theme.spacing.md,
  },

  addButton: {
    marginTop: theme.spacing.sm,
  },

  helpText: {
    marginTop: theme.spacing.md,
    textAlign: 'center',
    color: theme.colors.text.light,
  },

  mealCard: {
    marginBottom: theme.spacing.sm,
  },

  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },

  mealLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  mealDescription: {
    marginLeft: theme.spacing.sm,
    flex: 1,
  },

  mealTime: {
    color: theme.colors.text.light,
  },

  mealFooter: {
    marginTop: theme.spacing.xs,
  },

  fiberLabel: {
    color: theme.colors.meal.fiber,
    fontFamily: theme.typography.fontFamily.sansMedium,
  },

  commentContainer: {
    flexDirection: 'row',
    marginTop: theme.spacing.sm,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.primary.cream,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },

  comment: {
    marginLeft: theme.spacing.xs,
    flex: 1,
    fontStyle: 'italic',
    color: theme.colors.primary.navy,
  },

  emptyText: {
    textAlign: 'center',
    color: theme.colors.text.light,
  },

  recommendCard: {
    marginTop: theme.spacing.lg,
  },

  recommendTitle: {
    marginBottom: theme.spacing.md,
    color: theme.colors.primary.navy,
  },

  recommendText: {
    lineHeight: theme.typography.fontSize.base * 1.8,
    color: theme.colors.text.primary,
  },
});

export default MealScreen;
