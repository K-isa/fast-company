import React, { useEffect, useState } from 'react';
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectedField from '../common/form/selectedField';
import api from '../../api';
import RadioField from '../common/form/radioField';
import MultiSelectedField from '../common/form/multiSelectedField';
import CheckBoxField from '../common/form/checkBoxField';

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

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
            label='Укажите Ваш пол:' 
            name='sex' 
            value={data.sex} 
            onChange={handleChange}/>

            <MultiSelectedField
            options={qualities}
            label='Укажите Ваши качества'
            defaultValue={data.qualities}
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