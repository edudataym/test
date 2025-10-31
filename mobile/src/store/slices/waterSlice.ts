/**
 * Water Tracking Redux Slice
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WaterLog, WaterState } from '@/@types';
import { BeverageType } from '@constants/config';

const initialState: WaterState = {
  logs: [],
  todayTotal: 0,
  statistics: null,
  loading: false,
  error: null,
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    addWaterLog: (
      state,
      action: PayloadAction<{
        amount: number;
        beverageType: BeverageType;
      }>
    ) => {
      const newLog: WaterLog = {
        id: `water-${Date.now()}`,
        userId: 'mock-user-1',
        amount: action.payload.amount,
        beverageType: action.payload.beverageType,
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      state.logs.unshift(newLog);
      state.todayTotal += action.payload.amount;
    },

    removeWaterLog: (state, action: PayloadAction<string>) => {
      const log = state.logs.find(l => l.id === action.payload);
      if (log) {
        state.todayTotal -= log.amount;
        state.logs = state.logs.filter(l => l.id !== action.payload);
      }
    },

    setWaterLogs: (state, action: PayloadAction<WaterLog[]>) => {
      state.logs = action.payload;
      state.todayTotal = action.payload.reduce(
        (sum, log) => sum + log.amount,
        0
      );
    },

    setTodayTotal: (state, action: PayloadAction<number>) => {
      state.todayTotal = action.payload;
    },

    updateStatistics: state => {
      // Calculate statistics
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
          ? weeklyLogs.reduce((sum, log) => sum + log.amount, 0) / 7
          : 0;

      state.statistics = {
        todayTotal: todayLogs.reduce((sum, log) => sum + log.amount, 0),
        goalPercentage: 0, // Will be calculated based on user goal
        weeklyAverage,
        streak: 0, // Will be calculated based on consecutive days
      };
    },

    resetDailyWater: state => {
      state.todayTotal = 0;
      // Keep logs but mark as previous day
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
  addWaterLog,
  removeWaterLog,
  setWaterLogs,
  setTodayTotal,
  updateStatistics,
  resetDailyWater,
  setLoading,
  setError,
} = waterSlice.actions;

export default waterSlice.reducer;
