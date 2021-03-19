import React from "react";
import { useSelector } from "react-redux";
import leftSideBarRoutes from "../../Routes/leftSideBarRoutes";
import View from "./view";

const LeftSideBar = () => {
  const role = useSelector((state) => state.user.role);
  return <View sidebarData={leftSideBarRoutes[role]} />;
};

export default LeftSideBar;
