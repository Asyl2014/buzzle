import React from 'react';
import './App.css';

function RegisterForm() {
    return (
        <form method="POST" action="/register">
            <label for="login">Login:</label><br />
            <input id="login" name="login" type="text" required /><br />

            <label for="password">Password:</label><br />
            <input id="password" name="password" type="password" required /><br />

            <label for="password-repeat">Repeat the Password:</label><br />
            <input id="password-repeat" name="password" type="password-repeat" required /><br />
            
            <input type="submit" value="Register" />
        </form>
    );
}

export default RegisterForm;
