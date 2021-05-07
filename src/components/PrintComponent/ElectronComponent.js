import * as React from "react";

import ComponentToPrint from "./BillComponent";
import ReactToPrint from "react-to-print";
import reactDom from "react-dom";

// TODO: Should ideally be declared somewhere else, not
//  sure what the best practice for this is, though

class ElectronPrint extends React.PureComponent {
  componentRef = null;

  constructor(props) {
    super(props);
  }

  setComponentRef = (ref) => {
    this.componentRef = ref;
  };

  reactToPrintContent = () => {
    return this.componentRef;
  };

  reactToPrintTrigger = () => {
    return (
      <a href="#">
        Print silently if running Electron (WILL PRINT WITH DEFAULT PRINTER
        WITHOUT DIALOG)
      </a>
    );
  };

  printWithElectron = (target) => {
    // console.log("printWithElectron", reactDom.findDOMNode(this.componentRef));

    const content = reactDom.findDOMNode(this.componentRef);
    // Create a new Electron window (opening the current url in the new window to allow relative sources to work)
    // let printWindow = window.open(window.location.href, "silent-print-content");

    // // alert("printWithElectron");
    // // // Write the iframe contents into its body
    // printWindow.document.body.innerHTML = `<h1>hello</h1>`;
    // console.log("printWindow", printWindow.document.body);

    // // Call the Electron print function from the electron preloader, from
    // // the new window and close that window after the printing is done
    return window.api.printSilently(content);
  };

  printErrorHandler = (_errorLocation, error) => {
    // TODO: Handle errors in the print callback here, instead of inside that callback
    alert("Something went wrong while printing: " + error.message);
  };

  render() {
    return (
      <div>
        <ReactToPrint
          content={this.reactToPrintContent}
          // Only pass print callback if window electron api is available
          print={window?.api?.isElectron ? this.printWithElectron : undefined}
          onPrintError={this.printErrorHandler}
          removeAfterPrint
          trigger={this.reactToPrintTrigger}
        />
        <div style={{ display: "none" }}>
          <ComponentToPrint
            ref={this.setComponentRef}
            text={"This prints automatically and silently"}
          />
        </div>
      </div>
    );
  }
}
export default ElectronPrint;
