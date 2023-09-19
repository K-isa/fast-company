import React, { useEffect, useState } from 'react';
import User from './user';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import GroupList from './groupList';
import api from '../api'

const Users = ({ users, ...rest }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectProf, setSelectProf] = useState()

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions( Object.assign(data, {allProfessions: {name:'Все профессии'}})))
    }, [])

    const handleItemSelect = (item) => {
        setSelectProf(item)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const filterUsers = selectProf  && selectProf._id
    ? users.filter((user) => user.profession === selectProf) 
    : users

    const handleClearFilter = () => {
        setSelectProf()
    }

    const userCrop = paginate(filterUsers, currentPage, pageSize);

    return (
        <>
            {professions && <><GroupList
                items={professions}
                onItemSelect={handleItemSelect}
                selectedItem={selectProf}
                />
                <button className="btn btn-danger" onClick={handleClearFilter}>Очистить</button>
                </>
                }
            {count > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User key={user._id} {...rest} {...user} />
                        ))}
                    </tbody>
                </table>
            ) : null}
            <Pagination itemCount={count} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange} />
        </>
    );
};

export default Users;