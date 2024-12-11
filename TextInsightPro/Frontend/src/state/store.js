import { configureStore } from '@reduxjs/toolkit';
import fileDataReducer from './fileDataSlice';

const store = configureStore({
  reducer: {
    fileData: fileDataReducer,
    // Add other reducers if needed
  },
});

export default store;