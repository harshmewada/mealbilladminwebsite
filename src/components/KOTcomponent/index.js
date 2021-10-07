import React from "react";
import BrowserComponent from "./BroswerComponent";
import { useSelector } from "react-redux";
import { RootUrl } from "../../redux/types";

const KOTPrintComponent = (props) => {
  const isElectron = window?.api?.isElectron;

  const {
    KOTprintData,
    enableKOT,
    enablePrinting,
    enableLogo,
    enableBranchName,

    enableAddress,
    enableGSTNumber,
    enableCustomer,
  } = useSelector((state) => state.util);
  const printSetting = {
    enableLogo,
    enableBranchName,

    enableAddress,
    enableGSTNumber,
    enableCustomer,
  };
  const logo =
    RootUrl + "/" + useSelector((state) => state.user.restaurantLogo);

  const { restaurantName, branchName, gstNumber, branchAddress } = useSelector(
    (state) => state.user
  );

  const restaurant = `${restaurantName}${
    branchName && enableBranchName ? `(${branchName})` : ""
  }`;

  React.useEffect(() => {
    console.log("window kot", KOTprintData);
    if (isElectron && KOTprintData) {
      const {
        branchOrderNumber,
        customerMobile,
        customerName,
        orderDate,
        orderItems,
        orderType,
        remarks,
        tableNumber,
        totalQuantity,
      } = KOTprintData;
      window.api.printKOTSilently({
        logo,
        printData: {
          branchOrderNumber,
          customerMobile,
          customerName,
          orderDate,
          orderItems,
          orderType,
          remarks,
          tableNumber,
          totalQuantity,
        },
        restaurant,
        branchAddress,
        printSetting,
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
      logo={enableLogo && logo}
      restaurant={restaurant}
      branchAddress={enableAddress && branchAddress}
    />
  );
};

export default KOTPrintComponent;
