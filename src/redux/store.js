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
    composeEnhancers(applyMiddleware(axiosReduxMiddleware, thunk))
  );

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
