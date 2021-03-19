import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Login from "../pages/Login";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const currentUser = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser.isLogged) {
          // not logged in so redirect to login page with the return url
          return <Login />;
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
