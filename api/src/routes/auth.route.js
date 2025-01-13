const express = require('express');
const { authController } = require('../controllers');
const router = express.Router();

router.post('/register', authController.register);

// Login an existing user
router.post('/login', authController.login);

// Logout a user (by providing refresh token)
router.post('/logout', authController.logout);

// Refresh authentication tokens
router.post('/refresh-tokens', authController.refreshTokens);

module.exports = router;
