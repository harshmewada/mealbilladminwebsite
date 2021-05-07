import React from "react";
import ElectronComponent from "./ElectronComponent";
import BrowserComponent from "./BroswerComponent";

const PrintComponent = (props) => {
  const isElectron = window?.api?.isElectron;
  return isElectron ? (
    <ElectronComponent {...props} />
  ) : (
    <BrowserComponent {...props} />
  );
  // return <BrowserComponent {...props} />;
};

export default PrintComponent;
