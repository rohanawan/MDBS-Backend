const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Movie } = require('../models');

const createMovie = async (movieBody) => {
  if (await Movie.isTitleTaken(movieBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Movie title already exists');
  }
  return Movie.create(movieBody);
};

const queryMovies = async (filter, pageNumber = 1, pageSize = 8) => {
  const options = {
    page: pageNumber,
    limit: pageSize,
    sort: { createdAt: -1 }, 
  };
  
  const movies = await Movie.paginate(filter, options);
  return movies;
};



const getMovieById = async (id) => Movie.findById(id);

const updateMovieById = async (movieId, updateBody) => {
  const movie = await getMovieById(movieId);
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found');
  }
  Object.assign(movie, updateBody);
  await movie.save();
  return movie;
};

const deleteMovieById = async (movieId) => {
  const movie = await getMovieById(movieId);
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found');
  }
  await movie.remove();
  return movie;
};

module.exports = {
  createMovie,
  queryMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
};
