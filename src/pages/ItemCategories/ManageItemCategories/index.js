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
  getAllCategoryTypes,
  updateCategory,
  importCategories,
  getBranchCategories,
  getRestaurantCategories,
} from "../../../redux/action/categoryActions";
import { RootUrl } from "../../../redux/types";
import { getAllBranches } from "../../../redux/action/branchActions";
import getErrorMessage from "../../../helpers/getErrorMessage";
import CommonImportModal from "../../../components/common/Modals/CommonImportModal";
import ImportCommonAction from "../../../components/common/Actions/ImportCommonAction";

const PageTitle = "Categories";

const ManageItemCategories = () => {
  const { categories: arraycat, restaurantCategories } = useSelector(
    (state) => state.branch
  );
  const { role, restaurantId, branchId } = useSelector((state) => state.user);

  const branches = useSelector((state) => state.branch.allBranches);

  const categoryTypes = useSelector((state) => state.common.categoryTypes);
  const isRestaurantAdmin = ["restaurantadmin"].includes(role);
  const isBranchAdmin = ["branchadmin"].includes(role);

  const isSuperAdmin = ["superadmin"].includes(role);

  const [open, setOpen] = React.useState();

  const [importOpen, setImportOpen] = React.useState();

  const [selectedBranch, setSelectedBranch] = React.useState(branchId);

  const currRestaurantId = restaurantId || undefined;

  const currBranchId = branchId || selectedBranch;
  const categories = isBranchAdmin
    ? arraycat
    : isRestaurantAdmin
      ? restaurantCategories
      : arraycat;

  const formData = [
    // {
    //   type: isRestaurantAdmin ? "select" : "none",
    //   name: "branchId",
    //   label: "Branch",
    //   options: branches,
    //   optionLabelProp: "branchName",
    //   optionValueProp: "_id",
    //   hideAt: "Edit",
    //   required: true,
    //   rules: {
    //     required: {
    //       value: true,
    //       message: "Branch Name is required",
    //     },
    //   },
    // },

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
    setActionData(data);
  };

  const handleDelete = (data) => {
    toggleAdd("Delete");
    setActionData(data);
  };

  const confirmDelete = (data) => {
    dispatch(deleteCategory({ ...actionData, role: role }))
      .then((res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("Deleted succesfully"));
          getAllData();
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

  const getAllData = (selectedBranch) => {
    if (isRestaurantAdmin) {
      dispatch(getRestaurantCategories(restaurantId));
    }
    if (isBranchAdmin) {
      dispatch(getBranchCategories(restaurantId, branchId));
    }
    if (isSuperAdmin) {
      dispatch(getBranchCategories());
    }
  };

  const importData = () => {
    if (isRestaurantAdmin) {
      return categoryTypes.filter((item) => {
        return (
          restaurantCategories.findIndex((data) => {
            return data.categoryName === item.categoryName;
          }) < 0
        );
      });
    }
    if (isBranchAdmin) {
      return restaurantCategories.filter((item) => {
        return (
          categories.findIndex((data) => {
            return data.categoryName === item.categoryName;
          }) < 0
        );
      });
    }
  };
  const onAdd = (data) => {
    if (open === "Add") {
      dispatch(
        createCategory({
          ...data,
          role: role,
          // branchId: branchId || data.branchId,

          ...(currRestaurantId && { restaurantId: restaurantId }),
          ...(currBranchId && { branchId: currBranchId }),
          ...(typeof data?.categoryImage[0] !== "string" && {
            categoryImage: data?.categoryImage[0],
          }),
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            toggleAdd();
            dispatch(showSnackBar("Category created successfully"));
            getAllData();
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
      if (data.categoryImage) {
        if (data.categoryImage?.length < 1) {
          delete data?.categoryImage;
        } else {
          data.categoryImage = data?.categoryImage[0];
        }
      }
      dispatch(
        updateCategory({
          ...actionData,
          ...data,
          role: role,
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(showSnackBar("Cateogry Updated Successfully", "success"));
            getAllData();

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

  const onImport = (data) => {
    dispatch(
      importCategories({
        restaurantId: restaurantId,
        ...(currBranchId && { branchId: branchId }),
        data: data.map((item) => {
          item.restaurantCateId = item._id || item.id
          delete item.id;
          delete item._id;
          return {
            ...item,

            restaurantId: restaurantId,
            ...(currBranchId && { branchId: branchId }),
          };
        }),
      })
    )
      .then((res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("Category Imported successfully"));
          getAllData();

          setImportOpen(false);
        } else {
          dispatch(
            showSnackBar(
              getErrorMessage(res) || "Failed to Import Cateogry",
              "error"
            )
          );
        }
      })
      .catch((err) => {
        dispatch(
          showSnackBar(
            getErrorMessage(err) || "Failed to Import Cateogry",
            "error"
          )
        );
      });
  };
  const AddAction = () => {
    return (
      <AddCommonAction onClick={() => toggleAdd("Add")} title={PageTitle} />
    );
  };

  const ImportAction = () => {
    return (
      <ImportCommonAction
        onClick={() => {
          if (isRestaurantAdmin) {
            dispatch(getAllCategoryTypes(undefined, "true"));
          }
          if (isBranchAdmin) {
            dispatch(getRestaurantCategories(restaurantId, "true"));
          }
          setImportOpen(true);
        }}
        title={PageTitle}
      />
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
    {
      title: "Status",
      key: "status",
    },
    // { title: "Total Items", key: "totalItems" },
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
        onChange={(e) => {
          if (e.target.value === "all") {
            return setSelectedBranch(undefined);
          } else {
            setSelectedBranch(e.target.value);
          }
        }}
      >
        <option value={""} selected>
          This Restaurant
        </option>
        {branches.map((res, resindex) => {
          return (
            <option key={resindex} value={res._id || res.id}>
              {res.branchName}
            </option>
          );
        })}
      </select>
    </div>
  );

  const headerComponents = {
    restaurantadmin: [
      // ...[BranchFilter],
      ...(!currBranchId ? [ImportAction] : []),
    ],
    branchadmin: [ImportAction],
  };
  React.useEffect(() => {
    getAllData(selectedBranch);
    isRestaurantAdmin && dispatch(getAllBranches(restaurantId));
  }, [selectedBranch]);

  return (
    <>
      <div class="page-content-tab">
        {!isSuperAdmin && (
          <CommonImportModal
            headers={headers}
            open={importOpen}
            title={PageTitle}
            data={importData()}
            onClose={() => setImportOpen(false)}
            onSubmit={(data) => {
              onImport(data);
            }}
          />
        )}
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
          searchByLabel={"Category name"}
          searchByField={"categoryName"}
          rowsPerPage={5}
        />
      </div>
    </>
  );
};

export default ManageItemCategories;
