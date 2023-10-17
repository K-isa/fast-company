import React from 'react';

const SelectedField = ({ label, value, defaultOption, name, options, errors, onChange }) => {

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    }

    const getInputClasses = () => {
        return 'form-select' + (errors ? " is-invalid" : "")
    }

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;


    return <div className='mb-4'>
        <label className='form-label' htmlFor={name}>
            {label}
        </label>
        <select
            className={getInputClasses()}
            id={name}
            value={value}
            required
            name={name}
            onChange={handleChange}>
            <option disabled value=''>{defaultOption}</option>
            {optionsArray.length > 0 &&
                optionsArray.map((option) => (
                    <option value={option.value} key={option.value}>
                        {option.label}
                    </option>
                ))}
        </select>
        {errors && <div className='invalid-feedback'> {errors} </div>}
    </div>
}

export default SelectedField;