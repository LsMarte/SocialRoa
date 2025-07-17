const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');

const socketHandler = (io) => {
  // Authentication middleware for socket
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
        return next(new Error('Authentication error'));
      }

      socket.userId = user._id.toString();
      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User ${socket.user.username} connected`);

    // Update user online status
    User.findByIdAndUpdate(socket.userId, {
      isOnline: true,
      lastSeen: new Date()
    }).exec();

    // Join user to their own room
    socket.join(socket.userId);

    // Handle joining chat rooms
    socket.on('join_chat', (receiverId) => {
      const chatRoom = [socket.userId, receiverId].sort().join('_');
      socket.join(chatRoom);
    });

    // Handle sending messages
    socket.on('send_message', async (data) => {
      try {
        const { receiverId, content, messageType = 'text' } = data;

        // Create message
        const message = new Message({
          sender: socket.userId,
          receiver: receiverId,
          content,
          messageType,
          isDelivered: true,
          deliveredAt: new Date()
        });

        await message.save();

        // Populate sender info
        await message.populate('sender', 'username profilePic');

        const chatRoom = [socket.userId, receiverId].sort().join('_');

        // Send to chat room
        io.to(chatRoom).emit('new_message', message);

        // Send to receiver's personal room for notifications
        io.to(receiverId).emit('message_notification', {
          from: socket.user.username,
          message: content,
          messageId: message._id
        });

      } catch (error) {
        console.error('Send message error:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Handle message read status
    socket.on('mark_read', async (messageId) => {
      try {
        await Message.findByIdAndUpdate(messageId, {
          isRead: true,
          readAt: new Date()
        });

        // Notify sender that message was read
        const message = await Message.findById(messageId);
        io.to(message.sender.toString()).emit('message_read', messageId);
      } catch (error) {
        console.error('Mark read error:', error);
      }
    });

    // Handle typing indicators
    socket.on('typing', (data) => {
      const { receiverId, isTyping } = data;
      socket.to(receiverId).emit('user_typing', {
        userId: socket.userId,
        username: socket.user.username,
        isTyping
      });
    });

    // Handle live stream events
    socket.on('start_stream', (streamData) => {
      socket.broadcast.emit('stream_started', {
        streamerId: socket.userId,
        streamerName: socket.user.username,
        ...streamData
      });
    });

    socket.on('join_stream', (streamId) => {
      socket.join(`stream_${streamId}`);
      socket.to(`stream_${streamId}`).emit('viewer_joined', {
        userId: socket.userId,
        username: socket.user.username
      });
    });

    socket.on('leave_stream', (streamId) => {
      socket.leave(`stream_${streamId}`);
      socket.to(`stream_${streamId}`).emit('viewer_left', {
        userId: socket.userId,
        username: socket.user.username
      });
    });

    socket.on('stream_chat', (data) => {
      const { streamId, message } = data;
      io.to(`stream_${streamId}`).emit('stream_chat_message', {
        userId: socket.userId,
        username: socket.user.username,
        message,
        timestamp: new Date()
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User ${socket.user.username} disconnected`);
      
      // Update user offline status
      User.findByIdAndUpdate(socket.userId, {
        isOnline: false,
        lastSeen: new Date()
      }).exec();
    });
  });
};

module.exports = socketHandler;