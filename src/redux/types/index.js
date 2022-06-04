import { BASEURL, CURRENCY } from "../../contants";

export const CONTACTUSURL = "https://mealbill.in/contactus";

export const SMALLLOGO = "./images/logo-small.jpg";

export const LOGINBG = "/images/logo-bg.jpg";

// export const RootUrl = "https://api.mealbill.in/";
export const RootUrl = BASEURL;

// export const RootUrl = "http://localhost:4000";
// export const RootUrl = "https://mealbill.in/api";

let primary = {
  light: "#FFB2A4",
  main: "#F0583C",
  dark: "#e63f20",
};

const secondary = {
  light: "#4c6a85",
  main: "#1C2B38",
  dark: "#11212e",
};

export const userTypes = {
  EXPIRED_SUBSCRIPTION: "EXPIRED_SUBSCRIPTION",

  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_FAIL: "FORGOT_PASSWORD_FAIL",

  LOGIN_USER: "LOGIN_USER",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",
  LOGIN_USER_FAIL: "LOGIN_USER_FAIL",

  LOGOUT_USER: "LOGOUT_USER",

  REGISTER_USER: "REGISTER_USER",
  REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS",
  REGISTER_USER_FAIL: "REGISTER_USER_FAIL",

  GET_USER_DETAILS: "GET_USER_DETAILS",
  GET_USER_DETAILS_SUCCESS: "GET_USER_DETAILS_SUCCESS",
  GET_USER_DETAILS_FAIL: "GET_USER_DETAILS_FAIL",

  CREATE_USER: "CREATE_USER",
  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_FAIL: "CREATE_USER_FAIL",

  UPDATE_USER: "UPDATE_USER",
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAIL: "UPDATE_USER_FAIL",

  GET_ALL_USERS: "GET_ALL_USERS",
  GET_ALL_USERS_SUCCESS: "GET_ALL_USERS_SUCCESS",
  GET_ALL_USERS_FAIL: "GET_ALL_USERS_FAIL",

  DELETE_USER: "DELETE_USER",
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAIL: "DELETE_USER_FAIL",
  CLOSE_MODAL: "CLOSE_MODAL",
};

export const restaurantTypes = {
  CHANGE_PERMISSIONS: "CHANGE_PERMISSIONS",
  CHANGE_PERMISSIONS_SUCCESS: "CHANGE_PERMISSIONS_SUCCESS",
  CHANGE_PERMISSIONS_FAIL: "CHANGE_PERMISSIONS_FAIL",

  CREATE_RESTAURANT: "CREATE_RESTAURANT",
  CREATE_RESTAURANT_SUCCESS: "CREATE_RESTAURANT_SUCCESS",
  CREATE_RESTAURANT_FAIL: "CREATE_RESTAURANT_FAIL",

  ASSIGN_RESTAURANT_SUBSCRIPTION: "ASSIGN_RESTAURANT_SUBSCRIPTION",
  ASSIGN_RESTAURANT_SUBSCRIPTION_SUCCESS:
    "ASSIGN_RESTAURANT_SUBSCRIPTION_SUCCESS",
  ASSIGN_RESTAURANT_SUBSCRIPTION_FAIL: "ASSIGN_RESTAURANT_SUBSCRIPTION_FAIL",

  REMOVE_RESTAURANT_SUBSCRIPTION: "REMOVE_RESTAURANT_SUBSCRIPTION",
  REMOVE_RESTAURANT_SUBSCRIPTION_SUCCESS:
    "REMOVE_RESTAURANT_SUBSCRIPTION_SUCCESS",
  REMOVE_RESTAURANT_SUBSCRIPTION_FAIL: "REMOVE_RESTAURANT_SUBSCRIPTION_FAIL",

  CREATE_BRANCH: "CREATE_BRANCH",
  CREATE_BRANCH_SUCCESS: "CREATE_BRANCH_SUCCESS",
  CREATE_BRANCH_FAIL: "CREATE_BRANCH_FAIL",

  UPDATE_RESTAURANT: "UPDATE_RESTAURANT",
  UPDATE_RESTAURANT_SUCCESS: "UPDATE_RESTAURANT_SUCCESS",
  UPDATE_RESTAURANT_FAIL: "UPDATE_RESTAURANT_FAIL",

  UPDATE_BRANCH: "UPDATE_BRANCH",
  UPDATE_BRANCH_SUCCESS: "UPDATE_BRANCH_SUCCESS",
  UPDATE_BRANCH_FAIL: "UPDATE_BRANCH_FAIL",

  GET_ALL_RESTAURANTS: "GET_ALL_RESTAURANTS",
  GET_ALL_RESTAURANTS_SUCCESS: "GET_ALL_RESTAURANTS_SUCCESS",
  GET_ALL_RESTAURANTS_FAIL: "GET_ALL_RESTAURANTS_FAIL",

  DELETE_RESTAURANT: "DELETE_RESTAURANT",
  DELETE_RESTAURANT_SUCCESS: "DELETE_RESTAURANT_SUCCESS",
  DELETE_RESTAURANT_FAIL: "DELETE_RESTAURANT_FAIL",

  DELETE_BRANCH: "DELETE_BRANCH",
  DELETE_BRANCH_SUCCESS: "DELETE_BRANCH_SUCCESS",
  DELETE_BRANCH_FAIL: "DELETE_BRANCH_FAIL",

  // REGISTER_USER: "REGISTER_USER",
  // REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS",
  // REGISTER_USER_FAIL: "REGISTER_USER_FAIL",

  // GET_USER_DETAILS: "GET_USER_DETAILS",
  // GET_USER_DETAILS_SUCCESS: "GET_USER_DETAILS_SUCCESS",
  // GET_USER_DETAILS_FAIL: "GET_USER_DETAILS_FAIL",
  CLOSE_MODAL: "CLOSE_MODAL",

  CREATE_RESTAURANT_ITEMS: "CREATE_RESTAURANT_ITEMS",
  CREATE_RESTAURANT_ITEMS_SUCCESS: "CREATE_RESTAURANT_ITEMS_SUCCESS",
  CREATE_RESTAURANT_ITEMS_FAIL: "CREATE_RESTAURANT_ITEMS_FAIL",

  GET_ALL_RESTAURANT_ITEMS: "GET_ALL_RESTAURANT_ITEMS",
  GET_ALL_RESTAURANT_ITEMS_SUCCESS: "GET_ALL_RESTAURANT_ITEMS_SUCCESS",
  GET_ALL_RESTAURANT_ITEMS_FAIL: "GET_ALL_RESTAURANT_ITEMS_FAIL",

  UPDATE_RESTAURANT_ITEMS: "UPDATE_RESTAURANT_ITEMS",
  UPDATE_RESTAURANT_ITEMS_SUCCESS: "UPDATE_RESTAURANT_ITEMS_SUCCESS",
  UPDATE_RESTAURANT_ITEMS_FAIL: "UPDATE_RESTAURANT_ITEMS_FAIL",

  DELETE_RESTAURANT_ITEMS: "DELETE_RESTAURANT_ITEMS",
  DELETE_RESTAURANT_ITEMS_SUCCESS: "DELETE_RESTAURANT_ITEMS_SUCCESS",
  DELETE_RESTAURANT_ITEMS_FAIL: "DELETE_RESTAURANT_ITEMS_FAIL",
};

