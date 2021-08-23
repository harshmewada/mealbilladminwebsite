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
  const [orderFilter, setTableFilterId] = React.useState({
    type: "active",
    tableTypeId: undefined,
  });
  const [clearSearch, setClearSearch] = React.useState(0);
  const activeOrderIndex = useSelector((state) => state.order.activeOrderIndex);
  const { lastOrderNumber, selectedOrderTypeId, activeOrders, allItems } =
    useSelector((state) => state.order);
  const branchCode = useSelector((state) => state.user.branchCode);

  const active = activeOrders.find(
    (order) => order.refId === activeOrders[activeOrderIndex]?.refId
  );

  const handleTableTypeFilter = (data) => {
    console.log(data);
    setTableFilterId({
      type: data.type,
      tableTypeId: data.tableTypeId,
    });
  };

  const getFilteredTables = () => {
    if (orderFilter.type === "active") {
      return active ? [active] : [];
    } else if (orderFilter.tableTypeId) {
      return activeOrders.filter(
        (tab) => tab.tableTypeId == orderFilter.tableTypeId
      );
    } else {
      return activeOrders.filter((tab) => tab.orderType == orderFilter.type);
    }
  };
  React.useEffect(() => {
    setTableFilterId({
      type: "active",
      tableTypeId: undefined,
    });
  }, [activeOrderIndex]);

  const handleItemQuantity = (quantity, itemindex) => {
    dispatch(changeItemQuantity(parseInt(quantity), itemindex));
  };
  const deleteItem = (index) => {
    dispatch(removeItem(index));
  };

  const deleteOrder = (refId) => {
    dispatch(deleteLocalOrder(refId));
  };

  const makeTableActive = (refId) => {
    dispatch(setActiveOrder(refId));
  };

  const handleSearchAndAddItem = (selected) => {
    if (selected.length > 0) {
      const item = selected[0];
      const isVariant = item?.variantId ? true : false;

      if (activeOrderIndex || activeOrderIndex === 0) {
        if (selectedOrderTypeId === 0) {
          if (activeOrderIndex || activeOrderIndex === 0) {
            dispatch(
              pushItemToActiveOrder(item, selectedOrderTypeId, isVariant)
            );
          } else {
            alert("No Tables Active");
          }
        } else {
          dispatch(pushItemToActiveOrder(item, selectedOrderTypeId, isVariant));
        }
        setClearSearch(clearSearch + 1);
      } else {
        alert("No Active Order");
      }
    } else {
      setClearSearch(clearSearch + 1);
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
          <ActiveTableSelector
            tables={getFilteredTables()}
            lastOrderNumber={lastOrderNumber}
            activeOrdersLength={activeOrders.length}
            scrollable
            orderDeletable
            active={active}
            branchCode={branchCode}
            handleItemQuantity={handleItemQuantity}
            deleteItem={deleteItem}
            deleteOrder={deleteOrder}
            makeTableActive={makeTableActive}
            handleSearchAndAddItem={handleSearchAndAddItem}
            allItems={flattentItemsArray(allItems)}
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
