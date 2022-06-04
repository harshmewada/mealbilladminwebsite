import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ActiveTableSelector from "./ActiveTableSelector2";

import TableTypeSelector from "./TableTypeSelector";

//actions
import {
  changeItemQuantity,
  deleteLocalOrder,
  removeItem,
  setActiveOrder,
  pushItemToActiveOrder,
} from "../../../redux/action/orderActions";
import flattentItemsArray from "../../../helpers/flattenItemsArray";

const styles = {
  tableList: {
    height: "100%",
    overflowY: "auto",
  },
};
const RightPortion = () => {
  const dispatch = useDispatch();

  const [orderFilter, setTableFilterId] = React.useState("active");
  const [clearSearch, setClearSearch] = React.useState(0);
  const activeOrder = useSelector((state) => state.order.activeOrder);
  const { lastOrderNumber, selectedOrderTypeId, activeOrders, allItems } =
    useSelector((state) => state.order);
  const branchCode = useSelector((state) => state.user.branchCode);

  const active = activeOrders.find((order) => order.refId === activeOrder);

  const handleTableTypeFilter = (data) => {
    setTableFilterId(data);
  };

  const getFilteredTables = () => {
    if (orderFilter === "active") {
      return active ? [active] : [];
    } else {
      return activeOrders.filter((tab) => {
        console.log("getFilteredTables", tab.orderTypeId, orderFilter);
        return tab.orderTypeId === orderFilter;
      });
    }
  };
  React.useEffect(() => {
    setTableFilterId("active");
  }, [activeOrder]);

  const handleItemQuantity = ({ quantity, itemId }) => {
    dispatch(changeItemQuantity({ quantity: parseInt(quantity), itemId }));
  };
  const deleteItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const deleteOrder = (refId) => {
    console.log("deleteOrder", refId);
    dispatch(deleteLocalOrder(refId));
  };

  const makeTableActive = (refId) => {
    dispatch(setActiveOrder(refId));
  };

  const handleSearchAndAddItem = (selected) => {
    if (selected.length > 0) {
      const item = selected[0];
      const isVariant = item?.isVariant ? true : false;

      dispatch(pushItemToActiveOrder({ item, isVariant }));
    } else {
      setClearSearch(clearSearch + 1);
    }
  };
  return (
    <div
      style={{
        width: 500,
        padding: "10px 0px",
        height: "100%",
      }}
    >
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
          <ActiveTableSelector
            tables={getFilteredTables()}
            lastOrderNumber={lastOrderNumber}
            activeOrdersLength={activeOrders.length}
            scrollable
            active={active}
            branchCode={branchCode}
            handleItemQuantity={handleItemQuantity}
            deleteItem={deleteItem}
            deleteOrder={deleteOrder}
            makeTableActive={makeTableActive}
            handleSearchAndAddItem={handleSearchAndAddItem}
            allItems={flattentItemsArray(allItems)}
            isEditMode={active?.isBillPrinted}
          />
        </div>
        {/* <div>
            <OrderTotalDisplay />
          </div> */}
      </div>
    </div>
  );
};

export default RightPortion;
