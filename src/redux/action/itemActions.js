import SuperAdminApi from "../api/superadmin";
import {
  branchTypes,
  categoryTypes,
  itemTypes,
  restaurantTypes,
} from "../types";
import branchApi from "../api/branchApi";
export const createItem = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: itemTypes.CREATE_ITEM,
    payload: {
      request: {
        url: branchApi.CREATE_ITEM,
        method: "post",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const updateItem = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: itemTypes.UPDATE_ITEM,
    payload: {
      request: {
        url: branchApi.UPDATE_ITEM,
        method: "PUT",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const deleteItem = (data) => {
  return {
    type: itemTypes.DELETE_ITEM,
    payload: {
      request: {
        url: branchApi.DELETE_ITEM,
        method: "delete",
        data: data,
      },
    },
  };
};

export const getAllItems = (resId, branchId) => {
  return {
    type: itemTypes.GET_ALL_ITEMS,
    payload: {
      request: {
        url: branchApi.GET_ALL_ITEMS(resId, branchId),
        method: "get",
      },
    },
  };
};
