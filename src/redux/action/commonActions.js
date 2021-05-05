import commonApi from "../api/commonApi";
import { commonTypes } from "../types";

export const getAllThemes = (status) => {
  console.log("theme get log");

  return {
    type: commonTypes.GET_ALL_THEMES,
    payload: {
      request: {
        url: commonApi.GET_ALL_THEMES,
        method: "get",
        params: {
          status: status,
        },
      },
    },
  };
};

export const getAllSubscriptions = (status) => {
  return {
    type: commonTypes.GET_ALL_SUBSCRIPTIONS,
    payload: {
      request: {
        url: commonApi.GET_ALL_SUBSCRIPTIONS,
        method: "get",
        params: {
          status: status,
        },
      },
    },
  };
};

export const getAllTableTypes = (status) => {
  return {
    type: commonTypes.GET_ALL_TABLETYPES,
    payload: {
      request: {
        url: commonApi.GET_ALL_TABLETYPES,
        method: "get",
        params: {
          status: status,
        },
      },
    },
  };
};

export const createTableType = (data) => {
  return {
    type: commonTypes.ADD_NEW_TABLETYPE,
    payload: {
      request: {
        url: commonApi.ADD_NEW_TABLETYPE,
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
        url: commonApi.UPDATE_TABLETYPE,
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
        url: commonApi.REMOVE_TABLETYPE,
        method: "delete",
        params: {
          id: data,
        },
      },
    },
  };
};

export const createTheme = (data) => {
  return {
    type: commonTypes.ADD_NEW_THEME,
    payload: {
      request: {
        url: commonApi.ADD_NEW_THEME,

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
        url: commonApi.UPDATE_THEME,
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
        url: commonApi.REMOVE_THEME,
        method: "delete",
        data: {
          id: data,
        },
      },
    },
  };
};

export const createSubscription = (data) => {
  return {
    type: commonTypes.ADD_NEW_SUBSCRIPTION,
    payload: {
      request: {
        url: commonApi.ADD_NEW_SUBSCRIPTION,
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
        url: commonApi.UPDATE_SUBSCRIPTION,
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
        url: commonApi.REMOVE_SUBSCRIPTION,
        method: "delete",
        data: {
          id: data,
        },
      },
    },
  };
};
