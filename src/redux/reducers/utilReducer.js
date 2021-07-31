import setLocalKOTPrintEnable from "../../helpers/setLocalKOTPrintEnable";
import setLocalPrintEnable from "../../helpers/setLocalPrintEnable";
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
      setLocalPrintEnable(!state.enablePrinting);
      return {
        ...state,
        enablePrinting: !state.enablePrinting,
        printData: undefined,
      };

    case utilTypes.TOGGLE_KOT:
      setLocalKOTPrintEnable(!state.enableKOT);
      return {
        ...state,
        enableKOT: !state.enableKOT,
        KOTprintData: undefined,
      };

    case utilTypes.SET_PRINTING:
      const booleanValue = action.payload === "false" ? false : true;
      setLocalPrintEnable(booleanValue);
      return {
        ...state,
        enablePrinting: booleanValue,
        printData: undefined,
      };

    case utilTypes.SET_KOT:
      const kotbooleanValue = action.payload === "false" ? false : true;
      setLocalKOTPrintEnable(kotbooleanValue);
      return {
        ...state,
        enableKOT: kotbooleanValue,
        KOTprintData: undefined,
      };

    case orderTypes.CONFIRM_ORDER_SUCCESS:
      return {
        ...state,
        printData: action.payload?.data?.data,
      };

    case orderTypes.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        // printData: action.payload?.data?.data,
      };

    case orderTypes.PRE_PRINT_ORDER:
      return {
        ...state,
        printData: action.payload,
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
