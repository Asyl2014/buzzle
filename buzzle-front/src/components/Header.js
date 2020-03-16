import React from 'react';

import UserToolbar from './UserToolbar';

function Header(props) {
    return (
        <header>
            <nav className="navbar navbar-dark bg-primary">
                <a className="navbar-brand" href="/">
                    <h1>Buzzle</h1>
                </a>
                {props.showUserToolbar &&
                    <UserToolbar user={props.user}/>
                }
            </nav>
        </header>
    );
}

export default Header;
