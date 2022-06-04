import setLocalKOTPrintEnable from "../../helpers/setLocalKOTPrintEnable";
import setLocalPrintEnable from "../../helpers/setLocalPrintEnable";
import { orderTypes, userTypes, utilTypes } from "../types";

const initPrintSetting = {
  enablePrinting: true,
  enableKOT: true,
  enableLogo: true,
  enableAddress: true,
  enableGSTNumber: true,
  enableCustomer: true,
};

const initialstate = {
  spinner: false,

  isFullScreen: false,
  printData: undefined,
  KOTprintData: undefined,
  printType: "",
  enablePrinting: true,
  enableKOT: true,
  enableKDS: true,
  enableLogo: true,
  enableBranchName: true,

  enableAddress: true,
  enableGSTNumber: true,
  enableCustomer: true,
  isSocketConnected: false,
};

const utilReducer = (state = initialstate, action) => {
  const getData = () => action.payload.data.user;

  switch (action.type) {
    case utilTypes.SOCKET_CONNECTED:
      return {
        ...state,
        isSocketConnected: true,
      };
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

    // case utilTypes.TOGGLE_PRINTING:
    //   setLocalPrintEnable(!state.enablePrinting);
    //   return {
    //     ...state,
    //     enablePrinting: !state.enablePrinting,
    //     printData: undefined,
    //   };

    // case utilTypes.TOGGLE_KOT:
    //   setLocalKOTPrintEnable(!state.enableKOT);
    //   return {
    //     ...state,
    //     enableKOT: !state.enableKOT,
    //     KOTprintData: undefined,
    //   };
    case userTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...getData()?.printSetting,
      };
    case userTypes.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        ...getData()?.printSetting,
      };
    case utilTypes.TOGGLE_PRINTING_SETTING_SUCCESS:
      return {
        ...state,

        printData: undefined,
        KOTprintData: undefined,
        ...action.payload.data.data,
      };

    case orderTypes.CONFIRM_ORDER_SUCCESS:
      return {
        ...state,
        printData: action.payload?.data?.data,
      };

    case orderTypes.PRINT_ORDER:
      return {
        ...state,
        printData: action.payload,
      };

    case orderTypes.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        // printData: action.payload?.data?.data,
      };

    case orderTypes.PRE_PRINT_ORDER:
      return {
        ...state,
        printData: action.payload.data,
        printType: action.payload.printType,
      };
    case utilTypes.SET_PRINT_DATA:
      return {
        ...state,
        printData: action.payload.data,
        printType: action.payload.printType,
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
