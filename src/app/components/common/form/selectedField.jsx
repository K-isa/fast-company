import React from 'react';

const SelectedField = ({ label, value, defaultOption, name, options, errors, onChange }) => {

    const handleChange = ({target}) => {
        onChange({name: target.name, value: target.value});
    }

    const getInputClasses = () => {
        return 'form-select' + (errors ? " is-invalid" : "")
    }

    const optionsArray = !Array.isArray(options) && typeof options === 'object' 
    ? Object.keys(options).map((optionName) => ({
        name: options[optionName].name, 
        value: options[optionName]._id})) 
        : options


    return <div className='mb-4'>
        <label className='form-label' htmlFor="">
            {label}
        </label>
        <select
            className={getInputClasses()}
            id='validationCustom04'
            value={value}
            required
            name={name}
            onChange={handleChange}>
            <option disabled value=''>{defaultOption}</option>
            {optionsArray &&
                optionsArray.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}>
                            {option.name}
                    </option>

                )
                )}
        </select>
        {errors && <div className='invalid-feedback'> {errors} </div>}
    </div>
}

export default SelectedField;