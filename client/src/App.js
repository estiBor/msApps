import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from './store/photosSlice';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos.data);
  const error = useSelector((state) => state.photos.error);

  useEffect(() => {
console.log(photos);
  },[])

  useEffect(() => {
    dispatch(fetchPhotos('rosses', 'date', '1', '9'));
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className='container'>
      <div className='option-bar'>
        <button className='button-scroll'>&laquo; prev</button>
        <button className='select-type'>Select Type </button>
        <button className='button-scroll'>next &raquo;</button>
      </div>

      <div>
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="date">Sort by Date</option>
          <option value="id">Sort by ID</option>
        </select>
        <input type="text" value={category} onChange={handleCategoryChange} />
        <button onClick={fetchPhotos}>Search</button>
      </div>

      <div className='grid-gallery'>
        {photos.map((photo) => (
          <div className='single-img' key={photo.id}>
            <img src={photo.webformatURL} alt={photo.tags} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
