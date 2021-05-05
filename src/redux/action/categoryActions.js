import SuperAdminApi from "../api/superadmin";
import { branchTypes, categoryTypes, restaurantTypes } from "../types";
import categoryApi from "../api/categoryApi";
export const createCategory = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: categoryTypes.CREATE_CATEGORY,
    payload: {
      request: {
        url: categoryApi.CREATE_CATEGORY,
        method: "post",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const updateCategory = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: categoryTypes.UPDATE_CATEGORY,
    payload: {
      request: {
        url: categoryApi.UPDATE_CATEGORY,
        method: "PUT",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const deleteCategory = (data) => {
  return {
    type: categoryTypes.DELETE_CATEGORY,
    payload: {
      request: {
        url: categoryApi.DELETE_CATEGORY,
        method: "delete",
        data: data,
      },
    },
  };
};

export const getRestaurantCategories = (resId, status) => {
  return {
    type: categoryTypes.GET_RESTAURANT_CATEGORIES,
    payload: {
      request: {
        url: categoryApi.GET_ALL_CATEGORIES,
        method: "get",
        params: {
          resId: resId,
          branchId: undefined,
          status: status,
        },
      },
    },
  };
};

export const getBranchCategories = (resId, branchId, status) => {
  return {
    type: categoryTypes.GET_BRANCH_CATEGORIES,
    payload: {
      request: {
        url: categoryApi.GET_ALL_CATEGORIES,
        method: "get",
        params: {
          resId: resId,
          branchId: branchId,
          status: status,
        },
      },
    },
  };
};

export const importCategories = (data) => {
  return {
    type: categoryTypes.IMPORT_CATEGORY,
    payload: {
      request: {
        url: categoryApi.IMPORT_CATEGORIES,
        method: "post",
        data: data,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};
//cateogry type

//table types

// export const createCategoryType = (data) => {
//   return {
//     type: categoryTypes.CREATE_CATEGORY_TYPE,
//     payload: {
//       request: {
//         url: SuperAdminApi.CREATE_SUPERADMIN_CATEGORYTYPE,
//         method: "post",
//         data: data,
//         headers: {
//           "Content-type": "application/json",
//         },
//       },
//     },
//   };
// };

// export const updateCategoryType = (data) => {
//   return {
//     type: categoryTypes.UPDATE_CATEGORY_TYPE,
//     payload: {
//       request: {
//         url: SuperAdminApi.UPDATE_SUPERADMIN_CATEGORYTYPE,
//         method: "PUT",
//         data: data,
//         headers: {
//           "Content-type": "application/json",
//         },
//       },
//     },
//   };
// };

// export const deleteCategoryType = (data) => {
//   return {
//     type: categoryTypes.DELETE_CATEGORY_TYPE,
//     payload: {
//       request: {
//         url: SuperAdminApi.DELETE_SUPERADMIN_CATEGORYTYPE,
//         method: "delete",
//         data: data,
//       },
//     },
//   };
// };

export const getAllCategoryTypes = (resId, status) => {
  return {
    type: categoryTypes.GET_ALL_CATEGORY_TYPES,
    payload: {
      request: {
        url: SuperAdminApi.GET_ALL_SUPERADMIN_CATEGORYTYPES,
        method: "get",
        params: {
          resId: resId,
          status: status,
        },
      },
    },
  };
};
