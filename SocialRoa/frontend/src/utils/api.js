import axios from 'axios';

// Set up a default instance for axios to proxy requests to the backend
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth functions
export const loginUser = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

export const registerUser = async (username, email, password) => {
  const res = await api.post('/auth/signup', { username, email, password });
  return res.data;
};

// User functions
export const getUserProfile = async (userId) => {
  const res = await api.get(`/users/${userId}`);
  return res.data;
};

export const updateUserProfile = async (userId, userData) => {
  const res = await api.put(`/users/${userId}`, userData);
  return res.data;
};

// Media functions
export const uploadMedia = async (formData) => {
  const res = await api.post('/media/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const getMediaByUser = async (userId) => {
  const res = await api.get(`/media/${userId}`);
  return res.data;
};

export const deleteMedia = async (mediaId) => {
  const res = await api.delete(`/media/${mediaId}`);
  return res.data;
};

// Message functions
export const sendMessage = async (receiver_id, message) => {
  const res = await api.post('/messages/send', { receiver_id, message });
  return res.data;
};

export const getMessages = async (userId) => {
  const res = await api.get(`/messages/${userId}`);
  return res.data;
};

// Story functions
export const createStory = async (storyData) => {
  const res = await api.post('/stories', storyData);
  return res.data;
};

export const getAllStories = async () => {
  const res = await api.get('/stories');
  return res.data;
};

export const deleteStory = async (storyId) => {
  const res = await api.delete(`/stories/${storyId}`);
  return res.data;
};

// Live functions
export const createLiveSession = async (liveData) => {
  const res = await api.post('/live/create', liveData);
  return res.data;
};

export const getAllLiveSessions = async () => {
  const res = await api.get('/live');
  return res.data;
};

export const endLiveSession = async (sessionId) => {
  const res = await api.post(`/live/end/${sessionId}`);
  return res.data;
};

export default api;