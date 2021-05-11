import * as React from "react";

import ComponentToPrint from "./BillComponent";
import ReactToPrint from "react-to-print";
import useDetectPrint from "use-detect-print";

const ElectronComponent = ({
  printData,
  restaurant,
  logo,

  gstNumber,
}) => {
  const componentRef = React.useRef();
  const triggerRef = React.useRef();

  const isPrinting = useDetectPrint();

  const [count, setCounter] = React.useState(0);

  const reactToPrintTrigger = () => {
    return (
      <button ref={triggerRef} style={{ display: "none" }}>
        Print silently if running Electron (WILL PRINT WITH DEFAULT PRINTER
        WITHOUT DIALOG)
      </button>
    );
  };

  const printWithElectron = (target) => {
    // Create a new Electron window (opening the current url in the new window to allow relative sources to work)
    let printWindow = window.open(window.location.href, "silent-print-content");

    // Write the iframe contents into its body
    printWindow.document.body = target.contentWindow.document.body;

    // Call the Electron print function from the electron preloader, from
    // the new window and close that window after the printing is done
    return printWindow.api.printSilently();
  };

  const printErrorHandler = (_errorLocation, error) => {
    // TODO: Handle errors in the print callback here, instead of inside that callback
    alert("Something went wrong while printing: " + error.message);
  };

  React.useEffect(() => {
    if (!isPrinting && printData) {
      handleAnotherTriger();
    }
  }, [printData, isPrinting]);

  const handleAnotherTriger = () => {
    setCounter(count + 1);
    setTimeout(() => {
      triggerRef.current.click();
    }, 1000);
  };
  return (
    <div>
      <ReactToPrint
        content={() => componentRef.current}
        // Only pass print callback if window electron api is available
        print={window?.api?.isElectron ? printWithElectron : undefined}
        onPrintError={printErrorHandler}
        removeAfterPrint
        trigger={reactToPrintTrigger}
      />
      <div style={{ display: "none" }}>
        <ComponentToPrint
          orderData={printData}
          restaurant={restaurant}
          logo={logo}
          ref={componentRef}
          gstNumber={gstNumber}
        />
      </div>
    </div>
  );
};

export default ElectronComponent;

// export class ElectronPrint extends React.PureComponent {
//   componentRef = null;

//   constructor(props) {
//     super(props);
//   }

//   setComponentRef = (ref) => {
//     this.componentRef = ref;
//   };

//   reactToPrintContent = () => {
//     return this.componentRef;
//   };

//   reactToPrintTrigger = () => {
//     return (
//       <a href="javascript:void(0);">
//         Print silently if running Electron (WILL PRINT WITH DEFAULT PRINTER
//         WITHOUT DIALOG)
//       </a>
//     );
//   };

//   printWithElectron = (target) => {
//     // Create a new Electron window (opening the current url in the new window to allow relative sources to work)
//     let printWindow = window.open(window.location.href, "silent-print-content");

//     // Write the iframe contents into its body
//     printWindow.document.body = target.contentWindow.document.body;

//     // Call the Electron print function from the electron preloader, from
//     // the new window and close that window after the printing is done
//     return printWindow.api.printSilently();
//   };

//   printErrorHandler = (_errorLocation, error) => {
//     // TODO: Handle errors in the print callback here, instead of inside that callback
//     alert("Something went wrong while printing: " + error.message);
//   };

//   render() {
//     return (
//       <div>
//         <ReactToPrint
//           content={this.reactToPrintContent}
//           // Only pass print callback if window electron api is available
//           print={window?.api?.isElectron ? this.printWithElectron : undefined}
//           onPrintError={this.printErrorHandler}
//           removeAfterPrint
//           trigger={this.reactToPrintTrigger}
//         />
// <div style={{ display: "none" }}>
//   <ComponentToPrint
//     ref={this.setComponentRef}
//     text={"This prints automatically and silently"}
//   />
// </div>
//       </div>
//     );
//   }
// }

// export default ElectronPrint;
