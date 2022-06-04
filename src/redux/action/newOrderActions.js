import actionCreator from "../../helpers/actionCreatetor";
import { orderTypes, socketTypes } from "../types/index";

export const getOrderDashboardData = (data) => {
  console.log("getOrderDahsboardData", data);
  return {
    type: actionCreator(socketTypes.GET_ORDER_DASHBOARD_DATA).type,
    payload: data,
    isSocket: true,
  };
};

export const setTableType = (data) => {
  return {
    type: orderTypes.ACTIVATE_TABLE_TYPE,
    payload: data,
  };
};
