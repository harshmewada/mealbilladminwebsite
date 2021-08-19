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
  deleteTableType,
  createTableType,
  updateTableType,
  getAllTableTypes,
} from "../../redux/action/tableActions";
import { getAllBranches } from "../../redux/action/branchActions";
import getErrorMessage from "../../helpers/getErrorMessage";
const PageTitle = "Table Types";

const ManageTableTypes = () => {
  const { tableTypes } = useSelector((state) => state.common);

  const { role, restaurantId, branchId } = useSelector((state) => state.user);

  const formData = [
    {
      type: "text",
      name: "tableTypeName",
      label: "Table Type ",
      placeholder: "Enter Table Type ",
      required: true,

      rules: {
        required: {
          value: true,
          message: "Table Type is required",
        },
      },
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
    dispatch(deleteTableType(actionData.id))
      .then((res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("Deleted succesfully"));
          dispatch(getAllTableTypes());
        } else {
          dispatch(
            showSnackBar(
              getErrorMessage(res) || "Failed to delete Table Type",
              "error"
            )
          );
        }
      })
      .catch((err) => {
        console.log("err", err);
        dispatch(
          showSnackBar(
            getErrorMessage(err) || "Failed to delete Table Type",
            "error"
          )
        );
      });
  };

  const onAdd = (data) => {
    if (open === "Add") {
      dispatch(
        createTableType({
          ...data,
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            toggleAdd();
            dispatch(showSnackBar("Table Type created successfully"));
            dispatch(getAllTableTypes());
          } else {
            dispatch(
              showSnackBar(
                getErrorMessage(res) || "Failed to create Table Type",
                "error"
              )
            );
          }
        })
        .catch((err) => {
          console.log("err", err);
          dispatch(
            showSnackBar(
              getErrorMessage(err) || "Failed to create Table type",
              "error"
            )
          );
        });
    }
    if (open === "Edit") {
      dispatch(
        updateTableType({
          ...actionData,
          ...data,
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(
              showSnackBar("Table type Updated Successfully", "success")
            );
            dispatch(getAllTableTypes());
            toggleAdd();
          } else {
            dispatch(
              showSnackBar(
                getErrorMessage(res) || "Failed to update Table type",
                "error"
              )
            );
          }
        })
        .catch((err) => {
          console.log("err", err);
          dispatch(
            showSnackBar(
              getErrorMessage(err) || "Failed to update Table type",
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
    { title: "Table Type", key: "tableTypeName" },
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
    dispatch(getAllTableTypes());

    // dispatch(getAllTableTypes());
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
          headActions={[AddAction]}
          actions={[EditAction, DeleteAction]}
          tableData={tableTypes}
          headers={headers}
        />
      </div>
    </>
  );
};

export default ManageTableTypes;
