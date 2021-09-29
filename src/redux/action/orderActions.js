import { branchTypes, orderTypes, restaurantTypes } from "../types";
import branchApi from "../api/branchApi";
import { orderApi } from "../api/orderApi";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";
import { uuid } from "uuidv4";
import { TYPESOFORDERS } from "../../contants";
const dummyActive = (payload, username) => {
  const { tableNumber, tableTypeId, tablePrice, orderTypeId, orderType } =
    payload;
  return {
    tableNumber: tableNumber,
    tableTypeId: tableTypeId,
    associatedPerson: username,
    items: [],
    tablePrice: tablePrice || 0,
    orderTypeId: orderType || TYPESOFORDERS[0].value,
    orderType: orderType || TYPESOFORDERS[0].key,

    otherCharges: 0,
    discount: 0,
    lastKOTItems: [],
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
  return {
    type: orderTypes.ACTIVATE_ORDER,
    payload: dummyActive(data, userName),

    isSocket: false,
  };
};

export const pushItemToActiveOrder = ({ item, isVariant }) => {
  return (dispatch, getState) => {
    const refId = getMyState(getState, "order").activeOrder;
    return dispatch({
      type: orderTypes.PUSH_ITEM_TO_ORDER,
      payload: {
        refId: refId,
        item: {
          ...item,
          itemId: item?.variantId || item?._id || item?.id,
          isVariant: isVariant,
        },
      },
    });
  };
};

export const changeItemQuantity = ({ quantity, itemId }) => {
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

export const removeItem = (itemId) => {
  return (dispatch, getState) => {
    const refId = getMyState(getState, "order").activeOrder;
    return dispatch({
      type: orderTypes.REMOVE_ITEM,
      payload: {
        refId,

        itemId,
      },
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
export const setKOTitemsData = (data) => {
  return {
    type: orderTypes.SET_KOT_ITEMS,
    payload: data,
  };
};

export const confirmOrder = (data, cb, errorCb) => {
  return (dispatch) =>
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

export const updateOrder = (
  data,
  cb,
  errorCb,
  successMessage,
  errorMessage
) => {
  return (dispatch) =>
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

//     isSocket: true,
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
