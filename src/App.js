import "./App.css";
import Routes from "./Routes";
import Store from "./redux/store";
import { Provider, useSelector } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import UtilComponent from "./Routes/UtilComponent";

function App() {
  return (
    <BrowserRouter>
      <Provider store={Store()}>
        <Routes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
