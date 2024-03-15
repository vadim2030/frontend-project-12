/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { chatApi } from '../services/chatApi';

const initialState = {
  currentChannelListPosition: 'start',
};

const UISlice = createSlice({
  name: 'UISlice',
  initialState,
  reducers: {
    setCurrentChannelListPosition: (state, { payload }) => {
      state.currentChannelListPosition = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        chatApi.endpoints.removeChannel.matchFulfilled,
        (state) => {
          state.currentChannelListPosition = 'start';
        },
      )
      .addMatcher(
        chatApi.endpoints.sendChannel.matchFulfilled,
        (state) => {
          state.currentChannelListPosition = 'end';
        },
      );
  },
});

export const { setCurrentChannelListPosition } = UISlice.actions;

export default UISlice.reducer;
