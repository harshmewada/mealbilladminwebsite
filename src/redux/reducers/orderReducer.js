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
import setLocalPrintEnable from "../../helpers/setLocalPrintEnable";
import setLocalKOTPrintEnable from "../../helpers/setLocalKOTPrintEnable";
const datatableTypes = [
  {
    tableTypeName: "Ac",
    tableTypeId: 0,
  },
  {
    tableTypeName: "Non - Ac",
    tableTypeId: 1,
  },

  {
    tableTypeName: "Garden",
    tableTypeId: 2,
  },
];

const dummyActive = (payload) => {
  const { tableNumber, tableTypeId, username, tablePrice } = payload;
  return {
    tableNumber: tableNumber,
    tableTypeId: tableTypeId,
    associatedPerson: username,
    items: [],
    tablePrice: tablePrice || 0,
    orderType: 0,
    otherCharges: 0,
    discount: 0,
    lastKOTItems: [],
    refId: uuid(),
  };
};
const initialstate = {
  tableTypes: datatableTypes,
  allTables: [],
  activeOrders: [],
  activeOrderIndex: undefined,
  itemCategories: [],
  allItems: [],
  lastOrderNumber: 0,
  selectedOrderType: "Dine In",
  selectedOrderTypeId: 0,
  previousOrders: [],
};

const findActiveOrder = (activeOrders, refId) => {
  const foundOrder = activeOrders.findIndex((order) => order.refId === refId);
  if (foundOrder > -1) {
    return foundOrder;
  } else {
    return null;
  }
};

const setOrderType = ({ key, value }) => {
  return {
    selectedOrderType: key,
    selectedOrderTypeId: value,
  };
};

const activateTable = (allTables, index) => {
  allTables[index].active = true;
  return allTables;
};

const pushItemToActiveOrder = (
  activeOrders,
  activeOrderIndex,
  stateOrderId,
  item,
  selectedOrderTypeId,
  isVariant
) => {
  if (isVariant) {
    if (activeOrders[activeOrderIndex]) {
      const iteminde = activeOrders[activeOrderIndex].items.findIndex(
        (data) => {
          return data.variantId === item.variantId;
        }
      );
      if (iteminde >= 0) {
        activeOrders[activeOrderIndex].items[iteminde].quantity++;
        activeOrders[activeOrderIndex].items[iteminde].itemTotal +=
          activeOrders[activeOrderIndex].items[iteminde].itemPrice;
      } else {
        activeOrders[activeOrderIndex].items.push({
          ...item,
          quantity: 1,
          itemTotal: 1 * item.itemPrice,
        });
      }
    } else {
      alert("Please select order type");
    }
  } else {
    if (activeOrders[activeOrderIndex]) {
      const iteminde = activeOrders[activeOrderIndex].items.findIndex(
        (data) => {
          return data.id === item.id;
        }
      );
      if (iteminde >= 0) {
        activeOrders[activeOrderIndex].items[iteminde].quantity++;
        activeOrders[activeOrderIndex].items[iteminde].itemTotal +=
          activeOrders[activeOrderIndex].items[iteminde].itemPrice;
      } else {
        activeOrders[activeOrderIndex].items.push({
          ...item,
          quantity: 1,
          itemTotal: 1 * item.itemPrice,
        });
      }
    } else {
      alert("Please select order type");
    }
  }

  return activeOrders;
};

const addCustomerNameOrMobileToOrder = (
  activeOrders,
  activeOrderIndex,
  stateOrderId,
  customerName,
  customerMobile
) => {
  if (activeOrders[activeOrderIndex]) {
    activeOrders[activeOrderIndex].customerName = customerName;
    activeOrders[activeOrderIndex].customerMobile = customerMobile;
  }

  return activeOrders;
};
const addNewOtherOrder = (activeOrders, selectedOrderTypeId) => {
  activeOrders.push({
    tableNumber: undefined,
    tableTypeId: undefined,
    associatedPerson: "Rahul",
    items: [],
    tablePrice: 0,
    orderType: selectedOrderTypeId,
    otherCharges: 0,
    discount: 0,
    lastKOTItems: [],
    refId: uuid(),
  });
  return activeOrders;
};

