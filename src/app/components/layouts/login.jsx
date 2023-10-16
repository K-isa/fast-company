import React, { useState } from "react";
import LoginForm from "../ui/loginForm";
import RegisterForm from "../ui/registerForm";
import { useParams } from "react-router-dom";

const Login = () => {
    const {type} = useParams()
    const [FormType, setFormType] = useState(type==='register' ? type : 'login')

    const toggleFormType = () => {
        setFormType((prevstate) => prevstate==='login' ? 'register' : 'login')
    }
    
    return <>
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 shadow p-4'>
                    {FormType === 'register' 
                    ? <><RegisterForm/> 
                    <p>Уже есть аккаунт? <a role='button' onClick={toggleFormType}>Войти</a></p></>
                    : <><LoginForm />
                    <p>Нет аккаунта? <a role='button' onClick={toggleFormType}>Зарегистрироваться</a></p></>}
                </div >
                </div>
                </div >
            </>
}

            export default Login;