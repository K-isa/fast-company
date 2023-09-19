import React from 'react';

const GroupList = ({ items, valueProperty, contentProperty, onItemSelect, selectedItem }) => {
    return <ul className="list-group" role="button" >
        {Object.keys(items).map(item =>
        <li key={items[item][valueProperty]} 
        className={"list-group-item" + (items[item] === selectedItem ? " active" : "")}
        onClick={() => onItemSelect(items[item])}
        role="button">
            {items[item][contentProperty]}
        </li>)}
    </ul>;
}
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

export default GroupList;