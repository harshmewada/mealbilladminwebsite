import React from "react";

const styles = {
  th: {
    cursor: "pointer",
  },
  button: {
    boxShadow: "none",
    outline: "none",
    backgroundColor: "transparent",
    border: "none",
  },
};
const TableHeading = ({ data, hasActions, onRequestSort, sortable, order }) => {
  const createSortHandler = (property) => (event) => {
    sortable && onRequestSort(event, property);
  };

  return (
    <thead>
      <tr>
        {data?.map((child, index) => {
          return (
            <th class="sorting" style={styles.th}>
              {sortable && (
                <i
                  class={`mdi mdi-arrow-expand-${
                    order === "asc" ? "up" : "down"
                  }`}
                ></i>
              )}
              <button
                style={styles.button}
                onClick={createSortHandler(child.key)}
              >
                {child.title}
              </button>
            </th>
          );
        })}
        {hasActions && <th>Actions</th>}
      </tr>
    </thead>
  );
};

export default TableHeading;
