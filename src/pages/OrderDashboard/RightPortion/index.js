import React from "react";
import { useSelector } from "react-redux";
import ActiveTableSelector from "./ActiveTableSelector";

import TableTypeSelector from "./TableTypeSelector";

const styles = {
  tableList: {
    height: "100%",
    overflowY: "auto",
  },
};
const RightPortion = () => {
  const [orderFilter, setTableFilterId] = React.useState({
    type: "all",
    tableTypeId: undefined,
  });
  const activeOrders = useSelector((state) => state.order.activeOrders);

  const handleTableTypeFilter = (data) => {
    console.log(data);
    setTableFilterId({
      type: data.type,
      tableTypeId: data.tableTypeId,
    });
  };

  const getFilteredTables = () => {
    if (orderFilter.type === "all") {
      return activeOrders;
    } else if (orderFilter.tableTypeId) {
      return activeOrders.filter(
        (tab) => tab.tableTypeId == orderFilter.tableTypeId
      );
    } else {
      return activeOrders.filter((tab) => tab.orderType == orderFilter.type);
    }
  };

  return (
    <div style={{ width: 500, padding: "10px 0px", height: "100%" }}>
      <div
        // class="card tables"
        class="tables"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",

          overflow: "hidden",
        }}
      >
        <TableTypeSelector
          selected={orderFilter}
          setSelected={handleTableTypeFilter}
        />
        <div style={styles.tableList} class="accordion" id="accordionExample">
          <ActiveTableSelector tables={getFilteredTables()} />
        </div>
        {/* <div>
            <OrderTotalDisplay />
          </div> */}
      </div>
    </div>
  );
};

export default RightPortion;
