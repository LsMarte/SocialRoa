// This line should be at the very top to ensure that all environment variables
// are loaded from the .env file before any other code is executed.
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const messageRoutes = require('./routes/messageRoutes');
const storyRoutes = require('./routes/storyRoutes');
const liveRoutes = require('./routes/liveRoutes');

const app = express();

// Middleware
// In development, we need to enable CORS for the React dev server
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
}
// Enable the express app to parse JSON formatted request bodies
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Connect to MongoDB
connectDB();

// Use the PORT from the .env file, with a fallback to 5000 for development
const PORT = process.env.PORT || 5000;

// Use the JWT_SECRET from the .env file
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined in .env file.');
  process.exit(1);
}

// A simple test route
app.get('/api', (req, res) => {
  res.send('Welcome to the SocialRoa API!');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/live', liveRoutes);

// --- Serve Frontend in Production ---
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')));

  // Serve index.html for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', '..', 'frontend', 'build', 'index.html')
    );
  });
}

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));