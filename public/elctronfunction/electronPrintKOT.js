const { PosPrinter } = require("electron-pos-printer");
const path = require("path");
const fs = require("fs-extra");
const downloadFile = require("./downloadFile");

const insert = (arr, index, newItem) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];
const commonBordlessTableCellStyle = ({ style, textAlign }) => {
  return `border:1px solid transparent;font-weight:600;text-align:${textAlign};padding-bottom:0px;${style}`;
};
const CURRENCY = "₹";

const renderCurrencyValue = (value) => {
  return `${CURRENCY} ${value}`;
};

const commonBodyHeaderStyle = ({ style, textAlign, width }) => {
  return `text-align:${textAlign};width:${width}%;padding-bottom:5px;padding-top:5px;font-size:12px;text-transform:uppercase;font-weight:600; ${style}`;
};

const commonBodyCellStyle = ({ style, textAlign, width }) => {
  return `text-align:${textAlign};border-bottom:0.1rem solid #aaa;font-weight:600;font-size:11px;color:#000;${style}`;
};

const TYPESOFORDERS = [
  { key: "Dine In", value: 0 },
  { key: "Parcel", value: 1 },
  { key: "Home Delivery", value: 2 },
];

const bodyHeaders = [
  {
    type: "text",
    value: "Sr.",
    style: commonBodyHeaderStyle({ width: 10, textAlign: "left" }),
  },
  {
    type: "text",
    value: "Item.",
    style: commonBodyHeaderStyle({ width: 40, textAlign: "left" }),
  },
  {
    type: "text",
    value: "Qty.",
    style: commonBodyHeaderStyle({ width: 10, textAlign: "right" }),
  },
];

const renderItem = (value, index) => {
  return [
    {
      type: "text",
      value: ++index,
      style: commonBodyCellStyle({ textAlign: "left" }),
    },
    {
      type: "text",
      value: value.itemName,
      style: commonBodyCellStyle({ textAlign: "left" }),
    },

    {
      type: "text",
      value: value.quantity,
      style: commonBodyCellStyle({ textAlign: "right" }),
    },
  ];
};
const electronPrintKOT = async (printdata, printerName) => {
  const remarks = printdata.printData?.remarks;
  const {
    enableLogo,
    enableBranchName,

    enableAddress,
    enableGSTNumber,
    enableCustomer,
  } = printdata?.printSetting;
  const currentOrderType = TYPESOFORDERS.find((types) => {
    return types.value == printdata.printData.orderType;
  });
  const options = {
    preview: false, // Preview in window or print
    width: "250px", //  width of content body
    margin: "0 10px 50px 0", // margin of content body
    copies: 1, // Number of copies to print
    printerName: printerName || "pos", // printerName: string, check it at webContent.getPrinters()
    timeOutPerLine: 500,

    silent: true,
  };
  let extraText = [];
  const renderExtra = (text) => {
    return {
      type: "table",
      // style the table
      // list of the columns to be rendered in the table header
      // multi dimensional array depicting the rows and columns of the table body
      tableBody: [
        [
          {
            type: "text",
            value: text,
            style: `text-align:left; font-weight:600;
                      font-size: 13px;
                     border:1px solid transparent`,
          },
        ],
      ],
    };
  };
  if (remarks) {
    extraText = insert(extraText, 0, renderExtra(`Remarks : ${remarks}`));
  }

  const headerdata = [
    ...(printdata?.restaurant
      ? [
          {
            type: "table",
            // style the table
            // list of the columns to be rendered in the table header
            // multi dimensional array depicting the rows and columns of the table body
            tableBody: [
              [
                {
                  type: "text",
                  value: printdata.restaurant,
                  style: `text-align:center; font-weight:600;
                      font-size: 13px;
                      margin-bottom: 10px;border:1px solid transparent`,
                },
              ],
            ],
          },
        ]
      : []),

    ...(enableAddress && printdata?.branchAddress
      ? [
          {
            type: "table",

            tableBody: [
              [
                {
                  type: "text",
                  value: printdata.branchAddress,
                  style: commonBordlessTableCellStyle({
                    textAlign: "center",
                    color: "black",
                  }),
                },
              ],
            ],
          },
        ]
      : []),
    ...(enableCustomer && printdata.printData?.customerName
      ? [
          {
            type: "table",

            tableBody: [
              [
                {
                  type: "text",
                  value: `Name : ${printdata.printData.customerName} ${
                    printdata.printData?.customerMobile
                      ? `(${printdata.printData?.customerMobile})`
                      : ""
                  }`,
                  style: commonBordlessTableCellStyle({ textAlign: "left" }),
                },
              ],
            ],
          },
        ]
      : []),

    {
      type: "table",
      style: "padding:10px 10px",

      tableBody: [
        [
          {
            type: "text",
            value: printdata.printData.orderDate,
            style: commonBordlessTableCellStyle({
              textAlign: "left",
            }),
          },
          {
            type: "text",
            value: `Token:${printdata.printData.branchOrderNumber}`,
            style: commonBordlessTableCellStyle({ textAlign: "right" }),
          },
        ],
        [
          {
            type: "text",
            value: currentOrderType.key,
            style: commonBordlessTableCellStyle({ textAlign: "left" }),
          },

          {
            type: "text",
            value: printdata.printData.tableNumber
              ? `Table : ${printdata.printData.tableNumber}`
              : "",
            style: commonBordlessTableCellStyle({ textAlign: "right" }),
          },
        ],
      ],
    },
  ];

  let bodydata = [
    {
      type: "table",
      style: "margin-top:5px",

      tableHeader: bodyHeaders,
      tableBody: printdata.printData.orderItems.map((value, index) => {
        return renderItem(value, index);
      }),

      tableHeaderStyle:
        "padding:10px 0px;border-top:1px solid #aaa;font-weight:600;border-bottom:1px solid #aaa;",
    },
  ];
  let footerData = [
    {
      type: "table",
      style: "margin-top:0px",

      tableBody: [
        [
          {
            type: "text",
            value: "TOTAL",
            style:
              "width:60%;text-align:right;border-top:1px solid #aaa;border-bottom:1px solid #aaa;padding:5px 0px;font-weight:600",
          },
          {
            type: "text",
            value: printdata.printData.totalQuantity,
            style:
              "width:40%;text-align:right;border-top:1px solid #aaa;border-bottom:1px solid #aaa;padding:5px 0px;font-weight:600;font-size:14px",
          },
        ],
      ],
    },
  ];

  const d = [...headerdata, ...bodydata, ...footerData, ...extraText];

  return PosPrinter.print(d, options)
    .then(() => {
      return { status: 200 };
    })
    .catch((error) => {
      console.error(error);
      return { status: 400, message: error };
    });
};
module.exports = electronPrintKOT;
