import moment from "moment";
import React from "react";
// import SmartTable from "../../Component/Common/SmartTable";
import { TYPESOFORDERS } from "../../contants/index";
import "./invoice.css";
import { CURRENCY, DATEFORMAT } from "../../contants";

const Invoice = React.forwardRef(
  (
    {
      printData = defaultPrintData,
      restaurant,
      logo,
      gstNumber,
      receiptMessage,
      branchAddress,
      printSetting,
    },
    ref
  ) => {
    const startDate = printData?.selectedParams?.date?.start
      ? moment(printData?.selectedParams?.date?.start).format(DATEFORMAT)
      : undefined;
    const endDate = printData?.selectedParams?.date?.end
      ? moment(printData?.selectedParams?.date?.end).format(DATEFORMAT)
      : undefined;
    const data = printData.data;

    return (
      <div class="cash-ticket" ref={ref}>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
        >
          <div className="card p-4" style={{ width: "90%" }}>
            <h3 className="">Cash Report</h3>
            <table class="mt-2">
              <tbody>
                <tr>
                  <th> {logo && <img src={logo} class="logo" />}</th>
                  <th className="text-center">
                    <h4>{restaurant}</h4>
                    {gstNumber && <p>GST -{gstNumber} hello</p>}
                  </th>
                  <th className="text-right">
                    <h4>Report Date</h4>
                    {startDate && (
                      <p>
                        {startDate} {endDate && ` - ${endDate}`}
                      </p>
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
            <div className="divider" />

            <table class="postable table mt-2">
              <thead>
                <tr>
                  <th class="sr">Particulars</th>
                  <th class="quantity">({CURRENCY}) Credit</th>
                  <th class="price">({CURRENCY}) Debit</th>

                  {/* <th class="quantity">Qty</th>
              <th class="price">Price</th>
              <th class="amount">Amt.</th> */}
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => {
                  return (
                    <tr>
                      {renderItem(d, "particulars", i, "sr")}
                      {renderItem(d, "credit", i, "quantity")}
                      {renderItem(d, "debit", i, "price")}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
);

class BillComponent extends React.Component {
  render() {
    const {
      printData = defaultPrintData,
      restaurant,
      logo,
      gstNumber,
      receiptMessage,
      branchAddress,
      printSetting,
    } = this.props;
    // console.log("orderData", orderData);
    return printData ? (
      <Invoice
        restaurant={restaurant}
        printData={printData}
        logo={logo}
        gstNumber={gstNumber}
        receiptMessage={receiptMessage}
        branchAddress={branchAddress}
        printSetting={printSetting}
      />
    ) : (
      <div className={`invoice-box invoice-box-hide" `}>
        No Data found
        {/* <SmartTable
          showHeader={false}
          headerData={tableHeaders}
          tableData={data || []}
          selectable={false}
          small={true}
          title={"title"}
          showActions={false}
          disablePagination
          rowsPerPage={data.length}
          customAction={customAction}
        /> */}
      </div>
    );
  }
}
export default BillComponent;

const renderItem = (value, variable, index, className) => {
  const par = value[variable].value;
  const isStrong = value[variable].isStrong;
  const isSubtitle = value[variable].isSubtitle;

  return (
    <React.Fragment key={index}>
      <td
        class={`${className} text-primary font-15 font-weight-normal ${
          isStrong && "font-weight-bold"
        } ${isSubtitle && "pl-4"}`}
      >
        {par}
      </td>
    </React.Fragment>
  );
};
const defaultPrintData = {
  selectedParams: {
    date: {
      start: "2021-11-30T10:43:14.812Z",
      end: "2021-11-30T10:43:14.812Z",
    },
    role: "restaurantadmin",
    restaurantId: "60db5e21a36fd9343a463a0a",
    reportType: "cashbook",
  },
  data: [
    {
      particulars: {
        value: "Opening Balance",
        isStrong: true,
      },
      credit: {
        value: "757321.01",
        isStrong: true,
      },
      debit: {
        value: "-",
        isStrong: true,
      },
    },
    {
      particulars: {
        value: "Sales",
        isStrong: true,
      },
      credit: {
        value: "900.00",
        isStrong: true,
      },
      debit: {
        value: "-",
        isStrong: true,
      },
    },
    {
      particulars: {
        value: "Cash",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: 900,
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "Card",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "Other",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "Expenses",
        isStrong: true,
      },
      credit: {
        value: "-",
        isStrong: true,
      },
      debit: {
        value: 25000,
        isStrong: true,
      },
    },
    {
      particulars: {
        value: "Milk Products",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "BATI ATO",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "PARCHURAN",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "PAPPU",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "Salary",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 25000,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "Fuel Expenses",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "ROTI ATO",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "DUNGARI & LASAN",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "KUNTAL",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "Vegetables",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "RAMADEV",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "PANIR",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "TEL",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "DAL",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "Rice",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "PAPAD",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "DEDSTOK",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "ANISH",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "AVAK",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "Electricity Bills",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "KARIYANU",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "DUKAN BHADU",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "DISPOSEBAL",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "VC",
        isStrong: false,
        isSubtitle: true,
      },
      credit: {
        value: "-",
        isStrong: false,
        isSubtitle: true,
      },
      debit: {
        value: 0,
        isStrong: false,
        isSubtitle: true,
      },
    },
    {
      particulars: {
        value: "Closing Balance",
        isStrong: true,
      },
      credit: {
        value: "-",
        isStrong: true,
      },
      debit: {
        value: 733221.01,
        isStrong: true,
      },
    },
    {
      particulars: {
        value: "Balance",
        isStrong: true,
      },
      credit: {
        value: 758221.01,
        isStrong: true,
      },
      debit: {
        value: 758221.01,
        isStrong: true,
      },
    },
  ],
};

// import moment from "moment";
// import React from "react";
// import { CURRENCY, DATEFORMAT } from "../../contants";

// class CashBookPrint extends React.Component {
//   render() {
//     const {
//       printData = defaultPrintData,
//       restaurant,
//       logo,
//       gstNumber,
//       receiptMessage,
//       branchAddress,
//       printSetting,
//     } = this.props;

//     const startDate = printData?.selectedParams?.date?.start
//       ? moment(printData?.selectedParams?.date?.start).format(DATEFORMAT)
//       : undefined;
//     const endDate = printData?.selectedParams?.date?.end
//       ? moment(printData?.selectedParams?.date?.end).format(DATEFORMAT)
//       : undefined;
//     const data = printData.data;
//     // console.log("orderData", orderData);
//     return (
//       <>
//         <div class="ticket">
// <div
//   style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
// >
//   <div className="card p-4" style={{ width: "90%" }}>
//     <h3 className="">Cash Report</h3>
//     <table class="mt-2">
//       <tbody>
//         <tr>
//           <th> {logo && <img src={logo} class="logo" />}</th>
//           <th className="text-center">
//             <h4>{restaurant}</h4>
//             {gstNumber && <p>GST -{gstNumber} hello</p>}
//           </th>
//           <th className="text-right">
//             <h4>Report Date</h4>
//             {startDate && (
//               <p>
//                 {startDate} {endDate && ` - ${endDate}`}
//               </p>
//             )}
//           </th>
//         </tr>
//       </tbody>
//     </table>
//     <div className="divider" />

//     <table class="postable table mt-2">
//       <thead>
//         <tr>
//           <th class="sr">Particulars</th>
//           <th class="quantity">({CURRENCY}) Credit</th>
//           <th class="price">({CURRENCY}) Debit</th>

//           {/* <th class="quantity">Qty</th>
//     <th class="price">Price</th>
//     <th class="amount">Amt.</th> */}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((d, i) => {
//           return (
//             <tr>
//               {renderItem(d, "particulars", i, "sr")}
//               {renderItem(d, "credit", i, "quantity")}
//               {renderItem(d, "debit", i, "price")}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   </div>
// </div>
//         </div>
//       </>
//     );
//   }
// }
// export default CashBookPrint;
// const renderItem = (value, variable, index, className) => {
//   const par = value[variable].value;
//   const isStrong = value[variable].isStrong;
//   const isSubtitle = value[variable].isSubtitle;

//   return (
//     <React.Fragment key={index}>
//       <td
//         class={`${className} text-primary font-15 font-weight-normal ${
//           isStrong && "font-weight-bold"
//         } ${isSubtitle && "pl-4"}`}
//       >
//         {par}
//       </td>
//     </React.Fragment>
//   );
// };

// // import moment from "moment";
// // import React from "react";
// // // import SmartTable from "../../Component/Common/SmartTable";
// // import { TYPESOFORDERS } from "../../contants/index";
// // import "./invoice.css";
// // // const printheaders = [
// // //   { title: "SKU", key: "sku", type: "text", currency: false },
// // //   { title: " Item", key: "product", type: "text", currency: false },

// // //   {
// // //     title: "Unit Price",
// // //     key: "unitPrice",
// // //     type: "float",
// // //   },
// // //   {
// // //     title: "Quantity",
// // //     key: "requestedQuantity",

// // //     type: "number",
// // //   },
// // //   {
// // //     title: "Discount",
// // //     key: "discountRate",
// // //     type: "number",
// // //   },
// // //   {
// // //     title: "Dis.Amount",
// // //     key: "discountAmount",
// // //     type: "float",
// // //   },

// // //   { title: "Tax Rate", key: "taxRate", type: "float", currency: false },
// // //   {
// // //     title: "Tax Amount",
// // //     key: "taxAmount",
// // //     type: "float",
// // //   },
// // //   {
// // //     title: "Total",
// // //     key: "totalAmount",
// // //     type: "float",
// // //   },
// // // ];
// // const printfooters = [
// //   {
// //     title: "Sub Total",
// //     hasCurrency: true,
// //     key: "itemsTotal",
// //     titleClass: "subtotal",
// //     valueClass: "subtotalamount",
// //   },
// //   {
// //     // title: "Tax",
// //     title: "GST",

// //     hasCurrency: true,
// //     key: "taxTotal",
// //     titleClass: "discount",
// //     valueClass: "discount",
// //   },

// //   {
// //     title: "Discount",
// //     hasCurrency: true,
// //     key: "discount",
// //     titleClass: "discount",
// //     valueClass: "discount",
// //   },
// //   {
// //     title: "Charges",
// //     hasCurrency: true,
// //     key: "otherCharges",
// //     titleClass: "discount",
// //     valueClass: "discount",
// //   },

// //   {
// //     title: "Grand Total",
// //     hasCurrency: true,
// //     key: "grandTotal",
// //     titleClass: "grand",
// //     valueClass: "grandtotal",
// //   },
// // ];

// // const Header = ({
// //   orderNumber,
// //   branchOrderNumber,
// //   customerName,
// //   customerMobile,

// //   resName,
// //   orderDate,
// //   paymentType,
// //   logo,
// //   tableNumber,
// //   orderType,
// //   gstNumber,
// //   branchAddress,
// // }) => {
// //   return (
// //     <>
// //       <div class="centered">
// //         {logo && <img src={logo} class="logo" />}
// //         <p>Cash Book</p>
// //         <p>{resName}</p>
// //         {branchAddress && <p class="gstNumber">{branchAddress}</p>}
// //         {gstNumber && <p class="gstNumber">GST {gstNumber}</p>}
// //       </div>

// //       <div className="info">
// //         {customerName && (
// //           <div className="subinfo">
// //             <p>
// //               Name : {customerName}{" "}
// //               {customerMobile ? `(${customerMobile})` : ""}
// //             </p>
// //           </div>
// //         )}
// //         <div className="subinfo">
// //           <p>{branchOrderNumber}</p>
// //           <p>{orderDate}</p>
// //         </div>
// //         <div className="subinfo">
// //           <p>{orderType}</p>
// //           <p>{orderNumber}</p>

// //           <p>{tableNumber}</p>

// //           <p>{paymentType}</p>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // const renderRow = (data, value) => {
// //   return value ? (
// //     <tr>
// //       <td colspan="3" class={data.titleClass}>
// //         {data.title}
// //       </td>
// //       <td colspan="3" class={data.valueClass}>
// //         {data.hasCurrency ? "₹" : " "} {value}
// //       </td>
// //     </tr>
// //   ) : (
// //     ""
// //   );
// // };

// // const renderItem = (value, index, i) => {
// //   return (
// //     <React.Fragment key={index}>
// //       <tr>
// //         <td class="sr">{i}</td>
// //         <td class="pro">{value.itemName}</td>
// //         <td class="quantity">{value.quantity}</td>
// //         <td class="price">{value.itemPrice}</td>
// //         <td class="amount">{value.itemTotal}</td>
// //       </tr>
// //     </React.Fragment>
// //   );
// // };
// // const ProductTable = ({ printData }) => {
// //   return (
// //     <table class="postable">
// //       <thead>
// //         <tr>
// //           <th class="sr">Sr.</th>
// //           <th class="pro">Product</th>
// //           <th class="quantity">Qty</th>
// //           <th class="price">Price</th>
// //           <th class="amount">Amt.</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {printData.orderItems.map((value, index) => {
// //           const i = ++index;
// //           return renderItem(value, index, i);
// //         })}

// //         {printfooters.map((foot, footIndex) =>
// //           renderRow(foot, printData[foot.key])
// //         )}
// //       </tbody>
// //     </table>
// //   );
// // };

// // const Invoice = React.forwardRef(
// //   (
// //     {
// //       restaurant,
// //       printData,
// //       count,
// //       logo,
// //       gstNumber,
// //       receiptMessage,
// //       branchAddress,
// //       printSetting,
// //     },
// //     ref
// //   ) => {
// //     const {
// //       branchOrderNumber,
// //       customerName,
// //       customerMobile,

// //       orderNumber,
// //       paymentType,
// //       createdAt,
// //       tableNumber,
// //       orderType,
// //     } = printData;
// //     return (
// //       <div class="ticket" ref={ref}>
// //         <Header
// //           resName={restaurant}
// //           branchOrderNumber={branchOrderNumber}
// //           orderNumber={orderNumber}
// //           customerName={printSetting.enableCustomer && customerName}
// //           customerMobile={customerMobile}
// //           paymentType={paymentType}
// //           orderDate={createdAt}
// //           tableNumber={tableNumber}
// //           orderType={orderType}
// //           logo={logo}
// //           gstNumber={gstNumber}
// //           branchAddress={branchAddress}
// //         />
// //         {/* <ProductTable printData={printData} /> */}

// //         {receiptMessage && (
// //           <p class="centered">
// //             <p>{receiptMessage}</p>
// //           </p>
// //         )}
// //       </div>
// //     );
// //   }
// // );

// // class BillComponent extends React.Component {
// //   render() {
// //     const {
// //       logo,
// //       customAction,
// //       printData,
// //       count,
// //       restaurant,
// //       gstNumber,
// //       receiptMessage,
// //       branchAddress,
// //       printSetting,
// //     } = this.props;
// //     console.log("printData", printData);
// //     return printData ? (
// //       <Invoice
// //         count={count}
// //         restaurant={restaurant}
// //         printData={printData}
// //         logo={logo}
// //         gstNumber={gstNumber}
// //         receiptMessage={receiptMessage}
// //         branchAddress={branchAddress}
// //         printSetting={printSetting}
// //       />
// //     ) : (
// //       <div className={`invoice-box invoice-box-hide" `}>
// //         No Data found
// //         {/* <SmartTable
// //           showHeader={false}
// //           headerData={tableHeaders}
// //           tableData={data || []}
// //           selectable={false}
// //           small={true}
// //           title={"title"}
// //           showActions={false}
// //           disablePagination
// //           rowsPerPage={data.length}
// //           customAction={customAction}
// //         /> */}
// //       </div>
// //     );
// //   }
// // }
// // export default BillComponent;
