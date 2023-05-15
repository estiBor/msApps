import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setSortBy, setCategory, fetchPhotos } from '../../redux/photosSlice';
import styles from './menuBar.module.css';
import { CATEGORY } from '../../constants';
import { FormControl, MenuItem, Select, InputLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const MenuBar = () => {
  const category = useSelector(state => state.photo.category);
  const currentPage = useSelector(state => state.photo.currentPage);
  const perPage = useSelector(state => state.photo.perPage);
  const sortBy = useSelector(state => state.photo.sortBy);
  const left = useSelector(state => state.photo.left);

  const dispatch = useDispatch();

  //get the next/prev 9 photo's
  useEffect(() => {
      dispatch(fetchPhotos());
  }, [currentPage]);
 
  //return to the first page on change of category or order
  useEffect(() => {
    if(currentPage!==1)
      dispatch(setCurrentPage(1));
    else dispatch(fetchPhotos());
  }, [category, sortBy]);

 

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
    <div className={styles.menuBar}>
      <div className={styles.optionBar}>
        <button 
          className={`${styles.buttonScroll} ${currentPage===1 && styles.disable }`}
          onClick={handlePrevPage} 
          disabled={currentPage===1}
        >
          &laquo; prev
        </button>
       
        <FormControl className={styles.typeBox}>
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
          className={`${styles.buttonScroll} ${left < 1 && styles.disable}` } 
          onClick={handleNextPage}
          disabled={left<1}
        >
          next &raquo;
        </button>
      </div>

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={sortBy}
          onChange={handleSortByChange}
          row
        >
          <FormControlLabel value="popular" control={<Radio />} label="popular" />
          <FormControlLabel value="latest" control={<Radio />} label="latest" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default MenuBar;
