# SocialRoa Backend Documentation

## Overview
SocialRoa is a social networking platform that allows users to connect, share multimedia content, and communicate in real-time. This backend documentation provides an overview of the backend architecture, features, and setup instructions.

## Features
- **User Authentication**: Secure registration, login, and password recovery functionalities.
- **User Profiles**: Users can create and manage their profiles, including personal information and profile pictures.
- **Messaging System**: Real-time messaging capabilities for users to communicate with each other.
- **Multimedia Uploads**: Users can upload and share images, videos, and other media types.
- **Live Broadcasting**: Users can create and manage live streaming sessions.
- **Story Sharing**: Users can create and view stories that disappear after a set duration.

## Tech Stack
- **Node.js**: JavaScript runtime for building the backend server.
- **Express.js**: Web framework for Node.js to handle routing and middleware.
- **MongoDB**: NoSQL database for storing user data, messages, and multimedia content.
- **Mongoose**: ODM for MongoDB to model application data.

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/SocialRoa.git
   ```
2. Navigate to the backend directory:
   ```
   cd SocialRoa/backend
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Configuration

Create a `.env` file in the `backend` directory by copying the example:
```sh
cp .env.example .env
```
Then, update the `.env` file with your MongoDB connection string and a secure JWT secret.

## Running the Application
To start the backend server, run:
```
npm start
```
The server will be running on `https://lsmarte.github.io/SocialRoa/`.

## API Endpoints
- **Authentication**
  - `POST /api/auth/register`: Register a new user.
  - `POST /api/auth/login`: Log in an existing user.
  
- **User Management**
  - `GET /api/users/:id`: Get user profile by ID.
  - `PUT /api/users/:id`: Update user profile.

- **Messaging**
  - `POST /api/messages`: Send a message.
  - `GET /api/messages/:userId`: Get messages for a user.

- **Media Uploads**
  - `POST /api/media/upload`: Upload multimedia content.

- **Live Broadcasting**
  - `POST /api/live`: Create a new live session.

- **Stories**
  - `POST /api/stories`: Create a new story.
  - `GET /api/stories/:userId`: Get stories for a user.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.