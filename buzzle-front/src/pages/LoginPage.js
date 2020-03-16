import React from 'react';

import Header from '../components/Header.js';
import Error from '../components/Error.js';
import LoginForm from '../components/LoginForm.js';
import Footer from '../components/Footer.js';

function LoginPage(props) {
    const error = props.error;
    const user = props.user;

    return (
        <>
            <Header user={user} />
            <main className="container">
                {error &&
                    <Error error={error} />
                }
                <LoginForm
                    user={user}
                    handleError={props.handleError}
                    handleLogin={props.handleLogin} />
            </main>
            <Footer />
        </>
    );
}

export default LoginPage;
