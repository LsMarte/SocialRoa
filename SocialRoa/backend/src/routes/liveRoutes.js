const express = require('express');
const router = express.Router();
const liveController = require('../controllers/liveController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to create a new live session
router.post('/create', authMiddleware, liveController.createLiveSession);

// Route to get all live sessions
router.get('/', liveController.getAllLiveSessions);

// Route to get a specific live session by ID
router.get('/:id', liveController.getLiveSessionById);

// Route to end a live session
router.post('/end/:id', authMiddleware, liveController.endLiveSession);

module.exports = router;