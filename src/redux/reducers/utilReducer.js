import { orderTypes, utilTypes } from "../types";
const initialstate = {
  spinner: false,
  enablePrinting: true,
  enableKOT: true,

  isFullScreen: false,
  printData: undefined,
  KOTprintData: undefined,
};

const utilReducer = (state = initialstate, action) => {
  switch (action.type) {
    case utilTypes.TOGGLE_FULL_SCREEN:
      return {
        ...state,
        isFullScreen: !state.isFullScreen,
      };

    case utilTypes.TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpen: !state.drawerOpen,
      };

    case utilTypes.TOGGLE_PRINTING:
      return {
        ...state,
        enablePrinting: !state.enablePrinting,
        printData: undefined,
      };

    case utilTypes.TOGGLE_KOT:
      return {
        ...state,
        enableKOT: !state.enableKOT,
        KOTprintData: undefined,
      };

    case orderTypes.CONFIRM_ORDER_SUCCESS:
      return {
        ...state,
        printData: action.payload?.data?.data,
      };
    case utilTypes.SET_PRINT_DATA:
      return {
        ...state,
        printData: action.payload,
      };
    case utilTypes.SET_KOT_PRINT_DATA:
      return {
        ...state,
        KOTprintData: action.payload,
      };

    case utilTypes.REMOVE_KOT_PRINT_DATA:
      return {
        ...state,
        KOTprintData: undefined,
      };

    case utilTypes.REMOVE_PRINT_DATA:
      return {
        ...state,
        printData: undefined,
      };

    case "SPINNER_START":
      return {
        ...state,
        spinner: true,
      };

    case "SPINNER_STOP":
      return {
        ...state,
        spinner: false,
      };

    default:
      return state;
  }
};

export default utilReducer;
