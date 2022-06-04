import { branchTypes, orderTypes, restaurantTypes } from "../types";
import branchApi from "../api/branchApi";
import { orderApi } from "../api/orderApi";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";
import { uuid } from "uuidv4";
import { DATETIMEFORMAT, ITEMSTATUS, TYPESOFORDERS } from "../../contants";
import {
  checkIfQuantityExceeds,
  findActiveOrderIndex,
  findItemIndex,
  isThatItemInMyOrder,
} from "../reducers/orderReducer";
import calculateBranchOrderNumber from "../../helpers/calculateBranchOrderNumber";
import moment from "moment";
import { setKOTPrintData } from "./utilActions";

const calculateKOT = ({ active, lastOrderNumber, activeOrders }) => {
  let kotItems = [];
  active.orderItems.forEach((data) => {
    let lastkotquantity = 0;
    active.KOTS.forEach((d) => {
      d.orderItems.forEach((i) => {
        if (i.itemId === data.itemId) {
          lastkotquantity = lastkotquantity + i.quantity;
        }
      });
    });
    const diffrence = data.quantity - lastkotquantity;

    //  console.log("setKOTitemsData", data.itemName, diffrence);
    if (diffrence > 0) {
      kotItems.push({
        ...data,
        itemStatus: ITEMSTATUS[1].key,
        itemStatusId: ITEMSTATUS[1].value,
        quantity: diffrence,
        itemTotal: diffrence * data.itemPrice,
      });
    }
    // else {
    //   kotItems.push({
    //     ...data,
    //     itemStatus: ITEMSTATUS[1].key,
    //     itemStatusId: ITEMSTATUS[1].value,
    //     quantity: diffrence,
    //     itemTotal: diffrence * data.itemPrice,
    //   });
    // }
  });

  let ItemsQuantity = 0;
  kotItems.map((item, index) => {
    ItemsQuantity = ItemsQuantity + item.quantity;
  });
  const kotData = {
    branchOrderNumber: `# ${lastOrderNumber + activeOrders.length + 1}`,
    orderType: active.orderType,
    orderItems: kotItems,
    orderDate: moment().format(DATETIMEFORMAT),
    tableNumber: active?.tableNumber,

    totalQuantity: ItemsQuantity,
  };

  return {
    kotItems,
    kotData,
  };
};

const dummyActive = (payload, username, orderNumber, branchOrderNumber) => {
  const { tableNumber, tableTypeId, tablePrice, orderTypeId, orderType } =
    payload;
  return {
    tableNumber: tableNumber,
    tableTypeId: tableTypeId,
    associatedPerson: username,
    orderItems: [],
    tablePrice: tablePrice || 0,
    orderTypeId: orderTypeId || TYPESOFORDERS[0].value,
    orderType: orderType || TYPESOFORDERS[0].key,
    branchOrderNumber: branchOrderNumber,
    orderNumber: orderNumber,

    otherCharges: 0,
    discount: 0,
    lastKOTItems: [],
    KOTS: [],
    refId: uuid(),
  };
};
// export const createBranch = (data) => {
//   //   const role = store.getState();

//   //   console.log(role);

// return {
//   type: branchTypes.CREATE_BRANCH,
//   payload: {
//     request: {
//       url: branchApi.CREATE_BRANCH,
//       method: "post",
//       data: data,
//       headers: {
//         "Content-type": "application/json",
//       },
//     },
//   },
// };
// };
export const getMyState = (getState, myState) => {
  return getState()[myState];
};

export const setOrderType = (type) => {
  return {
    type: orderTypes.SET_ORDER_TYPE,
    payload: type,
  };
};

export const activateOrder = (data, userName) => {
  return (dispatch, getState) => {
    const branchCode = getMyState(getState, "user").branchCode;
    const orderNumberCount = getMyState(getState, "order").orderNumberCount;

    const orderNumber =
      getMyState(getState, "order").lastOrderNumber + orderNumberCount;
    const branchOrderNumber = calculateBranchOrderNumber(
      branchCode,
      orderNumber
    );
    dispatch(incrementOrderNumberCount());
    return dispatch({
      type: orderTypes.ACTIVATE_ORDER,
      payload: dummyActive(data, userName, orderNumber, branchOrderNumber),

      isSocket: true,
    });
  };
};

export const getSocketOrders = (data) => {
  return {
    type: orderTypes.GET_SOCKET_ORDERS,
    payload: data,
  };
};

export const activateOrderSocket = (data) => {
  return {
    type: orderTypes.ACTIVATE_ORDER_SOCKET,
    payload: data,

    isSocket: false,
  };
};

