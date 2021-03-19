import { utilTypes } from "../types";
const initialstate = {
  themes: [],
  Subscriptions: [],
  spinner: false,
  drawerOpen: false,
  commonPageModalOpen: false,
  commonPageData: {},
  language: "gu",
};

const utilReducer = (state = initialstate, action) => {
  switch (action.type) {
    case utilTypes.TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpen: !state.drawerOpen,
      };

    case "SPINNER_START":
      return {
        ...state,
        spinner: true,
      };

    case "SPINNER_STOP":
      return {
        ...state,
        spinner: false,
      };

    default:
      return state;
  }
};

export default utilReducer;
