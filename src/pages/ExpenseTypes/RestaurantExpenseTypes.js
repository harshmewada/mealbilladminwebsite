import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../redux/action/snackActions";
import SmartTable from "../../components/common/SmartTable";

import DeleteModal from "../../components/common/Modals/DeleteModal";
import AddCommonAction from "../../components/common/Actions/AddCommonAction";
import EditCommonAction from "../../components/common/Actions/EditAction";
import DeleteCommonAction from "../../components/common/Actions/DeleteCommonAction";
import CommonAddModal from "../../components/common/Modals/CommonAddModal";
import {
  getAllexpenseTypes,
  importExpenseTypes,
  getRestaurantExpenseType,
  createRestaurantExpenseType,
  updateRestaurantExpenseType,
  deleteRestaurantExpenseType,
  updateRestaurantSubExpenseType,
} from "../../redux/action/expenseActions";
import { RootUrl } from "../../redux/types";
import { getAllBranches } from "../../redux/action/branchActions";
import getErrorMessage from "../../helpers/getErrorMessage";
import CommonImportModal from "../../components/common/Modals/CommonImportModal";
import ImportCommonAction from "../../components/common/Actions/ImportCommonAction";
import SubExpensesModal from "../../components/common/Modals/SubExpensesTypesModal";

//date
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import { DATEFORMAT, dateRanges, MEASUREUNITS } from "../../contants";

const formData = [
  {
    type: "text",
    name: "expenseType",
    label: "Expense Type ",
    placeholder: "Enter Expense Type ",
    required: true,

    rules: {
      required: {
        value: true,
        message: "Expense Type is required",
      },
    },
  },
  {
    type: "switch",
    name: "includeQuantity",
    label: "Include Quantity ",
    placeholder: "Enter Include Quantity ",
  },

  {
    type: "select",
    name: "status",
    label: "Status",
    options: [
      {
        title: "Active",
        value: true,
      },
      {
        title: "Inactive",
        value: false,
      },
    ],
    optionLabelProp: "title",
    optionValueProp: "value",

    required: true,
    rules: {
      required: {
        value: true,
      },
    },
  },
];

