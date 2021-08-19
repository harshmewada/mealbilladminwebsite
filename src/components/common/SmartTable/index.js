import React from "react";
import {
  getComparator,
  getEntriesOptions,
  handleSearch,
  stableSort,
} from "./functions";
import TableData from "./TableData";
import TableHeading from "./TableHeading";
import TablePagination from "./TablePagination";
import TableTitle from "./TableTitle";

const styles = {
  paginated: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "0px 1vw",
    maxWidth: "20vw",
  },
  select: {
    margin: "0px 0.5vw",
  },
  searchGroup: {
    maxWidth: "15vw",
  },
};

const SmartTable = ({
  title,
  headActions,
  headers,
  actions,
  tableData,
  setTableData,
  headerComponents,
  paginated,
  sortable,
  searchByLabel,
  searchByField,
  selectable,
  rowsPerPage: perPageRows,
  noPadding,
}) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [rows, setRows] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(perPageRows || 5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAll = (event) => {
    if (event) {
      setTableData(
        tableData.map((item) => {
          return { ...item, selected: true };
        })
      );
    } else {
      setTableData(
        tableData.map((item) => {
          return { ...item, selected: false };
        })
      );
    }
  };

  const handleCheckChange = (value, index) => {
    let myIndex = index;

    if (page > 0) {
      myIndex = page * rowsPerPage + index;
    }

    let newData = tableData;

    newData[myIndex].selected = value;

    setTableData([...newData]);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    setRows(tableData);
    if (!paginated) {
      setRowsPerPage(perPageRows || tableData.length);
    }
  }, [tableData]);

  React.useEffect(() => {
    if (searchByField && searchQuery) {
      setRows(handleSearch(tableData, searchByField, searchQuery));
    } else {
      setRows(tableData);
    }
  }, [searchQuery]);

  const EntriesComponent = () => {
    return (
      <label style={styles.paginated}>
        Show
        <select
          style={styles.select}
          name="datatable_length"
          aria-controls="datatable"
          class="custom-select custom-select-sm form-control form-control-sm"
          onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
        >
          {getEntriesOptions(tableData, rowsPerPage)}
        </select>{" "}
        entries
      </label>
    );
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div class="row">
      <div class="col-12">
        <div class={!noPadding && "card"}>
          <div class={!noPadding && "card-body"}>
            {title && (
              <TableTitle
                headerComponents={headerComponents}
                title={title}
                endActions={headActions}
              />
            )}

            {(paginated || searchByField) && (
              <div class="d-flex justify-content-between align-items-center mb-4">
                {paginated && <EntriesComponent />}
                {searchByField && (
                  <div class="input-group" style={styles.searchGroup}>
                    <span class="input-group-prepend">
                      <button type="button" class="btn btn-gradient-primary">
                        <i class="fas fa-search"></i>
                      </button>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder={searchByLabel || "Search"}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}
            <div class={!noPadding && "table-responsive "}>
              <table
                id="datatable"
                class="table table-bordered dt-responsive nowrap"
              >
                <TableHeading
                  data={headers || []}
                  hasActions={actions?.length > 0}
                  onRequestSort={handleRequestSort}
                  sortable={sortable}
                  selectable={selectable}
                  onSelectAll={(e) => handleSelectAll(e)}
                  order={order}
                />

                <TableData
                  actions={actions}
                  header={headers}
                  handleCheckChange={(value, index) => {
                    handleCheckChange(value, index);
                  }}
                  selectable={selectable}
                  data={stableSort(rows, getComparator(order, orderBy)).slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )}
                />
              </table>
            </div>
            {paginated && tableData.length > 0 && (
              <TablePagination
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartTable;
