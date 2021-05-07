import "./App.css";
import React from "react";
import Routes from "./Routes";
import Store from "./redux/store";
import { Provider, useSelector } from "react-redux";

import { BrowserRouter, HashRouter } from "react-router-dom";
import { isMobile } from "react-device-detect";
import MobileDetected from "./pages/MobileDetected";
function App() {
  return !isMobile ? (
    <HashRouter>
      <Provider store={Store()}>
        <button
          onClick={(_) => {
            console.log("isElectron window", window.api);
            window.api.notify("this is mesaage");
          }}
        >
          <i class="mdi-wallet">cloud</i>
          Notify
        </button>
        <Routes />
      </Provider>
    </HashRouter>
  ) : (
    <MobileDetected />
  );
}

export default App;
