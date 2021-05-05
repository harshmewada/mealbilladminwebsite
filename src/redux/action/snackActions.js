import { utilTypes } from "../types";

export const hideSnackBar = (data) => {
  return {
    type: "HIDE_SNACKBAR",
  };
};

export const showSnackBar = (data, severnity) => {
  return {
    type: "SHOW_SNACKBAR",
    payload: {
      data: data,
      severity: severnity || "success",
    },
  };
};

export const showErrorSnackBar = (err, customMessage) => {
  return {
    type: "SHOW_SNACKBAR",
    payload: {
      data:
        customMessage ||
        err?.error?.response?.data?.message ||
        "An Error Occcured",
      severity: "error",
    },
  };
};
