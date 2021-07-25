import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../redux/action/snackActions";
import SmartTable from "../../components/common/SmartTable";

import DeleteModal from "../../components/common/Modals/DeleteModal";
import AddCommonAction from "../../components/common/Actions/AddCommonAction";
import EditCommonAction from "../../components/common/Actions/EditAction";
import DeleteCommonAction from "../../components/common/Actions/DeleteCommonAction";
import CommonAddModal from "../../components/common/Modals/ExpenseAddModal";

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
import { DATEFORMAT, dateRanges } from "../../contants";

const ManageExpense = () => {
  const { expenses: arraycat, restaurantExpenseTypes } = useSelector(
    (state) => state.branch
  );
  const { role, restaurantId, branchId } = useSelector((state) => state.user);

  const isBranchAdmin = ["branchadmin"].includes(role);

  const isBranchUser = ["branchuser"].includes(role);

  const PageTitle = "Expenses";

  const [open, setOpen] = React.useState();

  const [importOpen, setImportOpen] = React.useState();

  const currRestaurantId = restaurantId || undefined;

  const currBranchId = branchId;
  const expenses = arraycat;

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
    // console.log("founddata data edit", data);
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
    if (isBranchAdmin || isBranchUser) {
      dispatch(getRestaurantExpenseType(restaurantId));
      dispatch(getAllExpenses(state));
    }
  };

  console.log("restaurantExpenseTypes", restaurantExpenseTypes);

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

  const AddAction = () => {
    return (
      <AddCommonAction onClick={() => toggleAdd("Add")} title={PageTitle} />
    );
  };

  const EditAction = (action) => (
    <EditCommonAction onClick={() => handleEdit(action.data)} />
  );

  const DeleteAction = (action) => (
    <DeleteCommonAction onClick={() => handleDelete(action.data)} />
  );

  const branchtableheaders = [
    {
      title: "Expense Type",
      key: "expenseType",
      renderRow: (row) =>
        row.subExpenseType
          ? `${row.expenseType} (${row.subExpenseType})`
          : row.expenseType,
    },
    { title: "Expense Title", key: "expenseTitle" },

    {
      title: "Quantity",
      key: "quantity",
      renderRow: (row) =>
        row.quantityType
          ? `${row.quantity} (${row.quantityType})`
          : row.quantity,
    },

    { title: "Expense Net Amount", key: "expensePrice", isCurrency: true },
    { title: "CGST", key: "cgst", isCurrency: true },

    { title: "SGST", key: "sgst", isCurrency: true },
    { title: "Total Expense Amount", key: "expenseTotal", isCurrency: true },
    {
      title: "Attachment",
      key: "attachment",
      type: "image",
      sourceUrl: RootUrl,
    },
  ];
  const headers = branchtableheaders;

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
    branchadmin: [DatePicker],
  };
  React.useEffect(() => {
    getAllData();
  }, [state]);

  return (
    <>
      <div class="page-content-tab">
        <CommonAddModal
          title={PageTitle}
          open={open === "Add" || open === "Edit"}
          onClose={() => toggleAdd()}
          mode={open}
          onSubmit={(e) => onAdd(e)}
          data={actionData}
          restaurantExpenseTypes={restaurantExpenseTypes}
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
          searchByLabel={"Expense Title"}
          searchByField={"expenseTitle"}
          rowsPerPage={5}
        />
      </div>
    </>
  );
};

export default ManageExpense;
