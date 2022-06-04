import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import axiosReduxMiddleware from "./axiosReduxMiddleware";
import thunk from "redux-thunk";
import socketMiddleware from "./middlewares/socketMiddleware.js";
import socketIOClient from "socket.io-client";
import { SOCKETURL } from "../contants";

export let mainSocket = socketIOClient(SOCKETURL, { secure: true });

export default function initializeStore(initialState = {}) {
  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(axiosReduxMiddleware, socketMiddleware(mainSocket), thunk)
    )
  );
  // const store = createStore(
  //   rootReducer,
  //   initialState,
  //   composeEnhancers(applyMiddleware(axiosReduxMiddleware, thunk))
  // );

  store.subscribe(() => {
    // const CurrentState = store.getState();
    // console.log("This is Current State", CurrentState);
  });

  return store;
}

// import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from "./reducers/index";
// import axios from "axios";
// import axiosMiddleware from "redux-axios-middleware";
// import axiosReduxMiddleware from "./axiosReduxMiddleware";
// import thunk from "redux-thunk";
// import { offline } from "@redux-offline/redux-offline";
// import offlineConfig from "@redux-offline/redux-offline/lib/defaults";
// export default function initializeStore(initialState = {}) {
//   const composeEnhancers =
//     (typeof window !== "undefined" &&
//       window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//     compose;

//   const store = createStore(
//     rootReducer,
//     initialState,
//     composeEnhancers(
//       applyMiddleware(axiosReduxMiddleware, thunk),
//       offline(offlineConfig)
//     )
//   );

//   store.subscribe(() => {
//     //  const CurrentState = store.getState();
//     //  console.log('This is Current State' ,CurrentState)
//   });

//   return store;
// }
