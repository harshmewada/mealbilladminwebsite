import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/action/userActions";
import View from "./view";

const TopBar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return <View handleLogout={() => handleLogout()} />;
};

export default TopBar;