const RestaurantExpenseTypes = () => {
  const { expenses: arraycat, restaurantExpenseTypes } = useSelector(
    (state) => state.branch
  );
  const { role, restaurantId, branchId } = useSelector((state) => state.user);

  const superadminExpenseTypes = useSelector(
    (state) => state.common.expenseTypes
  );

  const isRestaurantAdmin = ["restaurantadmin"].includes(role);

  const PageTitle = "Expense Types";

  const [open, setOpen] = React.useState();

  const [importOpen, setImportOpen] = React.useState();

  const currRestaurantId = restaurantId || undefined;

  const expenses = restaurantExpenseTypes;

  const dispatch = useDispatch();
  // const Cateogrys = useSelector((state) => state.common.Cateogrys);

  const handleAddSubExpense = (data) => {
    toggleAdd("sub");
    setActionData(data);
  };

  const onAddNewSubExpenses = (e) => {
    if (open === "sub") {
      dispatch(
        updateRestaurantSubExpenseType(
          {
            ...actionData,
            ...e,
            // ...data,
          },
          () => {
            getAllData();
            toggleAdd();
          }
        )
      );
    }
  };

  const [actionData, setActionData] = React.useState();

  const toggleAdd = (mode) => {
    setOpen(mode);
    if (mode === undefined) {
      setActionData({});
    }
  };

  const handleEdit = (data) => {
    toggleAdd("Edit");
    setActionData(data);
  };

  const handleDelete = (data) => {
    toggleAdd("Delete");
    setActionData(data);
  };

  const confirmDelete = (data) => {
    dispatch(
      deleteRestaurantExpenseType(
        { ...actionData, role: role },

        () => {
          toggleAdd();

          getAllData();
        }
      )
    );
  };

  const getAllData = (selectedBranch) => {
    if (isRestaurantAdmin) {
      dispatch(getRestaurantExpenseType(restaurantId));
    }
  };

  const importData = () => {
    if (isRestaurantAdmin) {
      return superadminExpenseTypes.filter((item) => {
        return (
          restaurantExpenseTypes.findIndex((data) => {
            return data.expenseType === item.expenseType;
          }) < 0
        );
      });
    }
  };
  const onAdd = (data) => {
    if (open === "Add") {
      dispatch(
        createRestaurantExpenseType(
          {
            ...data,
            role: role,
            // branchId: branchId || data.branchId,
            restaurantId: restaurantId,
          },
          () => {
            toggleAdd();
            getAllData();
          },
          () => {}
        )
      );
    }
    if (open === "Edit") {
      dispatch(
        updateRestaurantExpenseType(
          {
            ...actionData,
            ...data,
            role: role,
            restaurantId: restaurantId,
          },
          () => {
            toggleAdd();
            getAllData();
          },
          () => {}
        )
      );
    }
  };

  const onImport = (data) => {
    dispatch(
      importExpenseTypes(
        {
          restaurantId: restaurantId,

          data: data.map((item) => {
            return {
              ...item,
              restaurantId: restaurantId,
            };
          }),
        },
        () => {
          toggleAdd();
          getAllData();

          setImportOpen(false);
        }
      )
    );
  };
  const AddAction = () => {
    return (
      <AddCommonAction onClick={() => toggleAdd("Add")} title={PageTitle} />
    );
  };

  const ImportAction = () => {
    return (
      <ImportCommonAction
        onClick={() => {
          if (isRestaurantAdmin) {
            dispatch(getAllexpenseTypes(undefined, undefined, "true"));
          }

          setImportOpen(true);
        }}
        title={PageTitle}
      />
    );
  };

  const EditAction = (action) => (
    <EditCommonAction onClick={() => handleEdit(action.data)} />
  );

  const DeleteAction = (action) => (
    <DeleteCommonAction onClick={() => handleDelete(action.data)} />
  );

  const AddSubExpenseAction = (action) => {
    return (
      <AddCommonAction
        onClick={() => handleAddSubExpense(action.data)}
        title={"Sub Expense Types"}
      />
    );
  };

  const restauranttableheaders = [
    { title: "Expense Type", key: "expenseType" },
    { title: "Include quantity", key: "includeQuantity", type: "boolean" },
    {
      title: "Sub Expense Count",
      key: "Sub Expense Count",
      renderRow: (e) => e?.subExpenseTypes?.length || 0,
    },
    { title: "Status", key: "status" },
  ];

  const headers = restauranttableheaders;

  const defaultValues = {
    restaurantId: restaurantId,
  };

  const headerComponents = {
    restaurantadmin: [
      // ...[BranchFilter],
      ImportAction,
    ],
  };
  React.useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      eheh
      <div class="page-content-tab">
        <SubExpensesModal
          open={open === "sub" || open === "subEdit"}
          onClose={() => toggleAdd()}
          mode={open}
          data={actionData}
          onSubmit={(e) => onAddNewSubExpenses(e)}
        />
        <CommonImportModal
          headers={headers}
          open={importOpen}
          title={PageTitle}
          data={importData()}
          onClose={() => setImportOpen(false)}
          onSubmit={(data) => {
            onImport(data);
          }}
        />
        <CommonAddModal
          title={PageTitle}
          open={open === "Add" || open === "Edit"}
          onClose={() => toggleAdd()}
          mode={open}
          onSubmit={(e) => onAdd(e)}
          data={actionData}
          formData={formData}
          defaultValue={defaultValues}
        />
        <DeleteModal
          size="md"
          open={open === "Delete"}
          title={actionData?.name}
          onClose={() => toggleAdd()}
          onConfirm={() => confirmDelete()}
        />
        <SmartTable
          title={PageTitle}
          headerComponents={headerComponents[role]}
          headActions={[AddAction]}
          actions={[EditAction, DeleteAction, AddSubExpenseAction]}
          tableData={expenses}
          headers={headers}
          sortable={true}
          paginated={true}
          searchByLabel={"Expense Type"}
          searchByField={"expenseType"}
          rowsPerPage={5}
        />
      </div>
    </>
  );
};

export default RestaurantExpenseTypes;
