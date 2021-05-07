import React from "react";
import OrderTypeSelector from "./OrderTypeSelector";
import { useDispatch, useSelector } from "react-redux";
import { activateTable } from "../../../redux/action/orderActions";
import TableNumberSelector from "./TableNumberSelector";
import TableStatusInfo from "./TableStatusInfo";
import TableTypeSelector from "./TableTypeSelector";
import { Col, Row } from "react-bootstrap";
import ShortCutList from "./ShortCutList";

const TopPortion = () => {
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
                <TableNumberSelector
                  tables={getFilteredTables()}
                  handleClick={handleTableNumberClick}
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
