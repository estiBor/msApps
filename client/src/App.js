import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPhotos } from './redux/photosSlice';
import './App.css';
import axios from 'axios';

const App = () => {
  const category = useSelector(state => state.photo.category);
  const photos = useSelector(state => state.photo.photos);
  const currentPage = useSelector(state => state.photo.currentPage);
  const perPage = useSelector(state => state.photo.perPage);
  const sortBy = useSelector(state => state.photo.sortBy);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchPhotos();
  }, [category, currentPage, perPage, sortBy]);

  useEffect(()=>{
    console.log('photos',photos);
  },[photos])

  const fetchPhotos = async() => {
    try {
      const response = await axios.get('/photos/fetchPhotos/${category}', {
        params: {
          sort: sortBy,
          page: currentPage,
          perPage: perPage
        },
      });
      console.log('res',response.data.length);
      dispatch(setPhotos(response.data));
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch photos');
    }
  }

  return (
    <div className='container'>
      <div className='option-bar'>
        <button className='button-scroll'>&laquo; prev</button>
        <button className='select-type'>Select Type </button>
        <button className='button-scroll'>next &raquo;</button>
      </div>

      {/* <div>
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="date">Sort by Date</option>
          <option value="id">Sort by ID</option>
        </select>
        <input type="text" value={category} onChange={handleCategoryChange} />
        <button onClick={fetchPhotos}>Search</button>
      </div> */}

      <div className='grid-gallery'>
        {photos.map((photo) => (
          <div className='single-img' key={photo.id}>
            <img src={photo.imageUrl} alt='photo' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
