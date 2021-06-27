import restaurantApi from "../api/restaurantApi";
import SuperAdminApi from "../api/superadmin";
import { branchTypes, restaurantTypes } from "../types";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";
import { showSnackBar } from "./snackActions";

export const getAllRestaurants = (status) => {
  return {
    type: restaurantTypes.GET_ALL_RESTAURANTS,
    payload: {
      request: {
        url: SuperAdminApi.GET_ALL_RESTAURANTS,
        method: "get",
        params: {
          status: status,
        },
      },
    },
  };
};

export const assignRestaurantSubScription = (data, cb) => {
  // console.log(data);
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Subscription updated Succesfully",
      errorMessage: "Failed to update subscription",
      cb: cb,
      type: restaurantTypes.ASSIGN_RESTAURANT_SUBSCRIPTION,
      payload: {
        request: {
          url: SuperAdminApi.RESTAURANT_SUBSCRIPTION,
          method: "post",
          data: data,
        },
      },
    });
};

export const removeRestaurantSubScription = (data, cb) => {
  // console.log(data);
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Subscription Removed Succesfully",
      errorMessage: "Failed to Remove subscription",
      cb: cb,
      type: restaurantTypes.REMOVE_RESTAURANT_SUBSCRIPTION,
      payload: {
        request: {
          url: SuperAdminApi.RESTAURANT_SUBSCRIPTION,
          method: "delete",
          data: data,
        },
      },
    });
};

export const createRestaurant = (data, cb) => {
  // console.log(data);

  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Restaurant Added Succesfully",
      errorMessage: "Failed to Add Restaurant",
      enableMessage: true,
      cb: cb,
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
    });
};

export const deleteRestaurant = (data, cb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      type: restaurantTypes.DELETE_RESTAURANT,
      successMessage: "Restaurant Deleted Succesfully",
      errorMessage: "Failed to Delete Restaurant",
      enableMessage: true,
      cb: cb,
      payload: {
        request: {
          url: SuperAdminApi.DELETE_RESTAURANT,
          method: "delete",
          data: { id: data },
        },
      },
    });
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

export const createRestaurantItem = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: restaurantTypes.CREATE_RESTAURANT_ITEMS,
    payload: {
      request: {
        url: restaurantApi.CREATE_RESTAURANT_ITEM,
        method: "post",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const updateRestaurantItem = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: restaurantTypes.UPDATE_RESTAURANT_ITEMS,
    payload: {
      request: {
        url: restaurantApi.UPDATE_UPDATE_ITEM,
        method: "PUT",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const deleteRestaurantItem = (data) => {
  return {
    type: restaurantTypes.DELETE_RESTAURANT_ITEMS,
    payload: {
      request: {
        url: restaurantApi.DELETE_RESTAURANT_ITEM,
        method: "delete",
        data: data,
      },
    },
  };
};

export const getAllRestaurantItems = (resId, status) => {
  return {
    type: restaurantTypes.GET_ALL_RESTAURANT_ITEMS,
    payload: {
      request: {
        url: restaurantApi.GET_ALL_RESTAURANT_ITEMS,
        method: "get",
        params: {
          resId: resId,

          status: status,
        },
      },
    },
  };
};
