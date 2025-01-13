const Joi = require('joi');
const { objectId } = require('./custom.validation');  

const validateCreateMovie = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    publishingYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    image: Joi.string().uri().required(),  
  }),
};

const validateGetMovies = {
  query: Joi.object().keys({
    title: Joi.string(),
    publishingYear: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const validateGetMovie = {
  params: Joi.object().keys({
    movieId: Joi.string().custom(objectId), 
  }),
};

const validateUpdateMovie = {
  params: Joi.object().keys({
    movieId: Joi.required().custom(objectId), 
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      publishingYear: Joi.number().integer().min(1900).max(new Date().getFullYear()),
      image: Joi.string().uri(),
    })
    .min(1),  // At least one field should be present for the update
};

const validateDeleteMovie = {
  params: Joi.object().keys({
    movieId: Joi.string().custom(objectId),  
  }),
};

module.exports = {
  validateCreateMovie,
  validateGetMovies,
  validateGetMovie,
  validateUpdateMovie,
  validateDeleteMovie,
};
