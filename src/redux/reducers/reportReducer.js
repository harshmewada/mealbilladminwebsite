import { reportTypes, userTypes } from "../types";
const initialstate = {
  isLoading: false,
  data: [],
};

const reportReducer = (state = initialstate, action) => {
  const getData = () => action.payload.data;
  const toggleLoading = () => {
    return {
      isLoading: !state.isLoading,
    };
  };
  switch (action.type) {
    case reportTypes.GET_REPORT:
      return {
        ...state,
        ...toggleLoading(),
      };
    case reportTypes.GET_REPORT_SUCCESS:
      return {
        ...state,
        data: getData().data || [],
      };
    case reportTypes.GET_REPORT_FAIL:
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

export default reportReducer;
