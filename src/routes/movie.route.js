const express = require('express');
const auth = require('../middlewares/auth');
const {
  movieController: { getMovies, getMovie, updateMovie, deleteMovie, createMovie },
} = require('../controllers');

const router = express.Router();

router.get('/getAll',  getMovies) // Get all movies
router.post('/create',  createMovie); 

router
  .route('/:movieId')
  .get(getMovie)  // Get a single movie
  .patch(updateMovie) // Update a movie
  .delete(deleteMovie); // Delete a movie

module.exports = router;