export const categoryTypes = {
  CREATE_CATEGORY_TYPE: "CREATE_CATEGORY_TYPE",
  CREATE_CATEGORY_TYPE_SUCCESS: "CREATE_CATEGORY_TYPE_SUCCESS",
  CREATE_CATEGORY_TYPE_FAIL: "CREATE_CATEGORY_TYPE_FAIL",

  IMPORT_CATEGORY: "IMPORT_CATEGORY",
  IMPORT_CATEGORY_SUCCESS: "IMPORT_CATEGORY_SUCCESS",
  IMPORT_CATEGORY_FAIL: "IMPORT_CATEGORY_FAIL",

  UPDATE_CATEGORY_TYPE: "UPDATE_CATEGORY_TYPE",
  UPDATE_CATEGORY_TYPE_SUCCESS: "UPDATE_CATEGORY_TYPE_SUCCESS",
  UPDATE_CATEGORY_TYPE_FAIL: "UPDATE_CATEGORY_TYPE_FAIL",

  GET_ALL_CATEGORY_TYPES: "GET_ALL_CATEGORY_TYPES",
  GET_ALL_CATEGORY_TYPES_SUCCESS: "GET_ALL_CATEGORY_TYPES_SUCCESS",
  GET_ALL_CATEGORY_TYPES_FAIL: "GET_ALL_CATEGORY_TYPES_FAIL",

  DELETE_CATEGORY_TYPE: "DELETE_CATEGORY_TYPE",
  DELETE_CATEGORY_TYPE_SUCCESS: "DELETE_CATEGORY_TYPE_SUCCESS",
  DELETE_CATEGORY_TYPE_FAIL: "DELETE_CATEGORY_TYPE_FAIL",

  CREATE_CATEGORY: "CREATE_CATEGORY",
  CREATE_CATEGORY_SUCCESS: "CREATE_CATEGORY_SUCCESS",
  CREATE_CATEGORY_FAIL: "CREATE_CATEGORY_FAIL",

  UPDATE_CATEGORY: "UPDATE_CATEGORY",
  UPDATE_CATEGORY_SUCCESS: "UPDATE_CATEGORY_SUCCESS",
  UPDATE_CATEGORY_FAIL: "UPDATE_CATEGORY_FAIL",

  GET_ALL_CATEGORYES: "GET_ALL_CATEGORYES",
  GET_ALL_CATEGORYES_SUCCESS: "GET_ALL_CATEGORYES_SUCCESS",
  GET_ALL_CATEGORYES_FAIL: "GET_ALL_CATEGORYES_FAIL",

  GET_RESTAURANT_CATEGORIES: "GET_RESTAURANT_CATEGORIES",
  GET_RESTAURANT_CATEGORIES_SUCCESS: "GET_RESTAURANT_CATEGORIES_SUCCESS",
  GET_RESTAURANT_CATEGORIES_FAIL: "GET_RESTAURANT_CATEGORIES_FAIL",

  GET_BRANCH_CATEGORIES: "GET_BRANCH_CATEGORIES",
  GET_BRANCH_CATEGORIES_SUCCESS: "GET_BRANCH_CATEGORIES_SUCCESS",
  GET_BRANCH_CATEGORIES_FAIL: "GET_BRANCH_CATEGORIES_FAIL",

  DELETE_CATEGORY: "DELETE_CATEGORY",
  DELETE_CATEGORY_SUCCESS: "DELETE_CATEGORY_SUCCESS",
  DELETE_CATEGORY_FAIL: "DELETE_CATEGORY_FAIL",
};

