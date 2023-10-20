import React from "react";
import UsersListPage from "../page/usersListPage/usersListPage";
import {useParams} from 'react-router-dom';
import UserPage from "../page/userPage/userPage";
import EditUser from "../ui/editUserForm";

const Users = () => { 
    const {userId, edit} = useParams()
    return <>
    {userId ? (
        edit ? (<EditUser />)
        : (<UserPage userId={userId}/> ))
        : ( <UsersListPage/>)
    }
    </>
};

export default Users;