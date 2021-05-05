import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../redux/action/snackActions";
import SmartTable from "../../components/common/SmartTable";

import DeleteModal from "../../components/common/Modals/DeleteModal";
import EditCommonAction from "../../components/common/Actions/EditAction";
import AddCommonAction from "../../components/common/Actions/AddCommonAction";
import DeleteCommonAction from "../../components/common/Actions/DeleteCommonAction";
import CommonAddModal from "../../components/common/Modals/CommonAddModal";

import getErrorMessage from "../../helpers/getErrorMessage";
import {
  createCategoryType,
  deleteCategoryType,
  getAllCategoryTypes,
  updateCategoryType,
} from "../../redux/action/categoryActions";
import { RootUrl } from "../../redux/types";
const PageTitle = "Cateogry Types";

const ManageTableTypes = () => {
  const { categoryTypes } = useSelector((state) => state.common);

  const { role, restaurantId, branchId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState();
  const [actionData, setActionData] = React.useState();
  const formData = [
    {
      type: "text",
      name: "categoryName",
      label: "Category Name ",
      placeholder: "Enter Category Name ",
      required: true,

      rules: {
        required: {
          value: true,
          message: "Category Name is required",
        },
      },
    },
    {
      type: "file",
      name: "categoryImage",
      label: "Category image",
      placeholder: "Type Category image",
      required: open === "Add" && true,
      ...(open === "Add" && {
        rules: {
          required: {
            value: true,
            message: "Category Name is required",
          },
        },
      }),
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
    dispatch(deleteCategoryType(actionData.id))
      .then((res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("Deleted succesfully"));
          dispatch(getAllCategoryTypes());
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
        createCategoryType({
          ...data,
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            toggleAdd();
            dispatch(showSnackBar("Table created successfully"));
            dispatch(getAllCategoryTypes());
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
              getErrorMessage(err) || "Failed to create Table",
              "error"
            )
          );
        });
    }
    if (open === "Edit") {
      dispatch(
        updateCategoryType({
          ...actionData,
          ...data,
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(showSnackBar("Hotkey Updated Successfully", "success"));
            dispatch(getAllCategoryTypes());
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
    { title: "Category Type", key: "categoryName" },
    {
      title: "Category image",
      key: "categoryImage",
      type: "image",
      sourceUrl: RootUrl,
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
    dispatch(getAllCategoryTypes());

    // dispatch(getAllCategoryTypes());
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
          tableData={categoryTypes}
          headers={headers}
        />
      </div>
    </>
  );
};

export default ManageTableTypes;
