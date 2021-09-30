import React from "react";
import OrderTypeSelector from "./OrderTypeSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  activateOrder,
  activateTable,
  setActiveOrder,
} from "../../../redux/action/orderActions";
import ButtonOrderSelector from "./ButtonOrderSelector";
import TableStatusInfo from "./TableStatusInfo";
import TableTypeSelector from "./TableTypeSelector";
import { Col, Row } from "react-bootstrap";
import ShortCutList from "./ShortCutList";
import { TYPESOFORDERS } from "../../../contants";

const TopPortion = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.name);
  const [tableFilterId, setTableFilterId] = React.useState("all");

  const allTables = useSelector((state) => state.order.allTables);
  const activeOrders = useSelector((state) => state.order.activeOrders);

  const checkactive = (tableNumber) => {
    let myIndex = activeOrders.find((table) => {
      return tableNumber === table.tableNumber;
    });

    if (myIndex) {
      return myIndex;
    } else {
      return false;
    }
  };
  const handleTableNumberClick = (data, index) => {
    if (checkactive(data.tableNumber)) {
      dispatch(setActiveOrder(checkactive(data.tableNumber).refId));
    } else {
      dispatch(activateOrder(data, username));
    }
  };

  const handleTableTypeFilter = (typeId) => {
    setTableFilterId(typeId);
  };

  const handleOtherOrderClick = (data) => {
    dispatch(setActiveOrder(data.refId));
  };

  const getFilteredTables = () => {
    if (tableFilterId === "all") {
      return allTables;
    } else {
      return allTables.filter((tab) => tab.tableTypeId === tableFilterId);
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

  const RowRender = ({ children }) => <Row class="pb-0 mb-0 ">{children}</Row>;
  const ColRender = ({ children, lg }) => (
    <Col lg={lg} class="pb-0 mb-0 ">
      {children}
    </Col>
  );

  const getTableTypes = () => {
    const key = "tableType";

    const arrayUniqueByKey = [
      ...new Map(allTables.map((item) => [item[key], item])).values(),
    ];

    return arrayUniqueByKey;
  };
  return (
    <div class="card mb-0" style={{ width: "100%" }}>
      <div class="card-body pb-2 pt-2 mb-0">
        <RowRender>
          <div class="col-lg-3 p-0 pr-2">
            <OrderTypeSelector />
            <ShortCutList />
          </div>
          <ColRender lg={9}>
            <RowRender>
              <ColRender lg={3}>
                <RowRender>
                  <TableTypeSelector
                    selected={tableFilterId}
                    setSelected={handleTableTypeFilter}
                    tablesTypes={getTableTypes().map((data) => {
                      return {
                        tableTypeName: data.tableType,
                        tableTypeId: data.tableTypeId,
                      };
                    })}
                  />
                </RowRender>
                <RowRender>
                  <TableStatusInfo />
                </RowRender>
              </ColRender>

              <ColRender lg={9}>
                <ButtonOrderSelector
                  tables={getFilteredTables()}
                  parcels={getParcelOrders()}
                  homeDeliveries={getHomeDeliveryOrders()}
                  handleTableNumberClick={handleTableNumberClick}
                  handleOtherOrderClick={handleOtherOrderClick}
                />
              </ColRender>
            </RowRender>
          </ColRender>
        </RowRender>
      </div>
    </div>
  );
};

export default TopPortion;
