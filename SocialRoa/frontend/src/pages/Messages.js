import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Messages = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  // Mock data for now
  const conversations = [
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Hey, how are you?',
      timestamp: '2:30 PM',
      unread: 2,
    },
    {
      id: 2,
      name: 'Jane Smith',
      lastMessage: 'Thanks for the help!',
      timestamp: '1:15 PM',
      unread: 0,
    },
    {
      id: 3,
      name: 'Bob Johnson',
      lastMessage: 'See you tomorrow',
      timestamp: '12:45 PM',
      unread: 1,
    },
  ];

  const messages = selectedChat ? [
    {
      id: 1,
      senderId: selectedChat.id,
      sender: selectedChat.name,
      message: 'Hey, how are you?',
      timestamp: '2:30 PM',
      isOwn: false,
    },
    {
      id: 2,
      senderId: user.id,
      sender: 'You',
      message: 'I\'m good, thanks! How about you?',
      timestamp: '2:31 PM',
      isOwn: true,
    },
    {
      id: 3,
      senderId: selectedChat.id,
      sender: selectedChat.name,
      message: 'Doing well, just working on some projects.',
      timestamp: '2:32 PM',
      isOwn: false,
    },
  ] : [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Here you would typically send the message to the backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              Messages
            </h1>
          </div>
        </div>
      </header>

      {/* Messages Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-1/3 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Conversations
            </h3>
          </div>
          <div className="overflow-y-auto h-full">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv)}
                className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  selectedChat?.id === conv.id ? 'bg-indigo-50 dark:bg-indigo-900' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {conv.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                        {conv.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {conv.timestamp}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {conv.lastMessage}
                      </p>
                      {conv.unread > 0 && (
                        <span className="bg-indigo-500 text-white text-xs rounded-full px-2 py-1">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {selectedChat.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {selectedChat.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Online
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.isOwn ? 'text-indigo-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSendMessage} className="flex space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 form-input"
                  />
                  <button
                    type="submit"
                    className="btn-indigo"
                  >
                    Send
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Select a conversation
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;