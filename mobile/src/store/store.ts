/**
 * Redux Store Configuration
 */

import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userReducer from './slices/userSlice';
import waterReducer from './slices/waterSlice';
import mealReducer from './slices/mealSlice';
import healthReducer from './slices/healthSlice';
import chatReducer from './slices/chatSlice';
import uiReducer from './slices/uiSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'water', 'meal', 'health', 'chat', 'ui'],
};

// Combine reducers
const rootReducer = {
  user: persistReducer(persistConfig, userReducer),
  water: persistReducer(persistConfig, waterReducer),
  meal: persistReducer(persistConfig, mealReducer),
  health: persistReducer(persistConfig, healthReducer),
  chat: persistReducer(persistConfig, chatReducer),
  ui: persistReducer(persistConfig, uiReducer),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
