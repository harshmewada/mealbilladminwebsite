import React from "react";
import { Col, Row } from "react-bootstrap";
import OrderTypeSelector from "./OrderTypeSelector";
import ShortCutList from "./ShortCutList";
import TableStatusInfo from "./TableStatusInfo";
import TableTypeSelector from "./TableTypeSelector";
import ButtonOrderSelector from "./ButtonOrderSelector";

const TopPortion = () => {
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
                  <TableTypeSelector />
                </RowRender>
                <RowRender>
                  <TableStatusInfo />
                </RowRender>
              </ColRender>

              <ColRender lg={9}>
                <ButtonOrderSelector />
              </ColRender>
            </RowRender>
          </ColRender>
        </RowRender>
      </div>
    </div>
  );
};

export default TopPortion;
const RowRender = ({ children }) => <Row class="pb-0 mb-0 ">{children}</Row>;
const ColRender = ({ children, lg }) => (
  <Col lg={lg} class="pb-0 mb-0 ">
    {children}
  </Col>
);
