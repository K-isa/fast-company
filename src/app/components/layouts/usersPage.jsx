import React from "react";
import Users from "../users";
import {useParams} from 'react-router-dom';
import User from "../user";

const UsersPage = () => { 
    const {userId} = useParams()
    return <>{userId ? <User userId={userId}/> : <Users/>}</>

};

export default UsersPage;