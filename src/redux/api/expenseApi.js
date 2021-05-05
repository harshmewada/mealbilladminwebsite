const expenseApi = {
  GET_ALL_EXPENSES: `/api/restaurant/expenses`,

  GET_RESTAURANT_EXPENSE_TYPES: `/api/restaurant/expensetype`,
  CREATE_EXPENSE: `/api/restaurant/expenses/create`,
  UPDATE_EXPENSE: `/api/restaurant/expenses/update`,
  DELETE_EXPENSE: `/api/restaurant/expenses/delete`,

  CREATE_EXPENSE_TYPES: `/api/restaurant/expensetype/create`,
  UPDATE_EXPENSE_TYPES: `/api/restaurant/expensetype/update`,
  DELETE_EXPENSE_TYPES: `/api/restaurant/expensetype/delete`,

  IMPORT_EXPENSES: `/api/restaurant/expensetype/import`,
};
export default expenseApi;
