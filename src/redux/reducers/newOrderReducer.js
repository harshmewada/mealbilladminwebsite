import {
  branchTypes,
  categoryTypes,
  commonTypes,
  itemTypes,
  orderTypes,
  tableTypes,
  userTypes,
  utilTypes,
} from "../types";
import { uuid } from "uuidv4";

export const findActiveOrderIndex = (activeOrders, refId) => {
  const foundOrder = activeOrders.findIndex((order) => order.refId === refId);
  if (foundOrder > -1) {
    return foundOrder;
  } else {
    return null;
  }
};
export const isThatItemInMyOrder = (activeOrder, myItemId) => {
  return activeOrder.items.find((d) => d.itemId === myItemId);
};

const findItemIndex = (items, itemId) => {
  const foundOrder = items.findIndex((order) => order.itemId === itemId);
  if (foundOrder > -1) {
    return foundOrder;
  } else {
    return undefined;
  }
};

export const pushItemToActiveOrderRedux = ({ activeOrders, refId, item }) => {
  const myOrder = findActiveOrderIndex(activeOrders, refId);

  if (myOrder >= 0) {
    activeOrders[myOrder].items.push({
      ...item,
      quantity: 1,
      itemTotal: 1 * item.itemPrice,
    });
    return activeOrders;
  } else {
    alert("Please select order type");
    return activeOrders;
  }
};
export const pushItemToActiveOrderSocket = ({ activeOrders, refId, item }) => {
  const myOrder = findActiveOrderIndex(activeOrders, refId);

  if (myOrder >= 0) {
    activeOrders[myOrder].items.push({
      ...item,
      quantity: 1,
      itemTotal: 1 * item.itemPrice,
    });
    return activeOrders;
  } else {
    alert("Please select order type");
    return activeOrders;
  }
};

export const changeItemQuantityRedux = ({
  activeOrders,
  refId,
  quantity,
  itemId,
}) => {
  const myOrderIndex = findActiveOrderIndex(activeOrders, refId);
  if (myOrderIndex >= 0) {
    const foundItem = activeOrders[myOrderIndex].items.findIndex(
      (a) => a.itemId === itemId
    );

    activeOrders[myOrderIndex].items[foundItem].quantity = quantity;

    activeOrders[myOrderIndex].items[foundItem].itemTotal =
      quantity * activeOrders[myOrderIndex].items[foundItem].itemPrice;
    return activeOrders;
  } else {
    alert("Please select order type");
    return activeOrders;
  }
};

export const removeItemRedux = ({
  activeOrders,
  refId,

  itemId,
}) => {
  const myOrderIndex = findActiveOrderIndex(activeOrders, refId);
  if (myOrderIndex >= 0) {
    activeOrders[myOrderIndex].items = activeOrders[myOrderIndex].items.filter(
      (a) => a.itemId !== itemId
    );

    console.log(
      "hehe",
      itemId,
      activeOrders[myOrderIndex].items.filter((a) => a.itemId !== itemId)
    );

    return activeOrders;
  } else {
    alert("Please select order type");
    return activeOrders;
  }
};

const changeMiscDetails = (activeOrders, refId, data, variable) => {
  const myOrderIndex = findActiveOrderIndex(activeOrders, refId);

  if (myOrderIndex >= 0) {
    activeOrders[myOrderIndex][variable] = parseInt(data);
    return activeOrders;
  } else {
    alert("Please activate an order to change");

    return activeOrders;
  }
};

export const addCustomerNameOrMobileToOrder = ({
  activeOrders,
  refId,
  data,
}) => {
  const myOrder = findActiveOrderIndex(activeOrders, refId);

  if (myOrder >= 0) {
    activeOrders[myOrder].customerName = data?.customerName;
    activeOrders[myOrder].customerMobile = data?.customerMobile;

    return activeOrders;
  } else {
    alert("Please select order type");
    return activeOrders;
  }
};

const setKOTITEMSDATA = (activeOrders, refId, data) => {
  data.forEach((dataitem) => {
    const myOrder = findActiveOrderIndex(activeOrders, refId);
    // if()
    const foundItem = activeOrders[myOrder].lastKOTItems.findIndex(
      (item) => item.itemId === dataitem.itemId
    );

    if (foundItem > -1) {
      activeOrders[myOrder].lastKOTItems[foundItem].quantity +=
        dataitem.quantity;
    } else {
      activeOrders[myOrder].lastKOTItems.push(dataitem);
    }
  });

  return activeOrders;
};

const updateOrderStatus = (orders, data) => {
  const foundOrder = orders.findIndex((od) => od.refId === data.refId);
  if (foundOrder >= 0) {
    orders[foundOrder] = data;
    orders[foundOrder].orderTypeId = parseInt(data.orderTypeId);
    orders[foundOrder].items = data.orderItems;
    orders[foundOrder].tablePrice = data?.tableCharges || 0;
  }
  return orders;
};

