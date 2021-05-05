export const superadmin = [
  {
    title: "Dashboard",
    icon: "mdi mdi-view-dashboard-outline",

    link: "/",
  },
  {
    title: "Restaurant",
    icon: "mdi mdi-food-fork-drink",
    link: "/managerestaurant",
  },
  {
    title: "Branch",
    icon: "mdi mdi-source-branch",
    link: "/managebranches",
  },
  {
    title: "Users",
    icon: "mdi mdi-account-outline",
    link: "/manageusers",
  },

  {
    title: "Setting",
    icon: "mdi mdi-settings-outline",

    children: [
      {
        title: "Subsriptions",
        // icon: "mdi mdi-package-variant-closed",
        link: "/managesubscriptions",
      },
      {
        title: "Table Types",
        link: "/managetabletypes",
      },
      {
        title: "Expense Types",

        link: "/manageexpensetypes",
      },
      {
        title: "Category Types",
        link: "/managecategories",
      },
      {
        title: "Themes",
        link: "/managethemes",
      },
    ],
  },
];

export const restaurantadmin = [
  {
    title: "Dashboard",
    icon: "mdi mdi-view-dashboard-outline",

    link: "/",
  },
  {
    title: "Branch",
    icon: "mdi mdi-source-branch",
    role: "restaurantadmin",
    link: "/managebranches",
  },
  {
    title: "Users",
    role: "restaurantadmin",
    icon: "mdi mdi-account-outline",
    link: "/manageusers",
  },
  {
    title: "Items",
    role: "restaurantadmin",
    icon: "mdi mdi-food",
    link: "/manageitems",
  },

  {
    title: "Manage Categories",
    icon: "mdi mdi-yelp",
    link: "/managecategories",
  },
  {
    title: "Manage Expenses",
    icon: "mdi mdi-wallet",
    link: "/manageexpense",
  },

  {
    title: "Reports",
    icon: "fas fa-chart-line",
    children: [
      {
        title: "Daily Report",
        link: "/reports/dailyreport",
      },
      {
        title: "Cash Book",
        link: "/reports/cashbook",
      },
      {
        title: "Orders Report",
        link: "/reports/orderreport",
      },
      {
        title: "Expense Report",
        link: "/reports/expensereport",
      },
      {
        title: "Item Report",
        link: "/reports/itemreport",
      },
      {
        title: "Sales Report",
        link: "/reports/salesreport",
      },
    ],
  },

  // {
  //   title: "Manage Tables",
  //   icon: "mdi mdi-table-column-plus-after",
  //   link: "/managetables",
  // },
  // {
  //   title: "Manage Hotkeys",
  //   icon: "mdi mdi-alpha-h-circle",
  //   link: "/managehotkeys",
  // },
];

export const branchadmin = [
  {
    title: "Dashboard",
    icon: "mdi mdi-view-dashboard-outline",

    link: "/",
  },
  // {
  //   title: "Users",
  //   role: "restaurantadmin",
  //   icon: "mdi mdi-account-outline",
  //   children: [
  //     {
  //       title: "Users",
  //       link: "/manageusers",
  //     },
  //     { title: "Reports", link: "/dum" },
  //   ],
  // },
  {
    title: "Order Dashboard",
    icon: "mdi mdi-bowling",
    link: "/order",
  },

  {
    title: "Expenses",
    icon: " mdi mdi-wallet",

    link: "/manageexpense",
  },
  {
    title: "Order History",
    icon: "mdi mdi-history",

    link: "/orderhistory",
  },
  {
    title: "Resources",
    icon: "mdi mdi-link-variant",

    children: [
      {
        title: "Items",
        role: "restaurantadmin",
        icon: "mdi mdi-food",
        link: "/manageitems",
      },
      {
        title: "Categories",
        icon: "mdi mdi-yelp",
        link: "/managecategories",
      },
      {
        title: "Tables",
        icon: "mdi mdi-table-column-plus-after",
        link: "/managetables",
      },
    ],
  },
  {
    title: "Setting",
    icon: "mdi mdi-settings-outline",

    children: [
      {
        title: "Printer Setting",
        link: "/manageprinters",
      },
    ],
  },
  // {
  //   title: "Manage Hotkeys",
  //   icon: "mdi mdi-alpha-h-circle",
  //   link: "/managehotkeys",
  // },
];

export const branchuser = [
  // {
  //   title: "Dashboard",
  //   icon: "mdi mdi-view-dashboard-outline",

  //   link: "/",
  // },
  // {
  //   title: "Users",
  //   role: "restaurantadmin",
  //   icon: "mdi mdi-account-outline",
  //   children: [
  //     {
  //       title: "Users",
  //       link: "/manageusers",
  //     },
  //     { title: "Reports", link: "/dum" },
  //   ],
  // },

  {
    title: "Order Dashboard",
    icon: "mdi mdi-bowling",
    link: "/order/",
  },
  {
    title: "Expenses",
    icon: "mdi mdi-wallet",
    link: "/manageexpense",
  },
];
export default {
  superadmin,
  restaurantadmin,
  branchadmin,
  branchuser,
};
