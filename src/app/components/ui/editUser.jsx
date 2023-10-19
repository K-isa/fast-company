import React, { useEffect, useState } from 'react';
import TextField from "../common/form/textField";
import SelectedField from '../common/form/selectedField';
import api from "../../api";
import RadioField from '../common/form/radioField';
import MultiSelectedField from '../common/form/multiSelectedField';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const EditUser = ({}) => {
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: [],
    });

    const {userId} = useParams()
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});
    const users = JSON.parse(localStorage.getItem("users"));
    const userIndex = users.findIndex((u) => u._id === userId);
    const user = users[userIndex];
    const history = useHistory()

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
        setData({...data, name: user.name, email: user.email, profession: user.profession.name, sex: user.sex, qualities: user.qualities.map(item => item.name) })
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const { profession, qualities } = data;
        history.push(`/users/${userId}`)
        api.users.updateData(userId, data)
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

    return <div className='container mt-5'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 shadow p-4'>
                <h3 className='mb-4'>Изменение данных пользователя</h3>
                <form onSubmit={handleSubmit}>
                    <TextField label={'Имя'} type={'text'} name='name' value={data.name} onChange={handleChange} />
                    <TextField label={'Почта'} type={'text'} name='email' value={data.email} onChange={handleChange} error={errors.email} />
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
                        { name: 'male', value: 'male' },
                        { name: 'female', value: 'female' },
                        { name: 'other', value: 'other' }
                    ]}
                        label='Укажите Ваш пол:'
                        name='sex'
                        value={data.sex}
                        onChange={handleChange} />

                    <MultiSelectedField
                        options={qualities}
                        label='Укажите Ваши качества'
                        defaultValue={data.qualities}
                        name='qualities'
                        onChange={handleChange}
                    />
                    <button className='btn btn-primary w-100 mx-auto' type='submit'>Сохранить</button>
                </form>
            </div>
        </div>
    </div>
}

export default EditUser;