export const itemTypes = {
  CLEAR_ITEMS: "CLEAR_ITEMS",

  CREATE_ITEM: "CREATE_ITEM",
  CREATE_ITEM_SUCCESS: "CREATE_ITEM_SUCCESS",
  CREATE_ITEM_FAIL: "CREATE_ITEM_FAIL",

  IMPORT_ITEMS: "IMPORT_ITEMS",
  IMPORT_ITEMS_SUCCESS: "IMPORT_ITEMS_SUCCESS",
  IMPORT_ITEMS_FAIL: "IMPORT_ITEMS_FAIL",

  UPDATE_ITEM: "UPDATE_ITEM",
  UPDATE_ITEM_SUCCESS: "UPDATE_ITEM_SUCCESS",
  UPDATE_ITEM_FAIL: "UPDATE_ITEM_FAIL",

  UPDATE_ITEM_RAW_MATERIAL: "UPDATE_ITEM_RAW_MATERIAL",
  UPDATE_ITEM_RAW_MATERIAL_SUCCESS: "UPDATE_ITEM_RAW_MATERIAL_SUCCESS",
  UPDATE_ITEM_RAW_MATERIAL_FAIL: "UPDATE_ITEM_RAW_MATERIAL_FAIL",

  GET_RESTAURANT_ITEMS: "GET_RESTAURANT_ITEMS",
  GET_RESTAURANT_ITEMS_SUCCESS: "GET_RESTAURANT_ITEMS_SUCCESS",
  GET_RESTAURANT_ITEMS_FAIL: "GET_RESTAURANT_ITEMS_FAIL",

  GET_BRANCH_ITEMS: "GET_BRANCH_ITEMS",
  GET_BRANCH_ITEMS_SUCCESS: "GET_BRANCH_ITEMS_SUCCESS",
  GET_BRANCH_ITEMS_FAIL: "GET_BRANCH_ITEMS_FAIL",

  DELETE_ITEM: "DELETE_ITEM",
  DELETE_ITEM_SUCCESS: "DELETE_ITEM_SUCCESS",
  DELETE_ITEM_FAIL: "DELETE_ITEM_FAIL",

  BULK_UPLOAD_ITEMS: "BULK_UPLOAD_ITEMS",
  BULK_UPLOAD_ITEMS_SUCCESS: "BULK_UPLOAD_ITEMS_SUCCESS",
  BULK_UPLOAD_ITEMS_FAIL: "BULK_UPLOAD_ITEMS_FAIL",
};

export const rawMaterialTypes = {
  GET_ALL_RAW_MATERIAL: "GET_ALL_RAW_MATERIAL",
  GET_ALL_RAW_MATERIAL_SUCCESS: "GET_ALL_RAW_MATERIAL_SUCCESS",
  GET_ALL_RAW_MATERIAL_FAIL: "GET_ALL_RAW_MATERIAL_FAIL",

  CREATE_RAW_MATERIAL: "CREATE_RAW_MATERIAL",
  CREATE_RAW_MATERIAL_SUCCESS: "CREATE_RAW_MATERIAL_SUCCESS",
  CREATE_RAW_MATERIAL_FAIL: "CREATE_RAW_MATERIAL_FAIL",

  UPDATE_RAW_MATERIAL: "UPDATE_RAW_MATERIAL",
  UPDATE_RAW_MATERIAL_SUCCESS: "UPDATE_RAW_MATERIAL_SUCCESS",
  UPDATE_RAW_MATERIAL_FAIL: "UPDATE_RAW_MATERIAL_FAIL",

  DELETE_RAW_MATERIAL: "DELETE_RAW_MATERIAL",
  DELETE_RAW_MATERIAL_SUCCESS: "DELETE_RAW_MATERIAL_SUCCESS",
  DELETE_RAW_MATERIAL_FAIL: "DELETE_RAW_MATERIAL_FAIL",
};

