const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/ApiError');
const Token = require('../models/token.model');
const { tokenTypes } = require('../config/tokens');
const { User } = require('../models');

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

const queryUsers = async (filter, options) => User.paginate(filter, options);

const getUserById = async (id) => User.findById(id);

const getUserByEmail = async (email) => User.findOne({ email });

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
  return user;
};

const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  loginUserWithEmailAndPassword,
  logout,
  updateUserById,
  deleteUserById,
};
