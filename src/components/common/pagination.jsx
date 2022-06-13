import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  console.log(currentPage);

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(
    currentPage - 3 < 1 ? 1 : currentPage - 3,
    currentPage + 4 > pagesCount ? pagesCount + 1 : currentPage + 4
  );

  return (
    <nav>
      <ul className="d-flex justify-content-center">
        <li key={"firstPage"} className={"page-item"}>
          <a className="page-link" onClick={() => onPageChange(1)}>
            First
          </a>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        <li key={"lastPage"} className={"page-item"}>
          <a className="page-link" onClick={() => onPageChange(pagesCount)}>
            Last
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
