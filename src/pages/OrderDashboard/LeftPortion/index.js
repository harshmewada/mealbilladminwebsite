import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { activateTable } from "../../../redux/action/orderActions";
import TableNumberSelector from "./TableNumberSelector";
import TableStatusInfo from "./TableStatusInfo";
import TableTypeSelector from "./TableTypeSelector";

const LeftPortion = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.name);
  const [tableFilterId, setTableFilterId] = React.useState("all");

  const allTables = useSelector((state) => state.order.allTables);
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
  const handleTableNumberClick = (data, index) => {
    if (checkactive(data.tableNumber)) {
      alert("Table is already active");
    } else {
      dispatch(
        activateTable(
          data.tableTypeId,
          data.tableNumber,
          index,
          username,
          data.tablePrice
        )
      );
    }
  };

  const handleTableTypeFilter = (typeId) => {
    setTableFilterId(typeId);
  };

  const getFilteredTables = () => {
    if (tableFilterId === "all") {
      return allTables;
    } else {
      return allTables.filter((tab) => tab.tableTypeId === tableFilterId);
    }
  };
  return (
    <div
      class="col-md-2"
      //  style={{ padding: "6px" }}
    >
      <div

      // class="card"
      >
        <div
        //  class="card-body"
        // style={{ padding: "15px 10px 10px 10px" }}
        >
          <TableTypeSelector
            selected={tableFilterId}
            setSelected={handleTableTypeFilter}
            tablesTypes={allTables.map((data) => {
              return {
                tableTypeName: data.tableType,
                tableTypeId: data.tableTypeId,
              };
            })}
          />
          <TableNumberSelector
            tables={getFilteredTables()}
            handleClick={handleTableNumberClick}
          />
          <TableStatusInfo />
        </div>
      </div>
    </div>
  );
};

export default LeftPortion;
