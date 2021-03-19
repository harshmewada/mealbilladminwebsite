import { get } from "react-hook-form";
import {
  branchTypes,
  categoryTypes,
  hotKeyTypes,
  itemTypes,
  restaurantTypes,
  tableTypes,
} from "../types";

const initialstate = {
  allBranches: [],
  categories: [],
  items: [],
  hotkeys: [],
  tables: [],
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

    case categoryTypes.GET_ALL_CATEGORYES_SUCCESS:
      return {
        ...state,
        categories: getData().data,
      };

    case itemTypes.GET_ALL_ITEMS_SUCCESS:
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

    // case restaurantTypes.CREATE_RESTAURANT_SUCCESS:
    //   return {
    //     ...state,
    //     ...getData().restaurant,
    //   };

    default:
      return state;
  }
};

export default branchReducer;
