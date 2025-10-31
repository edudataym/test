/**
 * Health Log Redux Slice
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HealthLog, HealthState } from '@/@types';

const initialState: HealthState = {
  logs: [],
  todayLog: null,
  analysis: null,
  loading: false,
  error: null,
};

const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {
    addHealthLog: (
      state,
      action: PayloadAction<{
        bristolType: 1 | 2 | 3 | 4 | 5 | 6 | 7;
        notes?: string;
      }>
    ) => {
      const newLog: HealthLog = {
        id: `health-${Date.now()}`,
        userId: 'mock-user-1',
        bristolType: action.payload.bristolType,
        notes: action.payload.notes,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      state.logs.unshift(newLog);
      state.todayLog = newLog;
    },

    updateHealthLog: (
      state,
      action: PayloadAction<{
        id: string;
        bristolType?: number;
        notes?: string;
      }>
    ) => {
      const log = state.logs.find(l => l.id === action.payload.id);
      if (log) {
        if (action.payload.bristolType) {
          log.bristolType = action.payload.bristolType as 1 | 2 | 3 | 4 | 5 | 6 | 7;
        }
        if (action.payload.notes !== undefined) {
          log.notes = action.payload.notes;
        }
      }
    },

    setHealthLogs: (state, action: PayloadAction<HealthLog[]>) => {
      state.logs = action.payload;

      const today = new Date().toDateString();
      state.todayLog =
        action.payload.find(
          log => new Date(log.date).toDateString() === today
        ) || null;
    },

    analyzeHealthPattern: state => {
      const recentLogs = state.logs.slice(0, 7); // Last 7 days

      if (recentLogs.length === 0) {
        state.analysis = null;
        return;
      }

      const averageBristolType =
        recentLogs.reduce((sum, log) => sum + log.bristolType, 0) /
        recentLogs.length;

      // Determine consistency
      const variance = recentLogs.reduce(
        (sum, log) => sum + Math.pow(log.bristolType - averageBristolType, 2),
        0
      ) / recentLogs.length;

      let consistency: 'regular' | 'irregular' | 'concerning';
      if (variance < 1) {
        consistency = 'regular';
      } else if (variance < 2) {
        consistency = 'irregular';
      } else {
        consistency = 'concerning';
      }

      const patterns: string[] = [];
      const suggestions: string[] = [];

      // Analyze patterns
      if (averageBristolType < 3) {
        patterns.push('변비 경향');
        suggestions.push('수분과 식이섬유 섭취를 늘려주세요');
      } else if (averageBristolType > 5) {
        patterns.push('설사 경향');
        suggestions.push('수분 보충에 신경써주세요');
      } else {
        patterns.push('정상 범위');
        suggestions.push('현재 식습관을 유지하세요');
      }

      state.analysis = {
        averageBristolType,
        consistency,
        patterns,
        suggestions,
      };
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
  addHealthLog,
  updateHealthLog,
  setHealthLogs,
  analyzeHealthPattern,
  setLoading,
  setError,
} = healthSlice.actions;

export default healthSlice.reducer;
