import React from "react";
import { useSelector } from "react-redux";
import ActiveTableSelector from "./ActiveTableSelector";
import OrderButton from "./OrderButton";
import OrderConfirmModal from "./OrderConfirmModal";
import OrderTotalDisplay from "./OrderTotalDisplay";
import TableTypeSelector from "./TableTypeSelector";

const styles = {
  tableList: {
    height: "54%",
    overflowY: "scroll",
    overflowX: "hidden",
  },
};
const RightPortion = () => {
  const [tableFilterId, setTableFilterId] = React.useState("all");
  const activeTables = useSelector((state) => state.order.activeTables);

  const handleTableTypeFilter = (typeId) => {
    setTableFilterId(typeId);
  };

  const getFilteredTables = () => {
    if (tableFilterId === "all") {
      return activeTables;
    } else {
      return activeTables.filter((tab) => tab.tableTypeId == tableFilterId);
    }
  };

  return (
    <div class="col-md-4" style={{ padding: " 6px" }}>
      <div
        class="card tables"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "85vh",
          justifyContent: "space-between",
        }}
      >
        <div class="card-body" style={{ padding: "10px" }}>
          <TableTypeSelector
            selected={tableFilterId}
            setSelected={handleTableTypeFilter}
          />
          <div style={styles.tableList} class="accordion" id="accordionExample">
            <ActiveTableSelector tables={getFilteredTables()} />
          </div>
          <div>
            <OrderTotalDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPortion;
