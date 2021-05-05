import dashboardApi from "../api/dashboardApi";
import { dashboardTypes, utilTypes } from "../types";

export const getDashboard = (data) => {
  return {
    type: dashboardTypes.GET_DASHBOARD,
    payload: {
      request: {
        url: dashboardApi.GET_DASHBOARD,
        method: "post",
        data: data,
      },
    },
  };
};
