import React from 'react';
import Qualitie from './qualitie';
import Bookmark from './bookmark';

const User = ( {
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    onToggleBookMark,
    bookmark
    } ) => {

    return <>

        <tr key={_id}>
            <td>{name}</td>
            <td>{qualities.map((qual) => (
                <Qualitie key={qual._id} {...qual}/>
            ))}
                </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate} / 5</td>
            <Bookmark status={bookmark} onClick={() => {onToggleBookMark(_id)}} />
            <td><button className="btn btn-danger" onClick={() => onDelete(_id)}>Delete</button></td>
        </tr>
    </>

}

export default User;