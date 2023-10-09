import React from 'react';
import { Route, Link, Switch } from 'react-router-dom'

const NavBar = () => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <Link className="nav-link active" to="/">
                    Main
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/users">
                    Users
                </Link>
            </li>
        </ul>
    );
};


export default NavBar;