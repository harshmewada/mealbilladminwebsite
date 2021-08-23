import { MONTHSARRAY, TYPESOFPAYMENTS } from "../../contants";
import { Curreny } from "../../redux/types";

export default {
  superadmin: {
    title: "Dashboard",
    dashboardData: [
      {
        type: "iconsgrid",
        dataVariable: "iconsgrid",
        width: 12,
        isCurrency: false,

        headers: [
          {
            title: "Active Restaurants",
            key: "activeRestaurants",
            icon: "dripicons-store",
          },
          {
            title: "Active Branches",
            key: "branchCount",

            icon: "dripicons-network-3",
          },
          {
            title: "Active Users",
            key: "userCount",
            icon: "dripicons-user-group",
          },
          {
            title: "Total Number of Orders",
            key: "orderCount",

            icon: "dripicons-cart",
          },
        ],
      },
    ],
  },
  restaurantadmin: {
    title: "Dashboard",
    dashboardData: [
      {
        type: "iconsgrid",
        dataVariable: "iconsgrid",
        width: 12,
        isCurrency: true,

        headers: [
          {
            title: " Today's Sales Amount",
            icon: "mdi mdi-cash-100",

            key: "saleAmount",

            isCurrency: true,
          },
          {
            title: "Today's Number of Orders",
            icon: "dripicons-basket",

            key: "totalOrders",
          },
          {
            title: "Today's Expenses",
            icon: "mdi mdi-cash-refund",

            key: "totalExpenses",
            isCurrency: true,
          },
          {
            title: " Total Active Tables",
            icon: "mdi mdi-soccer-field",

            key: "totalTables",
          },
        ],
      },

      {
        type: "chart",
        dataVariable: "saleChart",
        showCard: true,
        width: 4,
        headers: [
          {
            name: "Sale",
            key: "revenue",
            dataVariable: "revenue",
          },
        ],

        chartOptions: {
          type: "line",

          options: {
            chart: {
              height: 350,
              type: "line",
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
            },
            title: {
              text: "Sales",
              align: "left",
              style: {
                // fontFamily: "Roboto",
              },
            },
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: MONTHSARRAY,
            },
          },
        },
      },
      {
        type: "chart",
        dataVariable: "expenseChart",
        showCard: true,
        width: 4,
        headers: [
          {
            name: "Expenses",
            key: "expense",
            dataVariable: "expense",
          },
        ],

        chartOptions: {
          type: "line",

          options: {
            chart: {
              height: 350,
              type: "line",
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },

            stroke: {
              colors: ["#f27024"],

              curve: "smooth",
            },
            title: {
              text: "Expenses",
              align: "left",
            },
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: MONTHSARRAY,
            },
          },
        },
      },
      {
        type: "chart",
        dataVariable: "orderLengthChart",
        showCard: true,
        width: 4,
        headers: [
          {
            name: "Orders",
            key: "numberOfOrders",
            dataVariable: "numberOfOrders",
          },
        ],

        chartOptions: {
          type: "line",

          options: {
            chart: {
              height: 350,
              type: "line",
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },

            stroke: {
              colors: ["#2cd142"],

              curve: "smooth",
            },
            title: {
              text: "Number of Orders",
              align: "left",
            },
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: MONTHSARRAY,
            },
          },
        },
      },

      {
        type: "chart",
        dataVariable: "orderTypesChart",
        showCard: true,
        directData: true,
        width: 4,

        chartOptions: {
          type: "donut",
          options: {
            chart: {
              type: "donut",
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "85%",
                },
              },
            },
            dataLabels: {
              enabled: true,
            },
            title: {
              text: "Order Type Ratio",
              align: "left",
            },
            stroke: {
              show: true,
              width: 2,
              colors: ["transparent"],
            },

            series: [10, 65, 25],
            legend: {
              show: true,
              position: "bottom",
              horizontalAlign: "center",
              verticalAlign: "middle",
              floating: false,
              fontSize: "14px",
              offsetX: 0,
              offsetY: 5,
            },
            labels: ["Dine In", "Parcel", "Home Delivery"],
            colors: ["#ff9f43", "#506ee4", "#41cbd8"],
            responsive: [
              {
                breakpoint: 600,
                options: {
                  plotOptions: {
                    donut: {
                      customScale: 0.2,
                    },
                  },
                  chart: {
                    height: 240,
                  },
                  legend: {
                    show: false,
                  },
                },
              },
            ],

            tooltip: {
              y: {
                formatter: function (val) {
                  return val;
                },
              },
            },
          },
        },
      },
      {
        type: "table",
        dataVariable: "sortedItems",
        tableOptions: {
          title: "Top 10 Selling Items this month",
          sortable: false,
          paginated: false,
        },
        width: 8,
        rowsPerPage: 10,

        headers: [
          { title: "Item Name", key: "itemName" },
          { title: "Branch", key: "branchName" },

          { title: "Total Revenue", key: "totalSold", isCurrency: true },
          { title: "Total Quantity Sold", key: "quantity" },
          { title: "Price", key: "itemPrice", isCurrency: true },
        ],
      },
      {
        type: "chart",
        dataVariable: "paymentTypesChart",
        showCard: true,
        directData: true,
        width: 4,

        chartOptions: {
          type: "donut",
          options: {
            chart: {
              type: "donut",
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "85%",
                },
              },
            },
            dataLabels: {
              enabled: true,
            },
            title: {
              text: "Payment Type Ratio",
              align: "left",
            },
            stroke: {
              show: true,
              width: 2,
              colors: ["transparent"],
            },

            series: [10, 65, 25],
            legend: {
              show: true,
              position: "bottom",
              horizontalAlign: "center",
              verticalAlign: "middle",
              floating: false,
              fontSize: "14px",
              offsetX: 0,
              offsetY: 5,
            },
            labels: ["Cash", "Card", "Other"],
            colors: ["#2cd142", "#e8db27", "#c9209c"],
            responsive: [
              {
                breakpoint: 600,
                options: {
                  plotOptions: {
                    donut: {
                      customScale: 0.2,
                    },
                  },
                  chart: {
                    height: 240,
                  },
                  legend: {
                    show: false,
                  },
                },
              },
            ],

            tooltip: {
              y: {
                formatter: function (val) {
                  return val;
                },
              },
            },
          },
        },
      },

      {
        type: "table",

        dataVariable: "sortedExpenses",
        tableOptions: {
          title: "Top 10 Expenses this month",
          sortable: false,
          paginated: false,
        },
        width: 8,
        rowsPerPage: 10,

        headers: [
          { title: "Expense Title", key: "expenseTitle" },

          { title: "Expense Type", key: "expenseType" },
          { title: "Branch", key: "branchName" },

          { title: "Amount", key: "expensePrice", isCurrency: true },
        ],
      },
    ],
  },
  branchadmin: {
    title: "Dashboard",
    dashboardData: [
      {
        type: "iconsgrid",
        dataVariable: "iconsgrid",
        width: 12,
        isCurrency: true,

        headers: [
          {
            title: " Today's Sales Amount",
            icon: "mdi mdi-cash-100",

            key: "saleAmount",
            isCurrency: true,
          },
          {
            title: "Today's Number of Orders",
            icon: "dripicons-basket",

            key: "totalOrders",
          },
          {
            title: "Today's Expenses",
            icon: "mdi mdi-cash-refund",
            key: "totalExpenses",
            isCurrency: true,
          },
          {
            title: " Total Active Tables",
            icon: "mdi mdi-soccer-field",

            key: "totalTables",
          },
        ],
      },

      {
        type: "chart",
        dataVariable: "saleChart",
        showCard: true,
        width: 4,
        headers: [
          {
            name: "Sale",
            key: "revenue",
            dataVariable: "revenue",
          },
        ],

        chartOptions: {
          type: "line",

          options: {
            chart: {
              height: 350,
              type: "line",
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
            },
            title: {
              text: "Sales",
              align: "left",
            },
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: MONTHSARRAY,
            },
          },
        },
      },
      {
        type: "chart",
        dataVariable: "expenseChart",
        showCard: true,
        width: 4,
        headers: [
          {
            name: "Expenses",
            key: "expense",
            dataVariable: "expense",
          },
        ],

        chartOptions: {
          type: "line",

          options: {
            chart: {
              height: 350,
              type: "line",
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },

            stroke: {
              colors: ["#f27024"],

              curve: "smooth",
            },
            title: {
              text: "Expenses",
              align: "left",
            },
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: MONTHSARRAY,
            },
          },
        },
      },
      {
        type: "chart",
        dataVariable: "orderLengthChart",
        showCard: true,
        width: 4,
        headers: [
          {
            name: "Orders",
            key: "numberOfOrders",
            dataVariable: "numberOfOrders",
          },
        ],

        chartOptions: {
          type: "line",

          options: {
            chart: {
              height: 350,
              type: "line",
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },

            stroke: {
              colors: ["#2cd142"],

              curve: "smooth",
            },
            title: {
              text: "Number of Orders",
              align: "left",
            },
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: MONTHSARRAY,
            },
          },
        },
      },

      {
        type: "chart",
        dataVariable: "orderTypesChart",
        showCard: true,
        directData: true,
        width: 4,

        chartOptions: {
          type: "donut",
          options: {
            chart: {
              type: "donut",
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "85%",
                },
              },
            },
            dataLabels: {
              enabled: true,
            },
            title: {
              text: "Order Type Ratio",
              align: "left",
            },
            stroke: {
              show: true,
              width: 2,
              colors: ["transparent"],
            },

            series: [10, 65, 25],
            legend: {
              show: true,
              position: "bottom",
              horizontalAlign: "center",
              verticalAlign: "middle",
              floating: false,
              fontSize: "14px",
              offsetX: 0,
              offsetY: 5,
            },
            labels: ["Dine In", "Parcel", "Home Delivery"],
            colors: ["#ff9f43", "#506ee4", "#41cbd8"],
            responsive: [
              {
                breakpoint: 600,
                options: {
                  plotOptions: {
                    donut: {
                      customScale: 0.2,
                    },
                  },
                  chart: {
                    height: 240,
                  },
                  legend: {
                    show: false,
                  },
                },
              },
            ],

            tooltip: {
              y: {
                formatter: function (val) {
                  console.log("formatter", val);
                  return val;
                },
              },
            },
          },
        },
      },
      {
        type: "table",
        dataVariable: "sortedItems",
        tableOptions: {
          title: "Top 10 Selling Items",
          sortable: false,
          paginated: false,
        },
        width: 8,
        rowsPerPage: 10,

        headers: [
          { title: "Item Name", key: "itemName" },

          { title: "Total Revenue", key: "totalSold", isCurrency: true },
          { title: "Total Quantity Sold", key: "quantity" },
          { title: "Price", key: "itemPrice", isCurrency: true },
        ],
      },
      {
        type: "chart",
        dataVariable: "paymentTypesChart",
        showCard: true,
        directData: true,
        width: 4,

        chartOptions: {
          type: "donut",
          options: {
            chart: {
              type: "donut",
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "85%",
                },
              },
            },
            dataLabels: {
              enabled: true,
            },
            title: {
              text: "Payment Type Ratio",
              align: "left",
            },
            stroke: {
              show: true,
              width: 2,
              colors: ["transparent"],
            },

            series: [10, 65, 25],
            legend: {
              show: true,
              position: "bottom",
              horizontalAlign: "center",
              verticalAlign: "middle",
              floating: false,
              fontSize: "14px",
              offsetX: 0,
              offsetY: 5,
            },
            labels: ["Cash", "Card", "Other"],
            colors: ["#2cd142", "#e8db27", "#c9209c"],
            responsive: [
              {
                breakpoint: 600,
                options: {
                  plotOptions: {
                    donut: {
                      customScale: 0.2,
                    },
                  },
                  chart: {
                    height: 240,
                  },
                  legend: {
                    show: false,
                  },
                },
              },
            ],

            tooltip: {
              y: {
                formatter: function (val) {
                  return val;
                },
              },
            },
          },
        },
      },

      {
        type: "table",

        dataVariable: "sortedExpenses",
        tableOptions: {
          title: "Top 10 Expenses",
          sortable: false,
          paginated: false,
        },
        width: 8,
        rowsPerPage: 10,

        headers: [
          { title: "Expense Title", key: "expenseTitle" },
          { title: "Expense Type", key: "expenseType" },
          { title: "Amount", key: "expensePrice", isCurrency: true },
        ],
      },
    ],
  },
};
