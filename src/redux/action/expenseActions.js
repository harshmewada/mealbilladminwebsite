import { expenseTypes } from "../types";

import superadminapi from "../api/superadmin";
import expenseApi from "../api/expenseApi";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";

export const createExpense = (data) => {
  if (data.role === "restaurantadmin") {
    return {
      type: expenseTypes.CREATE_EXPENSE_TYPE,
      payload: {
        request: {
          url: expenseApi.CREATE_EXPENSE_TYPES,
          method: "post",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    };
  }
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: expenseTypes.CREATE_EXPENSE,
    payload: {
      request: {
        url: expenseApi.CREATE_EXPENSE,
        method: "post",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const updateExpense = (data) => {
  if (data.role === "restaurantadmin") {
    return {
      type: expenseTypes.UPDATE_EXPENSE_TYPE,
      payload: {
        request: {
          url: expenseApi.UPDATE_EXPENSE_TYPES,
          method: "PUT",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    };
  }
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: expenseTypes.UPDATE_EXPENSE,
    payload: {
      request: {
        url: expenseApi.UPDATE_EXPENSE,
        method: "PUT",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const deleteExpense = (data) => {
  if (data.role === "restaurantadmin") {
    return {
      type: expenseTypes.DELETE_EXPENSE_TYPE,
      payload: {
        request: {
          url: expenseApi.DELETE_EXPENSE_TYPES,
          method: "delete",
          data: data,
        },
      },
    };
  }
  return {
    type: expenseTypes.DELETE_EXPENSE,
    payload: {
      request: {
        url: expenseApi.DELETE_EXPENSE,
        method: "delete",
        data: data,
      },
    },
  };
};
export const createRestaurantExpenseType = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Expense created successfully",
      errorMessage: "Failed to create Expense Type",
      cb: cb,
      errorCb: errorCb,
      type: expenseTypes.CREATE_EXPENSE_TYPE,
      payload: {
        request: {
          url: expenseApi.CREATE_EXPENSE_TYPES,
          method: "post",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const updateRestaurantExpenseType = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Expense Updated successfully",
      errorMessage: "Failed to update Expense Type",
      cb: cb,
      errorCb: errorCb,
      type: expenseTypes.UPDATE_EXPENSE_TYPE,
      payload: {
        request: {
          url: expenseApi.UPDATE_EXPENSE_TYPES,
          method: "PUT",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const updateRestaurantSubExpenseType = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Sub Expense Type Updated successfully",
      errorMessage: "Failed to update Expense Type",
      cb: cb,
      errorCb: errorCb,
      type: expenseTypes.UPDATE_SUB_EXPENSE_TYPE,
      payload: {
        request: {
          url: expenseApi.UPDATE_SUB_EXPENSE_TYPES,
          method: "PUT",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const deleteRestaurantExpenseType = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Expense Deleted successfully",
      errorMessage: "Failed to delete Expense Type",
      cb: cb,
      errorCb: errorCb,
      type: expenseTypes.DELETE_EXPENSE_TYPE,
      payload: {
        request: {
          url: expenseApi.DELETE_EXPENSE_TYPES,
          method: "delete",
          data: data,
        },
      },
    });
};

export const getAllExpenses = (data) => {
  return {
    type: expenseTypes.GET_ALL_EXPENSES,
    payload: {
      request: {
        url: expenseApi.GET_ALL_EXPENSES,
        method: "get",
        params: {
          ...data,
        },
      },
    },
  };
};

//Expense types

export const createExpenseType = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Expense created successfully",
      errorMessage: "Failed to create Expense Type",
      cb: cb,
      errorCb: errorCb,
      type: expenseTypes.CREATE_EXPENSE_TYPE,
      payload: {
        request: {
          url: superadminapi.CREATE_SUPERADMIN_EXPENSETYPE,
          method: "post",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const updateExpenseType = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Expense Updated successfully",
      errorMessage: "Failed to update Expense Type",
      cb: cb,
      errorCb: errorCb,
      type: expenseTypes.UPDATE_EXPENSE_TYPE,
      payload: {
        request: {
          url: superadminapi.UPDATE_SUPERADMIN_EXPENSETYPE,
          method: "PUT",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const deleteExpenseType = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Expense Deleted successfully",
      errorMessage: "Failed to delete Expense Type",
      cb: cb,
      errorCb: errorCb,
      type: expenseTypes.DELETE_EXPENSE_TYPE,
      payload: {
        request: {
          url: superadminapi.DELETE_SUPERADMIN_EXPENSETYPE,
          method: "delete",
          data: {
            id: data,
          },
        },
      },
    });
};

export const getAllexpenseTypes = (resId, branchId, status) => {
  return {
    type: expenseTypes.GET_ALL_EXPENSE_TYPES,
    payload: {
      request: {
        url: superadminapi.GET_ALL_SUPERADMIN_EXPENSETYPES,
        method: "get",
        params: {
          resId: resId,
          branchId: branchId,
          status: status,
        },
      },
    },
  };
};

export const getRestaurantExpenseType = (resId, status) => {
  return {
    type: expenseTypes.GET_RESTAURANT_EXPENSE_TYPES,
    payload: {
      request: {
        url: expenseApi.GET_RESTAURANT_EXPENSE_TYPES,
        method: "get",
        params: {
          resId: resId,

          status: status,
        },
      },
    },
  };
};

export const importExpenseTypes = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Expense Imported successfully",
      errorMessage: "Failed to Import Expense Type",
      cb: cb,
      errorCb: errorCb,
      type: expenseTypes.IMPORT_EXPENSETYPES,
      payload: {
        request: {
          url: expenseApi.IMPORT_EXPENSES,
          method: "post",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};
