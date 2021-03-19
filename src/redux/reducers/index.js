import { combineReducers } from "redux";
import utilReducer from "./utilReducer";
import snackReducer from "./snackReducer";
import userReducer from "./userReducer";
import restaurantReducer from "./restaurantReducer";
import branchReducer from "./branchReducer";
import commonDataReducer from "./commonDataReducer";
import orderReducer from "./orderReducer";

const initialState = {
  values: {},
};

export default combineReducers({
  util: utilReducer,
  snack: snackReducer,
  user: userReducer,
  restaurant: restaurantReducer,
  branch: branchReducer,
  common: commonDataReducer,
  order: orderReducer,
});
