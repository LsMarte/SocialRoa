import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserProfile from './components/Profile/UserProfile';
import Chat from './components/Messaging/Chat';
import Upload from './components/Media/Upload';
import LiveBroadcast from './components/Live/LiveBroadcast';
import StoryFeed from './components/Stories/StoryFeed';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/messages" component={Messages} />
      <PrivateRoute path="/user-profile/:userId" component={UserProfile} />
      <PrivateRoute path="/chat" component={Chat} />
      <PrivateRoute path="/upload" component={Upload} />
      <PrivateRoute path="/live" component={LiveBroadcast} />
      <PrivateRoute path="/stories" component={StoryFeed} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
