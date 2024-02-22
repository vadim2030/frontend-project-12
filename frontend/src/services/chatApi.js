import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getRoutes from '../routes.js';

export const chatApi = createApi({
  reducerPath: 'ChatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getRoutes.baseQuery(),
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
    getChannels: build.query({
      query: () => 'channels',
    }),
    getMessages: build.query({
      query: () => 'messages',
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
} = chatApi;