const changeItemQuantity = (allTables, activeOrderIndex, quantity, index) => {
  if (activeOrderIndex || activeOrderIndex === 0)
    allTables[activeOrderIndex].items[index].quantity = quantity;

  allTables[activeOrderIndex].items[index].itemTotal =
    quantity * allTables[activeOrderIndex].items[index].itemPrice;
  return allTables;
};

const removeItem = (allTables, activeOrderIndex, index) => {
  if (activeOrderIndex || activeOrderIndex === 0) {
    allTables[activeOrderIndex].items = allTables[
      activeOrderIndex
    ].items.filter((ite, itemindex) => {
      return itemindex != index;
    });
  }

  return allTables;
};

const setKOTITEMSDATA = (activeOrders, activeOrderIndex, data) => {
  data.forEach((dataitem) => {
    // if()
    const foundItem = activeOrders[activeOrderIndex].lastKOTItems.findIndex(
      (item) => item.id === dataitem.id
    );

    if (foundItem > -1) {
      activeOrders[activeOrderIndex].lastKOTItems[foundItem].quantity +=
        dataitem.quantity;
    } else {
      activeOrders[activeOrderIndex].lastKOTItems.push(dataitem);
    }
  });

  return activeOrders;
};

const deleteLocalOrder = (activeOrders, allTables, refId) => {
  const foundIndex = activeOrders.findIndex((or) => or.refId === refId);

  if (foundIndex >= 0) {
    const foundOrder = activeOrders[foundIndex];

    if (foundOrder.tableNumber) {
      let mytable = allTables.findIndex((table) => {
        return table.tableNumber == foundOrder.tableNumber;
      });
      if (mytable >= 0) {
        allTables[mytable].active = false;
      }
    }
  }
  let filteredOrders = activeOrders.filter((table, tabindex) => {
    return tabindex !== foundIndex;
  });
  return {
    activeOrders: filteredOrders,
    allTables: allTables,
  };
};

const changeMiscDetails = (activeOrders, activeOrderIndex, data, variable) => {
  if (activeOrderIndex || activeOrderIndex === 0) {
    activeOrders[activeOrderIndex][variable] = data;
  } else {
    alert("Please activate an order to change");
  }

  return activeOrders;
};

const updateOrderStatus = (orders, data) => {
  const foundOrder = orders.findIndex((od) => od.refId === data.refId);
  if (foundOrder >= 0) {
    orders[foundOrder] = data;
    orders[foundOrder].orderType = parseInt(data.orderType);
    orders[foundOrder].items = data.orderItems;
    orders[foundOrder].tablePrice = data?.tableCharges || 0;
  }
  return orders;
};

