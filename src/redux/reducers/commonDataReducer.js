import { commonTypes } from "../types";

const tableTypes = [
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
const initialstate = {
  themes: [],
  subscriptions: [],
  tableTypes: tableTypes,
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

    case commonTypes.GET_ALL_TABLETYPES_SUCCESS:
      return {
        ...state,
        tableTypes: action.payload.data.data,
      };

    default:
      return state;
  }
};

export default commonDataReducer;
