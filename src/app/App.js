import React from "react";
import NavBar from "./components/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/layouts/login";
import Main from "./components/layouts/main";
import UsersPage from "./components/layouts/usersPage";

function App() {
    return <>
    <NavBar />
    <Switch>
        <Route path="/users/:userId?" component={UsersPage} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Main} />
        <Redirect to="/" />
    </Switch>
</>;
}

export default App;
