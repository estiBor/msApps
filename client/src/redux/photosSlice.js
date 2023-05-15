import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPhotos = () => async (dispatch, getState) => {
  const { category, sortBy, currentPage, perPage } = getState().photo;
  try {
    const response = await axios.get('/photos/fetchPhotos', {
      params: {
        category,
        sortBy,
        page: currentPage,
        perPage
      },
    });
    dispatch(setLeft(response.data.left));
    dispatch(setPhotos(response.data.photos));
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch photos');
  }
}

const photoSlice = createSlice({
  name: 'photo',
  initialState: {
    photos: [],
    category: 'nature',
    currentPage: 1,
    perPage: 9, // although 3*3 is constant for now, I added this option for future upgrade
    sortBy: 'popular',
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
