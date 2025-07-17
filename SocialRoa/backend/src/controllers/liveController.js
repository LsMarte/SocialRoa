// This file contains functions to handle live broadcasting sessions, including creating and managing broadcasts.

const LiveSession = require('../models/LiveSession');

// Create a new live session
exports.createLiveSession = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user._id;
        
        const newSession = new LiveSession({
            title,
            description,
            userId,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await newSession.save();
        
        const populatedSession = await LiveSession.findById(newSession._id).populate('userId', 'username profilePicture');
        res.status(201).json({ message: 'Live session created successfully', session: populatedSession });
    } catch (error) {
        res.status(500).json({ message: 'Error creating live session', error: error.message });
    }
};

// Get all active live sessions
exports.getAllLiveSessions = async (req, res) => {
    try {
        const sessions = await LiveSession.find({ isActive: true }).populate('userId', 'username profilePicture').sort({ createdAt: -1 });
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching live sessions', error: error.message });
    }
};

// Get a specific live session by ID
exports.getLiveSessionById = async (req, res) => {
    try {
        const session = await LiveSession.findById(req.params.id).populate('userId', 'username profilePicture');
        if (!session) {
            return res.status(404).json({ message: 'Live session not found' });
        }
        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching live session', error: error.message });
    }
};

// End a live session
exports.endLiveSession = async (req, res) => {
    try {
        const session = await LiveSession.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ message: 'Live session not found' });
        }
        
        // Check if user owns the session
        if (session.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized to end this session' });
        }
        
        const updatedSession = await LiveSession.findByIdAndUpdate(
            req.params.id,
            { isActive: false, endedAt: new Date(), updatedAt: new Date() },
            { new: true }
        ).populate('userId', 'username profilePicture');
        
        res.status(200).json({ message: 'Live session ended successfully', session: updatedSession });
    } catch (error) {
        res.status(500).json({ message: 'Error ending live session', error: error.message });
    }
};

// Update a live session
exports.updateLiveSession = async (req, res) => {
    try {
        const { title, description } = req.body;
        const session = await LiveSession.findById(req.params.id);
        
        if (!session) {
            return res.status(404).json({ message: 'Live session not found' });
        }
        
        // Check if user owns the session
        if (session.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized to update this session' });
        }
        
        const updatedSession = await LiveSession.findByIdAndUpdate(
            req.params.id,
            { title, description, updatedAt: new Date() },
            { new: true }
        ).populate('userId', 'username profilePicture');
        
        res.status(200).json({ message: 'Live session updated successfully', session: updatedSession });
    } catch (error) {
        res.status(500).json({ message: 'Error updating live session', error: error.message });
    }
};

// Delete a live session
exports.deleteLiveSession = async (req, res) => {
    try {
        const session = await LiveSession.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ message: 'Live session not found' });
        }
        
        // Check if user owns the session
        if (session.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized to delete this session' });
        }
        
        await LiveSession.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Live session deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting live session', error: error.message });
    }
};