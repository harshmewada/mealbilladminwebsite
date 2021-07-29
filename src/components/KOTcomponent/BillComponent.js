import moment from "moment";
import React from "react";
// import SmartTable from "../../Component/Common/SmartTable";
import { DATETIMEFORMAT, TYPESOFORDERS } from "../../contants/index";

import "./invoice.css";
// const printheaders = [
//   { title: "SKU", key: "sku", type: "text", currency: false },
//   { title: " Item", key: "product", type: "text", currency: false },

//   {
//     title: "Unit Price",
//     key: "unitPrice",
//     type: "float",
//   },
//   {
//     title: "Quantity",
//     key: "requestedQuantity",

//     type: "number",
//   },
//   {
//     title: "Discount",
//     key: "discountRate",
//     type: "number",
//   },
//   {
//     title: "Dis.Amount",
//     key: "discountAmount",
//     type: "float",
//   },

//   { title: "Tax Rate", key: "taxRate", type: "float", currency: false },
//   {
//     title: "Tax Amount",
//     key: "taxAmount",
//     type: "float",
//   },
//   {
//     title: "Total",
//     key: "totalAmount",
//     type: "float",
//   },
// ];
const printfooters = [
  {
    title: "Total",
    hasCurrency: false,
    key: "totalQuantity",
    titleClass: "grand",
    valueClass: "grandtotal",
  },
];

const Header = ({
  branchOrderNumber,
  customerName,
  customerMobile,

  resName,
  orderDate,
  paymentType,
  logo,
  tableNumber,
  orderType,
  gstNumber,
  branchAddress,
}) => {
  const orderTypes = TYPESOFORDERS.find((types) => {
    console.log("types", types.value, orderType);
    return types.value == orderType;
  });
  return (
    <>
      <div class="centered">
        <p>{resName}</p>
        {branchAddress && <p class="gstNumber">{branchAddress}</p>}
        {gstNumber && <p class="gstNumber">GST {gstNumber}</p>}
      </div>

      <div className="info">
        {customerName && (
          <div className="subinfo">
            <p>
              Name : {customerName}{" "}
              {customerMobile ? `(${customerMobile})` : ""}
            </p>
          </div>
        )}
        <div className="subinfo">
          <p>{orderDate}</p>

          <p>Token : {branchOrderNumber}</p>
        </div>
        <div className="subinfo">
          <p>{orderTypes.key}</p>

          {tableNumber && <p>Table : {tableNumber}</p>}
        </div>
      </div>
    </>
  );
};

const renderRow = (data, value) => {
  return value ? (
    <tr>
      <td colspan="2" class={data.titleClass}>
        {data.title}
      </td>
      <td colspan="2" class={data.valueClass}>
        {data.hasCurrency ? "₹" : " "} {value}
      </td>
    </tr>
  ) : (
    ""
  );
};

const renderItem = (value, index, i) => {
  return (
    <React.Fragment key={index}>
      <tr>
        <td class="sr">{i}</td>
        <td class="pro">{value.itemName}</td>
        <td class="quantity">{value.quantity}</td>
      </tr>
    </React.Fragment>
  );
};
const ProductTable = ({ orderData }) => {
  return (
    <table class="postable">
      <thead>
        <tr>
          <th class="sr">Sr.</th>
          <th class="pro">Product</th>
          <th class="quantity">Qty</th>
        </tr>
      </thead>
      <tbody>
        {orderData.orderItems.map((value, index) => {
          const i = ++index;
          return renderItem(value, index, i);
        })}

        {printfooters.map((foot, footIndex) =>
          renderRow(foot, orderData[foot.key])
        )}
      </tbody>
    </table>
  );
};

const Invoice = React.forwardRef(
  (
    {
      restaurant,
      orderData,
      count,
      logo,
      gstNumber,
      receiptMessage,
      branchAddress,
    },
    ref
  ) => {
    const {
      branchOrderNumber,
      customerName,
      customerMobile,

      orderNumber,
      paymentType,
      createdAt,
      tableNumber,
      orderType,
      orderDate,
      remarks,
    } = orderData;
    return (
      <div class="ticket" ref={ref}>
        <Header
          resName={restaurant}
          branchOrderNumber={branchOrderNumber}
          orderNumber={orderNumber}
          customerName={customerName}
          customerMobile={customerMobile}
          paymentType={paymentType}
          orderDate={orderDate}
          tableNumber={tableNumber}
          orderType={orderType}
          logo={logo}
          gstNumber={gstNumber}
          branchAddress={branchAddress}
        />
        <ProductTable orderData={orderData} />
        {remarks && (
          <p>
            <p>Remarks : {remarks}</p>
          </p>
        )}
      </div>
    );
  }
);

class BillComponent extends React.Component {
  render() {
    const {
      logo,
      orderData,
      count,
      restaurant,
      gstNumber,
      receiptMessage,
      branchAddress,
    } = this.props;
    return orderData ? (
      <Invoice
        count={count}
        restaurant={restaurant}
        orderData={orderData}
        logo={logo}
        gstNumber={gstNumber}
        receiptMessage={receiptMessage}
        branchAddress={branchAddress}
      />
    ) : (
      <div className={`invoice-box invoice-box-hide" `}>No Data found</div>
    );
  }
}
export default BillComponent;
