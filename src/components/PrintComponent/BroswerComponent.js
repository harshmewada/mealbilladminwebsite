import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ReactToPrint, { useReactToPrint } from "react-to-print";
import { RootUrl } from "../../redux/types";
import BillComponent from "./BillComponent";
import useDetectPrint from "use-detect-print";

const PrintComponent = ({
  headers,
  footers,
  printData,
  restaurant,
  logo,
  gstNumber,

  containerStyle,
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
    if (!isPrinting && printData) {
      console.log("isElectron", window.api);
      if (window?.api?.isElectron) {
        console.log("isElectron inside", window.api);

        window.api.send(printData);
      } else {
        handlePrint();
      }
    }
  }, [printData, isPrinting]);
  return (
    <div style={containerStyle}>
      {gstNumber}
      <div style={{ display: "none" }}>
        <BillComponent
          ref={componentRef}
          orderData={printData}
          restaurant={restaurant}
          logo={logo}
          gstNumber={gstNumber}
        />
      </div>
    </div>
  );
};
export default PrintComponent;
