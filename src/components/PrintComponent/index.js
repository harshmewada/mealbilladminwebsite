import React from "react";
import ElectronComponent from "./ElectronComponent";
import BrowserComponent from "./BroswerComponent";
import { useSelector } from "react-redux";
import { RootUrl } from "../../redux/types";

const PrintComponent = (props) => {
  const isElectron = window?.api?.isElectron;

  const { printData, enablePrinting } = useSelector((state) => state.util);
  const logo =
    RootUrl + "/" + useSelector((state) => state.user.restaurantLogo);

  const { restaurantName, branchName, gstNumber } = useSelector(
    (state) => state.user
  );

  const restaurant = `${restaurantName}${branchName ? `(${branchName})` : ""}`;
  return !enablePrinting ? (
    <div />
  ) : isElectron ? (
    <ElectronComponent
      printData={printData}
      logo={logo}
      restaurant={restaurant}
      gstNumber={gstNumber}
    />
  ) : (
    <BrowserComponent
      printData={printData}
      logo={logo}
      restaurant={restaurant}
      gstNumber={gstNumber}
    />
  );
  // return <BrowserComponent {...props} />;
};

export default PrintComponent;
