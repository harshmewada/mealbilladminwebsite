import React from "react";
import { useSelector } from "react-redux";
import {
  stableSort,
  getComparator,
} from "../../../components/common/SmartTable/functions";
import { TYPESOFORDERS } from "../../../contants";
const ButtonOrderSelector = ({
  tables,
  handleTableNumberClick,
  parcels,
  homeDeliveries,
  handleOtherOrderClick,
}) => {
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
    return TYPESOFORDERS.find((order) => order.value === orderType).key.charAt(
      0
    );
  };

  return (
    <div class="flex-container" style={{ maxHeight: 80, overflow: "auto" }}>
      {stableSort(tables, getComparator("asc", "tableNumber")).map(
        (data, index) => {
          return (
            <button
              key={index}
              onClick={() => handleTableNumberClick(data, index)}
            >
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
      {parcels.map((data, index) => {
        return (
          <button
            key={index}
            onClick={() => handleOtherOrderClick(data, index)}
          >
            <div
              class={`child child-parcel`}
              style={{ backgroundColor: TYPESOFORDERS[1].bgColor }}
            >
              {findTitle(data.orderType)} {index + 1}
            </div>
          </button>
        );
      })}

      {homeDeliveries.map((data, index) => {
        return (
          <button
            key={index}
            onClick={() => handleOtherOrderClick(data, index)}
          >
            <div
              class={`child child-homeDelivery`}
              style={{ backgroundColor: TYPESOFORDERS[2].bgColor }}
            >
              {findTitle(data.orderType)} {index + 1}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ButtonOrderSelector;
