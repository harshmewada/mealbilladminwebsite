import { branchTypes, orderTypes, restaurantTypes } from "../types";
import branchApi from "../api/branchApi";
import { orderApi } from "../api/orderApi";
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

export const activateTable = (
  tableTypeId,
  tableNumber,
  index,
  username,
  tablePrice
) => {
  return {
    type: orderTypes.ACTIVATE_TABLE,
    payload: {
      tableTypeId,
      tableNumber,
      index,
      username,
      tablePrice,
    },
  };
};

export const setOrderType = (type) => {
  return {
    type: orderTypes.SET_ORDER_TYPE,
    payload: {
      key: type.key,
      value: type.value,
    },
  };
};

export const addNewOtherOrder = (selectedOrderTypeId) => {
  return {
    type: orderTypes.ADD_OTHER_ORDER_TYPE,
    payload: {
      selectedOrderTypeId,
    },
  };
};

export const pushItemToActiveOrder = (item, selectedOrderTypeId) => {
  return {
    type: orderTypes.PUSH_ITEM_TO_ORDER,
    payload: {
      item,
      selectedOrderTypeId,
    },
  };
};

export const changeItemQuantity = (quantity, index) => {
  return {
    type: orderTypes.CHANGE_ITEM_QUANTITY,
    payload: {
      quantity,
      index,
    },
  };
};

export const setActiveOrder = (orderIndex) => {
  return {
    type: orderTypes.SET_ACTIVE_ORDER,
    payload: orderIndex,
  };
};

export const deleteLocalOrder = (activeOrderIndex, tableNumber) => {
  return {
    type: orderTypes.DELETE_LOCAL_ORDER,
    payload: {
      activeOrderIndex,
      tableNumber: tableNumber,
    },
  };
};

export const removeItem = (index) => {
  return {
    type: orderTypes.REMOVE_ITEM,
    payload: {
      index,
    },
  };
};
export const confirmOrder = (data) => {
  return {
    type: orderTypes.CONFIRM_ORDER,
    payload: {
      request: {
        url: orderApi.CREATE_ORDER,
        method: "post",
        data: data,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
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
