const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to send a message
router.post('/send', authMiddleware, sendMessage);

// Route to get messages between users
router.get('/:userId', authMiddleware, getMessages);

module.exports = router;