const orderReducer = (state = initialstate, action) => {
  const getData = () => action.payload.data;
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

    case orderTypes.SET_ORDER_TYPE:
      return {
        ...state,
        ...setOrderType(action.payload),
      };

    case orderTypes.SET_ACTIVE_ORDER:
      return {
        ...state,
        activeOrderIndex: findActiveOrder(state.activeOrders, action.payload),
      };

    case orderTypes.ACTIVATE_TABLE:
      return {
        ...state,
        allTables: [...activateTable(state.allTables, action.payload.index)],
        activeOrders: [...state.activeOrders, dummyActive(action.payload)],
        activeOrderIndex: state.activeOrders.length,
      };
    case orderTypes.ADD_OTHER_ORDER_TYPE:
      return {
        ...state,
        activeOrders: [
          ...addNewOtherOrder(
            state.activeOrders,
            action.payload.selectedOrderTypeId
          ),
        ],
        activeOrderIndex: state.activeOrders.length - 1,
      };

    case utilTypes.SET_KOT_PRINT_DATA:
      if (action.payload.customerName || action.payload.customerMobile) {
        return {
          ...state,
          activeOrders: [
            ...addCustomerNameOrMobileToOrder(
              state.activeOrders,
              state.activeOrderIndex,
              state.selectedOrderTypeId,

              action.payload.customerName,
              action.payload.customerMobile
            ),
          ],
        };
      }
      return {
        ...state,
      };
    case orderTypes.PUSH_ITEM_TO_ORDER:
      return {
        ...state,
        activeOrders: [
          ...pushItemToActiveOrder(
            state.activeOrders,
            state.activeOrderIndex,
            state.selectedOrderTypeId,

            action.payload.item,
            action.payload.selectedOrderTypeId,
            action.payload.isVariant
          ),
        ],
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
    case orderTypes.CHANGE_ITEM_QUANTITY:
      return {
        ...state,
        activeOrders: [
          ...changeItemQuantity(
            state.activeOrders,
            state.activeOrderIndex,
            action.payload.quantity,
            action.payload.index
          ),
        ],
      };

    case orderTypes.SET_KOT_ITEMS:
      return {
        ...state,
        activeOrders: [
          ...setKOTITEMSDATA(
            state.activeOrders,
            state.activeOrderIndex,
            action.payload
          ),
        ],
      };

    case orderTypes.REMOVE_ITEM:
      return {
        ...state,
        activeOrders: [
          ...removeItem(
            state.activeOrders,
            state.activeOrderIndex,
            action.payload.index
          ),
        ],
      };

    case orderTypes.DELETE_LOCAL_ORDER:
      return {
        ...state,

        activeOrders: [
          ...deleteLocalOrder(
            state.activeOrders,
            state.allTables,
            action.payload.refId
          ).activeOrders,
        ],
        allTables: [
          ...deleteLocalOrder(
            state.activeOrders,
            state.allTables,
            action.payload.activeOrderIndex,
            action.payload.tableNumber
          ).allTables,
        ],
      };

    case orderTypes.SET_DISCOUNT:
      return {
        ...state,
        activeOrders: [
          ...changeMiscDetails(
            state.activeOrders,
            state.activeOrderIndex,
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
            state.activeOrderIndex,
            action.payload,
            "otherCharges"
          ),
        ],
      };

    case orderTypes.GET_PREVIOS_ORDERS_SUCCESS:
      return {
        ...state,

        previousOrders: getData().data,
      };

    // case utilTypes.TOGGLE_PRINTING:
    //   setLocalPrintEnable(!state.enablePrinting);
    //   return {
    //     ...state,
    //     enablePrinting: !state.enablePrinting,
    //   };

    // case utilTypes.TOGGLE_KOT:
    //   setLocalKOTPrintEnable(!state.enableKOT);
    //   return {
    //     ...state,
    //     enableKOT: !state.enableKOT,
    //   };

    // case utilTypes.SET_PRINTING:
    //   const booleanValue = action.payload === "false" ? false : true;
    //   setLocalPrintEnable(booleanValue);
    //   return {
    //     ...state,
    //     enablePrinting: booleanValue,
    //   };

    // case utilTypes.SET_KOT:
    //   const kotbooleanValue = action.payload === "false" ? false : true;
    //   setLocalKOTPrintEnable(kotbooleanValue);
    //   return {
    //     ...state,
    //     enableKOT: kotbooleanValue,
    //   };

    case userTypes.LOGOUT_USER:
      return initialstate;
    default:
      return state;
  }
};

export default orderReducer;