export const itemVariantTypes = {
  GET_ALL_ITEM_VARIANTS: "GET_ALL_ITEM_VARIANTS",
  GET_ALL_ITEM_VARIANTS_SUCCESS: "GET_ALL_ITEM_VARIANTS_SUCCESS",
  GET_ALL_ITEM_VARIANTS_FAIL: "GET_ALL_ITEM_VARIANTS_FAIL",

  CREATE_ITEM_VARIANTS: "CREATE_ITEM_VARIANTS",
  CREATE_ITEM_VARIANTS_SUCCESS: "CREATE_ITEM_VARIANTS_SUCCESS",
  CREATE_ITEM_VARIANTS_FAIL: "CREATE_ITEM_VARIANTS_FAIL",

  UPDATE_ITEM_VARIANTS: "UPDATE_ITEM_VARIANTS",
  UPDATE_ITEM_VARIANTS_SUCCESS: "UPDATE_ITEM_VARIANTS_SUCCESS",
  UPDATE_ITEM_VARIANTS_FAIL: "UPDATE_ITEM_VARIANTS_FAIL",

  DELETE_ITEM_VARIANTS: "DELETE_ITEM_VARIANTS",
  DELETE_ITEM_VARIANTS_SUCCESS: "DELETE_ITEM_VARIANTS_SUCCESS",
  DELETE_ITEM_VARIANTS_FAIL: "DELETE_ITEM_VARIANTS_FAIL",
};

export const hotKeyTypes = {
  CREATE_HOTKEY: "CREATE_HOTKEY",
  CREATE_HOTKEY_SUCCESS: "CREATE_HOTKEY_SUCCESS",
  CREATE_HOTKEY_FAIL: "CREATE_HOTKEY_FAIL",

  UPDATE_HOTKEY: "UPDATE_HOTKEY",
  UPDATE_HOTKEY_SUCCESS: "UPDATE_HOTKEY_SUCCESS",
  UPDATE_HOTKEY_FAIL: "UPDATE_HOTKEY_FAIL",

  GET_ALL_HOTKEYS: "GET_ALL_HOTKEYS",
  GET_ALL_HOTKEYS_SUCCESS: "GET_ALL_HOTKEYS_SUCCESS",
  GET_ALL_HOTKEYS_FAIL: "GET_ALL_HOTKEYS_FAIL",

  DELETE_HOTKEY: "DELETE_HOTKEY",
  DELETE_HOTKEY_SUCCESS: "DELETE_HOTKEY_SUCCESS",
  DELETE_HOTKEY_FAIL: "DELETE_HOTKEY_FAIL",
};
export const branchTypes = {
  CREATE_BRANCH: "CREATE_BRANCH",
  CREATE_BRANCH_SUCCESS: "CREATE_BRANCH_SUCCESS",
  CREATE_BRANCH_FAIL: "CREATE_BRANCH_FAIL",

  UPDATE_BRANCH: "UPDATE_BRANCH",
  UPDATE_BRANCH_SUCCESS: "UPDATE_BRANCH_SUCCESS",
  UPDATE_BRANCH_FAIL: "UPDATE_BRANCH_FAIL",

  GET_ALL_BRANCHES: "GET_ALL_BRANCHES",
  GET_ALL_BRANCHES_SUCCESS: "GET_ALL_BRANCHES_SUCCESS",
  GET_ALL_BRANCHES_FAIL: "GET_ALL_BRANCHES_FAIL",

  DELETE_BRANCH: "DELETE_BRANCH",
  DELETE_BRANCH_SUCCESS: "DELETE_BRANCH_SUCCESS",
  DELETE_BRANCH_FAIL: "DELETE_BRANCH_FAIL",

  CLOSE_MODAL: "CLOSE_MODAL",

  DELETE_RECEIPT_MESSAGE: "DELETE_RECEIPT_MESSAGE",
  DELETE_RECEIPT_MESSAGE_SUCCESS: "DELETE_RECEIPT_MESSAGE_SUCCESS",
  DELETE_RECEIPT_MESSAGE_FAIL: "DELETE_RECEIPT_MESSAGE_FAIL",

  UPDATE_RECEIPT_MESSAGE: "UPDATE_RECEIPT_MESSAGE",
  UPDATE_RECEIPT_MESSAGE_SUCCESS: "UPDATE_RECEIPT_MESSAGE_SUCCESS",
  UPDATE_RECEIPT_MESSAGE_FAIL: "UPDATE_RECEIPT_MESSAGE_FAIL",
};

