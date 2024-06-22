import React from 'react';
import ReactPaginate from "react-paginate";
import styled from "styled-components";

const Pagination = () => {
    return (
        <ReactPaginate
            pageCount={pageCount}
            onPageChange={onPageChange}
            containerClassName={"pagination"}
            pageLinkClassName={"pagination__link"}
            activeLinkClassName={"pagination__link__active"}
        />
    );
};

export default Pagination;

