import React from 'react';
import { Redirect } from "react-router-dom";

class LoginForm extends React.Component {
    handleChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'login': this.state.login,
                'password': this.state.password
            })
        }).then(response => response)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  this.props.handleError(data.error);
              } else {
                  this.props.handleLogin(data.user);
              }
          })
          .catch(error => {
              this.props.handleError(`${error}`);
          });
    }

    render() {
        return (
            this.props.user
                ?
                    <Redirect to="/" />
                :
                    <div className="row justify-content-center">
                        <div className="col-lg-6 px-5">
                            <form className="p-3" method="POST" action="/login" onChange={this.handleChange} onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="login">Login:</label>
                                    <input id="login" className="form-control" name="login" type="text" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input id="password" className="form-control" name="password" type="password" required />
                                </div>
                                <input className="btn btn-primary" type="submit" value="Login" />
                            </form>        
                        </div>
                    </div>
        );
    }
}

export default LoginForm;
