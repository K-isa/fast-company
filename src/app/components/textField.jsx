import React, { useState } from 'react';

const TextField = ({label, type, name, value, onChange, error}) => {
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword((prevstate) => !prevstate)
    }

    const getInputClass = () => {
        return 'form-control' + (error ? ' is-invalid' : '')
    }

    return ( <div className='mb-4'>
        <label htmlFor={name}>{label}</label>
        <div className="input-group has-validation">
            <input type={showPassword ? 'text' : type} 
        id={name} 
        name={name} 
        value={value} 
        onChange={onChange} 
        className={getInputClass()}
        />
        {type === 'password' && (<button 
        className='btn btn-outline-secondary'
        type='button'
        onClick={toggleShowPassword}>
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
        </button>)
        }
        {error && <div className='invalid-feedback '>{error}</div>}
        </div>
    </div> );
}

export default TextField;