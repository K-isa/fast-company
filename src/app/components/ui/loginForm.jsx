import React, { useEffect, useState } from 'react';
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState({})

    const handleChange = ({ target }) => {
        setData((prevstate) => ({ ...prevstate, [target.name]: target.value }))
    }

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Некорректная электронная почта"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            }
        }
    }

    useEffect(() => {
        validate();
    }, [data])

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        const isValid = validate()
        if (!isValid) return
        e.preventDefault()
        console.log(data)
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 shadow p-4'>
                    <h3 className='mb-4'></h3>
                    <form onSubmit={handleSubmit}>
                        <TextField label={'Почта'} type={'text'} name={'email'} value={data.email} onChange={handleChange} error={errors.email} />
                        <TextField label={'Пароль'} type={'password'} name={'password'} value={data.password} onChange={handleChange} error={errors.password} />

                        <button className='btn btn-primary w-100 mx-auto' type='submit' disabled={!isValid}>Submit</button>
                    </form>
                </div>
            </div>

        </div>
    )
};

export default LoginForm;