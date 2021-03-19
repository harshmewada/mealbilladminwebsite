import { hotKeyTypes } from "../types";

import branchApi from "../api/branchApi";
export const createHotKey = (data) => {
  return {
    type: hotKeyTypes.CREATE_HOTKEY,
    payload: {
      request: {
        url: branchApi.CREATE_HOTKEY,
        method: "post",
        data: data,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const updateHotKey = (data) => {
  return {
    type: hotKeyTypes.UPDATE_HOTKEY,
    payload: {
      request: {
        url: branchApi.UPDATE_HOTKEY,
        method: "PUT",
        data: data,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const deleteHotKey = (data) => {
  return {
    type: hotKeyTypes.DELETE_HOTKEY,
    payload: {
      request: {
        url: branchApi.DELETE_HOTKEY,
        method: "delete",
        data: data,
      },
    },
  };
};

export const getAllHotKeys = (resId, branchId) => {
  return {
    type: hotKeyTypes.GET_ALL_HOTKEYS,
    payload: {
      request: {
        url: branchApi.GET_ALL_HOTKEYS(resId, branchId),
        method: "get",
      },
    },
  };
};
