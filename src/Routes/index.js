import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";

import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import UtilComponent from "./UtilComponent";
import checkIfAppReady from "../helpers/checkIfAppReady";
import LoadingFullPage from "../components/common/Loading/LoadingFullPage";
import DashBoardRoutes from "./DashBoardRoutes";
import ExpiredSubscription from "../pages/ExpiredSubscription";
import ForgotPassword from "../pages/ForgotPassword";

const HomeRoutes = () => {
  const ScrollToTop = () => {
    window.scrollTo(0, 0);
    return null;
  };
  const ready = checkIfAppReady();
  return ready ? (
    <React.Fragment>
      <UtilComponent />
      <Route component={ScrollToTop} />
      <Route path="/expired" exact component={ExpiredSubscription} />

      <ProtectedRoute path="/" component={DashBoardRoutes} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgotpassword" component={ForgotPassword} />
    </React.Fragment>
  ) : (
    <LoadingFullPage />
  );
};
export default HomeRoutes;
