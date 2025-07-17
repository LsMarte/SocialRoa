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

  useEffect(() => {
    if (userId) {
      setLoading(true);
      setError('');
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      // Fetch user profile and media in parallel
      const [userData, mediaData] = await Promise.all([
        getUserProfile(userId),
        getMediaByUser(userId)
      ]);
      
      setUser(userData);
      setMedia(mediaData || []);
    } catch (err) {
      console.error('Error loading user data:', err);
      setError('Error loading user profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-800">
            Loading profile...
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="text-2xl font-bold text-red-600 mb-4">
            Error
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchUserData}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // User not found state
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">👤</div>
          <div className="text-2xl font-bold text-gray-800 mb-4">
            User not found
          </div>
          <p className="text-gray-600">
            The user you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  // Check if this is the current user's profile
  const isOwnProfile = currentUser && (
    currentUser.id === userId || 
    currentUser._id === userId ||
    currentUser.id === user._id ||
    currentUser._id === user._id
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-indigo-600">
              Profile
            </h1>
            {!isOwnProfile && (
              <Link
                to={`/chat/${userId}`}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Message
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {user.username ? user.username.charAt(0).toUpperCase() : '?'}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800">
                {user.username || 'Unknown User'}
              </h2>
              <p className="text-gray-600">{user.email || 'No email provided'}</p>
              {user.bio && (
                <p className="text-gray-700 mt-2">
                  {user.bio}
                </p>
              )}
              <div className="flex space-x-4 mt-4 text-sm text-gray-500">
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
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              Posts
            </h3>
            {isOwnProfile && (
              <Link
                to="/upload"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Upload Media
              </Link>
            )}
          </div>

          {media.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500">
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
                <div key={item._id || item.id} className="bg-gray-100 rounded-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    {item.type && item.type.startsWith('image/') ? (
                      <img
                        src={item.content_url}
                        alt={item.title || 'Media'}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                        }}
                      />
                    ) : item.type && item.type.startsWith('video/') ? (
                      <video
                        src={item.content_url}
                        controls
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                        <div className="text-center">
                          <div className="text-4xl mb-2">📄</div>
                          <p className="text-sm text-gray-600">
                            {item.title || 'Media'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800">
                      {item.title || 'Untitled'}
                    </h4>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Unknown date'}
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