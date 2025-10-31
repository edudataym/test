/**
 * Health Log Screen
 * Track daily health status using Bristol Stool Scale
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';

import { RootState } from '@store/store';
import { addHealthLog } from '@store/slices/healthSlice';
import { theme } from '@theme/theme';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Title, Heading, Body, Caption } from '@components/common/Typography';
import { BRISTOL_TYPES } from '@constants/config';

const HealthLogScreen: React.FC = () => {
  const { t } = useTranslation(['common', 'health']);
  const dispatch = useDispatch();

  const { todayLog, logs } = useSelector((state: RootState) => state.health);

  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [notes, setNotes] = useState('');

  const handleSaveLog = () => {
    if (selectedType) {
      dispatch(
        addHealthLog({
          bristolType: selectedType as 1 | 2 | 3 | 4 | 5 | 6 | 7,
          notes: notes || undefined,
        })
      );
      setSelectedType(null);
      setNotes('');
    }
  };

  const recentLogs = logs.slice(0, 7);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Icon
            name="book-outline"
            size={24}
            color={theme.colors.primary.brown}
          />
          <Title style={styles.headerTitle}>
            {t('health:healthLog.title')}
          </Title>
        </View>

        {/* Subtitle */}
        <Card variant="noble" style={styles.subtitleCard}>
          <Body style={styles.subtitle}>
            {t('health:healthLog.subtitle')}
          </Body>
        </Card>

        {/* Bristol Scale Selection */}
        <Heading style={styles.sectionTitle}>
          {t('health:healthLog.bristolScale')}
        </Heading>

        <Card style={styles.bristolCard}>
          <View style={styles.bristolGrid}>
            {BRISTOL_TYPES.map(({ type, name, description }) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.bristolItem,
                  selectedType === type && styles.bristolItemSelected,
                ]}
                onPress={() => setSelectedType(type)}>
                <View
                  style={[
                    styles.bristolNumber,
                    selectedType === type && styles.bristolNumberSelected,
                  ]}>
                  <Body
                    style={[
                      styles.bristolNumberText,
                      selectedType === type && styles.bristolNumberTextSelected,
                    ]}>
                    {type}
                  </Body>
                </View>
                <Caption style={styles.bristolName}>{name}</Caption>
              </TouchableOpacity>
            ))}
          </View>

          {selectedType && (
            <View style={styles.descriptionContainer}>
              <Icon
                name="information-outline"
                size={20}
                color={theme.colors.status.info}
              />
              <Body style={styles.description}>
                {
                  BRISTOL_TYPES.find(item => item.type === selectedType)
                    ?.description
                }
              </Body>
            </View>
          )}
        </Card>

        {/* Notes Input */}
        <Heading style={styles.sectionTitle}>
          {t('health:healthLog.notes')}
        </Heading>
        <Card>
          <TextInput
            style={styles.notesInput}
            placeholder={t('health:healthLog.notesPlaceholder')}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </Card>

        {/* Save Button */}
        <Button
          title={t('health:healthLog.save')}
          onPress={handleSaveLog}
          disabled={!selectedType}
          style={styles.saveButton}
        />

        {/* Today's Log */}
        {todayLog && (
          <>
            <Heading style={styles.sectionTitle}>
              {t('health:healthLog.today')}
            </Heading>
            <Card variant="noble">
              <View style={styles.todayLogContent}>
                <View style={styles.todayLogHeader}>
                  <Icon
                    name="check-circle"
                    size={24}
                    color={theme.colors.status.success}
                  />
                  <Body style={styles.todayLogTitle}>기록 완료</Body>
                </View>
                <Body style={styles.todayLogType}>
                  Type {todayLog.bristolType}:{' '}
                  {BRISTOL_TYPES[todayLog.bristolType - 1].name}
                </Body>
                {todayLog.notes && (
                  <Caption style={styles.todayLogNotes}>
                    {todayLog.notes}
                  </Caption>
                )}
                <Caption style={styles.todayLogTime}>
                  {format(new Date(todayLog.date), 'HH:mm')}
                </Caption>
              </View>
            </Card>
          </>
        )}

        {/* Weekly Pattern */}
        <Heading style={styles.sectionTitle}>
          {t('health:healthLog.pattern')}
        </Heading>
        <Card>
          <View style={styles.weeklyPattern}>
            {[0, 1, 2, 3, 4, 5, 6].map(dayOffset => {
              const date = new Date();
              date.setDate(date.getDate() - dayOffset);
              const dateString = date.toDateString();

              const log = recentLogs.find(
                l => new Date(l.date).toDateString() === dateString
              );

              return (
                <View key={dayOffset} style={styles.weekDay}>
                  <Caption style={styles.weekDayLabel}>
                    {format(date, 'EEE')}
                  </Caption>
                  {log ? (
                    <View
                      style={[
                        styles.weekDayDot,
                        {
                          backgroundColor: getBristolColor(log.bristolType),
                        },
                      ]}>
                      <Caption style={styles.weekDayType}>
                        {log.bristolType}
                      </Caption>
                    </View>
                  ) : (
                    <View style={styles.weekDayEmpty}>
                      <Icon
                        name="minus"
                        size={16}
                        color={theme.colors.border.medium}
                      />
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </Card>

        {/* Health Tips */}
        <Card variant="noble" style={styles.tipsCard}>
          <Heading style={styles.tipsTitle}>💡 건강 팁</Heading>
          <Body style={styles.tipsText}>
            • Type 3-4: 이상적인 상태입니다{'\n'}
            • Type 1-2: 수분과 섬유질 섭취를 늘려주세요{'\n'}
            • Type 6-7: 탈수 방지를 위해 수분을 보충하세요{'\n'}
            • 규칙적인 기록으로 건강 패턴을 파악하세요
          </Body>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const getBristolColor = (type: number): string => {
  if (type <= 2) return theme.colors.status.warning;
  if (type <= 5) return theme.colors.status.success;
  return theme.colors.status.error;
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

  subtitleCard: {
    marginBottom: theme.spacing.lg,
  },

  subtitle: {
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily.sansMedium,
    color: theme.colors.primary.navy,
  },

  sectionTitle: {
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },

  bristolCard: {
    marginBottom: theme.spacing.md,
  },

  bristolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  bristolItem: {
    width: '30%',
    alignItems: 'center',
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.border.light,
  },

  bristolItemSelected: {
    borderColor: theme.colors.primary.gold,
    backgroundColor: theme.colors.primary.cream,
  },

  bristolNumber: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.border.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xs,
  },

  bristolNumberSelected: {
    backgroundColor: theme.colors.primary.gold,
  },

  bristolNumberText: {
    fontFamily: theme.typography.fontFamily.sansBold,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.primary,
  },

  bristolNumberTextSelected: {
    color: theme.colors.text.inverse,
  },

  bristolName: {
    textAlign: 'center',
    fontSize: theme.typography.fontSize.xs,
  },

  descriptionContainer: {
    flexDirection: 'row',
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary.cream,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },

  description: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    color: theme.colors.primary.navy,
  },

  notesInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontFamily: theme.typography.fontFamily.sans,
    fontSize: theme.typography.fontSize.base,
  },

  saveButton: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },

  todayLogContent: {
    padding: theme.spacing.sm,
  },

  todayLogHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },

  todayLogTitle: {
    marginLeft: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily.sansBold,
    color: theme.colors.status.success,
  },

  todayLogType: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.primary.navy,
  },

  todayLogNotes: {
    marginBottom: theme.spacing.xs,
    fontStyle: 'italic',
  },

  todayLogTime: {
    color: theme.colors.text.light,
  },

  weeklyPattern: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  weekDay: {
    alignItems: 'center',
  },

  weekDayLabel: {
    marginBottom: theme.spacing.xs,
    fontSize: theme.typography.fontSize.xs,
  },

  weekDayDot: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },

  weekDayType: {
    color: theme.colors.text.inverse,
    fontFamily: theme.typography.fontFamily.sansBold,
  },

  weekDayEmpty: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tipsCard: {
    marginTop: theme.spacing.lg,
  },

  tipsTitle: {
    marginBottom: theme.spacing.md,
    color: theme.colors.primary.navy,
  },

  tipsText: {
    lineHeight: theme.typography.fontSize.base * 1.8,
  },
});

export default HealthLogScreen;
