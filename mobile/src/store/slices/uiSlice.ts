/**
 * UI State Redux Slice
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState } from '@/@types';

const initialState: UIState = {
  theme: 'light',
  language: 'ko',
  notificationsEnabled: true,
  isOnline: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },

    setLanguage: (state, action: PayloadAction<'ko' | 'en'>) => {
      state.language = action.payload;
    },

    setNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.notificationsEnabled = action.payload;
    },

    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
  },
});

export const {
  setTheme,
  setLanguage,
  setNotificationsEnabled,
  setOnlineStatus,
} = uiSlice.actions;

export default uiSlice.reducer;
