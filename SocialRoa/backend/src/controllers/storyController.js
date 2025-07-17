// backend/src/controllers/storyController.js

const Story = require('../models/Story');

// Create a new story
exports.createStory = async (req, res) => {
    try {
        const { media_url, type } = req.body;
        const user_id = req.user._id;
        
        const newStory = new Story({
            user_id,
            media_url,
            type,
            created_at: new Date(),
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000) // Expires in 24 hours
        });
        await newStory.save();
        
        const populatedStory = await Story.findById(newStory._id).populate('user_id', 'username profilePicture');
        res.status(201).json({ message: 'Story created successfully', story: populatedStory });
    } catch (error) {
        res.status(500).json({ message: 'Error creating story', error: error.message });
    }
};

// Get all stories (only active ones)
exports.getAllStories = async (req, res) => {
    try {
        const stories = await Story.find({ 
            expires_at: { $gt: new Date() } 
        }).populate('user_id', 'username profilePicture').sort({ created_at: -1 });
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stories', error: error.message });
    }
};

// Get a specific story by ID
exports.getStoryById = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id).populate('user_id', 'username profilePicture');
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }
        res.status(200).json(story);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching story', error: error.message });
    }
};

// Delete a story
exports.deleteStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }
        
        // Check if user owns the story
        if (story.user_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized to delete this story' });
        }
        
        await Story.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Story deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting story', error: error.message });
    }
};

// Update a story
exports.updateStory = async (req, res) => {
    try {
        const { media_url, type } = req.body;
        const story = await Story.findById(req.params.id);
        
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }
        
        // Check if user owns the story
        if (story.user_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized to update this story' });
        }
        
        const updatedStory = await Story.findByIdAndUpdate(
            req.params.id,
            { media_url, type },
            { new: true }
        ).populate('user_id', 'username profilePicture');
        
        res.status(200).json({ message: 'Story updated successfully', story: updatedStory });
    } catch (error) {
        res.status(500).json({ message: 'Error updating story', error: error.message });
    }
};