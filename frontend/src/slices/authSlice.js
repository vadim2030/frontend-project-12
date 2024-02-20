/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { chatApi } from '../services/chatApi';

const initialState = {
  username: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { username, token } }) => {
      state.username = username;
      state.token = token;
    },
    removeCredentials: (state) => {
      state.username = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      chatApi.endpoints.login.matchFulfilled,
      (state, { payload: { username, token } }) => {
        state.username = username;
        state.token = token;
      },
    );
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;

export default authSlice.reducer;
