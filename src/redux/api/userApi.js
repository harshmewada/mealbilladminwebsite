const userApi = {
  LOGIN_USER: "/api/auth/login",

  GET_USER_DETAILS: "/api/auth/details",
  GET_ALL_USERS: (resId, branchId) =>
    `/api/restaurant/users/${resId}/${branchId}`,

  CREATE_USER: `/api/restaurant/users/create`,

  UPDATE_USER: `/api/restaurant/users/update`,

  DELETE_USER: `/api/restaurant/users/delete`,
};
export default userApi;
