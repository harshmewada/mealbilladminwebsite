import { get } from "react-hook-form";
import {
  branchTypes,
  categoryTypes,
  expenseTypes,
  hotKeyTypes,
  itemTypes,
  rawMaterialTypes,
  restaurantTypes,
  tableTypes,
  userTypes,
} from "../types";

const initialstate = {
  allBranches: [],
  categories: [],
  restaurantCategories: [],
  items: [],
  restaurantItems: [],
  hotkeys: [],
  tables: [],
  expenses: [],
  restaurantExpenseTypes: [],
  rawMaterials: [],
};

const branchReducer = (state = initialstate, action) => {
  const getData = () => action.payload.data;
  switch (action.type) {
    case branchTypes.CREATE_BRANCH:
      return {
        ...state,
      };

    case branchTypes.GET_ALL_BRANCHES_SUCCESS:
      return {
        ...state,
        allBranches: getData().data,
      };

    case categoryTypes.GET_BRANCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: getData().data,
      };

    case expenseTypes.GET_ALL_EXPENSES_SUCCESS:
      return {
        ...state,
        expenses: getData().data,
      };

    case expenseTypes.GET_RESTAURANT_EXPENSE_TYPES_SUCCESS:
      return {
        ...state,
        restaurantExpenseTypes: getData().data,
      };

    case categoryTypes.GET_RESTAURANT_CATEGORIES_SUCCESS:
      return {
        ...state,
        restaurantCategories: getData().data.filter((item) => {
          return (
            state.categories.findIndex((data) => {
              return data.categoryName === item.categoryName;
            }) < 0
          );
        }),
      };

    case itemTypes.GET_RESTAURANT_ITEMS_SUCCESS:
      return {
        ...state,
        restaurantItems: getData().data.filter((item) => {
          return (
            state.items.findIndex((data) => {
              return data.itemName === item.itemName;
            }) < 0
          );
        }),
      };
    case itemTypes.GET_BRANCH_ITEMS_SUCCESS:
      return {
        ...state,
        items: getData().data,
      };

    case hotKeyTypes.GET_ALL_HOTKEYS_SUCCESS:
      return {
        ...state,
        hotkeys: getData().data,
      };

    case tableTypes.GET_ALL_TABLES_SUCCESS:
      return {
        ...state,
        tables: getData().data,
      };

    case rawMaterialTypes.GET_ALL_RAW_MATERIAL_SUCCESS:
      return {
        ...state,
        rawMaterials: getData().data,
      };
    case userTypes.LOGOUT_USER:
      return { ...initialstate };
    // case restaurantTypes.CREATE_RESTAURANT_SUCCESS:
    //   return {
    //     ...state,
    //     ...getData().restaurant,
    //   };
    case itemTypes.CLEAR_ITEMS:
      return {
        ...state,
        restaurantItems: [],
        items: [],
      };
    default:
      return state;
  }
};

export default branchReducer;
