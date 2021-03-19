import React from "react";
import AddModal from "./AddModal";
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
    { title: "Subscribers", key: "subscribers" },
  ];
  React.useEffect(() => {
    dispatch(getAllSubscriptions());
  }, []);

  return (
    <>
      <div class="page-content-tab">
        <AddModal
          open={open === "Add" || open === "Edit"}
          onClose={() => toggleAdd()}
          onSubmit={(e) => onAdd(e)}
          mode={open}
          data={actionData}
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
