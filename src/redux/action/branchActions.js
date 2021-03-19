import SuperAdminApi from "../api/superadmin";
import { branchTypes, restaurantTypes } from "../types";
import store from "../store";
import branchApi from "../api/branchApi";
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

export const getAllBranches = (id) => {
  return {
    type: branchTypes.GET_ALL_BRANCHES,
    payload: {
      request: {
        url: branchApi.GET_ALL_BRANCHES(id),
        method: "get",
      },
    },
  };
};
