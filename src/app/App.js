import React from "react";
import NavBar from "./components/ui/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/layouts/login";
import Main from "./components/layouts/main";
import Users from "./components/layouts/users";
import EditUser from "./components/ui/editUserForm";

function App() {
    window.onbeforeunload = () => localStorage.removeItem('users')
    return <>
        <NavBar />
        <Switch>
            <Route path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Main} />
            <Redirect to="/" />
        </Switch>
    </>;
}

export default App;
