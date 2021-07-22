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
import SubExpensesModal from "../../components/common/Modals/SubExpensesTypesModal";
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

  const handleAddSubExpense = (data) => {
    toggleAdd("sub");
    setActionData(data);
  };

  const onAddNewSubExpenses = (e) => {
    if (open === "sub") {
      dispatch(
        updateExpenseType(
          {
            ...actionData,
            ...e,
            // ...data,
          },
          () => {
            dispatch(getAllexpenseTypes());
            toggleAdd();
          }
        )
      );
    }
  };
  const onAdd = (data) => {
    if (open === "Add") {
      dispatch(
        createExpenseType(
          {
            ...data,
          },
          dispatch(getAllexpenseTypes())
        )
      );
    }
    if (open === "Edit") {
      dispatch(
        updateExpenseType(
          {
            ...actionData,
            ...data,
          },
          () => {
            dispatch(getAllexpenseTypes());
            toggleAdd();
          }
        )
      );
    }
  };

  const confirmDelete = (data) => {
    dispatch(
      deleteExpenseType(actionData.id, () => {
        dispatch(getAllexpenseTypes());
      })
    );
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
  const AddSubExpenseAction = (action) => {
    return (
      <AddCommonAction
        onClick={() => handleAddSubExpense(action.data)}
        title={"Sub Expense Types"}
      />
    );
  };

  const headers = [
    { title: "Expense Type", key: "expenseType" },
    { title: "Include quantity", key: "includeQuantity", type: "boolean" },
    {
      title: "SubExpenseCount",
      key: "SubExpenseCount",
      renderRow: (e) => e?.subExpenseTypes?.length || 0,
    },
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
        <SubExpensesModal
          open={open === "sub" || open === "subEdit"}
          onClose={() => toggleAdd()}
          mode={open}
          data={actionData}
          onSubmit={(e) => onAddNewSubExpenses(e)}
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
          headerComponents={headerComponents[role]}
          title={PageTitle}
          headAction={AddAction}
          actions={[EditAction, DeleteAction, AddSubExpenseAction]}
          tableData={expenseTypes}
          headers={headers}
        />
      </div>
    </>
  );
};

export default ManageExpenseTypes;
