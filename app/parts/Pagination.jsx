"use client";

import ReactPaginate from "react-paginate";

function Pagination({ coinLength, limit, setPage }) {
  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      pageCount={Math.ceil(coinLength / limit)}
      previousLabel="<"
      className="flex justify-center gap-x-5 paginate mt-4"
      activeClassName="text-accent"
    />
  );
}

export default Pagination;
