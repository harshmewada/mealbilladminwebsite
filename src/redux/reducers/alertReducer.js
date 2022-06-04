import { restaurantTypes, userTypes } from "../types";

// import { utilTypes, restaurantTypes, userTypes, branchTypes } from "../types";
const initialstate = {
  message: "",
  severity: "",
  open: false,
  openOrderLowQuantity: false,
  showOrderQuantityModal: true,
};
let success = "success";
let error = "error";

const snackReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "HIDE_ALERT":
      return initialstate;

    case "SHOW_ALERT":
      return {
        ...state,
        message: action.payload.data || "Success",
        severity: action.payload.severity,
        open: true,
      };

    case "HIDE_ALERT":
      return {
        ...initialstate,

        showOrderQuantityModal: state.showOrderQuantityModal,
      };

    case "SHOW_ORDER_ALERT":
      return {
        ...state,
        message: action.payload.data,
        severity: action.payload.severity,
        openOrderLowQuantity: true,
      };

    case "DONT_SHOW_ORDER_ALERT":
      return {
        ...initialstate,

        showOrderQuantityModal: false,
      };

    case userTypes.LOGOUT_USER:
      return { ...initialstate };
    default:
      return state;
  }
};

export default snackReducer;
