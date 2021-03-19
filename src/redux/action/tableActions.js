import { hotKeyTypes, tableTypes } from "../types";

import branchApi from "../api/branchApi";
export const createTable = (data) => {
  return {
    type: tableTypes.CREATE_TABLE,
    payload: {
      request: {
        url: branchApi.CREATE_TABLES,
        method: "post",
        data: data,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const updateTable = (data) => {
  return {
    type: tableTypes.UPDATE_TABLE,
    payload: {
      request: {
        url: branchApi.UPDATE_TABLES,
        method: "PUT",
        data: data,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const deleteTable = (data) => {
  return {
    type: tableTypes.DELETE_TABLE,
    payload: {
      request: {
        url: branchApi.DELETE_TABLES,
        method: "delete",
        data: data,
      },
    },
  };
};

export const getAllTables = (resId, branchId) => {
  return {
    type: tableTypes.GET_ALL_TABLES,
    payload: {
      request: {
        url: branchApi.GET_ALL_TABLES(resId, branchId),
        method: "get",
      },
    },
  };
};
