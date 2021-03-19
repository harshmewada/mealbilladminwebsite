import {
  branchTypes,
  categoryTypes,
  commonTypes,
  itemTypes,
  orderTypes,
  tableTypes,
  userTypes,
} from "../types";

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

const dummyActive = (tablenumber, tableTypeId, user, tablePrice) => {
  return {
    tableNumber: tablenumber,
    tableTypeId: tableTypeId,
    associatedPerson: user,
    items: [],
    tablePrice: tablePrice || 0,
  };
};
const initialstate = {
  tableTypes: datatableTypes,
  allTables: [],
  activeTables: [],
  activeTable: undefined,
  itemCategories: [],
  allItems: [],
  lastOrderNumber: 0,
};

const activateTable = (allTables, index) => {
  allTables[index].active = true;
  return allTables;
};

const pushItemToActiveTable = (activeTables, activeTable, item) => {
  const iteminde = activeTables[activeTable].items.findIndex((data) => {
    return data.id === item.id;
  });
  if (iteminde >= 0) {
    activeTables[activeTable].items[iteminde].quantity++;
    activeTables[activeTable].items[iteminde].itemTotal +=
      activeTables[activeTable].items[iteminde].itemPrice;
  } else if (activeTable || activeTable === 0) {
    activeTables[activeTable].items.push({
      ...item,
      quantity: 1,
      itemTotal: 1 * item.itemPrice,
    });
  }
  return activeTables;
};

const changeItemQuantity = (allTables, activeTable, quantity, index) => {
  if (activeTable || activeTable === 0)
    allTables[activeTable].items[index].quantity = quantity;

  allTables[activeTable].items[index].itemTotal =
    quantity * allTables[activeTable].items[index].itemPrice;
  return allTables;
};

const removeItem = (allTables, activeTable, index) => {
  if (activeTable || activeTable === 0) {
    allTables[activeTable].items = allTables[activeTable].items.filter(
      (ite, itemindex) => {
        return itemindex != index;
      }
    );
  }

  return allTables;
};

const afterOrderComplete = (activeTables, allTables, data) => {
  let filteredTables = activeTables.filter((table) => {
    return table.tableNumber != data.tableNumber;
  });

  const allTableActiveIndex = allTables.findIndex((table) => {
    return table.tableNumber == data.tableNumber;
  });
  console.log(allTables[allTableActiveIndex].active);

  allTables[allTableActiveIndex].active = false;

  console.log(allTables[allTableActiveIndex].active);

  return {
    activeTables: filteredTables,
    allTables: allTables,
  };
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

    case categoryTypes.GET_ALL_CATEGORYES_SUCCESS:
      return {
        ...state,
        itemCategories: getData().data,
      };

    case itemTypes.GET_ALL_ITEMS_SUCCESS:
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

    case orderTypes.SET_ACTIVE_TABLE:
      return {
        ...state,
        activeTable: state.activeTables.findIndex(
          (tab) => tab.tableNumber === action.payload
        ),
      };

    case orderTypes.ACTIVATE_TABLE:
      return {
        ...state,
        allTables: [...activateTable(state.allTables, action.payload.index)],
        activeTables: [
          ...state.activeTables,
          dummyActive(
            action.payload.tableNumber,
            action.payload.tableTypeId,
            action.payload.username,
            action.payload.tablePrice
          ),
        ],
        // activeTable: manageActiveTabel(
        //   action.payload.tableNumber,
        //   state.activeTable,
        //   state.activeTables
        // ),
        activeTable: state.activeTables.length,
      };

    case orderTypes.PUSH_ITEM_TO_TABLE:
      return {
        ...state,
        activeTables: [
          ...pushItemToActiveTable(
            state.activeTables,
            state.activeTable,
            action.payload.item
          ),
        ],
      };

    case orderTypes.CHANGE_ITEM_QUANTITY:
      return {
        ...state,
        activeTables: [
          ...changeItemQuantity(
            state.activeTables,
            state.activeTable,
            action.payload.quantity,
            action.payload.index
          ),
        ],
      };

    case orderTypes.REMOVE_ITEM:
      return {
        ...state,
        activeTables: [
          ...removeItem(
            state.activeTables,
            state.activeTable,
            action.payload.index
          ),
        ],
      };

    case orderTypes.CONFIRM_ORDER_SUCCESS:
      return {
        ...state,
        ...afterOrderComplete(
          state.activeTables,
          state.allTables,
          action.payload.data.data
        ),
        allTables: [
          ...afterOrderComplete(
            state.activeTables,
            state.allTables,
            action.payload.data.data
          ).allTables,
        ],
        activeTable: undefined,
        lastOrderNumber: getData().data.orderNumber,
      };

    default:
      return state;
  }
};

export default orderReducer;
