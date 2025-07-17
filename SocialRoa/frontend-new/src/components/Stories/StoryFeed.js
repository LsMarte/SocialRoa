import React, { useState, useEffect } from 'react';
import { getAllStories, createStory, deleteStory } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const StoryFeed = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newStory, setNewStory] = useState({ media_url: '', type: 'image' });

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const fetchedStories = await getAllStories();
      setStories(fetchedStories);
    } catch (err) {
      setError('Error loading stories');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStory = async (e) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      await createStory(newStory);
      setNewStory({ media_url: '', type: 'image' });
      fetchStories(); // Refresh stories
    } catch (err) {
      setError('Error creating story');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteStory = async (storyId) => {
    try {
      await deleteStory(storyId);
      fetchStories(); // Refresh stories
    } catch (err) {
      setError('Error deleting story');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Loading stories...
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
              Stories
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="alert alert-danger mb-6">
            {error}
          </div>
        )}

        {/* Create Story Form */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Create New Story
          </h2>
          <form onSubmit={handleCreateStory} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Media URL
              </label>
              <input
                type="url"
                value={newStory.media_url}
                onChange={(e) => setNewStory({ ...newStory, media_url: e.target.value })}
                placeholder="Enter image or video URL"
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type
              </label>
              <select
                value={newStory.type}
                onChange={(e) => setNewStory({ ...newStory, type: e.target.value })}
                className="form-input"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={isCreating}
              className="btn-indigo"
            >
              {isCreating ? 'Creating...' : 'Create Story'}
            </button>
          </form>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div key={story._id} className="card relative">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                {story.type === 'image' ? (
                  <img
                    src={story.media_url}
                    alt="Story"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                    }}
                  />
                ) : (
                  <video
                    src={story.media_url}
                    controls
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {story.user_id?.username?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {story.user_id?.username || 'Unknown User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(story.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {story.user_id?._id === user.id && (
                  <button
                    onClick={() => handleDeleteStory(story._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {stories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-xl font-semibold mb-2">No stories yet</h3>
              <p>Be the first to share a story!</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StoryFeed;