export const tableTypes = {
  CREATE_TABLETYPE: "CREATE_TABLETYPE",
  CREATE_TABLETYPE_SUCCESS: "CREATE_TABLETYPE_SUCCESS",
  CREATE_TABLETYPE_FAIL: "CREATE_TABLETYPE_FAIL",

  UPDATE_TABLETYPE: "UPDATE_TABLETYPE",
  UPDATE_TABLETYPE_SUCCESS: "UPDATE_TABLETYPE_SUCCESS",
  UPDATE_TABLETYPE_FAIL: "UPDATE_TABLETYPE_FAIL",

  GET_ALL_TABLETYPES: "GET_ALL_TABLETYPES",
  GET_ALL_TABLETYPES_SUCCESS: "GET_ALL_TABLETYPES_SUCCESS",
  GET_ALL_TABLETYPES_FAIL: "GET_ALL_TABLETYPES_FAIL",

  DELETE_TABLETYPE: "DELETE_TABLETYPE",
  DELETE_TABLETYPE_SUCCESS: "DELETE_TABLETYPE_SUCCESS",
  DELETE_TABLETYPE_FAIL: "DELETE_TABLETYPE_FAIL",

  CREATE_TABLE: "CREATE_TABLE",
  CREATE_TABLE_SUCCESS: "CREATE_TABLE_SUCCESS",
  CREATE_TABLE_FAIL: "CREATE_TABLE_FAIL",

  UPDATE_TABLE: "UPDATE_TABLE",
  UPDATE_TABLE_SUCCESS: "UPDATE_TABLE_SUCCESS",
  UPDATE_TABLE_FAIL: "UPDATE_TABLE_FAIL",

  GET_ALL_TABLES: "GET_ALL_TABLES",
  GET_ALL_TABLES_SUCCESS: "GET_ALL_TABLES_SUCCESS",
  GET_ALL_TABLES_FAIL: "GET_ALL_TABLES_FAIL",

  DELETE_TABLE: "DELETE_TABLE",
  DELETE_TABLE_SUCCESS: "DELETE_TABLE_SUCCESS",
  DELETE_TABLE_FAIL: "DELETE_TABLE_FAIL",

  CLOSE_MODAL: "CLOSE_MODAL",
};

export const expenseTypes = {
  IMPORT_EXPENSETYPES: "IMPORT_EXPENSETYPES",
  IMPORT_EXPENSETYPES_SUCCESS: "IMPORT_EXPENSETYPES_SUCCESS",
  IMPORT_EXPENSETYPES_FAIL: "IMPORT_EXPENSETYPES_FAIL",

  CREATE_EXPENSE_TYPE: "CREATE_EXPENSE_TYPE",
  CREATE_EXPENSE_TYPE_SUCCESS: "CREATE_EXPENSE_TYPE_SUCCESS",
  CREATE_EXPENSE_TYPE_FAIL: "CREATE_EXPENSE_TYPE_FAIL",

  UPDATE_EXPENSE_TYPE: "UPDATE_EXPENSE_TYPE",
  UPDATE_EXPENSE_TYPE_SUCCESS: "UPDATE_EXPENSE_TYPE_SUCCESS",
  UPDATE_EXPENSE_TYPE_FAIL: "UPDATE_EXPENSE_TYPE_FAIL",

  UPDATE_SUB_EXPENSE_TYPE: "UPDATE_SUB_EXPENSE_TYPE",
  UPDATE_SUB_EXPENSE_TYPE_SUCCESS: "UPDATE_SUB_EXPENSE_TYPE_SUCCESS",
  UPDATE_SUB_EXPENSE_TYPE_FAIL: "UPDATE_SUB_EXPENSE_TYPE_FAIL",

  GET_ALL_EXPENSE_TYPES: "GET_ALL_EXPENSE_TYPES",
  GET_ALL_EXPENSE_TYPES_SUCCESS: "GET_ALL_EXPENSE_TYPES_SUCCESS",
  GET_ALL_EXPENSE_TYPES_FAIL: "GET_ALL_EXPENSE_TYPES_FAIL",

  GET_RESTAURANT_EXPENSE_TYPES: "GET_RESTAURANT_EXPENSE_TYPES",
  GET_RESTAURANT_EXPENSE_TYPES_SUCCESS: "GET_RESTAURANT_EXPENSE_TYPES_SUCCESS",
  GET_RESTAURANT_EXPENSE_TYPES_FAIL: "GET_RESTAURANT_EXPENSE_TYPES_FAIL",

  DELETE_EXPENSE_TYPE: "DELETE_EXPENSE_TYPE",
  DELETE_EXPENSE_TYPE_SUCCESS: "DELETE_EXPENSE_TYPE_SUCCESS",
  DELETE_EXPENSE_TYPE_FAIL: "DELETE_EXPENSE_TYPE_FAIL",

  CREATE_EXPENSE: "CREATE_EXPENSE",
  CREATE_EXPENSE_SUCCESS: "CREATE_EXPENSE_SUCCESS",
  CREATE_EXPENSE_FAIL: "CREATE_EXPENSE_FAIL",

  UPDATE_EXPENSE: "UPDATE_EXPENSE",
  UPDATE_EXPENSE_SUCCESS: "UPDATE_EXPENSE_SUCCESS",
  UPDATE_EXPENSE_FAIL: "UPDATE_EXPENSE_FAIL",

  GET_ALL_EXPENSES: "GET_ALL_EXPENSES",
  GET_ALL_EXPENSES_SUCCESS: "GET_ALL_EXPENSES_SUCCESS",
  GET_ALL_EXPENSES_FAIL: "GET_ALL_EXPENSES_FAIL",

  DELETE_EXPENSE: "DELETE_EXPENSE",
  DELETE_EXPENSE_SUCCESS: "DELETE_EXPENSE_SUCCESS",
  DELETE_EXPENSE_FAIL: "DELETE_EXPENSE_FAIL",

  CLOSE_MODAL: "CLOSE_MODAL",
};

