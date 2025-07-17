// This file contains functions to manage user profiles, including viewing and editing profiles.

const User = require('../models/User');


// Get user profile by ID
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Don't return password hash
        const { password_hash, ...userWithoutPassword } = user.toObject();
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { username, email, bio } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { username, email, bio },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { password_hash, ...userWithoutPassword } = updatedUser.toObject();
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
