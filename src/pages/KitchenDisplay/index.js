import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useKitchenDisplay from "../../hooks/useKitchenDisplay";
import { setItemAsPrepared } from "../../redux/action/orderActions";
import DisplayList from "./DisplayList";

const KitchenDisplay = () => {
  const { getAllOrders } = useKitchenDisplay();
  const dispatch = useDispatch();

  const { activeOrders, customerMessages } = useSelector(
    (state) => state.order
  );
  const myActiveOrders = activeOrders.map((d) => {
    return {
      ...d,
      items: d.items.filter((i) => i.itemStatusId !== 2),
    };
  });
  const getFilteredItems = () => {
    let itemList = [];

    myActiveOrders.forEach((element) => {
      element.items.forEach((i) => {
        const found = itemList.findIndex((a) => a.itemId === i.itemId);
        console.log("found", found);
        if (found > -1) {
          itemList[found] = {
            ...itemList[found],
            quantity: itemList[found].quantity + i.quantity,
          };
        } else {
          itemList.push(i);
        }
      });
    });

    return itemList;
  };

  const handleItemClick = (refId, itemId) => {
    dispatch(setItemAsPrepared({ refId, itemId }));
  };
  return (
    <div>
      <Row>
        <Col md="3">
          {" "}
          <DisplayList
            orderType="All Orders"
            items={getFilteredItems()}
            onItemClick={() => {}}
          />
        </Col>

        <Col md="9">
          <Row>
            {myActiveOrders.map((o, i) => {
              return (
                o.items.length > 0 && (
                  <Col md={4}>
                    <DisplayList
                      {...o}
                      key={i}
                      orderType={o.orderType}
                      onItemClick={(itemId) => handleItemClick(o.refId, itemId)}
                    />
                  </Col>
                )
              );
            })}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default KitchenDisplay;
