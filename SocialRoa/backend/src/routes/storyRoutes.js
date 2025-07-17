const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to create a new story
router.post('/', authMiddleware, storyController.createStory);

// Route to get all stories
router.get('/', storyController.getAllStories);

// Route to get a specific story by ID
router.get('/:id', storyController.getStoryById);

// Route to delete a story by ID
router.delete('/:id', authMiddleware, storyController.deleteStory);

// Route to update a story by ID
router.put('/:id', authMiddleware, storyController.updateStory);

module.exports = router;