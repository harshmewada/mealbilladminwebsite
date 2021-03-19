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

export const pushItemToActiveTable = (item, index) => {
  return {
    type: orderTypes.PUSH_ITEM_TO_TABLE,
    payload: {
      item,
      index,
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

export const setActiveTable = (tableNumber) => {
  return {
    type: orderTypes.SET_ACTIVE_TABLE,
    payload: tableNumber,
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
