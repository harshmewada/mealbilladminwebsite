import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { logoutUser } from "../../redux/action/userActions";
import View from "./view";

const TopBar = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return pathname !== "/order" && <View handleLogout={() => handleLogout()} />;
};

export default TopBar;
