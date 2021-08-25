import moment from "moment";
import React from "react";
// import SmartTable from "../../Component/Common/SmartTable";
import { TYPESOFORDERS } from "../../contants/index";
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
    title: "Sub Total",
    hasCurrency: true,
    key: "itemsTotal",
    titleClass: "subtotal",
    valueClass: "subtotalamount",
  },
  {
    // title: "Tax",
    title: "GST",

    hasCurrency: true,
    key: "taxTotal",
    titleClass: "discount",
    valueClass: "discount",
  },

  {
    title: "Discount",
    hasCurrency: true,
    key: "discount",
    titleClass: "discount",
    valueClass: "discount",
  },
  {
    title: "Charges",
    hasCurrency: true,
    key: "otherCharges",
    titleClass: "discount",
    valueClass: "discount",
  },

  {
    title: "Grand Total",
    hasCurrency: true,
    key: "grandTotal",
    titleClass: "grand",
    valueClass: "grandtotal",
  },
];

const Header = ({
  orderNumber,
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
        {logo && <img src={logo} class="logo" />}
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
          <p>{branchOrderNumber}</p>
          <p>{orderDate}</p>
        </div>
        <div className="subinfo">
          <p>{orderTypes.key}</p>
          <p>{orderNumber}</p>

          <p>{tableNumber}</p>

          <p>{paymentType}</p>
        </div>
      </div>
    </>
  );
};

const renderRow = (data, value) => {
  return value ? (
    <tr>
      <td colspan="3" class={data.titleClass}>
        {data.title}
      </td>
      <td colspan="3" class={data.valueClass}>
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
        <td class="price">{value.itemPrice}</td>
        <td class="amount">{value.itemTotal}</td>
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
          <th class="price">Price</th>
          <th class="amount">Amt.</th>
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
      printSetting,
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
    } = orderData;
    return (
      <div class="ticket" ref={ref}>
        <Header
          resName={restaurant}
          branchOrderNumber={branchOrderNumber}
          orderNumber={orderNumber}
          customerName={printSetting.enableCustomer && customerName}
          customerMobile={customerMobile}
          paymentType={paymentType}
          orderDate={createdAt}
          tableNumber={tableNumber}
          orderType={orderType}
          logo={logo}
          gstNumber={gstNumber}
          branchAddress={branchAddress}
        />
        <ProductTable orderData={orderData} />

        {receiptMessage && (
          <p class="centered">
            <p>{receiptMessage}</p>
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
      customAction,
      orderData,
      count,
      restaurant,
      gstNumber,
      receiptMessage,
      branchAddress,
      printSetting,
    } = this.props;
    // console.log("orderData", orderData);
    return orderData ? (
      <Invoice
        count={count}
        restaurant={restaurant}
        orderData={orderData}
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