export const pushItemToActiveOrder = ({ item, isVariant }) => {
  return (dispatch, getState) => {
    const refId = getMyState(getState, "order").activeOrder;
    const allOrders = getMyState(getState, "order").activeOrders;

    const myItemId = item?.variantId || item?.id || item?.id;
    const activeOrder = allOrders[findActiveOrderIndex(allOrders, refId)];
    console.log("activeOrder", activeOrder);

    if (!activeOrder) {
      alert("No Active Order");
      return;
    }

    if (activeOrder.isBillPrinted) {
      alert(
        "Bill modification not possible after printing. If you wish to change, do it after settlement"
      );
      return;
    }

    const currItem = isThatItemInMyOrder(activeOrder, myItemId);
    if (currItem) {
      if (checkIfQuantityExceeds(currItem, currItem.quantity + 1)) {
        return dispatch({
          type: "asdasd",
        });
      }
      return dispatch(
        changeItemQuantity({
          quantity: parseInt(currItem.quantity) + 1,
          itemId: myItemId,
        })
      );
    } else {
      if (checkIfQuantityExceeds(item, 1)) {
        return dispatch({
          type: "asdasd",
        });
      }
      return dispatch({
        type: orderTypes.PUSH_ITEM_TO_ORDER,
        isSocket: true,
        payload: {
          refId: refId,
          item: {
            ...item,
            itemId: item?.variantId || item?._id || item?.id,
            isVariant: isVariant,
            quantity: 1,

            itemTotal: 1 * item.itemPrice,
            itemStatus: ITEMSTATUS[0].key,
            itemStatusId: ITEMSTATUS[0].value,
            kotQuantity: 0,
            kotTotal: 0,
          },
        },
      });
    }
  };
};

export const pushItemToActiveOrderSocket = (item) => {
  return {
    type: orderTypes.PUSH_ITEM_TO_ORDER_SOCKET,
    payload: item,

    isSocket: false,
  };
};

export const changeItemQuantity = ({ quantity, itemId }) => {
  return (dispatch, getState) => {
    const refId = getMyState(getState, "order").activeOrder;
    const allOrders = getMyState(getState, "order").activeOrders;
    const activeOrder = allOrders[findActiveOrderIndex(allOrders, refId)];
    const itemIndex = findItemIndex(activeOrder.orderItems, itemId);
    const foundItem = activeOrder.orderItems[itemIndex];
    const diff = quantity - foundItem.quantity;
    if (
      checkIfQuantityExceeds(
        foundItem,
        diff > 0 ? foundItem.quantity + 1 : foundItem.quantity
      )
    ) {
      return dispatch({
        type: "asdasd",
      });
    }

    return dispatch({
      type: orderTypes.CHANGE_ITEM_QUANTITY,
      isSocket: true,
      payload: {
        refId,

        quantity,
        itemId,
      },
    });
  };
};

export const changeItemQuantitySocket = ({ quantity, itemId }) => {
  return (dispatch, getState) => {
    const refId = getMyState(getState, "order").activeOrder;
    return dispatch({
      type: orderTypes.CHANGE_ITEM_QUANTITY,
      payload: {
        refId,

        quantity,
        itemId,
      },
    });
  };
};

export const setItemAsPrepared = ({ refId, itemId, kotId }) => {
  return {
    isSocket: true,
    type: orderTypes.SET_ITEM_AS_PREPARED,
    payload: {
      refId,
      itemId,
      kotId,
    },
  };
};

export const setItemAsPreparedSocket = (orders) => {
  return {
    type: orderTypes.SET_ITEM_AS_PREPARED_SOCKET,
    payload: orders,
  };
};
export const removeItem = (itemId) => {
  return (dispatch, getState) => {
    const refId = getMyState(getState, "order").activeOrder;
    return dispatch({
      type: orderTypes.REMOVE_ITEM,
      isSocket: true,
      payload: {
        refId,

        itemId,
      },
    });
  };
};

export const removeItemSocket = (data) => {
  return (dispatch, getState) => {
    return dispatch({
      type: orderTypes.REMOVE_ITEM,
      payload: data,
    });
  };
};

export const setOtherCharges = (data) => {
  return {
    type: orderTypes.SET_OTHER_CHARGES,
    payload: data,
  };
};

export const setDiscount = (data) => {
  return {
    type: orderTypes.SET_DISCOUNT,
    payload: data,
  };
};
//notdone

export const setOrderToEdit = (order) => {
  return {
    type: orderTypes.SET_ORDER_TO_EDIT,
    payload: order,
  };
};

export const setActiveOrder = (refId) => {
  return {
    type: orderTypes.SET_ACTIVE_ORDER,
    payload: refId,
  };
};

