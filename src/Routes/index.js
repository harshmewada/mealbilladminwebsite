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
import DashboardSuperAdmin from "../pages/DashBoardSuperAdmin";
import ProtectedRoute from "./ProtectedRoute";
import UtilComponent from "./UtilComponent";
import checkIfAppReady from "../helpers/checkIfAppReady";
import LoadingFullPage from "../components/common/Loading/LoadingFullPage";

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

      <ProtectedRoute path="/" component={DashboardSuperAdmin} />
      <Route exact path="/login" component={Login} />
    </React.Fragment>
  ) : (
    <LoadingFullPage />
  );
};
export default HomeRoutes;
