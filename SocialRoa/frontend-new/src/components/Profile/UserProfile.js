import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserProfile, getMediaByUser } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUserProfile = async () => {
    try {
      const userData = await getUserProfile(userId);
      setUser(userData);
    } catch (err) {
      setError('Error loading user profile');
    }
  };

  const fetchUserMedia = async () => {
    try {
      const mediaData = await getMediaByUser(userId);
      setMedia(mediaData);
    } catch (err) {
      console.error('Error loading user media:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
      fetchUserMedia();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Loading profile...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 mb-4">
            Error
          </div>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            User not found
          </div>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser.id === userId;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              Profile
            </h1>
            {!isOwnProfile && (
              <Link
                to={`/chat/${userId}`}
                className="btn-indigo"
              >
                Message
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info */}
        <div className="card mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                {user.username}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              {user.bio && (
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  {user.bio}
                </p>
              )}
              <div className="flex space-x-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                <div>
                  <span className="font-semibold">{user.followers?.length || 0}</span> followers
                </div>
                <div>
                  <span className="font-semibold">{user.following?.length || 0}</span> following
                </div>
                <div>
                  <span className="font-semibold">{media.length}</span> posts
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Media */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Posts
            </h3>
            {isOwnProfile && (
              <Link
                to="/upload"
                className="btn-indigo"
              >
                Upload Media
              </Link>
            )}
          </div>

          {media.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400">
                <div className="text-6xl mb-4">📷</div>
                <h4 className="text-xl font-semibold mb-2">
                  {isOwnProfile ? 'No posts yet' : 'No posts to show'}
                </h4>
                <p>
                  {isOwnProfile ? 'Start sharing your moments!' : 'This user hasn\'t shared anything yet.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {media.map((item) => (
                <div key={item._id} className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    {item.type.startsWith('image/') ? (
                      <img
                        src={item.content_url}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                        }}
                      />
                    ) : item.type.startsWith('video/') ? (
                      <video
                        src={item.content_url}
                        controls
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                        <div className="text-center">
                          <div className="text-4xl mb-2">📄</div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {item.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserProfile;