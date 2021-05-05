import { dashboardTypes, userTypes } from "../types";
const initialstate = {
  isLoading: false,
  data: [],
};

const dashboardReducer = (state = initialstate, action) => {
  const getData = () => action.payload.data;
  const toggleLoading = () => {
    return {
      isLoading: !state.isLoading,
    };
  };
  switch (action.type) {
    case dashboardTypes.GET_DASHBOARD:
      return {
        ...state,
        ...toggleLoading(),
      };
    case dashboardTypes.GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        data: getData().data || [],
      };
    case dashboardTypes.GET_DASHBOARD_FAIL:
      return {
        ...state,
        ...toggleLoading(),
      };
    case userTypes.LOGOUT_USER:
      return { ...initialstate };

    default:
      return state;
  }
};

export default dashboardReducer;
