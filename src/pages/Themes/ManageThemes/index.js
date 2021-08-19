import React from "react";
import AddModal from "./AddModal";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../../redux/action/snackActions";
import SmartTable from "../../../components/common/SmartTable";
import {
  createTheme,
  deleteTheme,
  getAllThemes,
  updateTheme,
} from "../../../redux/action/commonActions";
import DeleteModal from "../../../components/common/Modals/DeleteModal";

import AddCommonAction from "../../../components/common/Actions/AddCommonAction";
import EditCommonAction from "../../../components/common/Actions/EditAction";
import DeleteCommonAction from "../../../components/common/Actions/DeleteCommonAction";

const PageTitle = "Themes";

const ManageThemes = () => {
  const dispatch = useDispatch();
  const themes = useSelector((state) => state.common.themes);

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
    dispatch(deleteTheme(actionData.id)).then((res) => {
      if (res.payload.status === 200) {
        toggleAdd();
        dispatch(showSnackBar("Deleted succesfully"));
        dispatch(getAllThemes());
      }
    });
  };

  const onAdd = (data) => {
    if (open === "Add") {
      dispatch(createTheme(data)).then((res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("Theme created successfully"));
          dispatch(getAllThemes());
        }
      });
    }
    if (open === "Edit") {
      dispatch(
        updateTheme({
          ...actionData,
          ...data,
        })
      ).then((res) => {
        if (res.payload.status === 200) {
          dispatch(showSnackBar("Theme Updated Successfully", "success"));
          dispatch(getAllThemes());
          toggleAdd();
        } else {
          dispatch(showSnackBar("Failed to Update Theme", "error"));
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
    <EditCommonAction onClick={() => handleEdit(action.data)} />
  );

  const DeleteAction = (action) => (
    <DeleteCommonAction onClick={() => handleDelete(action.data)} />
  );

  const tableData = [
    {
      name: "Res 1",
      branchCount: 0,
      totalUsers: 5,
      startDate: "10/20/2020",
      endDate: "10/20/2020",
    },
  ];
  const headers = [
    { title: "Theme Name", key: "themeName" },

    { title: "Primary Color", key: "primaryColor" },
    { title: "Secondary Color", key: "secondaryColor" },
    { title: "Status", key: "status" },
  ];
  React.useEffect(() => {
    dispatch(getAllThemes());
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
          headActions={[AddAction]}
          actions={[EditAction, DeleteAction]}
          tableData={themes}
          headers={headers}
        />
      </div>
    </>
  );
};

export default ManageThemes;
