import React from "react";
import { useSelector } from "react-redux";
import {
  stableSort,
  getComparator,
} from "../../../components/common/SmartTable/functions";
import { TYPESOFORDERS } from "../../../contants";
const ButtonOrderSelector = () => {
  const {
    activeOrders,
    tables: allTables = [],
    activeTableType,
  } = useSelector((state) => state.order);

  const getFilteredTables = () => {
    if (activeTableType === "all") {
      return allTables;
    } else {
      return allTables.filter((tab) => tab.id === activeTableType);
    }
  };
  const getParcelOrders = () => {
    return activeOrders.filter(
      (order) => order.orderTypeId === TYPESOFORDERS[1].value
    );
  };

  const getHomeDeliveryOrders = () => {
    return activeOrders.filter(
      (order) => order.orderTypeId === TYPESOFORDERS[2].value
    );
  };

  const tables = getFilteredTables();
  const parcels = getParcelOrders();
  const homeDeliveries = getHomeDeliveryOrders();

  console.log("tables", tables, parcels, homeDeliveries);

  const handleTableNumberClick = () => {};

  const handleOtherOrderClick = () => {};

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
    return orderType.charAt(0);
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
