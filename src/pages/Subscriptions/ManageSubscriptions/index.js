import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../../redux/action/snackActions";
import SmartTable from "../../../components/common/SmartTable";
import {
  createSubscription,
  deleteSubscription,
  deleteTheme,
  getAllSubscriptions,
  updateSubscription,
} from "../../../redux/action/commonActions";
import DeleteModal from "../../../components/common/Modals/DeleteModal";

import AddCommonAction from "../../../components/common/Actions/AddCommonAction";
import EditCommonAction from "../../../components/common/Actions/EditAction";
import DeleteCommonAction from "../../../components/common/Actions/DeleteCommonAction";
import CommonAddModal from "../../../components/common/Modals/CommonAddModal";

const PageTitle = "Subscriptions";

const ManageSubscriptions = () => {
  const dispatch = useDispatch();
  const subscriptions = useSelector((state) => state.common.subscriptions);

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
    console.log("edit", data);
    setActionData(data);
  };

  const handleDelete = (data) => {
    toggleAdd("Delete");
    setActionData(data);
  };

  const confirmDelete = (data) => {
    dispatch(deleteSubscription(actionData._id)).then((res) => {
      if (res.payload.status === 200) {
        toggleAdd();
        dispatch(showSnackBar("Deleted succesfully"));
        dispatch(getAllSubscriptions());
      }
    });
  };
  const onAdd = (data) => {
    if (open === "Add") {
      dispatch(createSubscription(data)).then((res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("SubScription created successfully"));
          dispatch(getAllSubscriptions());
        }
      });
    }
    if (open === "Edit") {
      dispatch(
        updateSubscription({
          ...actionData,
          ...data,
        })
      ).then((res) => {
        if (res.payload.status === 200) {
          dispatch(
            showSnackBar("SubScription Updated Successfully", "success")
          );
          dispatch(getAllSubscriptions());
          toggleAdd();
        } else {
          dispatch(showSnackBar("Failed to Update Subscription", "error"));
        }
      });
    }
  };

  const AddAction = () => {
    return (
      <AddCommonAction onClick={() => toggleAdd("Add")} title={PageTitle} />
    );
  };

  const EditAction = (action) => (
    <EditCommonAction onClick={() => handleEdit(action.data.subscription)} />
  );

  const DeleteAction = (action) => (
    <DeleteCommonAction
      onClick={() => handleDelete(action.data.subscription)}
    />
  );

  const headers = [
    { title: "Subscription Name", key: "subscriptionName" },

    { title: "Duration (Months)", key: "subscriptionDuration" },
    { title: "Amount", key: "subscriptionAmount", isCurrency: true },
    { title: "Allowed Branches", key: "allowedBranches" },
    { title: "Allowed Users", key: "allowedUsers" },

    { title: "Subscribers", key: "subscribers" },
    { title: "Status", key: "status" },
  ];
  React.useEffect(() => {
    dispatch(getAllSubscriptions());
  }, []);

  const formData = [
    {
      type: "text",
      name: "subscriptionName",
      label: "Subscription Name",
      size: 3,

      placeholder: "Type Subscription Name",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Subscription Name is required",
        },
      },
    },
    {
      type: "number",
      name: "subscriptionAmount",
      label: "Subscription Amount",
      size: 3,

      placeholder: "Type Subscription Amount",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Subscription Amount is required",
        },
      },
    },
    {
      type: "number",
      name: "subscriptionDuration",
      label: "Subscription Duration",
      size: 3,

      placeholder: "Type Subscription Duration",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Subscription Duration is required",
        },
        maxLength: {
          value: 2,
          message: "Please select lesser duration , maximum allowed 99",
        },
      },
    },
    {
      type: "number",
      name: "allowedBranches",
      label: "Allowed Branches",
      size: 3,

      placeholder: "Type Number of allowed branches",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Allowed Branches is required",
        },
        maxLength: {
          value: 2,
          message: "Please select lesser duration , maximum allowed 99",
        },
      },
    },
    {
      type: "number",
      name: "allowedUsers",
      label: "Allowed Users",
      size: 3,

      placeholder: "Type Number of allowed Users",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Allowed Users is required",
        },
        maxLength: {
          value: 2,
          message: "Please select lesser duration , maximum allowed 99",
        },
      },
    },

    {
      type: "select",
      name: "status",
      size: 3,

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
          message: "Branch Name is required",
        },
      },
    },
  ];

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
          defaultValue={{}}
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
          headAction={AddAction}
          actions={[EditAction, DeleteAction]}
          tableData={subscriptions}
          headers={headers}
        />
      </div>
    </>
  );
};

export default ManageSubscriptions;
