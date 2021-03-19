import userApi from "../api/userApi";
import { userTypes } from "../types";

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

export const getAllUsers = (resId, branchId) => {
  return {
    type: userTypes.GET_ALL_USERS,
    payload: {
      request: {
        url: userApi.GET_ALL_USERS(resId, branchId),
        method: "GET",
      },
    },
  };
};

export const createUser = (data) => {
  return {
    type: userTypes.CREATE_USER,
    payload: {
      request: {
        url: userApi.CREATE_USER,
        method: "post",
        data: data,
      },
    },
  };
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
