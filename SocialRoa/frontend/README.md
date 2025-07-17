# SocialRoa Frontend

Welcome to the SocialRoa frontend project! This project is built using React.js and serves as the user interface for the SocialRoa social network platform.

## Features

- **User Authentication**: Users can register, log in, and manage their accounts.
- **User Profiles**: Each user has a profile that displays their information and activity.
- **Messaging System**: Users can send and receive messages in real-time.
- **Multimedia Uploads**: Users can upload images, videos, and other media.
- **Live Broadcasting**: Users can create and manage live broadcast sessions.
- **Story Sharing**: Users can create and view stories shared by others.

## Project Structure

The frontend project is organized as follows:

```
frontend/
├── src/
│   ├── App.js               # Main application component
│   ├── components/          # Reusable components
│   │   ├── Auth/           # Authentication components
│   │   │   ├── Login.js     # Login component
│   │   │   └── Register.js  # Registration component
│   │   ├── Profile/        # User profile components
│   │   │   └── UserProfile.js # User profile display
│   │   ├── Messaging/      # Messaging components
│   │   │   └── Chat.js      # Chat component
│   │   ├── Media/          # Media upload components
│   │   │   └── Upload.js    # Media upload component
│   │   ├── Live/           # Live broadcasting components
│   │   │   └── LiveBroadcast.js # Live broadcast component
│   │   └── Stories/        # Story components
│   │       └── StoryFeed.js # Story feed component
│   ├── pages/              # Page components
│   │   ├── Home.js         # Home page
│   │   ├── Profile.js      # User profile page
│   │   └── Messages.js     # Messages page
│   └── utils/              # Utility functions
│       └── api.js          # API call functions
├── package.json             # Project dependencies and scripts
└── README.md                # Frontend documentation
```

## Getting Started

To get started with the SocialRoa frontend, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the frontend directory:
   ```
   cd SocialRoa/frontend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

The application will open in your browser at `http://localhost:3000`. API requests to `/api` will be automatically proxied to your backend server (expected to be running on `http://localhost:5000`).

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.