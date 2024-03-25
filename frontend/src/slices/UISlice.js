/* eslint-disable no-param-reassign */

import { createSlice, current } from '@reduxjs/toolkit';
import { chatApi } from '../services/chatApi';
import { switchChannel } from './channelSlice';

const initialState = {
  modal: {
    isOpened: false,
    type: null,
    chnId: null,
  },
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
    openModal: (state, { payload: { type, isOpened, chnId = null } }) => {
      state.modal.type = type;
      state.modal.isOpened = isOpened;
      state.modal.chnId = chnId;
    },
    closeModal: (state) => {
      state.modal.isOpened = false;
      state.modal.type = null;
      state.modal.chnId = null;
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

export const { setCurrentChannelListPosition, openModal, closeModal } = uiSlice.actions;

export default uiSlice.reducer;
