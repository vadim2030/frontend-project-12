/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { chatApi } from '../services/chatApi';

const initialState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
    removeMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        chatApi.endpoints.getMessages.matchFulfilled,
        (state, { payload }) => {
          state.messages = payload;
        },
      )
      .addMatcher(
        chatApi.endpoints.removeChannel.matchFulfilled,
        (state, { payload }) => {
          const { messages } = state;
          const { id: removedChannelId } = payload;
          const filteredMessages = messages
            .filter(({ channelId }) => channelId !== removedChannelId);

          state.messages = filteredMessages;
        },
      );
  },
});

export const { removeMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
