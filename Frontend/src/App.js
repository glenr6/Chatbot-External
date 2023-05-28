import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import ChatBox from './components/ChatBox';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <AppNavbar />
      <Switch>
        <Route exact path="/" component={ChatBox} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
      </Switch>
    </div>
  );
};

export default App;
