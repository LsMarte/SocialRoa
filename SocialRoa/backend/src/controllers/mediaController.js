const Media = require('../models/Media');
const { uploadFile } = require('../utils/upload');

// Function to handle multimedia uploads
exports.uploadMedia = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user._id; // Assuming user ID is available in req.user

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Upload file using utility function
        const fileData = await uploadFile(req.file);

        // Create a new media entry in the database
        const newMedia = new Media({
            user_id: userId,
            type: req.file.mimetype,
            content_url: fileData.url,
            title,
            description,
            timestamp: Date.now(),
        });

        await newMedia.save();
        res.status(201).json({ message: 'Media uploaded successfully', media: newMedia });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading media', error: error.message });
    }
};

// Function to get media by user
exports.getMediaByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const media = await Media.find({ user_id: userId }).populate('user_id', 'username');

        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching media', error: error.message });
    }
};

// Function to delete media
exports.deleteMedia = async (req, res) => {
    try {
        const mediaId = req.params.mediaId;
        const userId = req.user._id;

        const media = await Media.findById(mediaId);
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }

        // Check if user owns the media
        if (media.user_id.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Unauthorized to delete this media' });
        }

        await Media.findByIdAndDelete(mediaId);
        res.status(200).json({ message: 'Media deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting media', error: error.message });
    }
};