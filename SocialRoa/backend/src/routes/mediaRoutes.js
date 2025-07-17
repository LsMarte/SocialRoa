const express = require('express');
const mediaController = require('../controllers/mediaController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../utils/upload');

const router = express.Router();

// Route to upload media
router.post('/upload', authMiddleware, upload.single('file'), mediaController.uploadMedia);

// Route to get media by user
router.get('/:userId', authMiddleware, mediaController.getMediaByUser);

// Route to delete media
router.delete('/:mediaId', authMiddleware, mediaController.deleteMedia);

module.exports = router;