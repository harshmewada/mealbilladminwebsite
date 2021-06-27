import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { logoutUser } from "../../redux/action/userActions";
import View from "./view";

const TopBar = ({ hide }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    pathname !== "/order" &&
    !hide && <View handleLogout={() => handleLogout()} />
  );
};

export default TopBar;
