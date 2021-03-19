import React from "react";
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
import EditCommonAction from "../../../components/common/Actions/EditAction";
import AddCommonAction from "../../../components/common/Actions/AddCommonAction";
import DeleteCommonAction from "../../../components/common/Actions/DeleteCommonAction";
import CommonAddModal from "../../../components/common/Modals/CommonAddModal";
import { getAllCategories } from "../../../redux/action/categoryActions";
import {
  createItem,
  deleteItem,
  getAllItems,
  updateItem,
} from "../../../redux/action/itemActions";
import { RootUrl } from "../../../redux/types";
import { getAllBranches } from "../../../redux/action/branchActions";
import getErrorMessage from "../../../helpers/getErrorMessage";

const PageTitle = "Items";

const ManageItems = () => {
  const { categories, items } = useSelector((state) => state.branch);
  const { role, restaurantId, branchId } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState();

  const branches = useSelector((state) => state.branch.allBranches);
  const [selectedBranch, setSelectedBranch] = React.useState(branchId || "all");
  const currBranchId = branchId || selectedBranch;
  const isbranchselectorVisible = ["restaurantadmin"].includes(role);

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
      name: "itemName",
      label: "Item Name",
      placeholder: "Type Item Name",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Item Name is required",
        },
      },
    },
    {
      type: "file",
      name: "itemImage",
      label: "Item image",
      ...(open === "Add" && {
        rules: {
          required: {
            value: true,
            message: "Item image is required",
          },
        },
      }),
    },
    {
      type: "text",
      name: "itemPrice",
      label: "Item Price",
      placeholder: "Type Item Price",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Item Price is required",
        },
      },
    },
    {
      type: "select",
      name: "categoryId",
      label: "Category",
      options: categories,
      optionLabelProp: "categoryName",
      optionValueProp: "id",
      defaultOption: () => (
        <option value={""} selected>
          Common
        </option>
      ),
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

  const [actionData, setActionData] = React.useState();

  const toggleAdd = (mode) => {
    setOpen(mode);
    if (mode === undefined) {
      setActionData({});
    }
  };

  const handleEdit = (data) => {
    toggleAdd("Edit");
    delete data.itemImage;

    setActionData(data);
  };

  const handleDelete = (data) => {
    toggleAdd("Delete");
    setActionData(data);
  };

  const confirmDelete = (data) => {
    dispatch(deleteItem(actionData)).then((res) => {
      if (res.payload.status === 200) {
        toggleAdd();
        dispatch(showSnackBar("Item Deleted succesfully"));
        dispatch(getAllItems(restaurantId, currBranchId));
      }
    });
  };

  const onAdd = (data) => {
    if (open === "Add") {
      if (data.categoryId === "") {
        delete data.categoryId;
      }
      dispatch(
        createItem({
          ...data,
          restaurantId: restaurantId,
          branchId: branchId || data.branchId,
          ...(typeof data?.itemImage[0] !== "string" && {
            itemImage: data?.itemImage[0],
          }),
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            toggleAdd();
            dispatch(showSnackBar("Item created successfully"));
            dispatch(getAllItems(restaurantId, currBranchId));
          } else {
            dispatch(
              showSnackBar(
                getErrorMessage(res) || "Failed to Add Item",
                "error"
              )
            );
          }
        })
        .catch((err) => {
          console.log("err", err);
          dispatch(
            showSnackBar(getErrorMessage(err) || "Failed to Add Item", "error")
          );
        });
    }
    if (open === "Edit") {
      if (data.categoryId === "") {
        delete data.categoryId;
      }
      dispatch(
        updateItem({
          ...actionData,
          ...data,
          ...(typeof data?.itemImage[0] !== "string" && {
            itemImage: data?.itemImage[0],
          }),
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(showSnackBar("Item Updated Successfully", "success"));
            dispatch(getAllItems(restaurantId, currBranchId));
            toggleAdd();
          } else {
            dispatch(
              showSnackBar(
                getErrorMessage(res) || "Failed to Update Item",
                "error"
              )
            );
          }
        })
        .catch((err) => {
          console.log("err", err);
          dispatch(
            showSnackBar(
              getErrorMessage(err) || "Failed to Update Item",
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
    { title: "Item Name", key: "itemName" },

    {
      title: "Item Image",
      key: "itemImage",
      type: "image",
      sourceUrl: RootUrl,
    },
    { title: "Price", key: "itemPrice" },
    { title: "Category", key: "categoryName" },

    { title: "Status", key: "status" },
  ];

  const defaultValues = {
    // restaurantId: restaurantId,
  };

  React.useEffect(() => {
    dispatch(getAllCategories(restaurantId, currBranchId));
    dispatch(getAllItems(restaurantId, currBranchId));
    dispatch(getAllBranches(restaurantId));
  }, [selectedBranch]);

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
          tableData={items}
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

export default ManageItems;
