import React from 'react';

const EditUser = () => {
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

    return <>
    <h3 className='mb-4'>Изменение данных пользователя</h3>
    <form onSubmit={handleSubmit}>
        <TextField label={'Имя'} type={'text'} name='name' value={data.email} onChange={handleChange}/>
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
        <button className='btn btn-primary w-100 mx-auto' type='submit' disabled={!isValid}>Submit</button>
    </form>
</>
}

export default EditUser;