export const deleteLocalOrder = (refId) => {
  return (dispatch, getState) => {
    const branchCode = getMyState(getState, "user").branchCode;
    return dispatch({
      type: orderTypes.DELETE_LOCAL_ORDER,
      isSocket: true,
      payload: {
        refId,
        branchCode,
      },
    });
  };
};
export const deleteLocalOrderSocket = (refId) => {
  return {
    type: orderTypes.DELETE_LOCAL_ORDER,
    payload: {
      refId,
    },
  };
};

export const prePrintOrder = (data) => {
  return {
    type: orderTypes.PRE_PRINT_ORDER,
    payload: data,
  };
};

export const setKOTitemsData = ({ customerData }) => {
  return (dispatch, getState) => {
    const orderData = getMyState(getState, "order");
    const enableKOT = getMyState(getState, "util").enableKOT;

    const refId = orderData.activeOrder;
    const activeOrders = orderData.activeOrders;
    const myOrderIndex = findActiveOrderIndex(activeOrders, refId);
    const active = activeOrders[myOrderIndex];
    const lastOrderNumber = orderData.lastOrderNumber;

    const { kotItems, kotData } = calculateKOT({
      active,
      lastOrderNumber,
      activeOrders,
    });

    //kot loop

    if (enableKOT) {
      dispatch(
        setKOTPrintData({
          ...kotData,
          ...customerData,
        })
      );
    }
    active.customerName = customerData?.customerName;
    active.customerMobile = customerData?.customerMobile;
    active.remarks = customerData?.remarks;

    kotItems.forEach((dataitem) => {
      const foundmyItem = active.orderItems.findIndex(
        (item) => item.itemId === dataitem.itemId
      );
      active.orderItems[foundmyItem].itemStatus = ITEMSTATUS[1].key;
      active.orderItems[foundmyItem].itemStatusId = ITEMSTATUS[1].value;
      active.orderItems[foundmyItem].kotQuantity =
        active.orderItems[foundmyItem].quantity;
    });
    active.KOTS.push({
      id: uuid(),
      status: ITEMSTATUS[1].key,
      statusId: ITEMSTATUS[1].value,
      orderItems: kotItems,
      remarks: customerData?.remarks,
    });

    return dispatch({
      type: orderTypes.SET_KOT_ITEMS,
      isSocket: true,
      payload: {
        refId,
        order: active,
      },
    });
  };
};

export const setKOTitemsDataRedux = (data) => {
  return (dispatch, getState) => {
    return dispatch({
      type: orderTypes.SET_KOT_ITEMS,
      payload: data,
    });
  };
  // return (dispatch, getState) => {
  //   return dispatch({
  //     type: orderTypes.SET_KOT_ITEMS_SOCKET,
  //     payload: data,
  //   });
  // };
};

