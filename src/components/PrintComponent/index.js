import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ReactToPrint, { useReactToPrint } from "react-to-print";
import { RootUrl } from "../../redux/types";
import BillComponent from "./BillComponent";
import useDetectPrint from "use-detect-print";

const PrintComponent = ({ headers, footers, containerStyle }) => {
  const dispatch = useDispatch();
  const isPrinting = useDetectPrint();

  const logo = useSelector((state) => state.user.restaurantLogo);
  const { printData, enablePrinting } = useSelector((state) => state.util);

  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      // alert("print completed");
    },
  });

  React.useEffect(() => {
    if (!isPrinting && printData && enablePrinting) {
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
      <div style={{ display: "none" }}>
        <BillComponent
          ref={componentRef}
          orderData={printData}
          logo={RootUrl + "/" + logo}
          headers={headers}
          footers={footers}
        />
      </div>
    </div>
  );
};
export default PrintComponent;
