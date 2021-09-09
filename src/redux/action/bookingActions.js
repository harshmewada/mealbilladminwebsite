import SuperAdminApi from "../api/superadmin";
import { bookingTypes, categoryTypes } from "../types";
import categoryApi from "../api/categoryApi";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";
import bookingApi from "../api/bookingApi";

export const createBooking = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Event Added successfully",
      errorMessage: "Failed to add Event",
      cb: cb,
      errorCb: errorCb,
      type: bookingTypes.CREATE_BOOKING_EVENT,
      payload: {
        request: {
          url: bookingApi.CREATE_BOOKING,
          method: "POST",
          data: data,
        },
      },
    });
};

export const updateBooking = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Event Updated successfully",
      errorMessage: "Failed to update Event",

      cb: cb,
      errorCb: errorCb,
      type: bookingTypes.UPDATE_BOOKING_EVENT,
      payload: {
        request: {
          url: bookingApi.UPDATE_BOOKING,
          method: "put",
          data: data,
        },
      },
    });
};

export const deleteBooking = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Event Deleted successfully",
      errorMessage: "Failed to delete Event",

      cb: cb,
      errorCb: errorCb,
      type: bookingTypes.DELETE_BOOKING_EVENT,
      payload: {
        request: {
          url: bookingApi.DELETE_BOOKING,
          method: "delete",
          data: data,
        },
      },
    });
};

export const getAllBookings = (data) => {
  return {
    type: bookingTypes.GET_BOOKINGS,
    payload: {
      request: {
        url: bookingApi.GET_ALL_BOOKINGS,
        method: "get",
        params: data,
      },
    },
  };
};
