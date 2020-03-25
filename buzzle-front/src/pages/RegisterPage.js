import React from 'react';

import Header from '../components/Header.js';
import Error from '../components/Error.js';
import RegisterForm from '../components/RegisterForm.js';
import Footer from '../components/Footer.js';

function RegisterPage(props) {
    const error = props.error;
    const user = props.user;

    return (
        <>
            <Header user={user} />
            <main className="container">
                {error &&
                    <Error error={error} />
                }
                <RegisterForm
                    user={user}
                    handleError={props.handleError}
                    handleLogin={props.handleLogin} />
            </main>
            <Footer />
        </>
    );
}

export default RegisterPage;
