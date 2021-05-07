import React from "react";
// import SmartTable from "../../Component/Common/SmartTable";
import "./invoice.css";
const printheaders = [
  { title: "SKU", key: "sku", type: "text", currency: false },
  { title: " Item", key: "product", type: "text", currency: false },

  {
    title: "Unit Price",
    key: "unitPrice",
    type: "float",
  },
  {
    title: "Quantity",
    key: "requestedQuantity",

    type: "number",
  },
  {
    title: "Discount",
    key: "discountRate",
    type: "number",
  },
  {
    title: "Dis.Amount",
    key: "discountAmount",
    type: "float",
  },

  { title: "Tax Rate", key: "taxRate", type: "float", currency: false },
  {
    title: "Tax Amount",
    key: "taxAmount",
    type: "float",
  },
  {
    title: "Total",
    key: "totalAmount",
    type: "float",
  },
];
const printfooters = [
  {
    title: "Total Net Amount",
    hasCurrency: true,
    key: "netAmount",
  },
  {
    title: " Total Tax",
    hasCurrency: true,
    key: "taxAmount",
  },

  {
    title: "Total Discount Amount",
    hasCurrency: true,
    key: "discountAmount",
  },
  {
    title: "Charges",
    hasCurrency: true,
    key: "charges",
  },

  {
    title: "Grand Total",
    hasCurrency: true,
    key: "totalAmount",
  },
];

const Header = ({ invoiceNo, resName, date, custMobile, paymentMethod }) => {
  return (
    <>
      <p class="centered">
        <span>{resName}</span>
      </p>
      <div class="mobile">Invoice No.: {invoiceNo}</div>
      <div class="mobile">Date: {date}</div>
      <div class="mobile">Cust Mobile No. : {custMobile}</div>
      <div class="mobile">Payment by : {paymentMethod}</div>
    </>
  );
};

const tableData = [
  {
    itemName: "Lorem Ipsum is simply dummy text of the ",
    qty: 1,
    price: 1000,
    amount: 2000,
  },
  {
    itemName: "Lorem Ipsum is simply dummy text of the ",
    qty: 1,
    price: 100,
    amount: 100,
  },
  {
    itemName: "Lorem Ipsum is simply dummy text of the ",
    qty: 1,
    price: 100,
    amount: 100,
  },
  {
    itemName: "Lorem Ipsum is simply dummy text of the ",
    qty: 1,
    price: 100,
    amount: 100,
  },
];

const ProductTable = ({
  data,
  subtotal,
  discount,
  othercharges,
  grandtotal,
}) => {
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
        {data.map((value, index) => {
          const i = ++index;
          return (
            <>
              <tr>
                <td class="sr">{i}</td>
                <td class="pro" colspan="5">
                  {value.itemName}
                </td>
              </tr>
              <tr>
                <td class="sr">{i}</td>
                <td class="quantity" colspan="2">
                  {value.qty}
                </td>
                <td class="price">{value.price}</td>
                <td class="amount">{value.amount}</td>
              </tr>
            </>
          );
        })}

        <tr>
          <td colspan="3" class="subtotal">
            Sub Total
          </td>
          <td colspan="3" class="subtotalamount">
            ₹ {subtotal}
          </td>
        </tr>
        <tr>
          <td colspan="3" class="discount">
            Discount
          </td>
          <td colspan="3" class="discount">
            {discount}
          </td>
        </tr>
        <tr>
          <td colspan="3" class="discount">
            Other Charges
          </td>
          <td colspan="3" class="discount">
            ₹ {othercharges}
          </td>
        </tr>
        <tr>
          <td colspan="3" class="grand">
            Grand Total
          </td>
          <td colspan="3" class="grandtotal">
            ₹ {grandtotal}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const Invoice = React.forwardRef((props, ref) => {
  return (
    <div class="ticket" ref={ref}>
      <Header
        resName="KESAV SUPER MARKET"
        invoiceNo="#123456"
        paymentMethod="Cash"
        date="11-11-2021 09:51 PM"
        custMobile="9898989898"
      />
      <ProductTable
        data={tableData}
        subtotal="606"
        discount="10%"
        othercharges="20"
        grandtotal="620"
      />
      <p class="centered">
        <span>thank you, visit us again</span>
      </p>
    </div>
  );
});

class BillComponent extends React.Component {
  render() {
    const {
      headers,
      footers,
      showComponent,
      logo,
      customAction,
      orderData,
    } = this.props;
    const tableHeaders = headers || printheaders;
    const tableFooters = footers || printfooters;

    const data = orderData?.detailList || [];

    const renderRow = (data) => {
      return (
        <tr className="item">
          <td>{data.title}</td>

          <td>
            {data.hasCurrency ? "$" : " "}
            {orderData[data.key]}
          </td>
        </tr>
      );
    };

    return orderData ? (
      <Invoice />
    ) : (
      <div
        className={`invoice-box ${!showComponent ? "invoice-box-hide" : ""}`}
      >
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
