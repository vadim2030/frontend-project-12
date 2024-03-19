/* eslint-disable no-param-reassign */

import { createSlice, current } from '@reduxjs/toolkit';
import { chatApi } from '../services/chatApi';
import { switchChannel } from './channelSlice';

const initialState = {
  currentChannelListPosition: null,
  currentChannelID: null,
};

const uiSlice = createSlice({
  name: 'UISlice',
  initialState,
  reducers: {
    setCurrentChannelListPosition: (state, { payload }) => {
      state.currentChannelListPosition = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(switchChannel, (state, { payload }) => {
        state.currentChannelID = payload;
      })
      .addMatcher(
        chatApi.endpoints.removeChannel.matchFulfilled,
        (state, { payload }) => {
          if (current(state).currentChannelID === payload.id) {
            state.currentChannelID = '1';
            state.currentChannelListPosition = 'start';
          }
        },
      )
      .addMatcher(
        chatApi.endpoints.sendChannel.matchFulfilled,
        (state, { payload: { id } }) => {
          state.currentChannelID = id;
          state.currentChannelListPosition = 'end';
        },
      );
  },
});

export const { setCurrentChannelListPosition } = uiSlice.actions;

export default uiSlice.reducer;
