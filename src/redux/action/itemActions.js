import SuperAdminApi from "../api/superadmin";
import {
  branchTypes,
  categoryTypes,
  itemTypes,
  restaurantTypes,
} from "../types";
import itemsApi from "../api/itemsApi";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";
export const createItem = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: itemTypes.CREATE_ITEM,
    payload: {
      request: {
        url: itemsApi.CREATE_ITEM,
        method: "post",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const updateItem = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: itemTypes.UPDATE_ITEM,
    payload: {
      request: {
        url: itemsApi.UPDATE_ITEM,
        method: "PUT",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const bulkUploadItems = (data, cb, errorCb) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));

  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Items uploaded successfully",
      errorMessage: "Failed upload items",
      enableMessage: true,
      cb: cb,
      type: itemTypes.BULK_UPLOAD_ITEMS,
      payload: {
        request: {
          url: itemsApi.BULK_UPLOAD_ITEMS,
          method: "POST",
          data: formData,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

// export const updateItemVariants = (data, cb, errorCb) => {
//   return (dispatch) =>
//     checkIfAsyncReqSuccess(dispatch, {
//       successMessage: "Item variants updated successfully",
//       errorMessage: "Failed to update item variants Message",
//       cb: cb,
//       errorCb: errorCb,
//       type: itemTypes.UPDATE_ITEM,
//       enableMessage: true,
//       payload: {
//         request: {
//           url: itemsApi.UPDATE_ITEM_VARIANT,
//           method: "PUT",
//           data: data,
//           headers: {
//             "Content-type": "application/json",
//           },
//         },
//       },
//     });
// };

export const updateItemRawMaterials = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Item Raw Materials updated successfully",
      errorMessage: "Failed to update Item Raw Materials Message",
      cb: cb,
      errorCb: errorCb,
      type: itemTypes.UPDATE_ITEM_RAW_MATERIAL,
      enableMessage: true,
      payload: {
        request: {
          url: itemsApi.UPDATE_ITEM_RAW_MATERIALS,
          method: "PUT",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const deleteItem = (data) => {
  return {
    type: itemTypes.DELETE_ITEM,
    payload: {
      request: {
        url: itemsApi.DELETE_ITEM,
        method: "delete",
        data: data,
      },
    },
  };
};

export const getRestaurantItems = (status) => {
  return {
    type: itemTypes.GET_RESTAURANT_ITEMS,
    payload: {
      request: {
        url: itemsApi.GET_RESTAURANT_ITEMS,
        method: "get",
        params: {
          status: status,
        },
      },
    },
  };
};
export const getBranchItems = (branchId, status) => {
  return {
    type: itemTypes.GET_BRANCH_ITEMS,
    payload: {
      request: {
        url: itemsApi.GET_BRANCH_ITEMS,
        method: "get",
        params: {
          branchId: branchId,
          status: status,
        },
      },
    },
  };
};

export const importItems = (data) => {
  return {
    type: itemTypes.IMPORT_ITEMS,
    payload: {
      request: {
        url: itemsApi.IMPORT_ITEMS,
        method: "post",
        data: data,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const clearItems = () => {
  return {
    type: itemTypes.CLEAR_ITEMS,
  };
};
