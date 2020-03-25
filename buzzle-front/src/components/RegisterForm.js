import React from 'react';
import { Redirect } from "react-router-dom";

class RegisterForm extends React.Component {
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

        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'login': this.state.login,
                'password': this.state.password,
                'password-repeat': this.state['password-repeat'],
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
                            <form className="p-3" method="POST" action="/register" autoComplete="off" onChange={this.handleChange} onSubmit={this.handleSubmit} >
                                <div className="form-group">
                                    <label htmlFor="login">Login:</label>
                                    <input id="login" className="form-control" type="text" name="login" autoComplete="off" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input id="password" className="form-control" type="password" name="password" autoComplete="new-password" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password-repeat">Repeat the Password:</label>
                                    <input id="password-repeat" className="form-control" type="password" name="password-repeat" autoComplete="new-password" required />
                                </div>
                                <input className="btn btn-primary" type="submit" value="Register" />
                            </form>        
                        </div>
                    </div>
        );
    }
}

export default RegisterForm;
