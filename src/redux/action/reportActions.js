import reportApi from "../api/reportApi";
import { reportTypes, utilTypes } from "../types";

export const getReport = (data) => {
  return {
    type: reportTypes.GET_REPORT,
    payload: {
      request: {
        url: reportApi.GET_REPORT,
        method: "post",
        data: data,
      },
    },
  };
};
