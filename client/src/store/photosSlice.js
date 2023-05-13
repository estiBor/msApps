import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPhotos = createAsyncThunk('/photos', async (category, sortBy, page, perPage) => {
  console.log('xx',category, sortBy, page, perPage);
    try {
      const response = await axios.get('/photos/fetchPhotos', {
        params: {
          category,
          sortBy,
          page,
          perPage,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch photos');
    }
});

// export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async (category, sortBy, page, perPage) => {
//   console.log('xx',category, sortBy, page, perPage);
//   const response = await axios.get(`https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}&image_type=photo&safesearch=true&per_page=${perPage}&page=${page}&order=${sortBy}`);
//   return response.data.hits;
// });

const photosSlice = createSlice({
  name: 'photos',
  initialState: {
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.data = [];
        state.error = null;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.data = action.payload.slice(0, 9);
        state.error = null;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.data = [];
        state.error = action.error.message;
      });
  },
});

export default photosSlice.reducer;
