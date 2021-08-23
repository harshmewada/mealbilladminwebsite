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
  getBranchCategories,
  getRestaurantCategories,
} from "../../../redux/action/categoryActions";
import {
  createItem,
  deleteItem,
  getRestaurantItems,
  getBranchItems,
  importItems,
  updateItem,
  clearItems,
  updateItemVariants,
  bulkUploadItems,
} from "../../../redux/action/itemActions";
import { RootUrl } from "../../../redux/types";
import { getAllBranches } from "../../../redux/action/branchActions";
import getErrorMessage from "../../../helpers/getErrorMessage";
import CommonImportModal from "../../../components/common/Modals/CommonImportModal";
import ImportCommonAction from "../../../components/common/Actions/ImportCommonAction";
import ItemVariantsModal from "../../../components/common/Modals/ItemVariantsModal";
import VariantCommonAction from "../../../components/common/Actions/VariantCommonAction";
import BulkUploadCommonAction from "../../../components/common/Actions/BulkUploadCommonAction";
import DownloadButtonAction from "../../../components/common/Actions/DownloadButtonAction";

//sample excel
import SampleXLS from "../../../assets/bulkuploaditemssample.xlsx";

const PageTitle = "Items";

const ManageItems = () => {
  const isLoading = useSelector((state) => state.util.spinner);
  const {
    categories: arraycategories,
    restaurantCategories,
    items,
    restaurantItems: resItems,
  } = useSelector((state) => state.branch);

  const { role, restaurantId, branchId } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState();

  const branches = useSelector((state) => state.branch.allBranches);
  const [selectedBranch, setSelectedBranch] = React.useState(branchId);

  const currBranchId = branchId || selectedBranch;
  const isRestaurantAdmin = ["restaurantadmin"].includes(role);
  const isBranchAdmin = ["branchadmin"].includes(role);
  const isSuperAdmin = ["superadmin"].includes(role);
  const categories = isRestaurantAdmin
    ? selectedBranch
      ? arraycategories
      : restaurantCategories
    : arraycategories;

  const restaurantItems = isRestaurantAdmin
    ? selectedBranch
      ? items
      : resItems
    : items;
  // console.log("selectedBranch", selectedBranch, items, resItems);
  const importData = () => {
    if (isBranchAdmin) {
      const mydata = resItems
        .filter((item) => {
          return items.findIndex((data) => {
            return data.itemName === item.itemName;
          });
        })
        .filter((data) => {
          if (data.categoryName === "-") {
            return data;
          }
          const isInCategory = categories.findIndex((item) => {
            return data.categoryName === item.categoryName;
          });
          return isInCategory >= 0 ? data : false;
        });
      return mydata;
    }
  };
  const [importOpen, setImportOpen] = React.useState();

  const getAllCategories = () => {
    if (isRestaurantAdmin) {
      if (selectedBranch) {
        dispatch(getBranchCategories(restaurantId, selectedBranch, "true"));
        return;
      }
      dispatch(getRestaurantCategories(restaurantId, "true"));
    }
    if (isBranchAdmin) {
      dispatch(getBranchCategories(restaurantId, branchId, "true"));
    }
  };

  const getAllData = () => {
    dispatch(clearItems());

    if (isRestaurantAdmin) {
      if (selectedBranch) {
        dispatch(getBranchItems(selectedBranch));
        return;
      }
      dispatch(getRestaurantItems());
      dispatch(getAllBranches(restaurantId));
    }
    if (isBranchAdmin) {
      dispatch(getBranchItems(branchId));
    }
  };

  const formData = [
    {
      type: "text",
      name: "itemName",
      label: "Item Name",
      size: 4,

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
      size: 4,

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
      type: "select",
      name: "isNonVeg",
      size: 4,

      label: "Item Type",
      options: [
        {
          title: " Veg",
          value: false,
        },
        {
          title: "Non Veg",
          value: true,
        },
      ],
      optionLabelProp: "title",
      optionValueProp: "value",

      required: true,
    },

    {
      type: "text",
      name: "itemPrice",
      size: 3,

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
      type: "text",
      name: "onlinePrice",
      size: 3,

      label: "Item Online Price",
      placeholder: "Type Item  Online Price",
      required: false,
    },
    {
      type: "number",
      name: "hotKey",
      size: 3,

      label: "Hotkey",
      placeholder: "Type Hotkey",
    },
    {
      type: "select",
      name: "categoryId",
      size: 3,

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
      type: "textarea",
      name: "description",
      label: "Item Description",
      size: 12,
      rows: "2",
      placeholder: "Type a short description about the item",
      required: false,
    },
    {
      type: "switch",
      name: "isFeatured",
      label: "Is Item Featured",
      placeholder: "Enter Is Item Featured",
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
    // delete data.itemImage;

    setActionData(data);
  };

  const handleDelete = (data) => {
    toggleAdd("Delete");
    setActionData(data);
  };

  const handleAddVariants = (data) => {
    toggleAdd("sub");
    setActionData(data);
  };

  const confirmDelete = (data) => {
    dispatch(
      deleteItem({
        id: actionData.id || actionData._id,
        ...(currBranchId && { branchId: currBranchId }),
      })
    ).then((res) => {
      if (res.payload.status === 200) {
        toggleAdd();
        dispatch(showSnackBar("Item Deleted succesfully"));
        getAllData();
      }
    });
  };

  const onAdd = (data) => {
    if (open === "Add") {
      if (data.categoryId === "") {
        delete data.categoryId;
        delete data.categoryName;
      }
      dispatch(
        createItem({
          ...data,
          restaurantId: restaurantId,
          ...(currBranchId && { branchId: currBranchId }),
          role: role,
          ...(data?.itemImage[0] &&
            typeof data?.itemImage[0] !== "string" && {
              itemImage: data?.itemImage[0],
            }),
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            toggleAdd();
            dispatch(showSnackBar("Item Added successfully"));
            getAllData();
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
      // console.log("edit form", data.categoryId);
      if (data.categoryId === "") {
        delete data.categoryId;
        delete actionData.categoryId;
        delete actionData.categoryName;
      }
      if (data.itemImage.length < 1) {
        delete data.itemImage;
      } else {
        data.itemImage = data.itemImage[0];
      }
      dispatch(
        updateItem({
          ...actionData,
          ...data,
          role: role,
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(showSnackBar("Item Updated Successfully", "success"));
            getAllData();

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

  const onImport = (data) => {
    dispatch(
      importItems({
        restaurantId: restaurantId,
        data: data.map((item) => {
          delete item.id;
          delete item._id;
          return {
            ...item,
            restaurantId: restaurantId,
            branchId: currBranchId,
          };
        }),
      })
    )
      .then((res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("Items Imported successfully"));
          getAllCategories(restaurantId, branchId, "true");
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

  const onAddNewItemVariants = (e) => {
    if (open === "sub") {
      let itemData = {
        id: actionData.id,
        variants: e.variants,
        restaurantId: actionData.restaurantId,
        ...(actionData.branchId && { branchId: actionData.branchId }),
      };
      dispatch(
        updateItemVariants(itemData, () => {
          getAllData();
          toggleAdd();
        })
      );
    }
  };

  const ImportAction = () => {
    return (
      <ImportCommonAction
        onClick={() => {
          dispatch(getRestaurantItems("true"));

          setImportOpen(true);
        }}
        title={PageTitle}
      />
    );
  };

  const AddAction = () => {
    return (
      <AddCommonAction onClick={() => toggleAdd("Add")} title={PageTitle} />
    );
  };
  const handleBulkUpload = (file) => {
    const uploadData = {
      restaurantId,

      items: file,
      ...(currBranchId && { branchId: currBranchId }),
    };
    // console.log("uploadData", uploadData);
    dispatch(
      bulkUploadItems(uploadData, () => {
        getAllData();
      })
    );
  };

  const BulkUploadAction = () => {
    return (
      <BulkUploadCommonAction
        onClick={(file) => handleBulkUpload(file)}
        title={PageTitle}
        isLoading={isLoading}
      />
    );
  };

  const EditAction = (action) => (
    <EditCommonAction onClick={() => handleEdit(action.data)} />
  );

  const DeleteAction = (action) => (
    <DeleteCommonAction onClick={() => handleDelete(action.data)} />
  );

  const VariantAction = (action) => {
    return (
      <VariantCommonAction
        onClick={() => handleAddVariants(action.data)}
        title={"Variants"}
      />
    );
  };

  const DownloadSampleAction = (action) => {
    return (
      <a href={SampleXLS} download="bulkuploaditemssample" target="_blank">
        <DownloadButtonAction
          onClick={() => {}}
          title={"Download Sample File"}
          tooltipTitle="Download Sample Excel File for bulk upload"
        />
      </a>
    );
  };
  //   Item Name
  // Item Image
  // Hot Key
  // Price
  // Online Price
  // Category
  // Variants
  // Quantity
  // Average Rating
  // Status
  // Actions

  const headers = [
    { title: "Item Name", key: "itemName" },

    {
      title: "Item Image",
      key: "itemImage",
      type: "image",
      sourceUrl: RootUrl,
    },
    { title: "Hotkey", key: "hotKey" },

    { title: "Price", key: "itemPrice" },

    { title: "OnlinePrice", key: "onlinePrice" },
    {
      title: "Category",
      key: "categoryName",
      // width: "50px",
    },
    {
      title: "Variants",
      renderRow: (row) =>
        row?.variants && row?.variants?.length > 0
          ? row?.variants?.length
          : "N/A",
    },
    {
      title: "Quantity",
      key: "currentStock",
    },
    {
      title: "Average Rating",
      key: "averageRating",
    },
    // { title: "Description", key: "description", type: "textarea" },

    // {
    //   title: "Type",
    //   key: "isNonVeg",
    //   renderRow: (row) => (row.isNonVeg ? `Non veg` : "Veg"),
    //   // width: "50px",
    // },

    // {
    //   title: "Featured",
    //   key: "isFeatured",
    //   // width: "50px",

    //   renderRow: (row) => (row.isFeatured ? `True` : "False"),
    // },

    { title: "Status", key: "status" },
  ];

  const defaultValues = {
    // restaurantId: restaurantId,
  };

  React.useEffect(() => {
    getAllCategories();
    getAllData();
  }, [selectedBranch]);

  const BranchFilter = (action) => (
    <div class="">
      <select
        name="status"
        class="form-control"
        defaultValue="true"
        required
        value={selectedBranch}
        onChange={(e) => {
          setSelectedBranch(e.target.value);
        }}
      >
        <option value={""} selected>
          This restaurant
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
    branchadmin: [ImportAction],
  };
  return (
    <>
      <div class="page-content-tab">
        <ItemVariantsModal
          open={open === "sub" || open === "subEdit"}
          onClose={() => toggleAdd()}
          mode={open}
          data={actionData}
          onSubmit={(e) => onAddNewItemVariants(e)}
        />
        {!isSuperAdmin && (
          <CommonImportModal
            headers={headers}
            open={importOpen}
            title={PageTitle}
            data={importData()}
            onClose={() => {
              setImportOpen(false);
            }}
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
          headerComponents={headerComponents[role]}
          title={PageTitle}
          headActions={[DownloadSampleAction, BulkUploadAction, AddAction]}
          actions={[VariantAction, EditAction, DeleteAction]}
          tableData={isRestaurantAdmin ? restaurantItems : items}
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

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { showSnackBar } from "../../../redux/action/snackActions";
// import SmartTable from "../../../components/common/SmartTable";

// import DeleteModal from "../../../components/common/Modals/DeleteModal";
// import EditCommonAction from "../../../components/common/Actions/EditAction";
// import AddCommonAction from "../../../components/common/Actions/AddCommonAction";
// import DeleteCommonAction from "../../../components/common/Actions/DeleteCommonAction";
// import CommonAddModal from "../../../components/common/Modals/CommonAddModal";
// import {
//   getBranchCategories,
//   getRestaurantCategories,
// } from "../../../redux/action/categoryActions";
// import {
//   createItem,
//   deleteItem,
//   getRestaurantItems,
//   getBranchItems,
//   importItems,
//   updateItem,
// } from "../../../redux/action/itemActions";
// import { RootUrl } from "../../../redux/types";
// import { getAllBranches } from "../../../redux/action/branchActions";
// import getErrorMessage from "../../../helpers/getErrorMessage";
// import CommonImportModal from "../../../components/common/Modals/CommonImportModal";
// import ImportCommonAction from "../../../components/common/Actions/ImportCommonAction";

// const PageTitle = "Items";

// const ManageItems = () => {
// const {
//   categories: arraycategories,
//   restaurantCategories,
//   items,
//   restaurantItems: resItems,
// } = useSelector((state) => state.branch);

// const { role, restaurantId, branchId } = useSelector((state) => state.user);
// const [open, setOpen] = React.useState();

// const branches = useSelector((state) => state.branch.allBranches);
// const [selectedBranch, setSelectedBranch] = React.useState(branchId);

// const currBranchId = branchId || selectedBranch;
// const isRestaurantAdmin = ["restaurantadmin"].includes(role);
// const isBranchAdmin = ["branchadmin"].includes(role);
// const isSuperAdmin = ["superadmin"].includes(role);
// const categories = isRestaurantAdmin ? restaurantCategories : arraycategories;

// const restaurantItems = isRestaurantAdmin
//   ? selectedBranch
//     ? items
//     : resItems
//   : items;

// console.log("arraycategories", categories);
// const importData = () => {
//   if (isBranchAdmin) {
//     return resItems
//       .filter((item) => {
//         return items.findIndex((data) => {
//           // console.log(
//           //   "find",
//           //   data.itemName,
//           //   arraycategories.findIndex(
//           //     (item) => data.categoryName === item.categoryName
//           //   )
//           // );

//           return data.itemName === item.itemName;
//         });
//       })
//       .filter((data) => {
//         const isInCategory = categories.findIndex(
//           (item) => data.categoryName === item.categoryName
//         );
//         return isInCategory > 0 ? data : false;
//       });
//   }
// };
// const [importOpen, setImportOpen] = React.useState();

// const getAllCategories = () => {
//   if (isRestaurantAdmin) {
//     dispatch(getRestaurantCategories(restaurantId, "true"));
//   }
//   if (isBranchAdmin) {
//     dispatch(getBranchCategories(restaurantId, branchId, "true"));
//   }
// };

// const getAllData = () => {
//   if (isRestaurantAdmin) {
//     if (selectedBranch) {
//       dispatch(getBranchItems(selectedBranch));
//     }
//     dispatch(getRestaurantItems());
//     dispatch(getAllBranches(restaurantId));
//   }
//   if (isBranchAdmin) {
//     dispatch(getBranchItems(branchId));
//   }
// };

//   const formData = [
//     {
//       type: "text",
//       name: "itemName",
//       label: "Item Name",
//       size: 4,

//       placeholder: "Type Item Name",
//       required: true,
//       rules: {
//         required: {
//           value: true,
//           message: "Item Name is required",
//         },
//       },
//     },
//     {
//       type: "file",
//       name: "itemImage",
//       label: "Item image",
//       size: 4,

//       ...(open === "Add" && {
//         rules: {
//           required: {
//             value: true,
//             message: "Item image is required",
//           },
//         },
//       }),
//     },
//     {
//       type: "select",
//       name: "isNonVeg",
//       size: 4,

//       label: "Item Type",
//       options: [
//         {
//           title: " Veg",
//           value: false,
//         },
//         {
//           title: "Non Veg",
//           value: true,
//         },
//       ],
//       optionLabelProp: "title",
//       optionValueProp: "value",

//       required: true,
//     },

//     {
//       type: "text",
//       name: "itemPrice",
//       size: 3,

//       label: "Item Price",
//       placeholder: "Type Item Price",
//       required: true,
//       rules: {
//         required: {
//           value: true,
//           message: "Item Price is required",
//         },
//       },
//     },
//     {
//       type: "number",
//       name: "hotKey",
//       size: 3,

//       label: "Hotkey",
//       placeholder: "Type Hotkey",
//     },
//     {
//       type: "select",
//       name: "categoryId",
//       size: 3,

//       label: "Category",
//       options: categories,
//       optionLabelProp: "categoryName",
//       optionValueProp: "id",
//       defaultOption: () => (
//         <option value={"-"} selected>
//           Common
//         </option>
//       ),
//     },

//     {
//       type: "select",
//       name: "status",
//       size: 3,

//       label: "Status",
//       options: [
//         {
//           title: "Active",
//           value: true,
//         },
//         {
//           title: "Inactive",
//           value: false,
//         },
//       ],
//       optionLabelProp: "title",
//       optionValueProp: "value",

//       required: true,
//       rules: {
//         required: {
//           value: true,
//           message: "Branch Name is required",
//         },
//       },
//     },
//   ];

//   const dispatch = useDispatch();

//   const [actionData, setActionData] = React.useState();

//   const toggleAdd = (mode) => {
//     setOpen(mode);
//     if (mode === undefined) {
//       setActionData({});
//     }
//   };

//   const handleEdit = (data) => {
//     toggleAdd("Edit");
//     // delete data.itemImage;

//     setActionData(data);
//   };

//   const handleDelete = (data) => {
//     toggleAdd("Delete");
//     setActionData(data);
//   };

//   const confirmDelete = (data) => {
//     dispatch(deleteItem({ role, id: actionData.id || actionData._id })).then(
//       (res) => {
//         if (res.payload.status === 200) {
//           toggleAdd();
//           dispatch(showSnackBar("Item Deleted succesfully"));
//           getAllData();
//         }
//       }
//     );
//   };

//   const onAdd = (data) => {
//     console.log("onAdd", data);
//     if (open === "Add") {
//       const currentCat = categories.find((cat) => cat.id === data.categoryId);

//       if (!currentCat) {
//         delete data.categoryId;
//         actionData.categoryId = "common";
//         delete actionData.categoryName;
//       } else {
//         data.categoryName = currentCat?.categoryName || " - ";
//       }

//       dispatch(
//         createItem({
//           ...data,
//           restaurantId: restaurantId,
//           ...(isBranchAdmin && { branchId: branchId }),
//           role: role,
//           ...(data?.itemImage[0] &&
//             typeof data?.itemImage[0] !== "string" && {
//               itemImage: data?.itemImage[0],
//             }),
//         })
//       )
//         .then((res) => {
//           if (res.payload.status === 200) {
//             toggleAdd();
//             dispatch(showSnackBar("Item Added successfully"));
//             getAllData();
//           } else {
//             dispatch(
//               showSnackBar(
//                 getErrorMessage(res) || "Failed to Add Item",
//                 "error"
//               )
//             );
//           }
//         })
//         .catch((err) => {
//           console.log("err", err);
//           dispatch(
//             showSnackBar(getErrorMessage(err) || "Failed to Add Item", "error")
//           );
//         });
//     }
//     if (open === "Edit") {
//       // console.log("actiondata", actionData);
//       const currentCat = categories.find((cat) => cat.id === data.categoryId);

//       if (currentCat) {
//         data.categoryName = currentCat?.categoryName || " - ";
//       } else {
//         delete actionData.categoryName;
//         delete data.categoryId;
//         delete data.categoryName;
//       }
//       // if (!currentCat) {
//       //   delete data.categoryId;
//       //   actionData.categoryId = "common";
//       //   delete actionData.categoryName;
//       // } else {
//       // data.categoryName = currentCat?.categoryName || " - ";
//       // }
//       if (data.itemImage.length < 1) {
//         delete data.itemImage;
//       } else {
//         data.itemImage = data.itemImage[0];
//       }
//       dispatch(
//         updateItem({
//           ...actionData,
//           ...data,
//           role: role,
//         })
//       )
//         .then((res) => {
//           if (res.payload.status === 200) {
//             dispatch(showSnackBar("Item Updated Successfully", "success"));
//             getAllData();

//             toggleAdd();
//           } else {
//             dispatch(
//               showSnackBar(
//                 getErrorMessage(res) || "Failed to Update Item",
//                 "error"
//               )
//             );
//           }
//         })
//         .catch((err) => {
//           console.log("err", err);
//           dispatch(
//             showSnackBar(
//               getErrorMessage(err) || "Failed to Update Item",
//               "error"
//             )
//           );
//         });
//     }
//   };

//   const onImport = (data) => {
// dispatch(
//   importItems({
//     restaurantId: restaurantId,
//     data: data.map((item) => {
//       delete item.id;
//       delete item._id;
//       return {
//         ...item,
//         restaurantId: restaurantId,
//         branchId: currBranchId,
//       };
//     }),
//   })
// )
//       .then((res) => {
//         if (res.payload.status === 200) {
//           toggleAdd();
//           dispatch(showSnackBar("Items Imported successfully"));
//           getAllCategories(restaurantId, branchId, "true");
//           getAllData();
//           setImportOpen(false);
//         } else {
//           dispatch(
//             showSnackBar(
//               getErrorMessage(res) || "Failed to Import Cateogry",
//               "error"
//             )
//           );
//         }
//       })
//       .catch((err) => {
//         dispatch(
//           showSnackBar(
//             getErrorMessage(err) || "Failed to Import Cateogry",
//             "error"
//           )
//         );
//       });
//   };

//   const ImportAction = () => {
//     return (
//       <ImportCommonAction
//         onClick={() => {
//           dispatch(getRestaurantItems("true"));

//           setImportOpen(true);
//         }}
//         title={PageTitle}
//       />
//     );
//   };

//   const AddAction = () => {
//     return (
//       <AddCommonAction onClick={() => toggleAdd("Add")} title={PageTitle} />
//     );
//   };

//   const EditAction = (action) => (
//     <EditCommonAction onClick={() => handleEdit(action.data)} />
//   );

//   const DeleteAction = (action) => (
//     <DeleteCommonAction onClick={() => handleDelete(action.data)} />
//   );

//   const headers = [
//     { title: "Item Name", key: "itemName" },

//     {
//       title: "Item Image",
//       key: "itemImage",
//       type: "image",
//       sourceUrl: RootUrl,
//     },
//     { title: "Price", key: "itemPrice", isCurrency: true },
//     { title: "Category", key: "categoryName" },
//     { title: "Hotkey", key: "hotKey" },

//     { title: "Status", key: "status" },
//   ];

//   const defaultValues = {
//     // restaurantId: restaurantId,
//   };

//   React.useEffect(() => {
//     getAllCategories();
//     getAllData();
//   }, [selectedBranch]);

//   const BranchFilter = (action) => (
//     <div class="">
//       <select
//         name="status"
//         class="form-control"
//         defaultValue="true"
//         required
//         value={selectedBranch}
//         onChange={(e) => setSelectedBranch(e.target.value)}
//       >
//         <option value={""} selected>
//           This restaurant
//         </option>
//         {branches.map((res, resindex) => {
//           return (
//             <option key={resindex} value={res._id}>
//               {res.branchName}
//             </option>
//           );
//         })}
//       </select>
//     </div>
//   );

//   const headerComponents = {
//     restaurantadmin: [BranchFilter],
//     branchadmin: [ImportAction],
//   };
//   return (
//     <>
//       <div class="page-content-tab">
//         {!isSuperAdmin && (
//           <CommonImportModal
//             headers={headers}
//             open={importOpen}
//             title={PageTitle}
//             data={importData()}
//             onClose={() => {
//               setImportOpen(false);
//             }}
//             onSubmit={(data) => {
//               onImport(data);
//             }}
//           />
//         )}
//         <CommonAddModal
//           title={PageTitle}
//           open={open === "Add" || open === "Edit"}
//           onClose={() => toggleAdd()}
//           mode={open}
//           onSubmit={(e) => onAdd(e)}
//           data={actionData}
//           formData={formData}
//           defaultValue={defaultValues}
//         />
//         <DeleteModal
//           size="md"
//           open={open === "Delete"}
//           title={actionData?.name}
//           onClose={() => toggleAdd()}
//           onConfirm={() => confirmDelete()}
//         />

//         <SmartTable
//           headerComponents={headerComponents[role]}
//           title={PageTitle}
//           headActions={[AddAction]}
//           actions={[EditAction, DeleteAction]}
//           tableData={isRestaurantAdmin ? restaurantItems : items}
//           headers={headers}
//           sortable={true}
//           paginated={true}
//           searchByLabel={"Item name"}
//           searchByField={"itemName"}
//           rowsPerPage={5}
//         />
//       </div>
//     </>
//   );
// };

// export default ManageItems;
