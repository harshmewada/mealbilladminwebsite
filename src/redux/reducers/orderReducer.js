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
import calculateBranchOrderNumber from "../../helpers/calculateBranchOrderNumber";
import { ITEMSTATUS } from "../../contants";

export const findActiveOrderIndex = (activeOrders, refId) => {
  const foundOrder = activeOrders.findIndex((order) => order.refId === refId);
  if (foundOrder > -1) {
    return foundOrder;
  } else {
    return null;
  }
};
export const isThatItemInMyOrder = (activeOrder, myItemId) => {
  return activeOrder.orderItems.find((d) => d.itemId === myItemId);
};

export const checkIfQuantityExceeds = (item, quantity) => {
  if (item.isQuantityChecked && item.currentStock >= 0) {
    if (quantity > item.currentStock) {
      alert("Not Enought Quantity");
      return true;
    }
    return false;
  } else {
    return false;
  }
  // if (item.currentStock && quantity > item.currentStock) {
  //   alert("Not Enought Quantity");
  //   return true;
  // } else {
  //   return false;
  // }
};
export const findItemIndex = (orderItems, itemId) => {
  const foundOrder = orderItems.findIndex((order) => order.itemId === itemId);
  if (foundOrder > -1) {
    return foundOrder;
  } else {
    return undefined;
  }
};

export const pushItemToActiveOrderRedux = ({ activeOrders, refId, item }) => {
  const myOrder = findActiveOrderIndex(activeOrders, refId);
  if (myOrder >= 0) {
    activeOrders[myOrder].orderItems.push(item);
    return activeOrders;
  } else {
    alert("Please select order type");
    return activeOrders;
  }
};
export const pushItemToActiveOrderSocket = ({ activeOrders, refId, item }) => {
  const myOrder = findActiveOrderIndex(activeOrders, refId);

  if (myOrder >= 0) {
    activeOrders[myOrder].orderItems.push({
      ...item,
      // quantity: 1,
      // itemTotal: 1 * item.itemPrice,
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
    const foundItem = activeOrders[myOrderIndex].orderItems.findIndex(
      (a) => a.itemId === itemId
    );

    activeOrders[myOrderIndex].orderItems[foundItem].quantity = quantity;

    activeOrders[myOrderIndex].orderItems[foundItem].itemTotal =
      quantity * activeOrders[myOrderIndex].orderItems[foundItem].itemPrice;
    return activeOrders;
  } else {
    alert("Please select order type");
    return activeOrders;
  }
};

export const saveItemAsPreparedRedux = ({ activeOrders, refId, itemId }) => {
  const myOrderIndex = findActiveOrderIndex(activeOrders, refId);

  if (myOrderIndex >= 0) {
    const foundItem = activeOrders[myOrderIndex].orderItems.findIndex(
      (a) => a.itemId === itemId
    );

    activeOrders[myOrderIndex].orderItems[foundItem].itemStatus =
      ITEMSTATUS[2].key;
    activeOrders[myOrderIndex].orderItems[foundItem].itemStatusId =
      ITEMSTATUS[2].value;

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
    activeOrders[myOrderIndex].orderItems = activeOrders[
      myOrderIndex
    ].orderItems.filter((a) => a.itemId !== itemId);

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

const setKOTITEMSDATA = (activeOrders, refId, order, customerData) => {
  const myOrder = findActiveOrderIndex(activeOrders, refId);
  activeOrders[myOrder] = order;

  return activeOrders;
};

// const setKOTITEMSDATA = (activeOrders, refId, data, customerData) => {
//   const myOrder = findActiveOrderIndex(activeOrders, refId);
//   data.forEach((dataitem) => {
//     // if()

//     activeOrders[myOrder].customerName = customerData?.customerName;
//     activeOrders[myOrder].customerMobile = customerData?.customerMobile;
//     activeOrders[myOrder].remarks = customerData?.remarks;

//     const foundmyItem = activeOrders[myOrder].orderItems.findIndex(
//       (item) => item.itemId === dataitem.itemId
//     );
//     activeOrders[myOrder].orderItems[foundmyItem].itemStatus = ITEMSTATUS[1].key;
//     activeOrders[myOrder].orderItems[foundmyItem].itemStatusId = ITEMSTATUS[1].value;
//     activeOrders[myOrder].orderItems[foundmyItem].kotQuantity =
//       activeOrders[myOrder].orderItems[foundmyItem].quantity + dataitem.quantity;

//     // const foundItem = activeOrders[myOrder].lastKOTItems.findIndex(
//     //   (item) => item.itemId === dataitem.itemId
//     // );
//     // if (foundItem > -1) {
//     //   // console.log("setKOTITEMSDATA if", dataitem);

//     //   activeOrders[myOrder].lastKOTItems[foundItem].quantity +=
//     //     dataitem.quantity;
//     // } else {
//     //   // console.log("setKOTITEMSDATA else", dataitem);

//     //   activeOrders[myOrder].lastKOTItems.push({
//     //     ...dataitem,

//     //     itemStatus: ITEMSTATUS[1].key,
//     //     itemStatusId: ITEMSTATUS[1].value,
//     //   });
//     // }
//   });
//   activeOrders[myOrder].KOTS.push({
//     id:uuid(),
//     status: ITEMSTATUS[1].key,
//     statusId: ITEMSTATUS[1].value,
//     orderItems: data,
//   });

//   return activeOrders;
// };

const updateOrderStatus = (orders, data) => {
  const foundOrder = orders.findIndex((od) => od.refId === data.refId);
  if (foundOrder >= 0) {
    orders[foundOrder] = data;
    orders[foundOrder].orderTypeId = parseInt(data.orderTypeId);
    orders[foundOrder].orderItems = data.orderItems;
    orders[foundOrder].tablePrice = data?.tableCharges || 0;
  }
  return orders;
};

const deleteLocalOrder = (activeOrders, refId, branchCode) => {
  return activeOrders
    .filter((order) => order.refId !== refId)
    .map((i) => {
      return {
        ...i,
        // orderNumber: i.orderNumber - 1,
        // branchOrderNumber: calculateBranchOrderNumber(
        //   branchCode,
        //   i.orderNumber - 1
        // ),
      };
    });
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
  orderNumberCount: 0,
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

    case orderTypes.SET_ITEM_AS_PREPARED_SOCKET:
      return {
        ...state,
        activeOrders: [...action.payload],
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
            action.payload.refId,
            action.payload.order
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
          ...deleteLocalOrder(
            state.activeOrders,
            action.payload.refId,
            action.payload.branchCode
          ),
        ],
        orderNumberCount: state.orderNumberCount - 1,
      };

    case orderTypes.INCREMENT_ORDER_NUMBER_COUNT:
      return {
        ...state,

        orderNumberCount: state.orderNumberCount + 1,
      };

    case userTypes.LOGOUT_USER:
      return initialstate;
    default:
      return state;
  }
};

export default orderReducer;
