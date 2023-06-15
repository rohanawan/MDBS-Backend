const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const {
  userValidation: { validateCreateUser, validateGetUser, validateGetUsers, validateUpdateUser, validateLogin, validateRefreshTokens },
} = require('../validations');
const {
  userController: {createUser, login, logout, getUsers, getUser, updateUser, deleteUser },
} = require('../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(validateCreateUser), createUser)
  .get(auth('getUsers'), validate(validateGetUser), getUsers);

router
  .route('/login').post(validate(validateLogin), login);
router
  .route('/logout', validate(validateRefreshTokens), logout);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(validateGetUsers), getUser)
  .patch(auth('manageUsers'), validate(validateUpdateUser), updateUser)
  .delete(auth('manageUsers'), validate(validateGetUsers), deleteUser);

module.exports = router;