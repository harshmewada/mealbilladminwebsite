const SuperAdminApi = {
  GET_ALL_RESTAURANTS: "/api/superadmin/restaurants/all",
  CREATE_RESTAURANT: "/api/superadmin/restaurants/create",
  UPDATE_RESTAURANT: "/api/superadmin/restaurants/update",
  DELETE_RESTAURANT: (id) => `/api/superadmin/restaurants/delete/${id}`,

  GET_ALL_BRANCHES: "/api/superadmin/restaurants/all",
  CREATE_RESTAURANT: "/api/superadmin/restaurants/create",
  UPDATE_RESTAURANT: "/api/superadmin/restaurants/update",
  DELETE_RESTAURANT: (id) => `/api/superadmin/restaurants/delete/${id}`,
};
export default SuperAdminApi;
