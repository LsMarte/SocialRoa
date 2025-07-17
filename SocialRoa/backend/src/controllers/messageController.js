const Message = require('../models/Message');

// Send a message
exports.sendMessage = async (req, res) => {
    const { receiver_id, message } = req.body;
    const sender_id = req.user._id; // Assuming user ID is stored in req.user

    try {
        const newMessage = new Message({
            sender_id,
            receiver_id,
            message,
            timestamp: new Date()
        });

        await newMessage.save();
        
        // Populate sender and receiver info
        const populatedMessage = await Message.findById(newMessage._id)
            .populate('sender_id', 'username')
            .populate('receiver_id', 'username');

        res.status(201).json({ success: true, message: 'Message sent successfully', data: populatedMessage });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
    }
};

// Get messages between two users
exports.getMessages = async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    try {
        const messages = await Message.find({
            $or: [
                { sender_id: currentUserId, receiver_id: userId },
                { sender_id: userId, receiver_id: currentUserId }
            ]
        })
        .populate('sender_id', 'username')
        .populate('receiver_id', 'username')
        .sort({ timestamp: 1 });

        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve messages', error: error.message });
    }
};