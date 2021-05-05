import { userTypes } from "../types";
import setToken from "../../helpers/setToken";
import removeToken from "../../helpers/removeToken";

const superadmin = "superadmin";
const restaurantadmin = "restaurantadmin";
const branchadmin = "branchadmin";
const branchuser = "branchuser";

const initialstate = {
  isLoading: false,
  isLogged: false,
  role: superadmin,
  allUsers: [],
  restaurantId: "all",
  cgst: 0,
  sgst: 0,
  hasSubscriptionExpired: false,
};

const userReducer = (state = initialstate, action) => {
  const getData = () => action.payload.data;
  switch (action.type) {
    // case [userTypes.LOGIN_USER, userTypes.GET_USER_DETAILS].includes(
    //   action.type
    // ): {
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    // }
    case userTypes.EXPIRED_SUBSCRIPTION:
      return {
        ...state,
        hasSubscriptionExpired: !state.hasSubscriptionExpired,
      };
    case userTypes.LOGIN_USER_SUCCESS:
      setToken(getData().token);
      return {
        ...state,
        isLoading: false,

        isLogged: true,
        role: getData().user.role,
        name: getData().user.name,
        mobile: getData().user.mobile,
        token: getData().token,
        ...(getData().user.restaurantId && {
          restaurantId: getData().user.restaurantId,
        }),
        ...getData().user,
      };

    case userTypes.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        isLogged: true,
        isLoading: false,

        role: getData().user.role,
        name: getData().user.name,
        mobile: getData().user.mobile,
        ...getData().user,
      };

    case userTypes.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsers: getData().data,
      };
    case userTypes.GET_ALL_USERS_FAIL:
      return {
        ...state,
        allUsers: [],
      };

    case userTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        isLogged: false,

        // ...getData().user,
        // token: getData().token,
      };

    case userTypes.LOGOUT_USER:
      removeToken();
      return { ...initialstate, isLogged: false };
    // case [userTypes.LOGIN_USER_FAIL, userTypes.GET_USER_DETAILS_FAIL].includes(
    //   action.type
    // ): {
    //   return {
    //     ...state,
    //     isLoading: false,
    //   };
    // }
    default:
      return state;
  }
};

export default userReducer;
