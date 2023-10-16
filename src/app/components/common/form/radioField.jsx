import React from 'react';

const RadioField = ({ options, label, name, value, onChange }) => {
    return <div className='mt-4'>
        <label className='form-label' htmlFor="">{label}</label>
        {options.map((option) => (
            <div key={option.name + '_' + option.value} className="form-check form-check-inline ml-2">
                <input
                    className="form-check-input"
                    type="radio"
                    name={name}
                    id={option.name + '_' + option.value}
                    checked={option.value === value}
                    value={option.value}
                    onChange={onChange} />
                <label className="form-check-label" htmlFor={option.name + '_' + option.value}>
                    {option.name}
                </label>
            </div>
        ))}
    </div>;
}

export default RadioField;