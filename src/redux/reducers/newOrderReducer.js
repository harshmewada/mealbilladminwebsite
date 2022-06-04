import actionCreator from "../../helpers/actionCreatetor";
import { orderTypes, socketTypes, userTypes } from "../types";

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
  orderNumberCount: 0,
  activeTableType: "all",
};

const orderReducer = (state = initialstate, action) => {
  const getData = () => action.payload.data;
  const getPayload = () => action.payload;

  switch (action.type) {
    case actionCreator(socketTypes.GET_ORDER_DASHBOARD_DATA).success:
      return {
        ...state,
        ...action.payload,
      };

    case orderTypes.ACTIVATE_TABLE_TYPE:
      return {
        ...state,
        activeTableType: action.payload,
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

// const findItemIndex = (orderItems, itemId) => {
//   const foundOrder = orderItems.findIndex((order) => order.itemId === itemId);
//   if (foundOrder > -1) {
//     return foundOrder;
//   } else {
//     return null;
//   }
// };

// export const pushItemToActiveOrderRedux = (activeOrders, activeOrder, item) => {
//   const myOrder = findActiveOrderIndex(activeOrders, activeOrder);

//   if (myOrder >= 0) {
//     activeOrders[myOrder].orderItems.push({
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
