/**
 * Meal Tracking Redux Slice
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MealLog, MealState } from '@/@types';

const initialState: MealState = {
  logs: [],
  todayTotal: 0,
  statistics: null,
  loading: false,
  error: null,
};

const mealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    addMealLog: (
      state,
      action: PayloadAction<{
        fiberAmount: number;
        description?: string;
        imageUrl?: string;
      }>
    ) => {
      const newLog: MealLog = {
        id: `meal-${Date.now()}`,
        userId: 'mock-user-1',
        fiberAmount: action.payload.fiberAmount,
        description: action.payload.description,
        imageUrl: action.payload.imageUrl,
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      state.logs.unshift(newLog);
      state.todayTotal += action.payload.fiberAmount;
    },

    removeMealLog: (state, action: PayloadAction<string>) => {
      const log = state.logs.find(l => l.id === action.payload);
      if (log) {
        state.todayTotal -= log.fiberAmount;
        state.logs = state.logs.filter(l => l.id !== action.payload);
      }
    },

    setSebastianComment: (
      state,
      action: PayloadAction<{ logId: string; comment: string }>
    ) => {
      const log = state.logs.find(l => l.id === action.payload.logId);
      if (log) {
        log.sebastianComment = action.payload.comment;
      }
    },

    setMealLogs: (state, action: PayloadAction<MealLog[]>) => {
      state.logs = action.payload;
      state.todayTotal = action.payload.reduce(
        (sum, log) => sum + log.fiberAmount,
        0
      );
    },

    updateStatistics: state => {
      const today = new Date().toDateString();
      const todayLogs = state.logs.filter(
        log => new Date(log.timestamp).toDateString() === today
      );

      const weeklyLogs = state.logs.filter(log => {
        const logDate = new Date(log.timestamp);
        const daysDiff =
          (Date.now() - logDate.getTime()) / (1000 * 60 * 60 * 24);
        return daysDiff <= 7;
      });

      const weeklyAverage =
        weeklyLogs.length > 0
          ? weeklyLogs.reduce((sum, log) => sum + log.fiberAmount, 0) / 7
          : 0;

      state.statistics = {
        todayTotal: todayLogs.reduce((sum, log) => sum + log.fiberAmount, 0),
        goalPercentage: 0,
        weeklyAverage,
        topFoods: [],
      };
    },

    resetDailyMeal: state => {
      state.todayTotal = 0;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addMealLog,
  removeMealLog,
  setSebastianComment,
  setMealLogs,
  updateStatistics,
  resetDailyMeal,
  setLoading,
  setError,
} = mealSlice.actions;

export default mealSlice.reducer;
