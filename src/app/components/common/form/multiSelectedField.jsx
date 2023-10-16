import React from 'react';
import Select from 'react-select';

const MultiSelectedField = ({options, name, label, onChange}) => {
    const handleChange = (value) => {
        onChange({name: name, value});
    }

    const optionsArray = !Array.isArray(options) && typeof options === 'object' 
    ? Object.keys(options).map((optionName) => ({
        label: options[optionName].name, 
        value: options[optionName]._id})) 
        : options

    return <div className='mb-4'>
    <label className='form-label'>{label}</label>
    <Select
        isMulti
        closeMenuOnSelect={false}
        options={optionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
    />
    </div>;
}

export default MultiSelectedField;