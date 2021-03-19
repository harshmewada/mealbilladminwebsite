import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../../redux/action/snackActions";
import SmartTable from "../../../components/common/SmartTable";

import DeleteModal from "../../../components/common/Modals/DeleteModal";
import AddCommonAction from "../../../components/common/Actions/AddCommonAction";
import EditCommonAction from "../../../components/common/Actions/EditAction";
import DeleteCommonAction from "../../../components/common/Actions/DeleteCommonAction";
import CommonAddModal from "../../../components/common/Modals/CommonAddModal";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../../../redux/action/categoryActions";
import { RootUrl } from "../../../redux/types";
import { getAllBranches } from "../../../redux/action/branchActions";
import getErrorMessage from "../../../helpers/getErrorMessage";

const PageTitle = "Categories";

const ManageItemCategories = () => {
  const categories = useSelector((state) => state.branch.categories);
  const { role, restaurantId, branchId } = useSelector((state) => state.user);

  const branches = useSelector((state) => state.branch.allBranches);
  const isbranchselectorVisible = ["restaurantadmin"].includes(role);
  const [open, setOpen] = React.useState();
  const [selectedBranch, setSelectedBranch] = React.useState(branchId || "all");
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
      type: "text",
      name: "categoryName",
      label: "Category Name",
      placeholder: "Type Category Name",
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
    delete data.categoryImage;
    setActionData(data);
  };

  const handleDelete = (data) => {
    toggleAdd("Delete");
    setActionData(data);
  };

  const confirmDelete = (data) => {
    dispatch(deleteCategory(actionData))
      .then((res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("Deleted succesfully"));
          dispatch(getAllCategories(restaurantId, branchId));
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
  const usere = useSelector((state) => state.user);
  const onAdd = (data) => {
    console.log(usere);
    if (open === "Add") {
      dispatch(
        createCategory({
          ...data,
          restaurantId: restaurantId,
          branchId: branchId || data.branchId,
          ...(typeof data?.categoryImage[0] !== "string" && {
            categoryImage: data?.categoryImage[0],
          }),
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            toggleAdd();
            dispatch(showSnackBar("Category created successfully"));
            dispatch(getAllCategories(restaurantId, branchId));
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
      if (data.categoryImage.length < 1) {
        delete data.categoryImage;
      } else {
        data.categoryImage = data.categoryImage[0];
      }

      dispatch(
        updateCategory({
          ...actionData,
          ...data,
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(showSnackBar("Cateogry Updated Successfully", "success"));
            dispatch(getAllCategories(restaurantId, branchId));
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

  const headers = [
    { title: "Cateogory Name", key: "categoryName" },

    {
      title: "Category image",
      key: "categoryImage",
      type: "image",
      sourceUrl: RootUrl,
    },
    { title: "Total Items", key: "totalItems" },
  ];

  const defaultValues = {
    restaurantId: restaurantId,
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
        <option value={"all"} selected>
          All Branches
        </option>
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
    dispatch(getAllCategories(restaurantId, currBranchId));
    dispatch(getAllBranches(restaurantId));
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
          title={PageTitle}
          headerComponents={headerComponents[role]}
          headAction={AddAction}
          actions={[EditAction, DeleteAction]}
          tableData={categories}
          headers={headers}
          sortable={true}
          paginated={true}
          searchByLabel={"Item name"}
          searchByField={"itemName"}
          rowsPerPage={5}
        />
      </div>
    </>
  );
};

export default ManageItemCategories;
