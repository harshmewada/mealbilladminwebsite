import SuperAdminApi from "../api/superadmin";
import { branchTypes, restaurantTypes } from "../types";
import store from "../store";
import branchApi from "../api/branchApi";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";
export const createBranch = (data) => {
  //   const role = store.getState();

  //   console.log(role);

  return {
    type: branchTypes.CREATE_BRANCH,
    payload: {
      request: {
        url: branchApi.CREATE_BRANCH,
        method: "post",
        data: data,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const updateBranch = (data) => {
  return {
    type: branchTypes.UPDATE_BRANCH,
    payload: {
      request: {
        url: branchApi.UPDATE_BRANCH,
        method: "PUT",
        data: data,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const deleteBranch = (data) => {
  return {
    type: branchTypes.DELETE_BRANCH,
    payload: {
      request: {
        url: branchApi.DELETE_BRANCH,
        method: "delete",
        data: data,
      },
    },
  };
};

export const getAllBranches = (id, status) => {
  return {
    type: branchTypes.GET_ALL_BRANCHES,
    payload: {
      request: {
        url: branchApi.GET_ALL_BRANCHES,
        method: "get",
        params: {
          id: id,
          status: status,
        },
      },
    },
  };
};

export const updateReceiptMessage = ({
  message,
  resId,
  branchId,
  cb,
  errorCb,
}) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Receipt Message updated successfully",
      errorMessage: "Failed to update Receipt Message",
      cb: cb,
      errorCb: errorCb,
      type: branchTypes.UPDATE_RECEIPT_MESSAGE,
      payload: {
        request: {
          url: branchApi.UPDATE_RECEIPT_MESSAGE,
          method: "put",
          data: {
            receiptMessage: message,
            restaurantId: resId,
            _id: branchId,
          },
        },
      },
    });
};

export const deleteReceiptMessage = ({
  message,
  resId,
  branchId,
  cb,
  errorCb,
}) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Receipt Message Deleted successfully",
      errorMessage: "Failed to delete Receipt Message",
      cb: cb,
      errorCb: errorCb,
      type: branchTypes.DELETE_RECEIPT_MESSAGE,
      payload: {
        request: {
          url: branchApi.UPDATE_RECEIPT_MESSAGE,
          method: "put",
          data: {
            receiptMessage: null,
            restaurantId: resId,
            _id: branchId,
          },
        },
      },
    });
};
