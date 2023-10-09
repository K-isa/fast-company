import React from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import Login from './layouts/login';
import UserPage from './layouts/usersPage';
import Main from './layouts/main';

const NavBar = () => {
    return <Route>
        <ul className="nav">
        <li className="nav-item ml-5">
            <Link className="nav-link" to="/">Main</Link>
        </li>
        <li className="nav-item ml-5">
            <Link className="nav-link" to="/login">   Login</Link>
        </li>
        <li className="nav-item ml-5">
            <Link className="nav-link" to="/users">   Users</Link>
        </li>
    </ul>

    <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/users' component={UserPage}></Route>
        <Route path='/' component={Main}></Route>
    </Switch>
    </Route>
}

export default NavBar;