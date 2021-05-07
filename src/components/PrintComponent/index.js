import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ReactToPrint, { useReactToPrint } from "react-to-print";
import { RootUrl } from "../../redux/types";
import BillComponent from "./BillComponent";
import useDetectPrint from "use-detect-print";
import reactDom from "react-dom";

const PrintComponent = ({ headers, footers, containerStyle }) => {
  const dispatch = useDispatch();
  const isPrinting = useDetectPrint();

  const logo = useSelector((state) => state.user.restaurantLogo);
  const { printData, enablePrinting } = useSelector((state) => state.util);

  const componentRef = React.createRef();
  const containerRef = React.createRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      // alert("print completed");
    },
  });

  const printWithElectron = (content) => {
    // Create a new Electron window (opening the current url in the new window to allow relative sources to work)
    let printWindow = window.open(window.location.href, "silent-print-content");
    console.log("componentRef printWindow", printWindow);

    // Write the iframe contents into its body
    printWindow.document.body = content;
    console.log("componentRef printWithElectron", printWindow.api);

    // Call the Electron print function from the electron preloader, from
    // the new window and close that window after the printing is done
    return printWindow.api
      .printSilently()
      .catch((failReason) => {
        // TODO: Add the print callback as an error location for the error
        //  handler so that this alert can be put in the actual onPrintError
        alert("Something went wrong while printing: " + failReason);
        // throw new Error(failReason);
      })
      .finally(() => printWindow.close());
  };

  React.useEffect(() => {
    if (!isPrinting && printData && enablePrinting) {
      console.log("isElectron", window.api);
      if (window?.api?.isElectron) {
        console.log("isElectron inside", window.api);
        const domnode = reactDom.findDOMNode(componentRef.current);
        // console.log("componentRef", componentRef.current);
        console.log("componentRef domnode", domnode);
        printWithElectron(domnode);
      } else {
        handlePrint();
      }
    }
  }, [printData, isPrinting]);
  return (
    <div
      ref={containerRef}
      style={{
        ...containerStyle,
      }}
    >
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
