import { createSlice } from '@reduxjs/toolkit';

const photoSlice = createSlice({
  name: 'photo',
  initialState: {
    photos: [],
    category: 'nature',
    currentPage: 1,
    perPage: 9, // although 3*3 is constant for now, I added this option for future upgrade
    sortBy: 'date',
    left: 0
  },
  reducers: {
    setPhotos: (state, action) => {
      state.photos = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setLeft: (state, action) => {
      state.left = action.payload;
    }
  },
});

export const {
  setPhotos,
  setCategory,
  setCurrentPage,
  setSortBy,
  setLeft
} = photoSlice.actions;

export default photoSlice.reducer;
