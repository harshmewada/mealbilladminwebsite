import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import useKitchenDisplay from "../../hooks/useKitchenDisplay";
import ActiveOrderSelector from "../OrderDashboard/RightPortion/ActiveTableSelector2";
import DisplayList from "./DisplayList";

const KitchenDisplay = () => {
  const { getAllOrders } = useKitchenDisplay();

  const { activeOrders, customerMessages } = useSelector(
    (state) => state.order
  );

  const getFilteredItems = () => {
    let itemList = [];

    activeOrders.forEach((element) => {
      element.items.forEach((i) => {
        const found = itemList.findIndex((a) => a.itemId === i.itemId);
        console.log("found", found);
        if (found > -1) {
          itemList[found].quantity = itemList[found].quantity + i.quantity;
          itemList[found].itemName =
            itemList[found].itemName + " " + `q-${i.quantity}`;
        } else {
          itemList.push(i);
        }
      });
    });

    return itemList;
  };
  return (
    <div>
      <Row>
        <Col md="3">
          {" "}
          <DisplayList orderType="All Orders" items={getFilteredItems()} />
        </Col>

        <Col md="9">
          <Row>
            {activeOrders.map((o, i) => {
              return (
                <Col md={4}>
                  <DisplayList {...o} key={i} />
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default KitchenDisplay;
