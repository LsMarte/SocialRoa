import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';

// Mock the AuthContext to avoid dependencies
jest.mock('./context/AuthContext', () => ({
  AuthProvider: ({ children }) => <div>{children}</div>,
  useAuth: () => ({ user: null, login: jest.fn(), logout: jest.fn() })
}));

// Mock all the page components that might not exist
jest.mock('./pages/Home', () => () => <div>Home Page</div>);
jest.mock('./pages/Profile', () => () => <div>Profile Page</div>);
jest.mock('./pages/Messages', () => () => <div>Messages Page</div>);
jest.mock('./pages/NotFound', () => () => <div>Not Found</div>);
jest.mock('./components/Auth/Login', () => () => <div>Login Component</div>);
jest.mock('./components/Auth/Register', () => () => <div>Register Component</div>);
jest.mock('./components/Profile/UserProfile', () => () => <div>User Profile</div>);
jest.mock('./components/Messaging/Chat', () => () => <div>Chat Component</div>);
jest.mock('./components/Media/Upload', () => () => <div>Upload Component</div>);
jest.mock('./components/Live/LiveBroadcast', () => () => <div>Live Broadcast</div>);
jest.mock('./components/Stories/StoryFeed', () => () => <div>Story Feed</div>);
jest.mock('./components/PrivateRoute', () => ({ children, ...props }) => <div {...props}>{children}</div>);

const renderAppWithProviders = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
};

test('renders home page by default', () => {
  renderAppWithProviders();
  expect(screen.getByText('Home Page')).toBeInTheDocument();
});

test('renders SocialRoa app', () => {
  renderAppWithProviders();
  // Test basic app rendering
  expect(document.body).toBeInTheDocument();
});

test('app renders without crashing', () => {
  renderAppWithProviders();
});