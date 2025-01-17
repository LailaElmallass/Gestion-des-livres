// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../features/BookSlice';

const store = configureStore({
  reducer: {
    Books: bookReducer, 
  },
});

export default store;
