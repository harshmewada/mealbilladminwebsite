import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useKitchenDisplay from "../../hooks/useKitchenDisplay";
import { setItemAsPrepared } from "../../redux/action/orderActions";
import DisplayList from "./DisplayList";
import { usePermissions } from "../../components/PermissionGate";
import { SCOPES } from "../../contants";
const getNotPrepared = (newData) => {
  const data = [...newData];
  // if (data.length !== 1) {
  //   delete data[data.length - 1];
  // }

  let notPrepared = [];
  data.forEach((i) => {
    i.orderItems.forEach((h) => {
      // console.log("notPrepared", i.id, h.itemName, h.itemStatusId);
      const isExist = notPrepared.findIndex((d) => d.itemId === h.itemId);
      if (h.itemStatusId !== 2) {
        if (isExist > -1) {
          notPrepared[isExist].quantity =
            notPrepared[isExist].quantity + h.quantity;
          notPrepared[isExist].kotId = [...notPrepared[isExist].kotId, i.id];
        } else {
          notPrepared.push({ ...h, kotId: [i.id] });
        }
      }
    });
  });
  return notPrepared;
};

const getRemarks = (newData) => {
  const data = [...newData];
  // if (data.length !== 1) {
  //   delete data[data.length - 1];
  // }

  let notPrepared = [];
  data.forEach((i) => {
    const find = notPrepared.findIndex((a) => a.remarks === i.remarks);

    if (find < 0) {
      notPrepared.push(i.remarks);
    }
  });
  return notPrepared;
};

const KitchenDisplay = () => {
  const { getAllOrders } = useKitchenDisplay();
  const dispatch = useDispatch();

  const { activeOrders, customerMessages } = useSelector(
    (state) => state.order
  );
  const myActiveOrders = activeOrders.map((d) => {
    return {
      ...d,
      orderItems: d.orderItems.filter((i) => i.itemStatusId !== 2),
    };
  });
  console.log("myActiveOrders", myActiveOrders);
  const getFilteredItems = () => {
    let itemList = [];

    myActiveOrders.forEach((element) => {
      const notPrepared = getNotPrepared(element.KOTS);

      notPrepared.forEach((i) => {
        const found = itemList.findIndex((a) => a.itemId === i.itemId);
        if (found > -1) {
          itemList[found] = {
            ...itemList[found],
            quantity: itemList[found].quantity + i.quantity,
          };
        } else {
          itemList.push({ ...i });
        }
      });
    });

    return itemList;
  };

  const handleItemClick = (refId, itemId, kotId) => {
    dispatch(setItemAsPrepared({ refId, itemId, kotId }));
  };
  const { enableKDS } = useSelector((state) => state.util);

  const hasPermission = usePermissions({
    scopes: [SCOPES.KITCHEN_DISPLAY_SYSTEM],
  });
  return hasPermission ? (
    <div>
      {enableKDS ? (
        <Row>
          <Col md="3">
            {" "}
            <DisplayList
              orderType="All Orders"
              orderItems={getFilteredItems()}
              onItemClick={() => {}}
            />
          </Col>

          <Col md="9">
            <Row>
              {myActiveOrders.map((o, i) => {
                const notPrepared = getNotPrepared(o.KOTS);
                const remarks = getRemarks(o.KOTS);

                return (
                  o.KOTS.length > 0 && (
                    <Col md={4}>
                      <DisplayList
                        {...o}
                        orderItems={[...notPrepared]}
                        remarks={remarks}
                        key={i}
                        orderType={o.orderType}
                        onItemClick={(itemId, kotId) =>
                          handleItemClick(o.refId, itemId, kotId)
                        }
                      />
                    </Col>
                  )
                );
              })}
            </Row>
          </Col>
        </Row>
      ) : (
        <div
          style={{
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "red",
            fontSize: 30,
          }}
        >
          Kitchen Display Sysytem is not enabled
        </div>
      )}
    </div>
  ) : (
    <div
      style={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "red",
        fontSize: 30,
      }}
    >
      Kitchen Display Sysytem is not enabled
    </div>
  );
};

export default KitchenDisplay;
