import {
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
} from "electron-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import axiosReduxMiddleware from "./axiosReduxMiddleware";
import thunk from "redux-thunk";

export default function initializeStore(initialState = {}) {
  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        triggerAlias,
        // axiosReduxMiddleware,
        thunk,

        forwardToRenderer
      )
    )
  );

  store.subscribe(() => {
    // const CurrentState = store.getState();
    // console.log("This is Current State", CurrentState);
  });

  return replayActionMain(store);
}
