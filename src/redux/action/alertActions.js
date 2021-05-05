export const hideAlert = (data) => {
  return {
    type: "HIDE_ALERT",
  };
};

export const showAlert = (data, severnity) => {
  return {
    type: "SHOW_ALERT",
    payload: {
      data: data,
      severity: severnity || "success",
    },
  };
};

export const showWarningAlert = (data) => {
  return {
    type: "SHOW_ALERT",
    payload: {
      data: data,
      severity: "warning",
    },
  };
};

export const showErrorAlert = (data) => {
  return {
    type: "SHOW_ALERT",
    payload: {
      data: data,
      severity: "danger",
    },
  };
};
