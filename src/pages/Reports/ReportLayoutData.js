import { TYPESOFPAYMENTS, MONTHSARRAY } from "../../contants";
import { Curreny } from "../../redux/types";

export default {
  superadmin: {},
  restaurantadmin: {
    dailyreport: {
      title: "Daily Report",
      dataVariable: "table",
      dataType: "order",
      noPadding: true,
      selectorFormData: [
        {
          type: "select",
          name: "branchId",

          optionLabelProp: "branchName",
          optionValueProp: "_id",
          hasOptions: true,
          hideAt: ["branchadmin"],
          required: true,
          //   option: branches,
          getOptionLabel: (opt) => opt.branchName,
          defaultOption: () => <option selected>All Branches</option>,
          size: 4,
          rules: {
            required: {
              value: true,
              message: "Branch Name is required",
            },
          },
        },

        {
          type: "dateRange",
          name: "date",
          size: 4,
          placeholder: "Type Table Number",
          required: true,
          options: {
            singleDatePicker: true,
            hideRanges: true,
          },
          rules: {
            required: {
              value: true,
              message: "Date is required",
            },
          },
        },
      ],
      layouts: [
        {
          type: "table",
          dataVariable: "table",
          width: 12,

          headers: [
            { title: "Order Number", key: "branchOrderNumber" },
            { title: "Items", key: "itemsLength" },
            { title: "Amount", key: "grandTotal", isCurrency: true },
            { title: "SGST", key: "sgstCharges", isCurrency: true },
            { title: "CGST", key: "cgstCharges", isCurrency: true },
            { title: "Other Charges", key: "otherCharges", isCurrency: true },
          ],
        },
      ],
    },

    cashbook: {
      title: "Cash Book",
      dataVariable: "cashbook",
      noPadding: true,
      selectorFormData: [
        {
          type: "select",
          name: "branchId",

          optionLabelProp: "branchName",
          optionValueProp: "_id",
          hasOptions: true,
          hideAt: ["branchadmin"],
          required: true,
          //   option: branches,
          getOptionLabel: (opt) => opt.branchName,
          defaultOption: () => <option selected>All Branches</option>,

          size: 4,
          rules: {
            required: {
              value: true,
              message: "Branch Name is required",
            },
          },
        },

        {
          type: "dateRange",
          name: "date",
          size: 4,
          placeholder: "Type Table Number",
          required: true,

          rules: {
            required: {
              value: true,
              message: "Date is required",
            },
          },
        },
      ],
      layouts: [
        {
          type: "iconsgrid",
          dataVariable: "iconsgrid",
          width: 12,
          isCurrency: true,

          headers: [
            {
              title: "Orders",
              key: "totalOrders",
              icon: "typcn typcn-printer",
            },
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
            {
              title: "Tax",
              key: "totalTax",
              icon: "mdi mdi-home-currency-usd",
            },
            { title: "Expenses", key: "totalExpense", icon: "mdi mdi-wallet" },
          ],
        },
      ],
    },

    orderreport: {
      title: "Order Report",
      dataVariable: "orderreport",
      dataType: "order",
      noPadding: true,
      selectorFormData: [
        {
          type: "select",
          name: "paymentTypeId",

          optionLabelProp: "type",
          optionValueProp: "id",
          hasOptions: false,
          hideAt: ["branchadmin"],
          required: true,
          options: TYPESOFPAYMENTS,
          getOptionLabel: (opt) => opt.title,
          defaultOption: () => (
            <option selected value="all">
              All Payment Types
            </option>
          ),
          size: 3,
          rules: {
            required: {
              value: true,
              message: "Branch Name is required",
            },
          },
        },
        {
          type: "select",
          name: "orderType",

          optionLabelProp: "title",
          optionValueProp: "value",
          hasOptions: false,
          hideAt: ["branchadmin"],
          required: true,
          options: [
            {
              title: "Dine In",
              value: 0,
            },
            {
              title: "Parcel",
              value: 1,
            },
            {
              title: "Home Delivery",
              value: 2,
            },
          ],
          getOptionLabel: (opt) => opt.title,
          defaultOption: () => (
            <option selected value="all">
              All Order Types
            </option>
          ),
          size: 3,
          rules: {
            required: {
              value: true,
              message: "Branch Name is required",
            },
          },
        },
        {
          type: "select",
          name: "branchId",

          optionLabelProp: "branchName",
          optionValueProp: "_id",
          hasOptions: true,
          hideAt: ["branchadmin"],
          required: true,
          //   option: branches,
          getOptionLabel: (opt) => opt.branchName,
          defaultOption: () => (
            <option selected value="all">
              All Branches
            </option>
          ),
          size: 3,
          rules: {
            required: {
              value: true,
              message: "Branch Name is required",
            },
          },
        },

        {
          type: "dateRange",
          name: "date",
          size: 3,
          placeholder: "Type Table Number",
          required: true,

          rules: {
            required: {
              value: true,
              message: "Date is required",
            },
          },
        },
      ],
      layouts: [
        {
          type: "iconsgrid",
          dataVariable: "iconsgrid",
          headerVariable: "iconheaders",

          width: 12,

          headers: [
            {
              title: "All",
              key: "all",
              icon: "typcn typcn-printer",
              isCurrency: true,
            },
            {
              title: "Dine in",
              key: "dineIn",
              icon: "typcn typcn-printer",
              isCurrency: true,
            },
            {
              title: "Parcel",
              key: "parcel",
              icon: "typcn typcn-printer",
              isCurrency: true,
            },
            {
              title: "Home Delivery",
              key: "homeDelivery",
              icon: "typcn typcn-printer",
              isCurrency: true,
            },
          ],
        },
        {
          type: "table",
          dataVariable: "table",
          tableOptions: {
            sortable: true,
            paginated: true,
          },
          width: 12,

          headers: [
            { title: "Order Number", key: "branchOrderNumber" },
            { title: "Items", key: "itemsLength" },

            { title: "SGST", key: "sgstCharges", isCurrency: true },
            { title: "CGST", key: "cgstCharges", isCurrency: true },
            { title: "Discount", key: "discount", isCurrency: true },

            { title: "Other Charges", key: "otherCharges", isCurrency: true },
            { title: "Amount", key: "grandTotal", isCurrency: true },
          ],
        },
      ],
    },
    expensereport: {
      title: "Expense Report",
      dataVariable: "expensereport",
      noPadding: true,
      selectorFormData: [
        {
          type: "select",
          name: "branchId",

          optionLabelProp: "branchName",
          optionValueProp: "_id",
          hasOptions: true,
          hideAt: ["branchadmin"],
          required: true,
          //   option: branches,
          getOptionLabel: (opt) => opt.branchName,
          defaultOption: () => (
            <option selected value="all">
              All Branches
            </option>
          ),
          size: 4,
          rules: {
            required: {
              value: true,
              message: "Branch Name is required",
            },
          },
        },

        {
          type: "dateRange",
          name: "date",
          size: 4,
          placeholder: "Type Table Number",
          required: true,

          rules: {
            required: {
              value: true,
              message: "Date is required",
            },
          },
        },
      ],
      layouts: [
        {
          type: "iconsgrid",
          dataVariable: "iconsgrid",
          headerVariable: "iconheaders",
          isCurrency: true,
          width: 12,
        },
        {
          type: "table",
          dataVariable: "table",
          tableOptions: {
            sortable: true,
            paginated: true,
          },
          width: 12,

          headers: [
            { title: "Expense Title", key: "expenseTitle" },
            { title: "Expense Type", key: "expenseType" },
            { title: "Amount", key: "expensePrice", isCurrency: true },
            {
              title: "Quantity",
              key: "quantity",
              renderRow: (data) => {
                // console.log("renderRow", data);

                return data.quantity
                  ? `${data.quantity} ${data.quantityType}`
                  : " - ";
              },
            },
          ],
        },
      ],
    },
    itemreport: {
      title: "Item Report",
      dataVariable: "itemreport",
      dataType: "order",
      noPadding: true,
      selectorFormData: [
        {
          type: "select",
          name: "branchId",

          optionLabelProp: "branchName",
          optionValueProp: "_id",
          hasOptions: true,
          hideAt: ["branchadmin"],
          required: true,
          //   option: branches,
          getOptionLabel: (opt) => opt.branchName,
          defaultOption: () => <option selected>All Branches</option>,

          size: 4,
          rules: {
            required: {
              value: true,
              message: "Branch Name is required",
            },
          },
        },

        {
          type: "dateRange",
          name: "date",
          size: 4,
          placeholder: "Type Table Number",
          required: true,

          rules: {
            required: {
              value: true,
              message: "Date is required",
            },
          },
        },
      ],
      layouts: [
        {
          type: "table",
          dataVariable: "table",
          tableOptions: {
            sortable: true,
            paginated: true,
          },
          width: 12,

          headers: [
            { title: "Item Name", key: "itemName" },
            { title: "Total Revenue", key: "totalSold", isCurrency: true },
            { title: "Total Quantity Sold", key: "quantity" },
            { title: "Price", key: "itemPrice", isCurrency: true },
          ],
        },
      ],
    },
    salesreport: {
      title: "Sales Report",
      dataVariable: "itemreport",
      dataType: "order",
      noPadding: true,
      selectorFormData: [
        {
          type: "select",
          name: "branchId",

          optionLabelProp: "branchName",
          optionValueProp: "_id",
          hasOptions: true,
          hideAt: ["branchadmin"],
          required: true,
          //   option: branches,
          getOptionLabel: (opt) => opt.branchName,
          defaultOption: () => <option selected>All Branches</option>,

          size: 4,
          rules: {
            required: {
              value: true,
              message: "Branch Name is required",
            },
          },
        },

        // {
        //   type: "dateRange",
        //   name: "date",
        //   size: 4,
        //   placeholder: "Type Table Number",
        //   required: true,

        //   rules: {
        //     required: {
        //       value: true,
        //       message: "Date is required",
        //     },
        //   },
        // },
      ],
      layouts: [
        {
          type: "chart",
          dataVariable: "chart",
          showCard: true,
          width: 12,
          headers: [
            {
              name: "Sale",
              key: "revenue",
              dataVariable: "Revenue",
            },
            {
              name: "Expense",
              key: "expense",
              dataVariable: "expense",
            },
            {
              name: "Profit",
              key: "profit",
              dataVariable: "profit",
            },
          ],

          chartOptions: {
            type: "bar",

            options: {
              title: {
                text: "Monthly revenue",
                align: "left",
              },
              chart: {
                type: "bar",
                height: 350,
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "55%",
                  endingShape: "rounded",
                },
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
              },
              xaxis: {
                categories: MONTHSARRAY,
              },
              yaxis: {
                title: {
                  text: `${Curreny} Rupees`,
                },
              },
              fill: {
                opacity: 1,
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return Curreny + " " + val;
                  },
                },
              },
            },
          },
        },
      ],
    },
  },
};
