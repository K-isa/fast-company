import React from 'react';

const SearchBar = ({search, onChange}) => {
    return <div className="input-group mb-3">
            <input 
            id='search'
            type="text" 
            className="form-control" 
            placeholder="Поиск" 
            aria-label="Search" 
            value={search}
            aria-describedby="basic-addon1"
            onChange={onChange}
            />
        </div>
    
}

export default SearchBar;