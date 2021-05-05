import { restaurantTypes, userTypes } from "../types";

// import { utilTypes, restaurantTypes, userTypes, branchTypes } from "../types";
const initialstate = {
  message: "",
  severity: "",
  open: false,
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

    case userTypes.LOGOUT_USER:
      return { ...initialstate };
    default:
      return state;
  }
};

export default snackReducer;
