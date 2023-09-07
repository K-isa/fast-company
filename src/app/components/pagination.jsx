import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';


const Pagination = (props) => {
    const { itemCount, pageSize, onPageChange, currentPage } = props;

    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);


    return <nav aria-label="Page navigation example">
        <ul className="pagination">
            {pages.map((page) => <li className={"page-item " + (currentPage === page ? "active" : " ")} key={"page_" + page}>
                <button className="page-link" onClick={() => onPageChange(page)}>{page}</button>
            </li>)}

        </ul>
    </nav>;
}

Pagination.propTypes = {
    itemCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
}

export default Pagination;