export const utilTypes = {
  GET_ALL_THEMES: "GET_ALL_THEMES",
  GET_ALL_THEMES_SUCCESS: "GET_ALL_THEMES_SUCCESS",
  GET_ALL_THEMES_FAIL: "GET_ALL_THEMES_FAIL",

  ADD_NEW_THEME: "ADD_NEW_THEME",
  ADD_NEW_THEME_SUCCESS: "ADD_NEW_THEME_SUCCESS",
  ADD_NEW_THEME_FAIL: "ADD_NEW_THEME_FAIL",

  REMOVE_THEME: "REMOVE_THEME",
  REMOVE_THEME_SUCCESS: "REMOVE_THEME_SUCCESS",
  REMOVE_THEME_FAIL: "REMOVE_THEME_FAIL",

  UPDATE_THEME: "UPDATE_THEME",
  UPDATE_THEME_SUCCESS: "UPDATE_THEME_SUCCESS",
  UPDATE_THEME_FAIL: "UPDATE_THEME_FAIL",

  TOGGLE_DRAWER: "TOGGLE_DRAWER",

  TOGGLE_PRINTING: "TOGGLE_PRINTING",

  TOGGLE_PRINTING_SETTING: "TOGGLE_PRINTING_SETTING",
  TOGGLE_PRINTING_SETTING_SUCCESS: "TOGGLE_PRINTING_SETTING_SUCCESS",
  TOGGLE_PRINTING_SETTING_FAIL: "TOGGLE_PRINTING_SETTING_FAIL",

  TOGGLE_KOT: "TOGGLE_KOT",

  SET_PRINTING: "SET_PRINTING",

  SET_KOT: "SET_KOT",

  SET_PRINT_DATA: "SET_PRINT_DATA",

  SET_KOT_PRINT_DATA: "SET_KOT_PRINT_DATA",

  REMOVE_PRINT_DATA: "REMOVE_PRINT_DATA",

  REMOVE_KOT_PRINT_DATA: "REMOVE_KOT_PRINT_DATA",

  TOGGLE_FULL_SCREEN: "TOGGLE_FULL_SCREEN",

  OPEN_COMMON_PAGE_MODAL: "OPEN_COMMON_PAGE_MODAL",

  CLOSE_COMMON_PAGE_MODAL: "CLOSE_COMMON_PAGE_MODAL",

  SET_CURRENT_GRAM: "SET_CURRENT_GRAM",
  SET_CURRENT_GRAM_SUCCESS: "SET_CURRENT_GRAM_SUCCESS",
  SET_CURRENT_GRAM_FAIL: "SET_CURRENT_GRAM_FAIL",
  // REGISTER_USER: "REGISTER_USER",
  // REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS",
  // REGISTER_USER_FAIL: "REGISTER_USER_FAIL",

  // GET_USER_DETAILS: "GET_USER_DETAILS",
  // GET_USER_DETAILS_SUCCESS: "GET_USER_DETAILS_SUCCESS",
  // GET_USER_DETAILS_FAIL: "GET_USER_DETAILS_FAIL",
  TOGGLE_ADVERTISEMENT: "TOGGLE_ADVERTISEMENT",

  SOCKET_CONNECTED: "SOCKET_CONNECTED",
};