const deleteLocalOrder = (activeOrders, refId) => {
  return activeOrders.filter((order) => order.refId !== refId);
};

const initialstate = {
  tableTypes: [],
  allTables: [],
  activeOrders: [],
  activeOrder: undefined,
  itemCategories: [],
  allItems: [],
  lastOrderNumber: 0,
  selectedOrderType: "Dine In",
  selectedOrderTypeId: 0,
  previousOrders: [],
};

const orderReducer = (state = initialstate, action) => {
  const getData = () => action.payload.data;
  const getPayload = () => action.payload;

  switch (action.type) {
    case orderTypes.GET_SOCKET_ORDERS:
      return {
        ...state,
        activeOrders: action.payload,
      };
    case userTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        lastOrderNumber: action.payload.data.user.orderNumber || 0,
      };

    case userTypes.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        lastOrderNumber: action.payload.data.user.orderNumber || 0,
      };

    case commonTypes.GET_ALL_TABLETYPES_SUCCESS:
      return {
        ...state,
        tableTypes: action.payload.data.data,
      };

    case categoryTypes.GET_BRANCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        itemCategories: getData().data,
      };

    case itemTypes.GET_BRANCH_ITEMS_SUCCESS:
      return {
        ...state,
        allItems: getData().data,
      };

    case tableTypes.GET_ALL_TABLES_SUCCESS:
      return {
        ...state,
        allTables: getData().data.map((item) => {
          return { ...item, active: false };
        }),
      };

    case orderTypes.GET_PREVIOS_ORDERS_SUCCESS:
      return {
        ...state,

        previousOrders: getData().data,
      };

    case orderTypes.GET_SOKCET_ORDERS_SUCCESS:
      return {
        ...state,

        activeOrders: getData().data,
      };

    case orderTypes.SET_ACTIVE_ORDER:
      return {
        ...state,
        activeOrder: action.payload,
      };

    case orderTypes.SET_ORDER_TYPE:
      return {
        ...state,
        selectedOrderType: getPayload().key,
        selectedOrderTypeId: getPayload().value,
      };

    case orderTypes.ACTIVATE_ORDER:
      return {
        ...state,
        activeOrders: [...state.activeOrders, getPayload()],
        activeOrder: getPayload().refId,
      };
    case orderTypes.ACTIVATE_ORDER_SOCKET:
      return {
        ...state,
        activeOrders: [...state.activeOrders, getPayload()],
        activeOrder: getPayload().refId,
      };

    case orderTypes.PUSH_ITEM_TO_ORDER:
      return {
        ...state,
        activeOrders: [
          ...pushItemToActiveOrderRedux({
            activeOrders: state.activeOrders,
            refId: getPayload().refId,
            item: getPayload().item,
          }),
        ],
      };
    case orderTypes.PUSH_ITEM_TO_ORDER_SOCKET:
      return {
        ...state,
        activeOrders: [
          ...pushItemToActiveOrderSocket({
            activeOrders: state.activeOrders,
            refId: getPayload().refId,
            item: getPayload().item,
          }),
        ],
      };

    case orderTypes.CHANGE_ITEM_QUANTITY:
      return {
        ...state,
        activeOrders: [
          ...changeItemQuantityRedux({
            activeOrders: state.activeOrders,
            refId: getPayload().refId,
            itemId: getPayload().itemId,
            quantity: getPayload().quantity,
          }),
        ],
      };

    case orderTypes.REMOVE_ITEM:
      return {
        ...state,
        activeOrders: [
          ...removeItemRedux({
            activeOrders: state.activeOrders,
            refId: getPayload().refId,
            itemId: getPayload().itemId,
          }),
        ],
      };

    case orderTypes.SET_DISCOUNT:
      return {
        ...state,
        activeOrders: [
          ...changeMiscDetails(
            state.activeOrders,
            state.activeOrder,
            action.payload,
            "discount"
          ),
        ],
      };

    case orderTypes.SET_OTHER_CHARGES:
      return {
        ...state,
        activeOrders: [
          ...changeMiscDetails(
            state.activeOrders,
            state.activeOrder,
            action.payload,
            "otherCharges"
          ),
        ],
      };

    case orderTypes.SET_KOT_ITEMS:
      return {
        ...state,
        activeOrders: [
          ...setKOTITEMSDATA(
            state.activeOrders,
            state.activeOrder,
            action.payload
          ),
        ],
      };

    case utilTypes.SET_KOT_PRINT_DATA:
      if (action.payload.customerName || action.payload.customerMobile) {
        return {
          ...state,
          activeOrders: [
            ...addCustomerNameOrMobileToOrder({
              activeOrders: state.activeOrders,
              refId: state.activeOrder,
              data: getPayload(),
            }),
          ],
        };
      }
      return {
        ...state,
      };

    case orderTypes.CONFIRM_ORDER_SUCCESS:
      return {
        ...state,
        activeOrders: [
          ...updateOrderStatus(state.activeOrders, getData().data),
        ],

        lastOrderNumber: getData().data.orderNumber,
      };

    case orderTypes.UPDATE_ORDER_SUCCESS:
      return {
        ...state,

        lastOrderNumber: getData().data.orderNumber,
      };

    case orderTypes.DELETE_LOCAL_ORDER:
      return {
        ...state,

        activeOrders: [
          ...deleteLocalOrder(state.activeOrders, action.payload.refId),
        ],
      };

    case userTypes.LOGOUT_USER:
      return initialstate;
    default:
      return state;
  }
};

