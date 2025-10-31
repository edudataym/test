/**
 * Chat Redux Slice
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation, ChatState } from '@/@types';

const initialState: ChatState = {
  conversations: [],
  isTyping: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{
        userMessage: string;
        sebastianReply: string;
      }>
    ) => {
      const newConversation: Conversation = {
        id: `chat-${Date.now()}`,
        userId: 'mock-user-1',
        userMessage: action.payload.userMessage,
        sebastianReply: action.payload.sebastianReply,
        timestamp: new Date().toISOString(),
      };

      state.conversations.push(newConversation);
      state.isTyping = false;
    },

    addUserMessage: (state, action: PayloadAction<string>) => {
      // Temporary user message while waiting for Sebastian's reply
      const tempConversation: Conversation = {
        id: `chat-temp-${Date.now()}`,
        userId: 'mock-user-1',
        userMessage: action.payload,
        sebastianReply: '',
        timestamp: new Date().toISOString(),
      };

      state.conversations.push(tempConversation);
      state.isTyping = true;
    },

    updateLastReply: (state, action: PayloadAction<string>) => {
      const lastConversation = state.conversations[state.conversations.length - 1];
      if (lastConversation) {
        lastConversation.sebastianReply = action.payload;
        lastConversation.id = `chat-${Date.now()}`;
      }
      state.isTyping = false;
    },

    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },

    setTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },

    clearConversations: state => {
      state.conversations = [];
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isTyping = false;
    },
  },
});

export const {
  addMessage,
  addUserMessage,
  updateLastReply,
  setConversations,
  setTyping,
  clearConversations,
  setError,
} = chatSlice.actions;

export default chatSlice.reducer;
