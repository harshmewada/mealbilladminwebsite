import { utilTypes } from "../types";

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
