const express = require('express');
const movieRoute = require('./movie.route');
const authRoute = require('./auth.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/movie',
    route: movieRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
