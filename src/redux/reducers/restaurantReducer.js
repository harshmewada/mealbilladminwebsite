import { act } from "react-dom/test-utils";
import { get } from "react-hook-form";
import { restaurantTypes, userTypes } from "../types";

const initialstate = {
  allRestaurants: [],
};

const restaurantReducer = (state = initialstate, action) => {
  const getData = () => action.payload.data;

  const getUpdatedRestaurants = () => {
    let allres = state.allRestaurants;
    let foundRes = allres.findIndex((res) => {
      return res._id === getData().data.id;
    });
    if (foundRes > -1) {
      allres[foundRes] = getData().data;
    }

    console.log("found res", allres[foundRes]);
    return allres;
  };

  switch (action.type) {
    // case restaurantTypes.CREATE_RESTAURANT_SUCCESS:
    //   return {
    //     ...state,
    //     allRestaurants: [
    //       ...state.allRestaurants,
    //       { ...action.payload.data.data, branchCount: 0, userCount: 0 },
    //     ],
    //   };

    // case restaurantTypes.UPDATE_RESTAURANT_SUCCESS:
    //   return {
    //     ...state,
    //     allRestaurants: [...getUpdatedRestaurants()],
    //   };
    case restaurantTypes.GET_ALL_RESTAURANTS_SUCCESS:
      return {
        ...state,
        allRestaurants: getData().data,
      };
    case userTypes.LOGOUT_USER:
      return { ...initialstate };
    default:
      return state;
  }
};

export default restaurantReducer;