export const commonTypes = {
  GET_ALL_TABLETYPES: "GET_ALL_TABLETYPES",
  GET_ALL_TABLETYPES_SUCCESS: "GET_ALL_TABLETYPES_SUCCESS",
  GET_ALL_TABLETYPES_FAIL: "GET_ALL_TABLETYPES_FAIL",

  ADD_NEW_TABLETYPE: "ADD_NEW_TABLETYPE",
  ADD_NEW_TABLETYPE_SUCCESS: "ADD_NEW_TABLETYPE_SUCCESS",
  ADD_NEW_TABLETYPE_FAIL: "ADD_NEW_TABLETYPE_FAIL",

  REMOVE_TABLETYPE: "REMOVE_TABLETYPE",
  REMOVE_TABLETYPE_SUCCESS: "REMOVE_TABLETYPE_SUCCESS",
  REMOVE_TABLETYPE_FAIL: "REMOVE_TABLETYPE_FAIL",

  UPDATE_TABLETYPE: "UPDATE_TABLETYPE",
  UPDATE_TABLETYPE_SUCCESS: "UPDATE_TABLETYPE_SUCCESS",
  UPDATE_TABLETYPE_FAIL: "UPDATE_TABLETYPE_FAIL",

  GET_ALL_THEMES: "GET_ALL_THEMES",
  GET_ALL_THEMES_SUCCESS: "GET_ALL_THEMES_SUCCESS",
  GET_ALL_THEMES_FAIL: "GET_ALL_THEMES_FAIL",

  ADD_NEW_THEME: "ADD_NEW_THEME",
  ADD_NEW_THEME_SUCCESS: "ADD_NEW_THEME_SUCCESS",
  ADD_NEW_THEME_FAIL: "ADD_NEW_THEME_FAIL",

  REMOVE_THEME: "REMOVE_THEME",
  REMOVE_THEME_SUCCESS: "REMOVE_THEME_SUCCESS",
  REMOVE_THEME_FAIL: "REMOVE_THEME_FAIL",

  UPDATE_THEME: "UPDATE_THEME",
  UPDATE_THEME_SUCCESS: "UPDATE_THEME_SUCCESS",
  UPDATE_THEME_FAIL: "UPDATE_THEME_FAIL",

  GET_ALL_SUBSCRIPTIONS: "GET_ALL_SUBSCRIPTIONS",
  GET_ALL_SUBSCRIPTIONS_SUCCESS: "GET_ALL_SUBSCRIPTIONS_SUCCESS",
  GET_ALL_SUBSCRIPTIONS_FAIL: "GET_ALL_SUBSCRIPTIONS_FAIL",

  ADD_NEW_SUBSCRIPTION: "ADD_NEW_SUBSCRIPTION",
  ADD_NEW_SUBSCRIPTION_SUCCESS: "ADD_NEW_SUBSCRIPTION_SUCCESS",
  ADD_NEW_SUBSCRIPTION_FAIL: "ADD_NEW_SUBSCRIPTION_FAIL",

  REMOVE_SUBSCRIPTION: "REMOVE_SUBSCRIPTION",
  REMOVE_SUBSCRIPTION_SUCCESS: "REMOVE_SUBSCRIPTION_SUCCESS",
  REMOVE_SUBSCRIPTION_FAIL: "REMOVE_SUBSCRIPTION_FAIL",

  UPDATE_SUBSCRIPTION: "UPDATE_SUBSCRIPTION",
  UPDATE_SUBSCRIPTION_SUCCESS: "UPDATE_SUBSCRIPTION_SUCCESS",
  UPDATE_SUBSCRIPTION_FAIL: "UPDATE_SUBSCRIPTION_FAIL",
};

