const branchApi = {
  GET_ALL_BRANCHES: (id) => `/api/restaurant/branches/${id}`,
  CREATE_BRANCH: "/api/restaurant/branches/create",
  UPDATE_BRANCH: "/api/restaurant/branches/update",
  DELETE_BRANCH: `/api/restaurant/branches/delete`,

  GET_ALL_CATEGORIES: (resId, braId) =>
    `/api/restaurant/itemcategory/${resId}/${braId}`,
  CREATE_CATEGORY: `/api/restaurant/itemcategory/create`,
  UPDATE_CATEGORY: `/api/restaurant/itemcategory/update`,
  DELETE_CATEGORY: `/api/restaurant/itemcategory/delete`,

  GET_ALL_ITEMS: (resId, braId) => `/api/restaurant/items/${resId}/${braId}`,
  CREATE_ITEM: `/api/restaurant/items/create`,
  UPDATE_ITEM: `/api/restaurant/items/update`,
  DELETE_ITEM: `/api/restaurant/items/delete`,

  GET_ALL_HOTKEYS: (resId, braId) =>
    `/api/restaurant/hotkeys/${resId}/${braId}`,
  CREATE_HOTKEY: `/api/restaurant/hotkeys/create`,
  UPDATE_HOTKEY: `/api/restaurant/hotkeys/update`,
  DELETE_HOTKEY: `/api/restaurant/hotkeys/delete`,

  GET_ALL_TABLES: (resId, braId) => `/api/restaurant/tables/${resId}/${braId}`,
  CREATE_TABLES: `/api/restaurant/tables/create`,
  UPDATE_TABLES: `/api/restaurant/tables/update`,
  DELETE_TABLES: `/api/restaurant/tables/delete`,
};
export default branchApi;
