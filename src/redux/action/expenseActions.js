import { expenseTypes } from "../types";

import superadminapi from "../api/superadmin";
import expenseApi from "../api/expenseApi";

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

  return {
    type: expenseTypes.CREATE_EXPENSE,
    payload: {
      request: {
        url: expenseApi.CREATE_EXPENSE,
        method: "post",
        data: data,
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
  return {
    type: expenseTypes.UPDATE_EXPENSE,
    payload: {
      request: {
        url: expenseApi.UPDATE_EXPENSE,
        method: "PUT",
        data: data,
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
export const createRestaurantExpenseType = (data) => {
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
};

export const updateRestaurantExpenseType = (data) => {
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
};

export const deleteRestaurantExpenseType = (data) => {
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

export const createExpenseType = (data) => {
  return {
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
  };
};

export const updateExpenseType = (data) => {
  return {
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
  };
};

export const deleteExpenseType = (data) => {
  return {
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
  };
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

export const importExpenseTypes = (data) => {
  return {
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
  };
};
