const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { movieService } = require('../services');

const createMovie = catchAsync(async (req, res) => {
  const movie = await movieService.createMovie(req.body);
  res.status(httpStatus.CREATED).send({ movie });
});

const getMovies = catchAsync(async (req, res) => {
  const { limit = 8, page = 1 } = req.query;

  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);

  const movies = await movieService.queryMovies({}, pageNumber, pageSize);

  res.status(httpStatus.OK).send({ movies });
});

const getMovie = catchAsync(async (req, res) => {
  const { movieId } = req.params;
  const movie = await movieService.getMovieById(movieId);
  if (!movie) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Movie not found' });
  } else {
    res.status(httpStatus.OK).send({ movie });
  }
});

const updateMovie = catchAsync(async (req, res) => {
  const { movieId } = req.params;
  const movie = await movieService.updateMovieById(movieId, req.body);
  if (!movie) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Movie not found' });
  } else {
    res.status(httpStatus.OK).send({ movie });
  }
});

const deleteMovie = catchAsync(async (req, res) => {
  const { movieId } = req.params;
  const deletedMovie = await movieService.deleteMovieById(movieId);
  if (!deletedMovie) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Movie not found' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Movie deleted successfully', ok: true });
  }
});

module.exports = {
  createMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
};
