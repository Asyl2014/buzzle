import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from './Header.js'
import Footer from './Footer.js';
import Messages from './Messages.js';

import './App.css';
import LoginForm from './LoginForm.js';
import RegisterForm from './RegisterForm.js';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                      <Route path="/login">
                          <Header />
                          <LoginForm />
                          <Footer />
                      </Route>
                      <Route path="/register">
                          <Header />
                          <RegisterForm />
                          <Footer />
                      </Route>
                      <Route path="/">
                          <Header />
                          <Link to="/login">Login</Link>
                          <Link to="/register">Register</Link>
                          <Messages />
                          <Footer />
                      </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
