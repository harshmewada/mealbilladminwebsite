const SuperAdminApi = {
  RESTAURANT_SUBSCRIPTION: "/api/superadmin/assignsubscription",

  GET_ALL_RESTAURANTS: "/api/superadmin/restaurants/all",
  CREATE_RESTAURANT: "/api/superadmin/restaurants/create",
  UPDATE_RESTAURANT: "/api/superadmin/restaurants/update",
  DELETE_RESTAURANT: `/api/superadmin/restaurants/delete`,

  GET_ALL_SUPERADMIN_TABLETYPES: "/api/superadmin/tabletype/all",
  CREATE_SUPERADMIN_TABLETYPE: "/api/superadmin/tabletype/create",
  UPDATE_SUPERADMIN_TABLETYPE: "/api/superadmin/tabletype/update",
  DELETE_SUPERADMIN_TABLETYPE: `/api/superadmin/tabletype/delete`,

  GET_ALL_SUPERADMIN_EXPENSETYPES: "/api/superadmin/expensetype/all",
  CREATE_SUPERADMIN_EXPENSETYPE: "/api/superadmin/expensetype/create",
  UPDATE_SUPERADMIN_EXPENSETYPE: "/api/superadmin/expensetype/update",
  DELETE_SUPERADMIN_EXPENSETYPE: `/api/superadmin/expensetype/delete`,

  GET_ALL_SUPERADMIN_CATEGORYTYPES: `/api/superadmin/categorytype`,
  CREATE_SUPERADMIN_CATEGORYTYPE: "/api/superadmin/categorytype/create",
  UPDATE_SUPERADMIN_CATEGORYTYPE: "/api/superadmin/categorytype/update",
  DELETE_SUPERADMIN_CATEGORYTYPE: `/api/superadmin/categorytype/delete`,
};
export default SuperAdminApi;
