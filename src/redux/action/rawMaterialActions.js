import rawMaterialApi from "../api/rawMaterialApi";
import { rawMaterialTypes } from "../types";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";

export const createRawMaterial = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Raw material added successfully",
      errorMessage: "Failed to add Raw Material",
      cb: cb,
      errorCb: errorCb,
      type: rawMaterialTypes.CREATE_RAW_MATERIAL,
      payload: {
        request: {
          url: rawMaterialApi.CREATE_RAW_MATERIAL,
          method: "post",
          data: data,
        },
      },
    });
};
export const updateRawMaterial = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Raw material updated successfully",
      errorMessage: "Failed to update Raw Material",
      cb: cb,
      errorCb: errorCb,
      type: rawMaterialTypes.UPDATE_RAW_MATERIAL,
      payload: {
        request: {
          url: rawMaterialApi.UPDATE_RAW_MATERIAL,
          method: "put",
          data: data,
        },
      },
    });
};

export const deleteRawMaterial = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Raw material deleted successfully",
      errorMessage: "Failed to delete Raw Material",
      cb: cb,
      errorCb: errorCb,
      type: rawMaterialTypes.DELETE_RAW_MATERIAL,
      payload: {
        request: {
          url: rawMaterialApi.DELETE_RAW_MATERIAL,
          method: "delete",
          data: data,
        },
      },
    });
};

export const getAllRawMaterials = (data) => {
  return {
    type: rawMaterialTypes.GET_ALL_RAW_MATERIAL,
    payload: {
      request: {
        url: rawMaterialApi.GET_RAW_MATERIAL,
        method: "get",
        params: { branchId: data },
      },
    },
  };
};
