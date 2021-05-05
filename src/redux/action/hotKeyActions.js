import { hotKeyTypes } from "../types";

import hotKeyApi from "../api/hotKeyApi";
export const createHotKey = (data) => {
  return {
    type: hotKeyTypes.CREATE_HOTKEY,
    payload: {
      request: {
        url: hotKeyApi.CREATE_HOTKEY,
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
        url: hotKeyApi.UPDATE_HOTKEY,
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
        url: hotKeyApi.DELETE_HOTKEY,
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
        url: hotKeyApi.GET_ALL_HOTKEYS,
        method: "get",
        params: {
          resId: resId,
          branchId: branchId,
          status: status,
        },
      },
    },
  };
};
