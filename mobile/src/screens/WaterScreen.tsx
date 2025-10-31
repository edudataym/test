/**
 * Water Tracking Screen
 * Track water and beverage intake
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';

import { RootState } from '@store/store';
import { addWaterLog } from '@store/slices/waterSlice';
import { theme } from '@theme/theme';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Title, Heading, Body, Caption } from '@components/common/Typography';
import { BeverageType, HEALTH_GOALS } from '@constants/config';

const WaterScreen: React.FC = () => {
  const { t } = useTranslation(['common', 'health']);
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.user);
  const { logs, todayTotal } = useSelector((state: RootState) => state.water);

  const waterGoal = currentUser?.dailyWaterGoal || HEALTH_GOALS.DAILY_WATER_ML;
  const percentage = Math.min((todayTotal / waterGoal) * 100, 100);

  const [selectedType, setSelectedType] = useState<BeverageType>(
    BeverageType.WATER
  );
  const [customAmount, setCustomAmount] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleQuickAdd = (amount: number) => {
    dispatch(addWaterLog({ amount, beverageType: selectedType }));
  };

  const handleCustomAdd = () => {
    const amount = parseInt(customAmount, 10);
    if (amount > 0) {
      dispatch(addWaterLog({ amount, beverageType: selectedType }));
      setCustomAmount('');
      setShowCustomInput(false);
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
            name="water-outline"
            size={24}
            color={theme.colors.water.glass}
          />
          <Title style={styles.headerTitle}>{t('health:water.title')}</Title>
        </View>

        {/* Water Glass Visualization */}
        <Card variant="default" style={styles.glassCard}>
          <View style={styles.glassContainer}>
            <Caption style={styles.goalText}>
              {t('health:water.goal')}: {waterGoal}ml
            </Caption>

            {/* Simple water glass */}
            <View style={styles.glass}>
              <View
                style={[
                  styles.waterFill,
                  {
                    height: `${percentage}%`,
                    backgroundColor: theme.colors.water.glass,
                  },
                ]}
              />
            </View>

            <Heading style={styles.amountText}>
              {todayTotal} / {waterGoal}ml
            </Heading>
            <Caption style={styles.percentageText}>
              {Math.round(percentage)}% {t('health:water.achievement')}
            </Caption>
          </View>
        </Card>

        {/* Beverage Type Selection */}
        <Heading style={styles.sectionTitle}>
          {t('health:water.beverageType')}
        </Heading>
        <View style={styles.typeContainer}>
          {Object.values(BeverageType).map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                selectedType === type && styles.typeButtonActive,
              ]}
              onPress={() => setSelectedType(type)}>
              <Icon
                name={getBeverageIcon(type)}
                size={24}
                color={
                  selectedType === type
                    ? theme.colors.text.inverse
                    : theme.colors.primary.navy
                }
              />
              <Caption
                style={[
                  styles.typeText,
                  selectedType === type && styles.typeTextActive,
                ]}>
                {t(`health:water.types.${type.toLowerCase()}`)}
              </Caption>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Add Buttons */}
        <Heading style={styles.sectionTitle}>
          {t('health:water.quickAdd')}
        </Heading>
        <View style={styles.quickAddContainer}>
          <Button
            title="250ml"
            onPress={() => handleQuickAdd(250)}
            variant="outline"
            style={styles.quickButton}
          />
          <Button
            title="500ml"
            onPress={() => handleQuickAdd(500)}
            variant="outline"
            style={styles.quickButton}
          />
          <Button
            title={t('health:water.customAmount')}
            onPress={() => setShowCustomInput(!showCustomInput)}
            variant="outline"
            style={styles.quickButton}
          />
        </View>

        {/* Custom Amount Input */}
        {showCustomInput && (
          <View style={styles.customInputContainer}>
            <TextInput
              style={styles.customInput}
              placeholder="ml"
              keyboardType="numeric"
              value={customAmount}
              onChangeText={setCustomAmount}
            />
            <Button
              title={t('common:add')}
              onPress={handleCustomAdd}
              size="sm"
              style={styles.customAddButton}
            />
          </View>
        )}

        {/* Today's Log */}
        <Heading style={styles.sectionTitle}>
          {t('health:water.history')}
        </Heading>
        {todayLogs.length > 0 ? (
          <View>
            {todayLogs.map(log => (
              <Card key={log.id} style={styles.logCard}>
                <View style={styles.logRow}>
                  <View style={styles.logLeft}>
                    <Icon
                      name={getBeverageIcon(log.beverageType)}
                      size={20}
                      color={theme.colors.water.glass}
                    />
                    <Body style={styles.logType}>
                      {t(
                        `health:water.types.${log.beverageType.toLowerCase()}`
                      )}
                    </Body>
                  </View>
                  <View style={styles.logRight}>
                    <Body style={styles.logAmount}>{log.amount}ml</Body>
                    <Caption style={styles.logTime}>
                      {format(new Date(log.timestamp), 'HH:mm')}
                    </Caption>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        ) : (
          <Card>
            <Body style={styles.emptyText}>
              {t('health:water.history')} 기록이 없습니다
            </Body>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const getBeverageIcon = (type: BeverageType): string => {
  const icons: Record<BeverageType, string> = {
    [BeverageType.WATER]: 'water',
    [BeverageType.TEA]: 'tea',
    [BeverageType.SPARKLING]: 'cup-water',
    [BeverageType.OTHER]: 'cup',
  };
  return icons[type];
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

  glassCard: {
    marginBottom: theme.spacing.lg,
  },

  glassContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },

  goalText: {
    marginBottom: theme.spacing.md,
  },

  glass: {
    width: 120,
    height: 200,
    borderWidth: 3,
    borderColor: theme.colors.water.glass,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },

  waterFill: {
    width: '100%',
    borderBottomLeftRadius: theme.borderRadius.lg - 3,
    borderBottomRightRadius: theme.borderRadius.lg - 3,
  },

  amountText: {
    color: theme.colors.primary.navy,
    marginBottom: theme.spacing.xs,
  },

  percentageText: {
    color: theme.colors.text.secondary,
  },

  sectionTitle: {
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },

  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.md,
  },

  typeButton: {
    flex: 1,
    minWidth: '45%',
    margin: theme.spacing.xs,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.border.medium,
    alignItems: 'center',
    backgroundColor: theme.colors.background.card,
  },

  typeButtonActive: {
    backgroundColor: theme.colors.primary.navy,
    borderColor: theme.colors.primary.navy,
  },

  typeText: {
    marginTop: theme.spacing.xs,
    color: theme.colors.text.primary,
  },

  typeTextActive: {
    color: theme.colors.text.inverse,
  },

  quickAddContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },

  quickButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },

  customInputContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    alignItems: 'center',
  },

  customInput: {
    flex: 1,
    height: theme.dimensions.input.height,
    borderWidth: 1,
    borderColor: theme.colors.border.medium,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    fontFamily: theme.typography.fontFamily.sans,
    fontSize: theme.typography.fontSize.base,
    marginRight: theme.spacing.sm,
  },

  customAddButton: {
    minWidth: 80,
  },

  logCard: {
    marginBottom: theme.spacing.sm,
  },

  logRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logType: {
    marginLeft: theme.spacing.sm,
  },

  logRight: {
    alignItems: 'flex-end',
  },

  logAmount: {
    fontFamily: theme.typography.fontFamily.sansBold,
    color: theme.colors.water.glass,
  },

  logTime: {
    marginTop: theme.spacing.xs,
  },

  emptyText: {
    textAlign: 'center',
    color: theme.colors.text.light,
  },
});

export default WaterScreen;
