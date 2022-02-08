import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PermissionsGate, { usePermissions } from "../components/PermissionGate";

const PrivateRoute = ({ component: Component, roles, scopes, ...rest }) => {
  const currentUser = useSelector((state) => state.user);
  const hasPermission = usePermissions({ scopes: scopes });

  if (scopes && !hasPermission) {
    return <Redirect to="/" />;
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser.isLogged) {
          // not logged in so redirect to login page with the return url
          return <Redirect to="/login" />;
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.role) === -1) {
          // role not authorised so redirect to home page
          return <Redirect to="/" />;
        }

        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};
export default PrivateRoute;
