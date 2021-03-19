import React from "react";
import { useSelector } from "react-redux";

const TableNumberSelector = ({ tables, handleClick }) => {
  const activeTables = useSelector((state) => state.order.activeTables);

  const checkactive = (tableNumber) => {
    if (
      activeTables.findIndex((table) => {
        return tableNumber === table.tableNumber;
      }) >= 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div class="flex-container">
      {tables.map((data, index) => {
        return (
          <button key={index} onClick={() => handleClick(data, index)}>
            <div
              class={`child ${
                checkactive(data.tableNumber) ? `child-active` : ""
              }`}
            >
              {data.tableNumber}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default TableNumberSelector;
