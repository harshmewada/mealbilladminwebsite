import React from "react";
import { useSelector } from "react-redux";
import {
  stableSort,
  getComparator,
} from "../../../components/common/SmartTable/functions";
import { TYPESOFORDERS } from "../../../contants";
const TableNumberSelector = ({ tables, handleClick, otherOrders }) => {
  const activeOrders = useSelector((state) => state.order.activeOrders);

  const checkactive = (tableNumber) => {
    if (
      activeOrders.findIndex((table) => {
        return tableNumber === table.tableNumber;
      }) >= 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  const findTitle = (orderType) => {
    return TYPESOFORDERS.find((order) => order.value === orderType).key;
  };
  return (
    <div class="flex-container" style={{ maxHeight: 80, overflow: "auto" }}>
      {stableSort(tables, getComparator("asc", "tableNumber")).map(
        (data, index) => {
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
        }
      )}
      {/* {otherOrders.map((data, index) => {
        return (
          <button key={index} onClick={() => handleClick(data, index)}>
            <div
              class={`child ${
                checkactive(data.tableNumber) ? `child-active` : ""
              }`}
            >
              {findTitle(data.orderType)}
            </div>
          </button>
        );
      })} */}
    </div>
  );
};

export default TableNumberSelector;
