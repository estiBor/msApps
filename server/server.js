const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;


app.get('/photos/fetchPhotos', async (req, res) => {
  
  try {
    const { category, sortBy, page, perPage } = req.query;
    const key = '25540812-faf2b76d586c1787d2dd02736';

    const response = await axios.get(`https://pixabay.com/api/?key=${key}&q=${category}&per_page=${perPage}&page=${page}&order=${sortBy}`);
    
    // returns the necessary photo's information 
    const photos = response.data.hits.map((photo) => ({
      id: photo.id,
      imageUrl: photo.webformatURL,
      views: photo.views,
      downloads: photo.downloads,
      collections: photo.collections,
      likes: photo.likes,
      comments: photo.comments
    }));

    res.json({photos: photos, left: response.data.totalHits - page * perPage});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server on port 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
