import React, { useEffect, useState } from 'react';
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectedField from '../common/form/selectedField';
import api from '../../api';

const RegisterForm = () => {
    const [data, setData] = useState({ email: "", password: "", profession: "" })
    const [errors, setErrors] = useState({})
    const [professions, setProfession] = useState();

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

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
        },
        profession: {
            isRequired: {
                message: "Выберите профессию"
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

    return <>

        <h3 className='mb-4'>Регистрация</h3>
        <form onSubmit={handleSubmit}>
            <TextField label={'Почта'} type={'text'} name={'email'} value={data.email} onChange={handleChange} error={errors.email} />
            <TextField label={'Пароль'} type={'password'} name={'password'} value={data.password} onChange={handleChange} error={errors.password} />
            <SelectedField
                label="Выберите вашу профессию"
                defaultOption='Choose...'
                data={data}
                errors={errors.profession}
                onChange={handleChange}
                options={professions}
                value={data.profession}
            ></SelectedField>
            <button className='btn btn-primary w-100 mx-auto' type='submit' disabled={!isValid}>Submit</button>
        </form>
    </>
};

export default RegisterForm;