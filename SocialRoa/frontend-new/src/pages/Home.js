import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                SocialRoa
              </h1>
            </div>
            <nav className="flex space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/messages"
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Messages
                  </Link>
                  <Link
                    to="/stories"
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Stories
                  </Link>
                  <Link
                    to="/live"
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Live
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Welcome to SocialRoa
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Connect, Share, and Discover with friends and the world
          </p>
          
          {isAuthenticated ? (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Welcome back, {user?.username}!
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Link
                  to="/stories"
                  className="card hover:shadow-xl transition duration-300"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">📸</div>
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      Stories
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Share your moments with friends
                    </p>
                  </div>
                </Link>
                
                <Link
                  to="/live"
                  className="card hover:shadow-xl transition duration-300"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎥</div>
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      Live Streaming
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Broadcast live to your audience
                    </p>
                  </div>
                </Link>
                
                <Link
                  to="/messages"
                  className="card hover:shadow-xl transition duration-300"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">💬</div>
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      Messages
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Chat with friends privately
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Features
                  </h3>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Share stories and moments
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Live streaming capabilities
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Private messaging
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Media sharing
                    </li>
                  </ul>
                </div>
                
                <div className="card">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Get Started
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Join our community today and start connecting with friends!
                  </p>
                  <Link
                    to="/register"
                    className="btn-indigo block text-center"
                  >
                    Sign Up Now
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;