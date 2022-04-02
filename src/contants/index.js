import moment from "moment";
import getCurrency from "../helpers/getCurrency";

//ips
// web  -  3.108.102.23:443
//pre- 3.109.130.95
//TEST -65.1.245.30

export const BASEURL = "https://test.mealbill.in/api";
export const SOCKETURL = "wss://test.mealbill.in";

// export const BASEURL = "https://test.mealbill.in/api";
// export const SOCKETURL = "wss://test.mealbill.in";

// export const BASEURL = "https://pre.mealbill.in/api";
// export const BASEURL = "https://web.mealbill.in/api";

// export const BASEURL = "https://test.mealbill.in/api";
// export const BASEURL = "http://34.202.79.31/api";
// export const BASEURL = "http://localhost:4000";

// export const BASEURL = "http://192.168.0.111:4000";
// export const SOCKETURL = "ws://192.168.0.111:4000";

export const DATEFORMAT = "DD/MM/YYYY";

export const DATETIMEFORMAT = "DD/MM/YYYY HH:mm";
export const TIMEFORMAT = "HH:mm:ss";
export const TIMEONLYFORMAT = "HH:mm";

export const TIMEZONE = "Asia/Kolkata";

export const CURRENCY = getCurrency() || "₹";
export const CURRENCYOPTIONS = [
  { title: "Rupee", value: "₹" },

  { title: "Dollar", value: "$" },
  { title: "Euro", value: "€" },
  { title: "Pound", value: "£" },
  { title: "Riyal", value: "س" },
  { title: "Dirham", value: "د.إ" },
  { title: "Yuan", value: "¥" },
];

export const ONLINE_ORDERING = "onlineOrdering";
export const CONTACT_LESS_ORDERING = "contactLessOrdering";
export const BARCODE_PRODUCTS = "barcodeProducts";
export const BOOKINS_SYSTEM = "bookingSystem";
export const ANALYTICS = "analytics";
export const KITCHEN_DISPLAY = "kitchenDisplay";
export const OFFLINE_SYSTEM = "offlineSystem";
export const BILL_PRINTING = "billPrinting";
export const KOT_PRINTING = "kotPrining";

export const FUNCTIONALITYACCESS = [
  ONLINE_ORDERING,
  CONTACT_LESS_ORDERING,
  BARCODE_PRODUCTS,
  BOOKINS_SYSTEM,
  ANALYTICS,
  KITCHEN_DISPLAY,
  OFFLINE_SYSTEM,
];

export const CURRENCYNAME = CURRENCYOPTIONS.find(
  (val) => val.value === CURRENCY
).title;

export const TYPESOFORDERS = [
  { key: "Dine In", value: 0, bgColor: "#6d81f5" },
  { key: "Parcel", value: 1, bgColor: `rgb(255, 234, 173)` },
  { key: "Home Delivery", value: 2, bgColor: "rgb(198, 255, 186)" },
];

export const ITEMSTATUS = [
  { key: "Kot Pending", value: 0, bgColor: "#fff" },
  { key: "Processing", value: 1, bgColor: `#fcff9c` },
  { key: "Prepared", value: 2, bgColor: "#c9ffb5" },
];
export const MEASUREUNITS = [
  {
    title: "Kg",
    value: "kg",
  },
  {
    title: "Gram",
    value: "g",
  },
  {
    title: "Nos.",
    value: "Nos.",
  },
  {
    title: "Litres",
    value: "l",
  },
];

export const TYPESOFPAYMENTS = [
  { type: "Cash", id: 0, icon: "mdi mdi mdi-cash-100" },

  { type: "Card", id: 1, icon: "mdi mdi-credit-card" },
  { type: "Other", id: 2, icon: "mdi mdi-wallet-outline" },
];

export const MONTHSARRAY = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const SHORTCUTKEYS = [{ key: "Search and add item", value: "CTRL+S" }];
export const EXPENSEPAYMENTTYPES = [
  { key: "Cash", value: 0, bgColor: "#fff" },
  { key: "Bank", value: 1, bgColor: `#f9ff42` },
];

export const BOOKINGSTATUS = [
  { key: "Pending", value: 0, bgColor: "#e8aa00" },
  { key: "Confirmed", value: 1, bgColor: `#20c200` },
  { key: "Canceled", value: 2, bgColor: `#c20000` },
];
export const dateRanges = {
  Today: [moment().toDate(), moment().toDate()],
  Yesterday: [
    moment().subtract(1, "days").toDate(),
    moment().subtract(1, "days").toDate(),
  ],
  "Last 7 Days": [moment().subtract(6, "days").toDate(), moment().toDate()],
  "Last 30 Days": [moment().subtract(29, "days").toDate(), moment().toDate()],
  "This Month": [
    moment().startOf("month").toDate(),
    moment().endOf("month").toDate(),
  ],
  "Last Month": [
    moment().subtract(1, "month").startOf("month").toDate(),
    moment().subtract(1, "month").endOf("month").toDate(),
  ],
};

export const ROLES = {
  superAdmin: "superadmin",
  restaurantAdmin: "restaurantadmin",
  branchAdmin: "branchadmin",
  branchUser: "branchuser",
};

export const SCOPES = {
  ONLINE_ORDERING: "ONLINE_ORDERING",
  CONTACTLESS_ORDERING_SYSTEM: "CONTACTLESS_ORDERING_SYSTEM",
  ITEM_BARCODES: "ITEM_BARCODES",
  BOOKING_SYSTEM: "BOOKING_SYSTEM",
  ANALYTICS: "ANALYTICS",
  KITCHEN_DISPLAY_SYSTEM: "KITCHEN_DISPLAY_SYSTEM",
  OFFLINE: "OFFLINE",
};

export const PERMISSIONS = {
  [ROLES.restaurantAdmin]: Object.values(SCOPES),
  [ROLES.branchAdmin]: Object.values(SCOPES),
  [ROLES.branchUser]: Object.values(SCOPES),
};
