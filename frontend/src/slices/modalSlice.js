/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  chnId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload: { type, isOpened, chnId = null } }) => {
      state.type = type;
      state.isOpened = isOpened;
      state.chnId = chnId;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.chnId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
