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
  createExpense,
  deleteExpense,
  getAllexpenseTypes,
  updateExpense,
  importExpenseTypes,
  getAllExpenses,
  getRestaurantExpenseType,
} from "../../redux/action/expenseActions";
import { RootUrl } from "../../redux/types";
import { getAllBranches } from "../../redux/action/branchActions";
import getErrorMessage from "../../helpers/getErrorMessage";
import CommonImportModal from "../../components/common/Modals/CommonImportModal";
import ImportCommonAction from "../../components/common/Actions/ImportCommonAction";

//date
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import { DATEFORMAT, dateRanges, MEASUREUNITS } from "../../contants";

const ManageExpense = () => {
  const { expenses: arraycat, restaurantExpenseTypes } = useSelector(
    (state) => state.branch
  );
  const { role, restaurantId, branchId } = useSelector((state) => state.user);

  const branches = useSelector((state) => state.branch.allBranches);

  const superadminExpenseTypes = useSelector(
    (state) => state.common.expenseTypes
  );

  const isRestaurantAdmin = ["restaurantadmin"].includes(role);
  const isBranchAdmin = ["branchadmin"].includes(role);

  const isBranchUser = ["branchuser"].includes(role);

  const isSuperAdmin = ["superadmin"].includes(role);
  const PageTitle = isRestaurantAdmin ? "Expense Types" : "Expenses";

  const [open, setOpen] = React.useState();

  const [importOpen, setImportOpen] = React.useState();

  const [selectedBranch, setSelectedBranch] = React.useState(branchId);

  const currRestaurantId = restaurantId || undefined;

  const currBranchId = branchId || selectedBranch;
  const expenses = isBranchAdmin
    ? arraycat
    : isRestaurantAdmin
    ? restaurantExpenseTypes
    : arraycat;

  const [state, setState] = React.useState({
    start: moment(),
    end: moment(),
  });
  const { start, end } = state;

  const handleCallback = (start, end) => {
    // props.setValue({ start, end });
    // onChange(setState({ start, end }));
    setState({ start, end });
  };

  const formData = [
    // {
    //   type: isRestaurantAdmin ? "select" : "none",
    //   name: "branchId",
    //   label: "Branch",
    //   options: branches,
    //   optionLabelProp: "branchName",
    //   optionValueProp: "_id",
    //   hideAt: "Edit",
    //   required: true,
    //   rules: {
    //     required: {
    //       value: true,
    //       message: "Branch Name is required",
    //     },
    //   },
    // },

    {
      type: isRestaurantAdmin ? "text" : "none",
      name: "expenseType",
      label: "Expense Type",
      placeholder: "Type Expense Type",

      rules: {
        required: {
          value: true,
          message: "Expense Type is required",
        },
      },
    },
    {
      type: isRestaurantAdmin ? "switch" : "none",
      name: "includeQuantity",
      label: "Include Quantity ",
      placeholder: "Enter Include Quantity ",
    },

    {
      type: isRestaurantAdmin ? "select" : "none",
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

    {
      type: !isRestaurantAdmin ? "select" : "none",
      name: "expenseTypeId",
      label: "Expense Type",
      options: restaurantExpenseTypes,
      optionLabelProp: "expenseType",
      optionValueProp: "id",
      defaultOption: () => (
        <option selected disabled>
          Select Expense Type
        </option>
      ),
      // required: true,
      // rules: {
      //   required: {
      //     value: true,
      //     message: "Branch Name is required",
      //   },
      // },
    },
    {
      type: !isRestaurantAdmin ? "text" : "none",
      name: "expenseTitle",
      label: "Expense Title",
      placeholder: "Type Expense Title",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Expense Title is required",
        },
      },
    },
    {
      type: !isRestaurantAdmin ? "number" : "none",

      name: "quantity",
      label: "Expense Quantity",
      placeholder: "Type Expense Quantity",
    },
    {
      type: !isRestaurantAdmin ? "select" : "none",
      name: "quantityType",
      size: 4,

      label: "Quantity Type",
      options: MEASUREUNITS,
      optionLabelProp: "title",
      optionValueProp: "value",
    },

    {
      type: !isRestaurantAdmin ? "number" : "none",
      name: "expensePrice",
      label: "Expense Price",

      required: true,
      rules: {
        required: {
          value: true,
          message: "Branch Name is required",
        },
      },
    },
  ];

  const dispatch = useDispatch();
  // const Cateogrys = useSelector((state) => state.common.Cateogrys);

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
    dispatch(deleteExpense({ ...actionData, role: role }))
      .then((res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("Deleted succesfully"));
          getAllData();
        } else {
          dispatch(
            showSnackBar(
              getErrorMessage(res) || "Failed to Delete Cateogry",
              "error"
            )
          );
        }
      })
      .catch((err) => {
        console.log("err", err);
        dispatch(
          showSnackBar(
            getErrorMessage(err) || "Failed to Delete Cateogry",
            "error"
          )
        );
      });
  };

  const getAllData = (selectedBranch) => {
    if (isRestaurantAdmin) {
      dispatch(getRestaurantExpenseType(restaurantId));
    }
    if (isBranchAdmin || isBranchUser) {
      dispatch(getRestaurantExpenseType(restaurantId));
      dispatch(getAllExpenses(state));
    }
    if (isSuperAdmin) {
      dispatch(getAllexpenseTypes());
    }
  };

  console.log("restaurantExpenseTypes", restaurantExpenseTypes);

  const importData = () => {
    if (isRestaurantAdmin) {
      return superadminExpenseTypes.filter((item) => {
        return (
          restaurantExpenseTypes.findIndex((data) => {
            return data.expenseType === item.expenseType;
          }) < 0
        );
      });
    } else {
      return restaurantExpenseTypes;
    }
  };
  const onAdd = (data) => {
    if (open === "Add") {
      dispatch(
        createExpense({
          ...data,
          role: role,
          // branchId: branchId || data.branchId,

          ...(currRestaurantId && { restaurantId: restaurantId }),
          ...(currBranchId && { branchId: currBranchId }),
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            toggleAdd();
            dispatch(showSnackBar("Expense created successfully"));
            getAllData();
          } else {
            dispatch(
              showSnackBar(
                getErrorMessage(res) || "Failed to Add Cateogry",
                "error"
              )
            );
          }
        })
        .catch((err) => {
          dispatch(
            showSnackBar(
              getErrorMessage(err) || "Failed to Add Cateogry",
              "error"
            )
          );
        });
    }
    if (open === "Edit") {
      dispatch(
        updateExpense({
          ...actionData,
          ...data,
          role: role,
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(showSnackBar("Cateogry Updated Successfully", "success"));
            getAllData();

            toggleAdd();
          } else {
            dispatch(
              showSnackBar(
                getErrorMessage(res) || "Failed to Update Cateogry",
                "error"
              )
            );
          }
        })
        .catch((err) => {
          console.log("err", err);
          dispatch(
            showSnackBar(
              getErrorMessage(err) || "Failed to Update Cateogry",
              "error"
            )
          );
        });
    }
  };

  const onImport = (data) => {
    dispatch(
      importExpenseTypes({
        restaurantId: restaurantId,
        ...(currBranchId && { branchId: branchId }),
        data: data.map((item) => {
          return {
            ...item,
            restaurantId: restaurantId,
            ...(currBranchId && { branchId: branchId }),
          };
        }),
      })
    )
      .then((res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("Expense Imported successfully"));
          getAllData();

          setImportOpen(false);
        } else {
          dispatch(
            showSnackBar(
              getErrorMessage(res) || "Failed to Import Cateogry",
              "error"
            )
          );
        }
      })
      .catch((err) => {
        dispatch(
          showSnackBar(
            getErrorMessage(err) || "Failed to Import Cateogry",
            "error"
          )
        );
      });
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
          if (isBranchAdmin) {
            dispatch(getRestaurantExpenseType(restaurantId, undefined, "true"));
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

  const restauranttableheaders = [
    { title: "Expense Type", key: "expenseType" },

    { title: "Include quantity", key: "includeQuantity", type: "boolean" },

    { title: "Status", key: "status" },
    // {
    //   title: "Status",
    //   key: "status",
    // },
  ];

  const branchtableheaders = [
    { title: "Expense Title", key: "expenseTitle" },
    { title: "Expense Type", key: "expenseType" },
    { title: "Quantity", key: "quantity" },

    { title: "Expense Price", key: "expensePrice", isCurrency: true },
  ];
  const headers = isRestaurantAdmin
    ? restauranttableheaders
    : branchtableheaders;

  const defaultValues = {
    restaurantId: restaurantId,
  };

  const DatePicker = (action) => (
    <div class="">
      <DateRangePicker
        initialSettings={{
          startDate: start.toDate(),
          endDate: end.toDate(),

          locale: {
            format: DATEFORMAT,
          },
          maxDate: new Date(),

          ranges: dateRanges,
        }}
        onCallback={handleCallback}
      >
        <input type="text" class="form-control" />
      </DateRangePicker>
    </div>
  );

  const headerComponents = {
    restaurantadmin: [
      // ...[BranchFilter],
      ...(!currBranchId ? [ImportAction] : []),
    ],
    branchadmin: [DatePicker],
  };
  React.useEffect(() => {
    getAllData();
    // isRestaurantAdmin && dispatch(getAllexpenseTypes());
    // isBranchAdmin && dispatch(getRestaurantExpenseType(restaurantId));
  }, [state]);

  return (
    <>
      <div class="page-content-tab">
        {!isSuperAdmin && (
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
        )}
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
          headAction={AddAction}
          actions={[EditAction, DeleteAction]}
          tableData={expenses}
          headers={headers}
          sortable={true}
          paginated={true}
          searchByLabel={isRestaurantAdmin ? "Expense Type" : "Expense Title"}
          searchByField={isRestaurantAdmin ? "expenseType" : "expenseTitle"}
          rowsPerPage={5}
        />
      </div>
    </>
  );
};

export default ManageExpense;
