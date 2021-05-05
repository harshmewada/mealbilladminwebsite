const commonApi = {
  GET_ALL_THEMES: `/api/superadmin/themes/all`,

  GET_ALL_SUBSCRIPTIONS: `/api/superadmin/subscriptions/all`,

  GET_ALL_TABLETYPES: `/api/superadmin/commoncollections/all/tableTypes`,

  ADD_NEW_TABLETYPE: "/api/superadmin/tabletypes/create",
  UPDATE_TABLETYPE: "/api/superadmin/tabletypes/update",

  REMOVE_TABLETYPE: `/api/superadmin/tabletypes/delete`,

  ADD_NEW_THEME: "/api/superadmin/themes/create",
  UPDATE_THEME: "/api/superadmin/themes/update",

  REMOVE_THEME: `/api/superadmin/themes/delete`,

  ADD_NEW_SUBSCRIPTION: "/api/superadmin/subscriptions/create",
  UPDATE_SUBSCRIPTION: "/api/superadmin/subscriptions/update",

  REMOVE_SUBSCRIPTION: `/api/superadmin/subscriptions/delete`,
};
export default commonApi;