export const confirmOrder = (data, cb, errorCb) => {
  return (dispatch, getState) => {
    const orderData = getMyState(getState, "order");
    const enableKOT = getMyState(getState, "util").enableKOT;

    const refId = orderData.activeOrder;
    const activeOrders = orderData.activeOrders;
    const myOrderIndex = findActiveOrderIndex(activeOrders, refId);
    const active = activeOrders[myOrderIndex];
    const lastOrderNumber = orderData.lastOrderNumber;

    const { kotItems, kotData } = calculateKOT({
      active,
      lastOrderNumber,
      activeOrders,
    });
    if (enableKOT && kotItems.length > 0) {
      setTimeout(() => {
        dispatch(
          setKOTPrintData({
            ...data,

            ...kotData,
          })
        );
      }, 1000);
    }
    // if (enableKOT) {
    //   dispatch(
    //     setKOTPrintData({
    //       ...data,

    //       ...kotData,
    //     })
    //   );
    // }

    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Order Successfull",
      errorMessage: "Failed To Order",
      enableMessage: true,

      cb: cb,
      errorCb: errorCb,
      type: orderTypes.CONFIRM_ORDER,
      payload: {
        request: {
          url: data.isEdited ? orderApi.UPDATE_ORDER : orderApi.CREATE_ORDER,
          method: data.isEdited ? "put" : "post",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
  };
};

export const printOrder = (data, cb, errorCb) => {
  return (dispatch, getState) => {
    const orderData = getMyState(getState, "order");
    const enableKOT = getMyState(getState, "util").enableKOT;

    const refId = orderData.activeOrder;
    const activeOrders = orderData.activeOrders;
    const myOrderIndex = findActiveOrderIndex(activeOrders, refId);
    const active = activeOrders[myOrderIndex];
    const lastOrderNumber = orderData.lastOrderNumber;

    // const { kotItems, kotData } = calculateKOT({
    //   active,
    //   lastOrderNumber,
    //   activeOrders,
    // });

    // if (enableKOT) {
    //   dispatch(
    //     setKOTPrintData({
    //       ...data,

    //       ...kotData,
    //     })
    //   );
    // }
    dispatch({
      type: orderTypes.PRINT_ORDER,
      payload: data,
    });
    // checkIfAsyncReqSuccess(dispatch, {
    //   cb: cb,
    //   errorCb: errorCb,

    // });
  };
};

export const updateOrder = (
  data,
  cb,
  errorCb,
  successMessage,
  errorMessage
) => {
  return (dispatch, getState) => {
    const orderData = getMyState(getState, "order");
    const enableKOT = getMyState(getState, "util").enableKOT;

    const refId = orderData.activeOrder;
    const activeOrders = orderData.activeOrders;
    const myOrderIndex = findActiveOrderIndex(activeOrders, refId);
    const active = activeOrders[myOrderIndex];
    const lastOrderNumber = orderData.lastOrderNumber;

    const { kotItems, kotData } = calculateKOT({
      active,
      lastOrderNumber,
      activeOrders,
    });
    if (enableKOT && kotItems.length > 0) {
      setTimeout(() => {
        dispatch(
          setKOTPrintData({
            ...data,

            ...kotData,
          })
        );
      }, 1000);
    }

    checkIfAsyncReqSuccess(dispatch, {
      successMessage: successMessage || "Order Payment Received",
      errorMessage: errorMessage || "Failed To Add Payment",
      enableMessage: false,
      cb: cb,
      errorCb: errorCb,
      type: orderTypes.UPDATE_ORDER,
      payload: {
        request: {
          url: orderApi.UPDATE_ORDER,
          method: "PUT",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
  };
};

export const editOrder = (data, cb, errorCb, successMessage, errorMessage) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: successMessage || "Order Edited Successfully",
      errorMessage: errorMessage || "Failed To edit Order",
      enableMessage: false,
      cb: cb,
      errorCb: errorCb,
      type: orderTypes.UPDATE_ORDER,
      payload: {
        request: {
          url: orderApi.EDIT_ORDER,
          method: "PUT",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const getPreviosOrders = (data) => {
  return {
    type: orderTypes.GET_PREVIOS_ORDERS,
    payload: {
      request: {
        url: orderApi.GET_PREVIOS_ORDERS,
        method: "GET",
        params: {
          ...data,
        },
      },
    },
  };
};

export const incrementOrderNumberCount = () => {
  return {
    type: orderTypes.INCREMENT_ORDER_NUMBER_COUNT,
  };
};

export const clearStuckOrders = () => {
  return (dispatch, getState) => {
    const { branchId, restaurantId } = getMyState(getState, "user");

    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Active orders removed Successfully",
      errorMessage: "Failed To remove active orders",
      enableMessage: true,

      type: orderTypes.CLEAR_STUCK_ORDERS,
      payload: {
        request: {
          url: orderApi.CLEAR_STUCK_ORDERS,
          method: "DELETE",
          data: {
            branchId,
            restaurantId,
          },
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
  };
};

// import { branchTypes, orderTypes, restaurantTypes } from "../types";
// import branchApi from "../api/branchApi";
// import { orderApi } from "../api/orderApi";
// import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";
// import { uuid } from "uuidv4";
// import { TYPESOFORDERS } from "../../contants";
// const dummyActive = (payload, username) => {
//   const { tableNumber, tableTypeId, tablePrice, orderTypeId, orderType } =
//     payload;
//   return {
//     tableNumber: tableNumber,
//     tableTypeId: tableTypeId,
//     associatedPerson: username,
//     items: [],
//     tablePrice: tablePrice || 0,
//     orderTypeId: orderType || TYPESOFORDERS[0].value,
//     orderType: orderType || TYPESOFORDERS[0].key,

//     otherCharges: 0,
//     discount: 0,
//     lastKOTItems: [],
//     refId: uuid(),
//   };
// };
// // export const createBranch = (data) => {
// //   //   const role = store.getState();

// //   //   console.log(role);

// // return {
// //   type: branchTypes.CREATE_BRANCH,
// //   payload: {
// //     request: {
// //       url: branchApi.CREATE_BRANCH,
// //       method: "post",
// //       data: data,
// //       headers: {
// //         "Content-type": "application/json",
// //       },
// //     },
// //   },
// // };
// // };
// export const getMyState = (getState, myState) => {
//   return getState()[myState];
// };

// export const setOrderType = (type) => {
//   return {
//     type: orderTypes.SET_ORDER_TYPE,
//     payload: type,
//   };
// };

// export const activateOrder = (data, userName) => {
//   return {
//     type: orderTypes.ACTIVATE_ORDER,
//     payload: dummyActive(data, userName),

//isSocket: true,
//   };
// };

// export const pushItemToActiveOrder = ({ item, isVariant }) => {
//   return {
//     type: orderTypes.PUSH_ITEM_TO_ORDER,
//     payload: {
//       ...item,
//       itemId: item?.variantId || item?._id || item?.id,
//       isVariant: isVariant,
//     },
//   };
// };

// export const changeItemQuantity = ({ quantity, refId, itemId }) => {
//   return {
//     type: orderTypes.CHANGE_ITEM_QUANTITY,
//     payload: {
//       quantity,
//       refId,
//       itemId,
//     },
//   };
// };

// export const setOtherCharges = (data) => {
//   return {
//     type: orderTypes.SET_OTHER_CHARGES,
//     payload: data,
//   };
// };

// export const setDiscount = (data) => {
//   return {
//     type: orderTypes.SET_DISCOUNT,
//     payload: data,
//   };
// };
// //notdone

// export const setOrderToEdit = (order) => {
//   return {
//     type: orderTypes.SET_ORDER_TO_EDIT,
//     payload: order,
//   };
// };

// export const setActiveOrder = (refId) => {
//   return {
//     type: orderTypes.SET_ACTIVE_ORDER,
//     payload: refId,
//   };
// };

// export const deleteLocalOrder = (refId) => {
//   return {
//     type: orderTypes.DELETE_LOCAL_ORDER,
//     payload: {
//       refId,
//     },
//   };
// };

// export const removeItem = (index) => {
//   return {
//     type: orderTypes.REMOVE_ITEM,
//     payload: {
//       index,
//     },
//   };
// };
// export const prePrintOrder = (data) => {
//   return {
//     type: orderTypes.PRE_PRINT_ORDER,
//     payload: data,
//   };
// };
// export const setKOTitemsData = (data) => {
//   return {
//     type: orderTypes.SET_KOT_ITEMS,
//     payload: data,
//   };
// };

// export const confirmOrder = (data, cb, errorCb) => {
//   return (dispatch) =>
//     checkIfAsyncReqSuccess(dispatch, {
//       successMessage: "Order Successfull",
//       errorMessage: "Failed To Order",
//       enableMessage: true,

//       cb: cb,
//       errorCb: errorCb,
//       type: orderTypes.CONFIRM_ORDER,
//       payload: {
//         request: {
//           url: data.isEdited ? orderApi.UPDATE_ORDER : orderApi.CREATE_ORDER,
//           method: data.isEdited ? "put" : "post",
//           data: data,
//           headers: {
//             "Content-type": "application/json",
//           },
//         },
//       },
//     });
// };

// export const updateOrder = (
//   data,
//   cb,
//   errorCb,
//   successMessage,
//   errorMessage
// ) => {
//   return (dispatch) =>
//     checkIfAsyncReqSuccess(dispatch, {
//       successMessage: successMessage || "Order Payment Received",
//       errorMessage: errorMessage || "Failed To Add Payment",
//       enableMessage: false,
//       cb: cb,
//       errorCb: errorCb,
//       type: orderTypes.UPDATE_ORDER,
//       payload: {
//         request: {
//           url: orderApi.UPDATE_ORDER,
//           method: "PUT",
//           data: data,
//           headers: {
//             "Content-type": "application/json",
//           },
//         },
//       },
//     });
// };

// export const editOrder = (data, cb, errorCb, successMessage, errorMessage) => {
//   return (dispatch) =>
//     checkIfAsyncReqSuccess(dispatch, {
//       successMessage: successMessage || "Order Edited Successfully",
//       errorMessage: errorMessage || "Failed To edit Order",
//       enableMessage: false,
//       cb: cb,
//       errorCb: errorCb,
//       type: orderTypes.UPDATE_ORDER,
//       payload: {
//         request: {
//           url: orderApi.EDIT_ORDER,
//           method: "PUT",
//           data: data,
//           headers: {
//             "Content-type": "application/json",
//           },
//         },
//       },
//     });
// };

// export const getPreviosOrders = (data) => {
//   return {
//     type: orderTypes.GET_PREVIOS_ORDERS,
//     payload: {
//       request: {
//         url: orderApi.GET_PREVIOS_ORDERS,
//         method: "GET",
//         params: {
//           ...data,
//         },
//       },
//     },
//   };
// };
