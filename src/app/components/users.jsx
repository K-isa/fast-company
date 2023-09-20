import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./userTable";
import _ from 'lodash'

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState();
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({iter:'name', order: 'asc'})

    const pageSize = 8;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf();
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const filteredUsers = selectedProf
        ? allUsers.filter(
            (user) =>
                JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
        : allUsers;

    
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order])


    const count = filteredUsers.length;
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };

    const handleSort = (item) => {
        if (sortBy.iter === item) {
            setSortBy((prevState) => ({...prevState, order: prevState.order === "asc" ? "desc" : "asc"}))
        } else {
            setSortBy({iter: item, order: 'asc'})
        }
        
    }


    useEffect(() => {
        if (
            currentPage > Math.ceil(filteredUsers.length / pageSize) &&
            currentPage > 1
        ) {
            setCurrentPage(currentPage - 1);
        }
    }, [allUsers]);

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button className="btn btn-secondary mt-2" onClick={clearFilter}>
                        {" "}
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count > 0 && (

                    <UserTable users={usersCrop} {...rest} onSort={handleSort}/>

                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.array
};

export default Users;
