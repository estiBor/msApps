import { createSlice } from '@reduxjs/toolkit';

const photoSlice = createSlice({
  name: 'photo',
  initialState: {
    photos: [],
    currentPage: 1,
    perPage: 9,
    sortBy: 'date',
  },
  reducers: {
    setPhotos: (state, action) => {
      state.photos = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setPhotos,
  setCurrentPage,
  setPerPage,
  setSortBy,
} = photoSlice.actions;

export default photoSlice.reducer;
