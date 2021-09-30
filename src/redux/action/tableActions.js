import { hotKeyTypes, tableTypes } from "../types";

import tableApi from "../api/tableApi";
import superadminapi from "../api/superadmin";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";

export const createTable = (data, cb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Table Added Succesfully",
      errorMessage: "Failed to Add Table",
      enableMessage: true,
      cb: cb,
      type: tableTypes.CREATE_TABLE,
      payload: {
        request: {
          url: tableApi.CREATE_TABLES,
          method: "post",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const updateTable = (data, cb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Table Updated Succesfully",
      errorMessage: "Failed to update Table",
      enableMessage: true,
      cb: cb,
      type: tableTypes.UPDATE_TABLE,
      payload: {
        request: {
          url: tableApi.UPDATE_TABLES,
          method: "PUT",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const deleteTable = (data, cb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Table Deleted Succesfully",
      errorMessage: "Failed to delete Table",
      enableMessage: true,
      cb: cb,
      type: tableTypes.DELETE_TABLE,
      payload: {
        request: {
          url: tableApi.DELETE_TABLES,
          method: "delete",
          data: data,
        },
      },
    });
};

export const getAllTables = (resId, branchId, status) => {
  return {
    type: tableTypes.GET_ALL_TABLES,
    isSocket: false,
    payload: {
      request: {
        url: tableApi.GET_ALL_TABLES,
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

//table types

export const createTableType = (data) => {
  return {
    type: tableTypes.CREATE_TABLETYPE,
    payload: {
      request: {
        url: superadminapi.CREATE_SUPERADMIN_TABLETYPE,
        method: "post",
        data: data,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const updateTableType = (data) => {
  return {
    type: tableTypes.UPDATE_TABLETYPE,
    payload: {
      request: {
        url: superadminapi.UPDATE_SUPERADMIN_TABLETYPE,
        method: "PUT",
        data: data,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const deleteTableType = (data) => {
  return {
    type: tableTypes.DELETE_TABLETYPE,
    payload: {
      request: {
        url: superadminapi.DELETE_SUPERADMIN_TABLETYPE,
        method: "delete",
        data: {
          id: data,
        },
      },
    },
  };
};

export const getAllTableTypes = (status) => {
  return {
    type: tableTypes.GET_ALL_TABLETYPES,
    payload: {
      request: {
        url: superadminapi.GET_ALL_SUPERADMIN_TABLETYPES,
        method: "get",
        params: {
          status: status,
        },
      },
    },
  };
};
