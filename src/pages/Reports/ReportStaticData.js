export default {
  dailyreport: {
    dataType: "order",
    title: "Daily Report",
    headers: [
      { title: "Order Number", key: "orderNumber" },
      { title: "Items", key: "itemsLength" },
      { title: "Amount", key: "grandTotal" },
      { title: "SGST", key: "sgstCharges" },
      { title: "CGST", key: "cgstCharges" },
      { title: "Other Charges", key: "otherCharges" },
    ],
  },

  cashbook: {
    dataType: "iconsgrid",
    title: "Cash Report",

    headers: [
      { title: "Orders", key: "totalOrders", icon: "typcn typcn-printer" },
      {
        title: "Total Order Amount",
        key: "billingAmount",
        icon: "mdi mdi-cart-arrow-right",
      },
      {
        title: "Total Card Amount",
        key: "cardAmount",
        icon: "mdi mdi-cart-arrow-right",
      },
      {
        title: "Total Cash Amount",
        key: "cashAmount",
        icon: "mdi mdi-cart-arrow-right",
      },
      {
        title: "Total Other Amount",
        key: "otherAmount",
        icon: "mdi mdi-cart-arrow-right",
      },
      {
        title: "Discount",
        key: "totalDiscount",
        icon: "mdi mdi-ticket-percent",
      },
      { title: "Tax", key: "totalTax", icon: "mdi mdi-home-currency-usd" },
      { title: "Expenses", key: "totalExpense", icon: "mdi mdi-wallet" },
    ],
  },
};
