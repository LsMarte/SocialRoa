import React, { useState, useEffect } from 'react';
import { getAllLiveSessions, createLiveSession, endLiveSession } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const LiveBroadcast = () => {
  const { user } = useAuth();
  const [liveSessions, setLiveSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newSession, setNewSession] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchLiveSessions();
  }, []);

  const fetchLiveSessions = async () => {
    try {
      setLoading(true);
      const sessions = await getAllLiveSessions();
      setLiveSessions(sessions);
    } catch (err) {
      setError('Error loading live sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      await createLiveSession(newSession);
      setNewSession({ title: '', description: '' });
      fetchLiveSessions();
    } catch (err) {
      setError('Error creating live session');
    } finally {
      setIsCreating(false);
    }
  };

  const handleEndSession = async (sessionId) => {
    try {
      await endLiveSession(sessionId);
      fetchLiveSessions();
    } catch (err) {
      setError('Error ending live session');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Loading live sessions...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              Live Broadcast
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="alert alert-danger mb-6">
            {error}
          </div>
        )}

        {/* Create Live Session Form */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Start Live Session
          </h2>
          <form onSubmit={handleCreateSession} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={newSession.title}
                onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                placeholder="Enter session title"
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={newSession.description}
                onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
                placeholder="Enter session description"
                rows={3}
                className="form-input resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={isCreating}
              className="btn-indigo"
            >
              {isCreating ? 'Starting...' : 'Start Live Session'}
            </button>
          </form>
        </div>

        {/* Live Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveSessions.map((session) => (
            <div key={session._id} className="card relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
                    LIVE
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {session.viewerCount || 0} viewers
                </span>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {session.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {session.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {session.userId?.username?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {session.userId?.username || 'Unknown User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Started {new Date(session.startTime).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="btn-indigo text-sm px-3 py-1">
                    Watch
                  </button>
                  {session.userId?._id === user.id && (
                    <button
                      onClick={() => handleEndSession(session._id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
                    >
                      End
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {liveSessions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              <div className="text-6xl mb-4">🎥</div>
              <h3 className="text-xl font-semibold mb-2">No live sessions</h3>
              <p>Start your first live session to connect with your audience!</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LiveBroadcast;