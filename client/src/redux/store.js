import { configureStore } from '@reduxjs/toolkit';
import listReducer from './listSlice';
import authReducer from './authSlice';
import errorReducer from './errorSlice';

export default configureStore({
  reducer: {
      list: listReducer,
      auth: authReducer,
      error: errorReducer
  },
});