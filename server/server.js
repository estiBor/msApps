const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Define routes
app.get('/photos/fetchPhotos', async (req, res) => {
  console.log('in');
  try {
    const { category, sortBy, page, perPage } = req.query;
    console.log('params', category, sortBy, page, perPage);
    // const response = await axios.get(`https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}&image_type=photo&safesearch=true&per_page=${perPage}&page=${page}&order=${sortBy}`);
    const response = await axios.get(`https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}`);
    console.log('res', response.data);
    const photos = response.data.hits.map((photo) => ({
      id: photo.id,
      imageUrl: photo.webformatURL,
      views: photo.views,
      downloads: photo.downloads,
      collections: photo.collections,
    }));

    res.json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
