import SuperAdminApi from "../api/superadmin";
import { branchTypes, categoryTypes, restaurantTypes } from "../types";
import branchApi from "../api/branchApi";
export const createCategory = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: categoryTypes.CREATE_CATEGORY,
    payload: {
      request: {
        url: branchApi.CREATE_CATEGORY,
        method: "post",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const updateCategory = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: categoryTypes.UPDATE_CATEGORY,
    payload: {
      request: {
        url: branchApi.UPDATE_CATEGORY,
        method: "PUT",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const deleteCategory = (data) => {
  return {
    type: categoryTypes.DELETE_CATEGORY,
    payload: {
      request: {
        url: branchApi.DELETE_CATEGORY,
        method: "delete",
        data: data,
      },
    },
  };
};

export const getAllCategories = (resId, branchId) => {
  return {
    type: categoryTypes.GET_ALL_CATEGORYES,
    payload: {
      request: {
        url: branchApi.GET_ALL_CATEGORIES(resId, branchId),
        method: "get",
      },
    },
  };
};
