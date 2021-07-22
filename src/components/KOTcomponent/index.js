import React from "react";
import BrowserComponent from "./BroswerComponent";
import { useSelector } from "react-redux";
import { RootUrl } from "../../redux/types";

const KOTPrintComponent = (props) => {
  const isElectron = window?.api?.isElectron;

  const { KOTprintData, enableKOT } = useSelector((state) => state.util);
  const logo =
    RootUrl + "/" + useSelector((state) => state.user.restaurantLogo);

  const { restaurantName, branchName, gstNumber, branchAddress } = useSelector(
    (state) => state.user
  );

  const restaurant = `${restaurantName}${branchName ? `(${branchName})` : ""}`;

  React.useEffect(() => {
    if (isElectron && KOTprintData) {
      window.api.printKOTSilently({
        logo,
        printData: KOTprintData,
        restaurant,
        branchAddress,
      });
    }
  }, [KOTprintData, enableKOT]);

  return !enableKOT ? (
    <div />
  ) : isElectron ? (
    <div />
  ) : (
    <BrowserComponent
      printData={KOTprintData}
      logo={logo}
      restaurant={restaurant}
      branchAddress={branchAddress}
    />
  );
};

export default KOTPrintComponent;
