export const orderApi = {
  GET_ALL_TABLES: (resId, braId) => `/api/restaurant/tables/${resId}/${braId}`,
  CREATE_ORDER: `/api/restaurant/orders/create`,
  UPDATE_ORDER: `/api/restaurant/orders/update`,
  DELETE_ORDER: `/api/restaurant/orders/delete`,
};
