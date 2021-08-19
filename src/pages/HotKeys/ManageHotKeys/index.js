import React from "react";

const Data = () => <div></div>;
export default Data;
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
//   createHotKey,
//   deleteHotKey,
//   updateHotKey,
//   getAllHotKeys,
// } from "../../../redux/action/hotKeyActions";
// import { getAllItems } from "../../../redux/action/itemActions";
// import { getAllBranches } from "../../../redux/action/branchActions";
// const PageTitle = "HotKeys";

// const ManageTables = () => {
//   const { hotkeys, items } = useSelector((state) => state.branch);

//   const { role, restaurantId, branchId } = useSelector((state) => state.user);
//   const branches = useSelector((state) => state.branch.allBranches);

//   const isbranchselectorVisible = ["restaurantadmin"].includes(role);

//   const formData = [
//     {
//       type: isbranchselectorVisible ? "select" : "none",
//       name: "branchId",
//       label: "Branch",
//       options: branches,
//       optionLabelProp: "branchName",
//       optionValueProp: "_id",
//       hideAt: "Edit",
//       required: true,
//       rules: {
//         required: {
//           value: true,
//           message: "Branch Name is required",
//         },
//       },
//     },
//     {
//       type: "number",
//       name: "hotkey",
//       label: "Hot Key Number",
//       placeholder: "Type Hot Key Number",
//       required: true,
//       rules: {
//         required: {
//           value: true,
//           message: "Hot Key Number is required",
//         },
//       },
//     },

//     {
//       type: "select",
//       name: "hotkeyItemId",
//       label: "HotKey Item",
//       options: items,
//       optionLabelProp: "itemName",
//       optionValueProp: "id",
//       hideAt: "Edit",
//       required: true,
//     },

//     {
//       type: "select",
//       name: "status",
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
//         },
//       },
//     },
//   ];

//   const dispatch = useDispatch();

//   const [open, setOpen] = React.useState();
//   const [actionData, setActionData] = React.useState();
//   const [selectedBranch, setSelectedBranch] = React.useState(branchId || "all");
//   const currBranchId = branchId || selectedBranch;

//   const toggleAdd = (mode) => {
//     setOpen(mode);
//     if (mode === undefined) {
//       setActionData({});
//     }
//   };

//   const handleEdit = (data) => {
//     toggleAdd("Edit");
//     setActionData(data);
//   };

//   const handleDelete = (data) => {
//     toggleAdd("Delete");
//     setActionData(data);
//   };

//   const confirmDelete = (data) => {
//     dispatch(deleteHotKey(actionData)).then((res) => {
//       if (res.payload.status === 200) {
//         toggleAdd();
//         dispatch(showSnackBar("Deleted succesfully"));
//         dispatch(getAllHotKeys(restaurantId, branchId));
//       }
//     });
//   };

//   const onAdd = (data) => {
//     if (open === "Add") {
//       dispatch(
//         createHotKey({
//           ...data,
//           restaurantId,
//           branchId: branchId || data.branchId,
//         })
//       ).then((res) => {
//         if (res.payload.status === 200) {
//           toggleAdd();
//           dispatch(showSnackBar("Hotkey created successfully"));
//           dispatch(getAllHotKeys(restaurantId, branchId));
//         }
//       });
//     }
//     if (open === "Edit") {
//       dispatch(
//         updateHotKey({
//           ...actionData,
//           ...data,
//           restaurantId,
//           branchId,
//         })
//       ).then((res) => {
//         if (res.payload.status === 200) {
//           dispatch(showSnackBar("Hotkey Updated Successfully", "success"));
//           dispatch(getAllHotKeys(restaurantId, branchId));
//           toggleAdd();
//         } else {
//           dispatch(showSnackBar("Failed to Update Hotkey", "error"));
//         }
//       });
//     }
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
//     { title: "Hot Key Number", key: "hotkey" },

//     { title: "HotKey Item", key: "itemName" },
//     { title: "Status", key: "status" },
//   ];

//   const defaultValues = {
//     // restaurantId: restaurantId,
//   };

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
//         <option value={"all"} selected>
//           All Branches
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
//   };

//   React.useEffect(() => {
//     dispatch(getAllHotKeys(restaurantId, currBranchId));
//     dispatch(getAllItems(restaurantId, currBranchId));
//     dispatch(getAllBranches(restaurantId));
//   }, [selectedBranch]);

//   return (
//     <>
//       <div class="page-content-tab">
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
//           title={PageTitle}
//           headerComponents={headerComponents[role]}
//           headActions={[AddAction]}
//           actions={[EditAction, DeleteAction]}
//           tableData={hotkeys}
//           headers={headers}
//         />
//       </div>
//     </>
//   );
// };

// export default ManageTables;
