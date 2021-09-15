import itemVariantsApi from "../api/itemVariantsApi";
import { itemVariantTypes } from "../types";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";

export const createItemVariant = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Item Variant added successfully",
      errorMessage: "Failed to add Item variant",
      cb: cb,
      errorCb: errorCb,
      type: itemVariantTypes.CREATE_ITEM_VARIANTS,
      payload: {
        request: {
          url: itemVariantsApi.CREATE_ITEM_VARIANTS,
          method: "post",
          data: data,
        },
      },
    });
};
export const updateItemVariant = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Item Variant updated successfully",
      errorMessage: "Failed to update Item variant",
      cb: cb,
      errorCb: errorCb,
      type: itemVariantTypes.UPDATE_ITEM_VARIANTS,
      payload: {
        request: {
          url: itemVariantsApi.UPDATE_ITEM_VARIANTS,
          method: "put",
          data: data,
        },
      },
    });
};

export const deleteItemVariant = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Item Variant deleted successfully",
      errorMessage: "Failed to delete Item variant",
      cb: cb,
      errorCb: errorCb,
      type: itemVariantTypes.DELETE_ITEM_VARIANTS,
      payload: {
        request: {
          url: itemVariantsApi.DELETE_ITEM_VARIANTS,
          method: "delete",
          data: data,
        },
      },
    });
};

export const getAllItemVariants = (data) => {
  return {
    type: itemVariantTypes.GET_ALL_ITEM_VARIANTS,
    payload: {
      request: {
        url: itemVariantsApi.GET_ITEM_VARIANTS,
        method: "get",
        params: data,
      },
    },
  };
};
