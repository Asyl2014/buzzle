import React from 'react';
import { Link } from "react-router-dom";

function UserToolbar(props) {
    const user = props.user;
    if (user) {
        const logoutText = `Logout (@${user.login})`;
        return (
            <form action="/logout" method="POST">
                <input id="logout" className="btn btn-outline-light" type="submit" value={logoutText} />
            </form>
        );
    } else {
        return (
            <div className="btn-group">
                <Link className="btn btn-outline-light" to="/login">Login</Link>
                <Link className="btn btn-outline-light" to="/register">Register</Link>
            </div>
        );
    }
}

export default UserToolbar;
