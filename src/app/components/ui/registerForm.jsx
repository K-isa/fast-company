import React, { useEffect, useState } from 'react';
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectedField from '../common/form/selectedField';
import api from '../../api';
import RadioField from '../common/form/radioField';
import MultiSelectedField from '../common/form/multiSelectedField';
import CheckBoxField from '../common/form/checkBoxField';

const RegisterForm = () => {
    const [data, setData] = useState({ email: "", password: "", profession: "", sex: 'female', qualities: [], licence: false })
    const [errors, setErrors] = useState({})
    const [professions, setProfession] = useState();
    const [qualities, setQualities] = useState({})

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }))
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
        },
        licence: {
            isRequired: {
                message: 'Вы не можете использовать наш сервис без лицензионного соглашения'
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
            <TextField label={'Почта'} type={'text'} name='email' value={data.email} onChange={handleChange} error={errors.email} />
            <TextField label={'Пароль'} type={'password'} name='password' value={data.password} onChange={handleChange} error={errors.password} />
            <SelectedField
                label="Выберите вашу профессию"
                defaultOption='Choose...'
                data={data}
                errors={errors.profession}
                onChange={handleChange}
                options={professions}
                value={data.profession}
                name='profession'
            />
            <RadioField options={[
                {name:'male', value:'male'},
                {name:'female', value:'female'},
                {name:'other', value:'other'}
            ]} 
            label='Укажите Ваш пол:' name='sex' value={data.sex} onChange={handleChange}/>

            <MultiSelectedField
            options={qualities}
            label='Укажите Ваши качества'
            name='qualities'
            onChange={handleChange}
            />

            <CheckBoxField value={data.licence} name='licence' onChange={handleChange} error={errors.licence}>
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button className='btn btn-primary w-100 mx-auto' type='submit' disabled={!isValid}>Submit</button>
        </form>
    </>
};

export default RegisterForm;