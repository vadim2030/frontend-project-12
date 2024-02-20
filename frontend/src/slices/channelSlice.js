/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { chatApi } from '../services/chatApi';

const initialState = {
  channels: [],
  currentChannelID: null,
};

export const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    removeChannels: (state) => {
      state.channels = [];
      state.currentChannelID = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      chatApi.endpoints.getChannels.matchFulfilled,
      (state, { payload }) => {
        state.channels = payload;
        state.currentChannelID = payload[0].id;
      },
    );
  },
});

export const { removeChannels } = channelSlice.actions;

export default channelSlice.reducer;