// const pushItemToActiveOrder = (
//   activeOrders,
//   activeOrderIndex,
//   stateOrderId,
//   item,
//   selectedOrderTypeId
// ) => {
//   if (stateOrderId === 0) {
//     const iteminde = activeOrders[activeOrderIndex].items.findIndex((data) => {
//       return data.id === item.id;
//     });
//     if (iteminde >= 0) {
//       activeOrders[activeOrderIndex].items[iteminde].quantity++;
//       activeOrders[activeOrderIndex].items[iteminde].itemTotal +=
//         activeOrders[activeOrderIndex].items[iteminde].itemPrice;
//     } else if (activeOrderIndex || activeOrderIndex === 0) {
//       activeOrders[activeOrderIndex].items.push({
//         ...item,
//         quantity: 1,
//         itemTotal: 1 * item.itemPrice,
//       });
//     }
//   } else if (activeOrders[activeOrderIndex]) {
//     console.log(
//       "elif",
//       activeOrders[activeOrderIndex],
//       activeOrders[activeOrderIndex].orderType === selectedOrderTypeId
//     );
//     if (activeOrders[activeOrderIndex].orderType === selectedOrderTypeId) {
//       const iteminde = activeOrders[activeOrderIndex].items.findIndex(
//         (data) => {
//           return data.id === item.id;
//         }
//       );
//       if (iteminde >= 0) {
//         activeOrders[activeOrderIndex].items[iteminde].quantity++;
//         activeOrders[activeOrderIndex].items[iteminde].itemTotal +=
//           activeOrders[activeOrderIndex].items[iteminde].itemPrice;
//       } else if (activeOrderIndex || activeOrderIndex === 0) {
//         activeOrders[activeOrderIndex].items.push({
//           ...item,
//           quantity: 1,
//           itemTotal: 1 * item.itemPrice,
//         });
//       }
//     } else {
//       activeOrders.push({
//         tableNumber: undefined,
//         tableTypeId: undefined,
//         associatedPerson: "Rahul",
//         items: [{ ...item, quantity: 1, itemTotal: 1 * item.itemPrice }],
//         tablePrice: 0,
//         orderType: selectedOrderTypeId,
//       });
//     }
//   } else {
//     activeOrders.push({
//       tableNumber: undefined,
//       tableTypeId: undefined,
//       associatedPerson: "Rahul",
//       items: [{ ...item, quantity: 1, itemTotal: 1 * item.itemPrice }],
//       tablePrice: 0,
//       orderType: selectedOrderTypeId,
//     });
//   }
//   return activeOrders;
// };
// import {
//   branchTypes,
//   categoryTypes,
//   commonTypes,
//   itemTypes,
//   orderTypes,
//   tableTypes,
//   userTypes,
// } from "../types";

// const datatableTypes = [
//   {
//     tableTypeName: "Ac",
//     tableTypeId: 0,
//   },
//   {
//     tableTypeName: "Non - Ac",
//     tableTypeId: 1,
//   },

//   {
//     tableTypeName: "Garden",
//     tableTypeId: 2,
//   },
// ];

// const dummyActive = (tablenumber, tableTypeId, user, tablePrice) => {
//   return {
//     tableNumber: tablenumber,
//     tableTypeId: tableTypeId,
//     associatedPerson: user,
//     items: [],
//     tablePrice: tablePrice || 0,
//   };
// };
// const initialstate = {
//   tableTypes: datatableTypes,
//   allTables: [],
//   activeOrders: [],
//   activeTable: undefined,
//   itemCategories: [],
//   allItems: [],
//   lastOrderNumber: 0,
//   selectedOrderType: "Dine In",
//   selectedOrderTypeId: 0,
// };

// const setOrderType = ({ key, value }) => {
//   return {
//     selectedOrderType: key,
//     selectedOrderTypeId: value,
//   };
// };

// const activateTable = (allTables, index) => {
//   allTables[index].active = true;
//   return allTables;
// };

// const pushItemToActiveOrder = (
//   activeOrders,
//   activeTable,
//   item,
//   selectedOrderTypeId
// ) => {
//   const iteminde = activeOrders[activeTable].items.findIndex((data) => {
//     return data.id === item.id;
//   });
//   if (iteminde >= 0) {
//     activeOrders[activeTable].items[iteminde].quantity++;
//     activeOrders[activeTable].items[iteminde].itemTotal +=
//       activeOrders[activeTable].items[iteminde].itemPrice;
//   } else if (activeTable || activeTable === 0) {
//     activeOrders[activeTable].items.push({
//       ...item,
//       quantity: 1,
//       itemTotal: 1 * item.itemPrice,
//     });
//   }
//   return activeOrders;
// };

