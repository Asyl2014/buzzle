import React from 'react';
import './App.css';

function LoginForm() {
    return (
        <form method="POST" action="/login">
            <label for="login">Login:</label><br />
            <input id="login" name="login" type="text" required /><br />

            <label for="password">Password:</label><br />
            <input id="password" name="password" type="password" required /><br />
            
            <input type="submit" value="Login" />
        </form>
    );
}

export default LoginForm;
