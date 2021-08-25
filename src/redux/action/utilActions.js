import utilApi from "../api/utilApi";
import { utilTypes } from "../types";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";

export const toggleDrawer = () => {
  return {
    type: utilTypes.TOGGLE_DRAWER,
  };
};

export const toggleFullScreen = () => {
  return {
    type: utilTypes.TOGGLE_FULL_SCREEN,
  };
};

export const togglePrinting = () => {
  return {
    type: utilTypes.TOGGLE_PRINTING,
  };
};

export const toggleKOT = () => {
  return {
    type: utilTypes.TOGGLE_KOT,
  };
};

export const setPrintData = (data) => {
  return {
    type: utilTypes.SET_PRINT_DATA,
    payload: data,
  };
};

export const removePrintData = (data) => {
  return {
    type: utilTypes.REMOVE_PRINT_DATA,
  };
};
export const setKOTPrintData = (data) => {
  return {
    type: utilTypes.SET_KOT_PRINT_DATA,
    payload: data,
  };
};

export const removeKOTPrintData = (data) => {
  return {
    type: utilTypes.REMOVE_KOT_PRINT_DATA,
  };
};
