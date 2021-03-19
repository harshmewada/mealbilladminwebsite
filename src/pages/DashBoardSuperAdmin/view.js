import React from "react";

import LeftSideBar from "../../components/LeftSideBar/index";
import TopBar from "../../components/TopBar";
import CenterView from "./CenterView";
const View = () => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar />
      <div className="data-container">
        <LeftSideBar />

        <CenterView />
      </div>
    </div>
  );
};

export default View;
