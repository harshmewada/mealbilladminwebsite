import userApi from "../api/userApi";
import utilApi from "../api/utilApi";
import { userTypes, utilTypes } from "../types";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";

export const loginUser = (data) => {
  return {
    type: userTypes.LOGIN_USER,
    payload: {
      request: {
        url: userApi.LOGIN_USER,
        method: "post",
        data: data,
      },
    },
  };
};

export const expireSubScription = () => {
  return {
    type: userTypes.EXPIRED_SUBSCRIPTION,
  };
};

export const getOtp = (mobile, cb) => {
  // console.log(data);
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Otp sent successfully",
      errorMessage: "Failed to get otp",
      enableMessage: true,
      cb: cb,
      type: userTypes.FORGOT_PASSWORD,
      payload: {
        request: {
          url: userApi.FORGOT_PASSWORD,
          method: "post",
          data: {
            mobile: mobile,
          },
        },
      },
    });
};

export const forgotPassword = (data, cb) => {
  // console.log(data);
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Password reset successfully",
      errorMessage: "Failed",
      enableMessage: true,
      cb: cb,
      type: userTypes.FORGOT_PASSWORD,
      payload: {
        request: {
          url: userApi.FORGOT_PASSWORD,
          method: "put",
          data: data,
        },
      },
    });
};

export const logoutUser = () => {
  return {
    type: userTypes.LOGOUT_USER,
  };
};

// export const getUserDetails = () => {
//   return {
//     type: userTypes.GET_USER_DETAILS,
//     payload: {
//       request: {
//         url: "http://52.66.250.121:80/api/auth/login",
//         method: "POST",
//         data:{
//           email:"dhairyamodh123@gmail.com"
//         }
//       },
//     },
//   };
// };
export const getUserDetails = () => {
  return {
    type: userTypes.GET_USER_DETAILS,
    payload: {
      request: {
        url: userApi.GET_USER_DETAILS,
        method: "GET",
      },
    },
    // payload: { name, email },
    // meta: {
    //   offline: {
    //     // the network action to execute:
    //     effect: {
    //       url: "https://my-api.com/resource/api/register",
    //       method: "POST",
    //       body: `name=${name}&email=${email}`,
    //       headers: { "content-type": "application/x-www-form-urlencoded" },
    //     },
    //     // action to dispatch when effect succeeds:
    //     commit: { type: "REGISTER_USER_COMMIT", meta: { name, email } },
    //     // action to dispatch if network action fails permanently:
    //     rollback: { type: "REGISTER_USER_ROLLBACK", meta: { name, email } },
    //   },
    // },
  };
};

export const getAllUsers = (resId, branchId, status) => {
  return {
    type: userTypes.GET_ALL_USERS,
    payload: {
      request: {
        url: userApi.GET_ALL_USERS,
        method: "GET",
        params: {
          resId: resId,
          branchId: branchId,
          status: status,
        },
      },
    },
  };
};

export const createUser = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "User Added Succesfully",
      errorMessage: "Failed to Add User",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: userTypes.CREATE_USER,
      payload: {
        request: {
          url: userApi.CREATE_USER,
          method: "post",
          data: data,
        },
      },
    });
};

export const updateUser = (data) => {
  return {
    type: userTypes.UPDATE_USER,
    payload: {
      request: {
        url: userApi.UPDATE_USER,
        method: "put",
        data: data,
      },
    },
  };
};

export const deleteUser = (data) => {
  return {
    type: userTypes.DELETE_USER,
    payload: {
      request: {
        url: userApi.DELETE_USER,
        method: "delete",
        data: data,
      },
    },
  };
};

export const togglePrintSetting = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: `Print Setting updated successfully`,
      errorMessage: `Failed to update Print Setting`,
      cb: cb,
      errorCb: errorCb,
      type: utilTypes.TOGGLE_PRINTING_SETTING,
      payload: {
        request: {
          url: userApi.TOGGLE_PRINT_SETTING,
          method: "put",
          data: data,
        },
      },
    });
};
