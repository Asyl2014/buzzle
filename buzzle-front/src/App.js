import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

class App extends React.Component {
    state = {
        'user': null,
        'messages': [],
        'error': null
    };

    handleError = error => {
        this.setState({ error });
    }

    handleLogin = user => {
        this.setState({ user });
    }

    handleMessageCreate = message => {
        this.setState({
            'messages': [...this.state.messages, { message }]
        });
    }

    handleMessageEdit = message => {
        this.setState({
            'messages': this.state.messages.map(item => {
                if (item.message.id === message.id) {
                    return { message };
                } else {
                    return item;
                }
            })
        });
    }

    handleMessageDelete = id => {
        this.setState({
            'messages': this.state.messages.filter(item => item.message.id !== id)
        });
    }

    componentDidMount() {
        fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => response.json())
          .then(data => {
              this.handleLogin(data.user);
          })
          .catch(error => {
              console.error('Error:', error);
          });

        fetch('http://localhost:3000/messages', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => response.json())
          .then(data => {
              this.setState({
                  'messages': data.messages
              })
          })
          .catch(error => {
              console.error('Error:', error);
          });
    }

    render() {
        const error = this.state.error;
        this.state.error = null;

        const user = this.state.user;
        const messages = this.state.messages;

        return (
            <Router>
                <Switch>
                    <Route path="/login">
                        <LoginPage
                            error={error}
                            user={user}
                            handleError={this.handleError}
                            handleLogin={this.handleLogin} />
                    </Route>
                    <Route path="/register">
                        <RegisterPage
                            error={error}
                            user={user}
                            handleError={this.handleError}
                            handleLogin={this.handleLogin} />
                    </Route>
                    <Route path="/">
                        <HomePage
                            error={error}
                            user={user}
                            messages={messages}
                            handleError={this.handleError}
                            handleMessageCreate={this.handleMessageCreate}
                            handleMessageEdit={this.handleMessageEdit}
                            handleMessageDelete={this.handleMessageDelete} />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
