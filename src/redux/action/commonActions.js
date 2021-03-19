import { commonTypes } from "../types";

export const getAllThemes = (data) => {
  return {
    type: commonTypes.GET_ALL_THEMES,
    payload: {
      request: {
        url: "/api/superadmin/themes/all",
        method: "get",
      },
    },
  };
};

export const getAllSubscriptions = (data) => {
  return {
    type: commonTypes.GET_ALL_SUBSCRIPTIONS,
    payload: {
      request: {
        url: "/api/superadmin/subscriptions/all",
        method: "get",
      },
    },
  };
};

export const getAllTableTypes = (data) => {
  return {
    type: commonTypes.GET_ALL_TABLETYPES,
    payload: {
      request: {
        url: "/api/superadmin/commoncollections/all/tableTypes",
        method: "get",
      },
    },
  };
};

export const createTableType = (data) => {
  return {
    type: commonTypes.ADD_NEW_TABLETYPE,
    payload: {
      request: {
        url: "/api/superadmin/tabletypes/create",
        method: "post",
        data: data,
      },
    },
  };
};

export const updateTableType = (data) => {
  return {
    type: commonTypes.UPDATE_TABLETYPE,
    payload: {
      request: {
        url: "/api/superadmin/tabletypes/update",
        method: "put",
        data: data,
      },
    },
  };
};

export const deleteTableType = (data) => {
  return {
    type: commonTypes.REMOVE_TABLETYPE,
    payload: {
      request: {
        url: `/api/superadmin/tabletypes/delete/${data}`,
        method: "delete",
      },
    },
  };
};

export const createTheme = (data) => {
  return {
    type: commonTypes.ADD_NEW_THEME,
    payload: {
      request: {
        url: "/api/superadmin/themes/create",
        method: "post",
        data: data,
      },
    },
  };
};

export const updateTheme = (data) => {
  return {
    type: commonTypes.UPDATE_THEME,
    payload: {
      request: {
        url: "/api/superadmin/themes/update",
        method: "put",
        data: data,
      },
    },
  };
};

export const deleteTheme = (data) => {
  return {
    type: commonTypes.REMOVE_THEME,
    payload: {
      request: {
        url: `/api/superadmin/themes/delete/${data}`,
        method: "delete",
      },
    },
  };
};

export const createSubscription = (data) => {
  return {
    type: commonTypes.ADD_NEW_SUBSCRIPTION,
    payload: {
      request: {
        url: "/api/superadmin/subscriptions/create",
        method: "post",
        data: data,
      },
    },
  };
};

export const updateSubscription = (data) => {
  return {
    type: commonTypes.UPDATE_SUBSCRIPTION,
    payload: {
      request: {
        url: "/api/superadmin/subscriptions/update",
        method: "put",
        data: data,
      },
    },
  };
};

export const deleteSubscription = (data) => {
  return {
    type: commonTypes.REMOVE_SUBSCRIPTION,
    payload: {
      request: {
        url: `/api/superadmin/subscriptions/delete/${data}`,
        method: "delete",
      },
    },
  };
};
