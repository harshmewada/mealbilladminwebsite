import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../../redux/action/snackActions";
import SmartTable from "../../../components/common/SmartTable";

import DeleteModal from "../../../components/common/Modals/DeleteModal";
import EditCommonAction from "../../../components/common/Actions/EditAction";
import AddCommonAction from "../../../components/common/Actions/AddCommonAction";
import DeleteCommonAction from "../../../components/common/Actions/DeleteCommonAction";
import CommonAddModal from "../../../components/common/Modals/CommonAddModal";
import {
  createTable,
  deleteTable,
  updateTable,
  getAllTables,
} from "../../../redux/action/tableActions";
import { getAllTableTypes } from "../../../redux/action/commonActions";
import { getAllBranches } from "../../../redux/action/branchActions";
import getErrorMessage from "../../../helpers/getErrorMessage";
const PageTitle = "Tables";

const ManageTables = () => {
  const { tables } = useSelector((state) => state.branch);
  const { tableTypes } = useSelector((state) => state.common);

  const { role, restaurantId, branchId } = useSelector((state) => state.user);
  const branches = useSelector((state) => state.branch.allBranches);

  const isbranchselectorVisible = ["restaurantadmin"].includes(role);
  const [selectedBranch, setSelectedBranch] = React.useState(branches[0]);
  const currBranchId = branchId || selectedBranch;

  const formData = [
    {
      type: isbranchselectorVisible ? "select" : "none",
      name: "branchId",
      label: "Branch",
      options: branches,
      optionLabelProp: "branchName",
      optionValueProp: "_id",
      hideAt: "Edit",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Branch Name is required",
        },
      },
    },

    {
      type: "select",
      name: "tableTypeId",
      label: "Table Type",
      options: tableTypes,
      optionLabelProp: "tableTypeName",
      optionValueProp: "tableTypeId",
    },

    {
      type: "number",
      name: "tableNumber",
      label: "Table Number",
      placeholder: "Type Table Number",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Table Number is required",
        },
      },
    },

    {
      type: "number",
      name: "tablePrice",
      label: "Extra Price",
      placeholder: "Type Extra Price",
      required: true,

      rules: {
        required: {
          value: true,
          message: "Extra Priceis required",
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
    dispatch(deleteTable(actionData))
      .then((res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("Deleted succesfully"));
          dispatch(getAllTables(restaurantId, branchId));
        } else {
          dispatch(
            showSnackBar(
              getErrorMessage(res) || "Failed to delete Table",
              "error"
            )
          );
        }
      })
      .catch((err) => {
        console.log("err", err);
        dispatch(
          showSnackBar(
            getErrorMessage(err) || "Failed to delete Table",
            "error"
          )
        );
      });
  };

  const onAdd = (data) => {
    if (open === "Add") {
      dispatch(
        createTable({
          ...data,
          restaurantId,
          branchId: branchId || data.branchId,
          tableType: tableTypes.find((y) => y.tableTypeId == data.tableTypeId)
            ?.tableTypeName,
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            toggleAdd();
            dispatch(showSnackBar("Table created successfully"));
            dispatch(getAllTables(restaurantId, branchId));
          } else {
            dispatch(
              showSnackBar(
                getErrorMessage(res) || "Failed to create Table",
                "error"
              )
            );
          }
        })
        .catch((err) => {
          console.log("err", err);
          dispatch(
            showSnackBar(
              getErrorMessage(err) || "Failed to create Table",
              "error"
            )
          );
        });
    }
    if (open === "Edit") {
      dispatch(
        updateTable({
          ...actionData,
          ...data,
          restaurantId,
          branchId,
          tableType: tableTypes.find((y) => y.tableTypeId == data.tableTypeId)
            ?.tableTypeName,
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(showSnackBar("Hotkey Updated Successfully", "success"));
            dispatch(getAllTables(restaurantId, branchId));
            toggleAdd();
          } else {
            dispatch(
              showSnackBar(
                getErrorMessage(res) || "Failed to update Table",
                "error"
              )
            );
          }
        })
        .catch((err) => {
          console.log("err", err);
          dispatch(
            showSnackBar(
              getErrorMessage(err) || "Failed to update Table",
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
    { title: "Table Number", key: "tableNumber" },

    { title: "Table Type", key: "tableType" },
    { title: "Extra Price", key: "tablePrice" },

    { title: "Status", key: "status" },
  ];

  const defaultValues = {
    // restaurantId: restaurantId,
    tablePrice: 0,
  };

  const BranchFilter = (action) => (
    <div class="">
      <select
        name="status"
        class="form-control"
        defaultValue="true"
        required
        value={selectedBranch}
        onChange={(e) => setSelectedBranch(e.target.value)}
      >
        {branches.map((res, resindex) => {
          return (
            <option key={resindex} value={res._id}>
              {res.branchName}
            </option>
          );
        })}
      </select>
    </div>
  );

  const headerComponents = {
    restaurantadmin: [BranchFilter],
  };

  React.useEffect(() => {
    dispatch(getAllTables(restaurantId, currBranchId));
    dispatch(getAllBranches(restaurantId));

    // dispatch(getAllTableTypes());
  }, [selectedBranch]);
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
          tableData={tables}
          headers={headers}
        />
      </div>
    </>
  );
};

export default ManageTables;