// const changeItemQuantity = (allTables, activeTable, quantity, index) => {
//   if (activeTable || activeTable === 0)
//     allTables[activeTable].items[index].quantity = quantity;

//   allTables[activeTable].items[index].itemTotal =
//     quantity * allTables[activeTable].items[index].itemPrice;
//   return allTables;
// };

// const removeItem = (allTables, activeTable, index) => {
//   if (activeTable || activeTable === 0) {
//     allTables[activeTable].items = allTables[activeTable].items.filter(
//       (ite, itemindex) => {
//         return itemindex != index;
//       }
//     );
//   }

//   return allTables;
// };

// const afterOrderComplete = (activeOrders, allTables, data) => {
//   let filteredTables = activeOrders.filter((table) => {
//     return table.tableNumber != data.tableNumber;
//   });

//   const allTableActiveIndex = allTables.findIndex((table) => {
//     return table.tableNumber == data.tableNumber;
//   });
//   console.log(allTables[allTableActiveIndex].active);

//   allTables[allTableActiveIndex].active = false;

//   console.log(allTables[allTableActiveIndex].active);

//   return {
//     activeOrders: filteredTables,
//     allTables: allTables,
//   };
// };
// const orderReducer = (state = initialstate, action) => {
//   const getData = () => action.payload.data;
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

//     case orderTypes.SET_ORDER_TYPE:
//       return {
//         ...state,
//         ...setOrderType(action.payload),
//       };

// case orderTypes.SET_ACTIVE_ORDER:
//   return {
//     ...state,
//     activeTable: state.activeOrders.findIndex(
//       (tab) => tab.tableNumber === action.payload
//     ),
//   };

//     case orderTypes.ACTIVATE_TABLE:
//       return {
//         ...state,
//         allTables: [...activateTable(state.allTables, action.payload.index)],
//         activeOrders: [
//           ...state.activeOrders,
//           dummyActive(
//             action.payload.tableNumber,
//             action.payload.tableTypeId,
//             action.payload.username,
//             action.payload.tablePrice
//           ),
//         ],
//         // activeTable: manageActiveTabel(
//         //   action.payload.tableNumber,
//         //   state.activeTable,
//         //   state.activeOrders
//         // ),
//         activeTable: state.activeOrders.length,
//       };

// case orderTypes.PUSH_ITEM_TO_ORDER:
//   return {
//     ...state,
//     activeOrders: [
//       ...pushItemToActiveOrder(
//         state.activeOrders,
//         state.activeTable,
//         action.payload.item,
//         action.payload.selectedOrderTypeId
//       ),
//     ],
//   };

// case orderTypes.CHANGE_ITEM_QUANTITY:
//   return {
//     ...state,
//     activeOrders: [
//       ...changeItemQuantity(
//         state.activeOrders,
//         state.activeTable,
//         action.payload.quantity,
//         action.payload.index
//       ),
//     ],
//   };

// case orderTypes.REMOVE_ITEM:
//   return {
//     ...state,
//     activeOrders: [
//       ...removeItem(
//         state.activeOrders,
//         state.activeTable,
//         action.payload.index
//       ),
//     ],
//   };

// case orderTypes.CONFIRM_ORDER_SUCCESS:
//   return {
//     ...state,
//     ...afterOrderComplete(
//       state.activeOrders,
//       state.allTables,
//       action.payload.data.data
//     ),
//     allTables: [
//       ...afterOrderComplete(
//         state.activeOrders,
//         state.allTables,
//         action.payload.data.data
//       ).allTables,
//     ],
//     activeTable: undefined,
//     lastOrderNumber: getData().data.orderNumber,
//   };

//     default:
//       return state;
//   }
// };

// export default orderReducer;
