import { configureStore } from '@reduxjs/toolkit';
import { chatApi } from '../services/chatApi';
import authReducer from '../slices/authSlice';
import channelReducer from '../slices/channelSlice';
import messagesReducer from '../slices/messagesSlice';
import modalReducer from '../slices/modalSlice';
import UIReducer from '../slices/UISlice';

const store = configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
    authData: authReducer,
    channelData: channelReducer,
    messagesData: messagesReducer,
    modal: modalReducer,
    UI: UIReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chatApi.middleware),
});

export default store;
