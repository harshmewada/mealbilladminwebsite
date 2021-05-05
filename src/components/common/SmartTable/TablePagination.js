import React from "react";

const TablePagination = ({
  count,
  rowsPerPage,
  page: page,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  const result = new Array(Math.ceil(count / rowsPerPage)).fill("d");

  return (
    <div class="row">
      <div class="col-sm-12 col-md-5">
        <div
          class="dataTables_info"
          id="datatable_info"
          role="status"
          aria-live="polite"
        >
          Showing {page === 0 ? "1" : page + rowsPerPage} to
          {page === 0 ? page + rowsPerPage : page + 1 + rowsPerPage} of {count}
          entries
        </div>
      </div>
      <div class="col-sm-12 col-md-7">
        <div
          class="dataTables_paginate paging_simple_numbers"
          id="datatable_paginate"
        >
          <ul class="pagination">
            <li
              class={`paginate_button page-item previous ${
                page === 0 ? "disabled" : ""
              }`}
              id="datatable_previous"
            >
              <a
                href="#"
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
                href="#"
                aria-controls="datatable"
                data-dt-idx="7"
                tabindex="0"
                class="page-link"
                onClick={() => onChangePage(page + 1)}
              >
                Next
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
