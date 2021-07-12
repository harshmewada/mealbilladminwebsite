import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../redux/action/snackActions";
import SmartTable from "../../components/common/SmartTable";

import DeleteModal from "../../components/common/Modals/DeleteModal";
import EditCommonAction from "../../components/common/Actions/EditAction";
import AddCommonAction from "../../components/common/Actions/AddCommonAction";
import DeleteCommonAction from "../../components/common/Actions/DeleteCommonAction";
import CommonAddModal from "../../components/common/Modals/CommonAddModal";
import {
  deleteExpenseType,
  createExpenseType,
  updateExpenseType,
  getAllexpenseTypes,
} from "../../redux/action/expenseActions";
import getErrorMessage from "../../helpers/getErrorMessage";
const PageTitle = "Expense Types";

const ManageExpenseTypes = () => {
  const { expenseTypes } = useSelector((state) => state.common);

  const { role, restaurantId, branchId } = useSelector((state) => state.user);

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

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState();
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
    dispatch(deleteExpenseType(actionData.id))
      .then((res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("Deleted succesfully"));
          dispatch(getAllexpenseTypes());
        } else {
          dispatch(
            showSnackBar(
              getErrorMessage(res) || "Failed to delete Expense Type",
              "error"
            )
          );
        }
      })
      .catch((err) => {
        console.log("err", err);
        dispatch(
          showSnackBar(
            getErrorMessage(err) || "Failed to delete Expense Type",
            "error"
          )
        );
      });
  };

  const onAdd = (data) => {
    if (open === "Add") {
      dispatch(
        createExpenseType({
          ...data,
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            toggleAdd();
            dispatch(showSnackBar("Expense created successfully"));
            dispatch(getAllexpenseTypes());
          } else {
            dispatch(
              showSnackBar(
                getErrorMessage(res) || "Failed to create Expense Type",
                "error"
              )
            );
          }
        })
        .catch((err) => {
          console.log("err", err);
          dispatch(
            showSnackBar(
              getErrorMessage(err) || "Failed to create Expense",
              "error"
            )
          );
        });
    }
    if (open === "Edit") {
      dispatch(
        updateExpenseType({
          ...actionData,
          ...data,
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(showSnackBar("Expense Updated Successfully", "success"));
            dispatch(getAllexpenseTypes());
            toggleAdd();
          } else {
            dispatch(
              showSnackBar(
                getErrorMessage(res) || "Failed to update Expense",
                "error"
              )
            );
          }
        })
        .catch((err) => {
          console.log("err", err);
          dispatch(
            showSnackBar(
              getErrorMessage(err) || "Failed to update Expense",
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

  const headers = [
    { title: "Expense Type", key: "expenseType" },
    { title: "Include quantity", key: "includeQuantity", type: "boolean" },

    { title: "Status", key: "status" },
  ];

  const defaultValues = {
    // restaurantId: restaurantId,
    // tablePrice: 0,
  };

  const headerComponents = {
    restaurantadmin: [],
  };

  React.useEffect(() => {
    dispatch(getAllexpenseTypes());

    // dispatch(getAllexpenseTypes());
  }, []);
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
          headerComponents={headerComponents[role]}
          title={PageTitle}
          headAction={AddAction}
          actions={[EditAction, DeleteAction]}
          tableData={expenseTypes}
          headers={headers}
        />
      </div>
    </>
  );
};

export default ManageExpenseTypes;
