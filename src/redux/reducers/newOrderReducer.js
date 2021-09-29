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

const findActiveOrderIndex = (activeOrders, refId) => {
  const foundOrder = activeOrders.findIndex((order) => order.refId === refId);
  if (foundOrder > -1) {
    return foundOrder;
  } else {
    return null;
  }
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
