import React from "react";
import ReactPaginate from "react-paginate";
const TablePagination = ({
  count,
  rowsPerPage,
  page: page,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  const result = new Array(Math.ceil(count / rowsPerPage)).fill("d");
  const endEntries =
    page * rowsPerPage + rowsPerPage > count
      ? count
      : page * rowsPerPage + rowsPerPage;
  return (
    <div class="row">
      <div class="col-sm-12 col-md-5">
        <div
          class="dataTables_info"
          id="datatable_info"
          role="status"
          aria-live="polite"
        >
          Showing{" "}
          {page === 0
            ? `1 to ${rowsPerPage} `
            : `${page * rowsPerPage} to ${endEntries} `}
          {/* {page === 0 ? page + rowsPerPage : page + 1 + rowsPerPage} of {count} */}
          entries of {count} entries
        </div>
      </div>
      <div class="col-sm-12 col-md-7">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"page-link"}
          pageCount={result.length}
          pageRangeDisplayed={1}
          marginPagesDisplayed={5}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName="paginate_button page-item "
          pageLinkClassName="page-link"
          previousClassName={"paginate_button page-item previous"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          nextClassName="paginate_button page-item next"
          onPageChange={({ selected }) => onChangePage(selected)}
        />
        {/* <ul class="pagination">
            <li
              class={`paginate_button page-item previous ${
                page === 0 ? "disabled" : ""
              }`}
              id="datatable_previous"
            >
              <a
                href="javascript:void(0);"
                aria-controls="datatable"
                data-dt-idx="0"
                tabindex="0"
                class="page-link"
                onClick={() => onChangePage(page - 1)}
              >
                Previous
              </a>
            </li>
            {result.map((item, index) => {
              return (
                <li
                  class={`paginate_button page-item ${
                    page === index ? "active" : ""
                  }`}
                  id={index}
                >
                  <a
                    style={{ cursor: "pointer" }}
                    data-dt-idx={index}
                    tabindex="0"
                    aria-controls="datatable"
                    class="page-link"
                    onClick={() => onChangePage(index)}
                  >
                    {index + 1}
                  </a>
                </li>
              );
            })}

            <li
              class={`paginate_button page-item next ${
                page === result.length - 1 ? "disabled" : ""
              }`}
              id="datatable_next"
            >
              <a
                href="javascript:void(0);"
                aria-controls="datatable"
                data-dt-idx="7"
                tabindex="0"
                class="page-link"
                onClick={() => onChangePage(page + 1)}
              >
                Next
              </a>
            </li>
          </ul> */}
      </div>
    </div>
  );
};

export default TablePagination;
