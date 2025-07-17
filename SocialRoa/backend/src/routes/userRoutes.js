const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get user profile
router.get('/:userId', authMiddleware, getUserProfile);

// Update user profile
router.put('/:userId', authMiddleware, updateUserProfile);

module.exports = router;