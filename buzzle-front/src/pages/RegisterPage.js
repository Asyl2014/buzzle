import React from 'react';

import Error from '../components/Error.js';
import Header from '../components/Header.js';
import RegisterForm from '../RegisterForm.js';
import Footer from '../components/Footer.js';

function RegisterPage(props) {
    const error = props.error;
    const user = props.user;

    const handleError = props.handleError;
    const handleUserCreate = props.handleUserCreate;

    return (
        <> 
            <Header user={user} />
            <main className="container">
                {error &&
                    <Error error={error} />
                }   
                <RegisterForm 
                    user={user} 
                    handleError={handleError}                      
                    handleUserCreate={handleUserCreate} />
            </main>
            <Footer />
        </>
    );
}

export default RegisterPage;