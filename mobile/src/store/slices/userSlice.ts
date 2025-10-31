/**
 * User Redux Slice
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '@/@types';
import { NobleRank, SebastianTone, HEALTH_GOALS } from '@constants/config';

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    updateUserRank: (state, action: PayloadAction<NobleRank>) => {
      if (state.currentUser) {
        state.currentUser.nobleRank = action.payload;
      }
    },

    updateUserGoals: (
      state,
      action: PayloadAction<{ water?: number; fiber?: number }>
    ) => {
      if (state.currentUser) {
        if (action.payload.water) {
          state.currentUser.dailyWaterGoal = action.payload.water;
        }
        if (action.payload.fiber) {
          state.currentUser.dailyFiberGoal = action.payload.fiber;
        }
      }
    },

    updateNotificationSettings: (
      state,
      action: PayloadAction<{
        enabled?: boolean;
        tone?: SebastianTone;
      }>
    ) => {
      if (state.currentUser) {
        if (action.payload.enabled !== undefined) {
          state.currentUser.notificationEnabled = action.payload.enabled;
        }
        if (action.payload.tone) {
          state.currentUser.notificationTone = action.payload.tone;
        }
      }
    },

    logout: state => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Mock login for development
    mockLogin: state => {
      state.currentUser = {
        id: 'mock-user-1',
        email: 'lord@manor.com',
        name: '귀족님',
        nobleRank: NobleRank.BARON,
        dailyWaterGoal: HEALTH_GOALS.DAILY_WATER_ML,
        dailyFiberGoal: HEALTH_GOALS.DAILY_FIBER_G,
        notificationEnabled: true,
        notificationTone: SebastianTone.POLITE,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.isAuthenticated = true;
    },
  },
});

export const {
  setUser,
  updateUserRank,
  updateUserGoals,
  updateNotificationSettings,
  logout,
  setLoading,
  setError,
  mockLogin,
} = userSlice.actions;

export default userSlice.reducer;
