export const hideOderAlert = (data) => {
  return {
    type: "DONT_SHOW_ORDER_ALERT",
  };
};

export const showOrderAlert = (data, severnity) => {
  return {
    type: "SHOW_ORDER_ALERT",
    payload: {
      data: data,
      severity: severnity || "success",
    },
  };
};

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
  return (dispatch) => {
    dispatch({ type: "FETCHING_ITEMS" }); // Will throw error

    setTimeout(() => {
      dispatch({
        type: "SHOW_ALERT",
        payload: {
          data: data,
          severity: "warning",
        },
      });
    }, 1); // Works flawlessly

    // Rest of function code here that works flawlessly
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