export default orderReducer;

// import {
//   branchTypes,
//   categoryTypes,
//   commonTypes,
//   itemTypes,
//   orderTypes,
//   tableTypes,
//   userTypes,
//   utilTypes,
// } from "../types";
// import { uuid } from "uuidv4";

// const findActiveOrderIndex = (activeOrders, refId) => {
//   const foundOrder = activeOrders.findIndex((order) => order.refId === refId);
//   if (foundOrder > -1) {
//     return foundOrder;
//   } else {
//     return null;
//   }
// };

// const findItemIndex = (items, itemId) => {
//   const foundOrder = items.findIndex((order) => order.itemId === itemId);
//   if (foundOrder > -1) {
//     return foundOrder;
//   } else {
//     return null;
//   }
// };

// export const pushItemToActiveOrderRedux = (activeOrders, activeOrder, item) => {
//   const myOrder = findActiveOrderIndex(activeOrders, activeOrder);

//   if (myOrder >= 0) {
//     activeOrders[myOrder].items.push({
//       ...item,
//       quantity: 1,
//       itemTotal: 1 * item.itemPrice,
//     });
//   } else {
//     alert("Please select order type");
//   }
//   return activeOrders;
// };

// const initialstate = {
//   tableTypes: [],
//   allTables: [],
//   activeOrders: [],
//   activeOrder: undefined,
//   itemCategories: [],
//   allItems: [],
//   lastOrderNumber: 0,
//   selectedOrderType: "Dine In",
//   selectedOrderTypeId: 0,
//   previousOrders: [],
// };

// const orderReducer = (state = initialstate, action) => {
//   const getData = () => action.payload.data;
//   const getPayload = () => action.payload;

//   switch (action.type) {
//     case userTypes.LOGIN_USER_SUCCESS:
//       return {
//         ...state,
//         lastOrderNumber: action.payload.data.user.orderNumber || 0,
//       };

//     case userTypes.GET_USER_DETAILS_SUCCESS:
//       return {
//         ...state,
//         lastOrderNumber: action.payload.data.user.orderNumber || 0,
//       };

//     case commonTypes.GET_ALL_TABLETYPES_SUCCESS:
//       return {
//         ...state,
//         tableTypes: action.payload.data.data,
//       };

//     case categoryTypes.GET_BRANCH_CATEGORIES_SUCCESS:
//       return {
//         ...state,
//         itemCategories: getData().data,
//       };

//     case itemTypes.GET_BRANCH_ITEMS_SUCCESS:
//       return {
//         ...state,
//         allItems: getData().data,
//       };

//     case tableTypes.GET_ALL_TABLES_SUCCESS:
//       return {
//         ...state,
//         allTables: getData().data.map((item) => {
//           return { ...item, active: false };
//         }),
//       };

//     case orderTypes.GET_PREVIOS_ORDERS_SUCCESS:
//       return {
//         ...state,

//         previousOrders: getData().data,
//       };

//     case orderTypes.SET_ACTIVE_ORDER:
//       return {
//         ...state,
//         activeOrder: action.payload,
//       };

//     case orderTypes.SET_ORDER_TYPE:
//       return {
//         ...state,
//         selectedOrderType: getPayload().key,
//         selectedOrderTypeId: getPayload().value,
//       };

//     case orderTypes.ACTIVATE_ORDER:
//       return {
//         ...state,
//         activeOrders: [...state.activeOrders, getPayload()],
//         activeOrder: getPayload().refId,
//       };

//     case orderTypes.PUSH_ITEM_TO_ORDER:
//       return {
//         ...state,
//         activeOrders: [
//           ...pushItemToActiveOrderRedux(
//             state.activeOrders,
//             state.activeOrder,
//             getPayload()
//           ),
//         ],
//       };

//     case userTypes.LOGOUT_USER:
//       return initialstate;
//     default:
//       return state;
//   }
// };

// export default orderReducer;
