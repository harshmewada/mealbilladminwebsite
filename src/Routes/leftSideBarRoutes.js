export const superadmin = [
  {
    title: "Restaurant",
    icon: "mdi mdi-food-fork-drink",

    children: [
      {
        title: "Restaurants",
        link: "/managerestaurant",
      },
      { title: "Reports", link: "/sublink" },
    ],
  },
  {
    title: "Branch",
    icon: "mdi mdi-source-branch",

    children: [
      {
        title: "Branches",
        link: "/managebranches",
      },
      { title: "Reports", link: "/dum" },
    ],
  },
  {
    title: "Users",
    icon: "mdi mdi-account-outline",
    children: [
      {
        title: "Users",
        link: "/manageusers",
      },
      { title: "Reports", link: "/dum" },
    ],
  },
  {
    title: "Themes",
    icon: "mdi mdi-theme-light-dark",

    children: [
      {
        title: "Themes",
        link: "/managethemes",
      },
    ],
  },
  {
    title: "Subsriptions",
    icon: "mdi mdi-package-variant-closed",

    children: [
      {
        title: "SubScriptions",
        link: "/managesubscriptions",
      },
    ],
  },
];

export const restaurantadmin = [
  {
    title: "Branch",
    icon: "mdi mdi-source-branch",
    role: "restaurantadmin",
    children: [
      {
        title: "Branches",
        link: "/managebranches",
      },
      { title: "Reports", link: "/dum" },
    ],
  },
  {
    title: "Users",
    role: "restaurantadmin",
    icon: "mdi mdi-account-outline",
    children: [
      {
        title: "Users",
        link: "/manageusers",
      },
      { title: "Reports", link: "/dum" },
    ],
  },
  {
    title: "Items",
    role: "restaurantadmin",
    icon: "mdi mdi-food",
    children: [
      {
        title: "Items",
        link: "/manageitems",
      },
      { title: "Reports", link: "/dum" },
    ],
  },
  {
    title: "Manage Categories",
    icon: "mdi mdi-database",
    link: "/managecategories",
  },

  // {
  //   title: "Manage Tables",
  //   icon: "mdi mdi-table-column-plus-after",
  //   link: "/managetables",
  // },
  {
    title: "Manage Hotkeys",
    icon: "mdi mdi-alpha-h-circle",
    link: "/managehotkeys",
  },
];

export const branchadmin = [
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
    link: "/",
  },
  {
    title: "Items",
    role: "restaurantadmin",
    icon: "mdi mdi-food",
    children: [
      {
        title: "Items",
        link: "/manageitems",
      },
      { title: "Reports", link: "/dum" },
    ],
  },
  {
    title: "Manage Categories",
    icon: "mdi mdi-database",
    link: "/managecategories",
  },

  {
    title: "Manage Tables",
    icon: "mdi mdi-table-column-plus-after",
    link: "/managetables",
  },
  {
    title: "Manage Hotkeys",
    icon: "mdi mdi-alpha-h-circle",
    link: "/managehotkeys",
  },
];

export const branchuser = [
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
    link: "/",
  },
];
export default {
  superadmin,
  restaurantadmin,
  branchadmin,
  branchuser,
};
