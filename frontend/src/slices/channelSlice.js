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
    switchChannel: (state, { payload }) => {
      state.currentChannelID = payload;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    renameChannel: (state, { payload: { id, name: newName } }) => {
      const channelTarget = state.channels.find((channel) => channel.id === id);
      channelTarget.name = newName;
    },
    removeChannel: (state, { payload: { id } }) => {
      const { currentChannelID } = state;
      if (currentChannelID === id) {
        state.currentChannelID = '1';
      }
      const filteredChannels = state.channels.filter(({ id: idX }) => idX !== id);
      state.channels = filteredChannels;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        chatApi.endpoints.getChannels.matchFulfilled,
        (state, { payload }) => {
          state.channels = payload;
          state.currentChannelID = payload[0].id;
        },
      )
      .addMatcher(
        chatApi.endpoints.sendChannel.matchFulfilled,
        (state, { payload: { id } }) => {
          state.currentChannelID = id;
        },
      );
  },
});

export const {
  removeChannels, switchChannel, addChannel, renameChannel, removeChannel,
} = channelSlice.actions;

export default channelSlice.reducer;
