import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = '/api/v1/';

export const chatApi = createApi({
  reducerPath: 'ChatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseQuery,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().authData;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: build.mutation({
      query: (credentials) => ({
        url: 'signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    getChannels: build.query({
      query: () => 'channels',
    }),
    getMessages: build.query({
      query: () => 'messages',
    }),
    sendChannel: build.mutation({
      query: (newChannel) => ({
        url: 'channels',
        method: 'POST',
        body: newChannel,
      }),
    }),
    renameChannel: build.mutation({
      query: (data) => ({
        url: `/channels/${data.id}`,
        method: 'PATCH',
        body: { name: data.name },
      }),
    }),
    removeChannel: build.mutation({
      query: (data) => ({
        url: `/channels/${data.id}`,
        method: 'DELETE',
        body: data,
      }),
    }),
    sendMessage: build.mutation({
      query: (newMessage) => ({
        url: 'messages',
        method: 'POST',
        body: newMessage,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetChannelsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useSendChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
  useSignupMutation,
} = chatApi;
