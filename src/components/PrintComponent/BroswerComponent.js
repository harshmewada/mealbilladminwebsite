import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ReactToPrint, { useReactToPrint } from "react-to-print";
import { RootUrl } from "../../redux/types";
import BillComponent from "./BillComponent";
import CashBookPrint from "./CashBookPrint";

import useDetectPrint from "use-detect-print";

const PrintComponent = ({
  headers,
  footers,
  printData,
  printType,
  restaurant,
  logo,
  gstNumber,
  branchAddress,
  containerStyle,
  receiptMessage,
  printSetting,
  isRestaurantAdmin,
}) => {
  const dispatch = useDispatch();
  const isPrinting = useDetectPrint();

  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      // alert("print completed");
    },
  });

  React.useEffect(() => {
    if (isRestaurantAdmin) {
      handlePrint();
      return;
    } else if (!isPrinting && printData) {
      if (window?.api?.isElectron) {
        console.log("isElectron inside", window.api);

        window.api.send(printData);
      } else {
        handlePrint();
      }
    }
  }, [printData, isPrinting]);

  const renderComponent = () => {
    console.log(
      "cash book",
      printData,
      restaurant,
      logo,
      gstNumber,
      receiptMessage,
      branchAddress,
      printSetting
    );
    if (printType === "cashbook") {
      return (
        <CashBookPrint
          ref={componentRef}
          printData={printData}
          restaurant={restaurant}
          logo={logo}
          gstNumber={gstNumber}
          receiptMessage={receiptMessage}
          branchAddress={branchAddress}
          printSetting={printSetting}
        />
      );
    }
    return (
      <BillComponent
        ref={componentRef}
        orderData={printData}
        restaurant={restaurant}
        logo={logo}
        gstNumber={gstNumber}
        receiptMessage={receiptMessage}
        branchAddress={branchAddress}
        printSetting={printSetting}
      />
    );
  };
  return (
    <div style={{ ...containerStyle, width: "100%" }}>
      <div style={{ display: "none" }}>{renderComponent()}</div>
    </div>
  );
};
export default PrintComponent;
