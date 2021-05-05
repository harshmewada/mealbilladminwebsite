import {
  categoryTypes,
  commonTypes,
  expenseTypes,
  tableTypes,
  userTypes,
} from "../types";

const initialstate = {
  themes: [],
  subscriptions: [],
  tableTypes: [],
  categoryTypes: [],
  expenseTypes: [],
};

const commonDataReducer = (state = initialstate, action) => {
  switch (action.type) {
    case commonTypes.GET_ALL_THEMES_SUCCESS:
      return {
        ...state,
        themes: action.payload.data.data || [],
      };

    case commonTypes.GET_ALL_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptions: action.payload.data.data,
      };

    // case commonTypes.GET_ALL_TABLETYPES_SUCCESS:
    //   return {
    //     ...state,
    //     tableTypes: action.payload.data.data,
    //   };

    case tableTypes.GET_ALL_TABLETYPES_SUCCESS:
      return {
        ...state,
        tableTypes: action.payload.data.data,
      };
    case expenseTypes.GET_ALL_EXPENSE_TYPES_SUCCESS:
      return {
        ...state,
        expenseTypes: action.payload.data.data,
      };

    case categoryTypes.GET_ALL_CATEGORY_TYPES_SUCCESS:
      return {
        ...state,
        categoryTypes: action.payload.data.data,
      };
    case userTypes.LOGOUT_USER:
      return { ...initialstate };
    default:
      return state;
  }
};

export default commonDataReducer;
