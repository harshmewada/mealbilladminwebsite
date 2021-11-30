import React from "react";
import BrowserComponent from "./BroswerComponent";
import { useSelector } from "react-redux";
import { RootUrl } from "../../redux/types";

const PrintComponent = (props) => {
  const isElectron = window?.api?.isElectron;

  const {
    printData,
    enablePrinting,
    enableLogo,
    enableBranchName,

    enableAddress,
    enableGSTNumber,
    enableCustomer,
    printType,
  } = useSelector((state) => state.util);
  const role = useSelector((state) => state.user.role);
  const isRestaurantAdmin = role === "restaurantadmin";

  const printSetting = {
    enableLogo,
    enableBranchName,

    enableAddress,
    enableGSTNumber,
    enableCustomer,
  };
  const logo =
    RootUrl + "/" + useSelector((state) => state.user.restaurantLogo);

  const {
    restaurantName,
    branchName,
    gstNumber,
    branchAddress,
    receiptMessage: currReceiptMessage,
  } = useSelector((state) => state.user);

  const restaurant = `${restaurantName}${
    branchName && enableBranchName ? `(${branchName})` : ""
  }`;

  const receiptMessage =
    currReceiptMessage && currReceiptMessage !== null
      ? currReceiptMessage
      : undefined;
  React.useEffect(() => {
    if (isElectron && printData) {
      window.api.printBillSilently({
        logo: enableLogo && logo,
        printData,
        restaurant,
        gstNumber,
        receiptMessage: receiptMessage,
        branchAddress,
        printSetting,
      });
    }
  }, [printData, enablePrinting]);
  console.log("printData", isRestaurantAdmin, printData);
  return isRestaurantAdmin ? (
    <BrowserComponent
      printData={printData}
      logo={enableLogo && logo}
      restaurant={restaurant}
      gstNumber={(enableGSTNumber || isRestaurantAdmin) && gstNumber}
      branchAddress={enableAddress && branchAddress}
      receiptMessage={receiptMessage}
      printSetting={printSetting}
      printType={printType}
      isRestaurantAdmin={isRestaurantAdmin}
    />
  ) : !enablePrinting ? (
    <div />
  ) : isElectron ? (
    <div />
  ) : (
    <BrowserComponent
      printData={printData}
      logo={enableLogo && logo}
      restaurant={restaurant}
      gstNumber={enableGSTNumber && gstNumber}
      branchAddress={enableAddress && branchAddress}
      receiptMessage={receiptMessage}
      printSetting={printSetting}
      printType={printType}
      isRestaurantAdmin={isRestaurantAdmin}
    />
  );
  // return <BrowserComponent {...props} />;
};

export default PrintComponent;

// import React from "react";
// import ElectronComponent from "./ElectronComponent";
// import BrowserComponent from "./BroswerComponent";
// import { useSelector } from "react-redux";
// import { RootUrl } from "../../redux/types";

// const PrintComponent = (props) => {
//   const isElectron = window?.api?.isElectron;

//   const { printData, enablePrinting } = useSelector((state) => state.util);
//   const logo =
//     RootUrl + "/" + useSelector((state) => state.user.restaurantLogo);

//   const { restaurantName, branchName, gstNumber } = useSelector(
//     (state) => state.user
//   );

//   const restaurant = `${restaurantName}${branchName ? `(${branchName})` : ""}`;
//   return !enablePrinting ? (
//     <div />
//   ) : isElectron ? (
//     <ElectronComponent
//       printData={printData}
//       logo={logo}
//       restaurant={restaurant}
//       gstNumber={gstNumber}
//     />
//   ) : (
//     <BrowserComponent
//       printData={printData}
//       logo={logo}
//       restaurant={restaurant}
//       gstNumber={gstNumber}
//     />
//   );
//   // return <BrowserComponent {...props} />;
// };

// export default PrintComponent;
