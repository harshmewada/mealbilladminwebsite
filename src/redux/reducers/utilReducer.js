import { utilTypes } from "../types";
const initialstate = {
  spinner: false,
  enablePrinting: true,
  isFullScreen: false,
  printData: undefined,
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
      };

    case utilTypes.SET_PRINT_DATA:
      return {
        ...state,
        printData: action.payload,
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
