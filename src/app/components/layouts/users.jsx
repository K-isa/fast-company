import React from "react";
import UsersListPage from "../page/usersListPage/usersListPage";
import {useParams} from 'react-router-dom';
import UserPage from "../page/userPage/userPage";

const Users = () => { 
    const {userId} = useParams()
    return <>{userId ? <UserPage userId={userId}/> : <UsersListPage/>}</>

};

export default Users;