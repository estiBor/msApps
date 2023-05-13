import { configureStore } from '@reduxjs/toolkit';
import photosSlice from './photosSlice';

const store = configureStore({
  reducer: {
    photo: photosSlice,
  },
});

export default store;
