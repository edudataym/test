/**
 * TypeScript Type Definitions
 * 앱 전체에서 사용되는 타입 정의
 */

import { NobleRank, BeverageType, SebastianTone } from '@constants/config';

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  nobleRank: NobleRank;
  dailyWaterGoal: number; // ml
  dailyFiberGoal: number; // g
  notificationEnabled: boolean;
  notificationTone: SebastianTone;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  notificationEnabled: boolean;
  sebastianTone: SebastianTone;
  waterReminderInterval: number;
  theme: 'light' | 'dark';
  language: 'ko' | 'en';
}

// Water Tracking Types
export interface WaterLog {
  id: string;
  userId: string;
  amount: number; // ml
  beverageType: BeverageType;
  timestamp: string;
  createdAt: string;
}

export interface WaterStats {
  todayTotal: number;
  goalPercentage: number;
  weeklyAverage: number;
  streak: number; // 연속 달성 일수
}

// Meal Tracking Types
export interface MealLog {
  id: string;
  userId: string;
  imageUrl?: string;
  fiberAmount: number; // g
  description?: string;
  sebastianComment?: string;
  timestamp: string;
  createdAt: string;
}

export interface MealStats {
  todayTotal: number;
  goalPercentage: number;
  weeklyAverage: number;
  topFoods: Array<{ name: string; fiber: number }>;
}

// Health Log Types
export interface HealthLog {
  id: string;
  userId: string;
  bristolType: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  notes?: string;
  date: string;
  createdAt: string;
}

export interface HealthAnalysis {
  averageBristolType: number;
  consistency: 'regular' | 'irregular' | 'concerning';
  patterns: string[];
  suggestions: string[];
}

// Chat/Conversation Types
export interface Conversation {
  id: string;
  userId: string;
  userMessage: string;
  sebastianReply: string;
  context?: ChatContext;
  timestamp: string;
}

export interface ChatContext {
  waterIntake: number;
  fiberIntake: number;
  lastHealthLog?: HealthLog;
  recentAchievements?: string[];
}

// Achievement Types
export interface Achievement {
  id: string;
  achievementType: string;
  title: string;
  description: string;
  icon?: string;
  unlockedAt?: string;
  progress?: {
    current: number;
    total: number;
  };
}

// Report Types
export interface WeeklyReport {
  id: string;
  userId: string;
  weekStart: string;
  weekEnd: string;
  avgWaterIntake: number;
  avgFiberIntake: number;
  healthLogCount: number;
  sebastianComment: string;
  suggestions: string[];
  achievements: Achievement[];
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Navigation Types
export type RootStackParamList = {
  Main: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Water: undefined;
  Meal: undefined;
  HealthLog: undefined;
  Chat: undefined;
  Report: { reportId?: string };
  Settings: undefined;
  Profile: undefined;
  Achievements: undefined;
};

// Component Props Types
export interface SebastianAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export interface SebastianMessageProps {
  message: string;
  timestamp?: string;
  tone?: SebastianTone;
}

export interface WaterGlassProps {
  current: number;
  goal: number;
  animated?: boolean;
}

export interface FiberChartProps {
  data: number[];
  labels: string[];
  goal: number;
}

export interface BristolChartProps {
  selectedType?: number;
  onSelect: (type: number) => void;
  readonly?: boolean;
}

// Form Types
export interface WaterFormData {
  amount: number;
  beverageType: BeverageType;
}

export interface MealFormData {
  fiberAmount: number;
  description?: string;
  image?: {
    uri: string;
    type: string;
    name: string;
  };
}

export interface HealthLogFormData {
  bristolType: number;
  notes?: string;
}

// Redux State Types
export interface RootState {
  user: UserState;
  water: WaterState;
  meal: MealState;
  health: HealthState;
  chat: ChatState;
  ui: UIState;
}

export interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface WaterState {
  logs: WaterLog[];
  todayTotal: number;
  statistics: WaterStats | null;
  loading: boolean;
  error: string | null;
}

export interface MealState {
  logs: MealLog[];
  todayTotal: number;
  statistics: MealStats | null;
  loading: boolean;
  error: string | null;
}

export interface HealthState {
  logs: HealthLog[];
  todayLog: HealthLog | null;
  analysis: HealthAnalysis | null;
  loading: boolean;
  error: string | null;
}

export interface ChatState {
  conversations: Conversation[];
  isTyping: boolean;
  error: string | null;
}

export interface UIState {
  theme: 'light' | 'dark';
  language: 'ko' | 'en';
  notificationsEnabled: boolean;
  isOnline: boolean;
}

// Utility Types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncData<T> = {
  data: Nullable<T>;
  loading: boolean;
  error: Nullable<string>;
};
