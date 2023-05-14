import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPhotos, setCurrentPage, setSortBy, setCategory, setLeft } from './redux/photosSlice';
import './App.css';
import axios from 'axios';
import { CATEGORY } from './constants';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import GridGallery from './components/gridGallery/gridGallery';

const App = () => {
  const category = useSelector(state => state.photo.category);
  const currentPage = useSelector(state => state.photo.currentPage);
  const perPage = useSelector(state => state.photo.perPage);
  const sortBy = useSelector(state => state.photo.sortBy);
  const left = useSelector(state => state.photo.left);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchPhotos();
  }, [category, currentPage, sortBy]);

  const fetchPhotos = async() => {
    try {
      const response = await axios.get('/photos/fetchPhotos', {
        params: {
          category: category,
          sort: sortBy,
          page: currentPage,
          perPage: perPage
        },
      });
      dispatch(setLeft(response.data.left));
      dispatch(setPhotos(response.data.photos));
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch photos');
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handleSortByChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  return (
    <div className='container'>
      <div className='option-bar'>
        <button 
          className={`button-scroll ${currentPage===1 && "disable" }`} 
          onClick={handlePrevPage} 
          disabled={currentPage===1}
        >
          &laquo; prev
        </button>
       
        <FormControl className='type-box'>
          <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Select Category"
            onChange={handleCategoryChange}
          >
            {CATEGORY.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
          </Select>
        </FormControl>
      
        <button 
          className={`button-scroll ${left<1 && "disable" }`} 
          onClick={handleNextPage}
          disabled={left<1}
        >
          next &raquo;
        </button>
      </div>

      {/* <div>
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="date">Sort by Date</option>
          <option value="id">Sort by ID</option>
        </select>
      </div> */}

      <GridGallery />

    </div>
  );
};

export default App;
