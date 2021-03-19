import SuperAdminApi from "../api/superadmin";
import { branchTypes, restaurantTypes } from "../types";

export const getAllRestaurants = (data) => {
  return {
    type: restaurantTypes.GET_ALL_RESTAURANTS,
    payload: {
      request: {
        url: SuperAdminApi.GET_ALL_RESTAURANTS,
        method: "get",
      },
    },
  };
};

export const createRestaurant = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: restaurantTypes.CREATE_RESTAURANT,
    payload: {
      request: {
        url: SuperAdminApi.CREATE_RESTAURANT,
        method: "post",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const deleteRestaurant = (data) => {
  return {
    type: restaurantTypes.DELETE_RESTAURANT,
    payload: {
      request: {
        url: SuperAdminApi.DELETE_RESTAURANT(data),
        method: "delete",
      },
    },
  };
};

export const updateRestaurant = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: restaurantTypes.UPDATE_RESTAURANT,
    payload: {
      request: {
        url: SuperAdminApi.UPDATE_RESTAURANT,
        method: "put",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};