export const orderTypes = {
  CLEAR_STUCK_ORDERS: "CLEAR_STUCK_ORDERS",
  CLEAR_STUCK_ORDERS_SUCCESS: "CLEAR_STUCK_ORDERS_SUCCESS",
  CLEAR_STUCK_ORDERS_FAIL: "CLEAR_STUCK_ORDERS_FAIL",

  GET_SOCKET_ORDERS: "GET_SOCKET_ORDERS",

  ACTIVATE_TABLE_TYPE: "ACTIVATE_TABLE_TYPE",

  GET_SOCKET_ORDERS_SUCCESS: "GET_SOCKET_ORDERS_SUCCESS",

  INCREMENT_ORDER_NUMBER_COUNT: "INCREMENT_ORDER_NUMBER_COUNT",

  GET_SOKCET_ORDERS_FAIL: "GET_SOKCET_ORDERS_FAIL",

  SET_ORDER_TO_EDIT: "SET_ORDER_TO_EDIT",

  PRE_PRINT_ORDER: "PRE_PRINT_ORDER",

  SET_OTHER_CHARGES: "SET_OTHER_CHARGES",
  SET_DISCOUNT: "SET_DISCOUNT",

  SET_ORDER_TYPE: "SET_ORDER_TYPE",

  SET_KOT_ITEMS: "SET_KOT_ITEMS",
  SET_KOT_ITEMS_SOCKET: "SET_KOT_ITEMS_SOCKET",

  ACTIVATE_TABLE: "ACTIVATE_TABLE",
  ACTIVATE_ORDER: "ACTIVATE_ORDER",

  ACTIVATE_ORDER_SOCKET: "ACTIVATE_ORDER_SOCKET",

  ADD_OTHER_ORDER_TYPE: "ADD_OTHER_ORDER_TYPE",

  SET_ACTIVE_ORDER: "SET_ACTIVE_ORDER",

  PUSH_ITEM_TO_ORDER: "PUSH_ITEM_TO_ORDER",
  PUSH_ITEM_TO_ORDER_SOCKET: "PUSH_ITEM_TO_ORDER_SOCKET",

  PUSH_ITEM_VARIANT_TO_ORDER: "PUSH_ITEM_VARIANT_TO_ORDER",

  CHANGE_ITEM_QUANTITY: "CHANGE_ITEM_QUANTITY",

  REMOVE_ITEM: "REMOVE_ITEM",

  DELETE_LOCAL_ORDER: "DELETE_LOCAL_ORDER",

  CONFIRM_ORDER: "CONFIRM_ORDER",
  CONFIRM_ORDER_SUCCESS: "CONFIRM_ORDER_SUCCESS",
  CONFIRM_ORDER_FAIL: "CONFIRM_ORDER_FAIL",

  PRINT_ORDER: "PRINT_ORDER",

  EDIT_ORDER: "EDIT_ORDER",
  EDIT_ORDER_SUCCESS: "EDIT_ORDER_SUCCESS",
  EDIT_ORDER_FAIL: "EDIT_ORDER_FAIL",

  UPDATE_ORDER: "UPDATE_ORDER",
  UPDATE_ORDER_SUCCESS: "UPDATE_ORDER_SUCCESS",
  UPDATE_ORDER_FAIL: "UPDATE_ORDER_FAIL",

  GET_PREVIOS_ORDERS: "GET_PREVIOS_ORDERS",
  GET_PREVIOS_ORDERS_SUCCESS: "GET_PREVIOS_ORDERS_SUCCESS",
  GET_PREVIOS_ORDERS_FAIL: "GET_PREVIOS_ORDERS_FAIL",

  SET_ITEM_AS_PREPARED: "SET_ITEM_AS_PREPARED",
  SET_ITEM_AS_PREPARED_SOCKET: "SET_ITEM_AS_PREPARED_SOCKET",
};

export const reportTypes = {
  GET_REPORT: "GET_REPORT",
  GET_REPORT_SUCCESS: "GET_REPORT_SUCCESS",
  GET_REPORT_FAIL: "GET_REPORT_FAIL",
};

export const dashboardTypes = {
  GET_DASHBOARD: "GET_DASHBOARD",
  GET_DASHBOARD_SUCCESS: "GET_DASHBOARD_SUCCESS",
  GET_DASHBOARD_FAIL: "GET_DASHBOARD_FAIL",
};

export const bookingTypes = {
  CREATE_BOOKING_EVENT: "CREATE_BOOKING_EVENT",
  CREATE_BOOKING_EVENT_SUCCESS: "CREATE_BOOKING_EVENT_SUCCESS",
  CREATE_BOOKING_EVENT_FAIL: "CREATE_BOOKING_EVENT_FAIL",

  UPDATE_BOOKING_EVENT: "UPDATE_BOOKING_EVENT",
  UPDATE_BOOKING_EVENT_SUCCESS: "UPDATE_BOOKING_EVENT_SUCCESS",
  UPDATE_BOOKING_EVENT_FAIL: "UPDATE_BOOKING_EVENT_FAIL",

  DELETE_BOOKING_EVENT: "DELETE_BOOKING_EVENT",
  DELETE_BOOKING_EVENT_SUCCESS: "DELETE_BOOKING_EVENT_SUCCESS",
  DELETE_BOOKING_EVENT_FAIL: "DELETE_BOOKING_EVENT_FAIL",

  GET_BOOKINGS: "GET_BOOKINGS",
  GET_BOOKINGS_SUCCESS: "GET_BOOKINGS_SUCCESS",
  GET_BOOKINGS_FAIL: "GET_BOOKINGS_FAIL",

  GET_OTP: "GET_OTP",
  GET_OTP_SUCCESS: "GET_OTP_SUCCESS",
  GET_OTP_FAIL: "GET_OTP_FAIL",

  VERIFY_BOOKING: "VERIFY_BOOKING",
  VERIFY_BOOKING_SUCCESS: "VERIFY_BOOKING_SUCCESS",
  VERIFY_BOOKING_FAIL: "VERIFY_BOOKING_FAIL",
};

export const socketTypes = {
  GET_ORDER_DASHBOARD_DATA: "GET_ORDER_DASHBOARD_DATA",
};
