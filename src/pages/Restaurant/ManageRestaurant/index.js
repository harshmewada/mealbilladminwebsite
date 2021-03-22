import React from "react";
import ModalContainer from "../../../components/common/ModalContainer";
import AddModal from "./AddModal";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  updateRestaurant,
} from "../../../redux/action/restaurantActions";

import {
  getAllThemes,
  getAllSubscriptions,
} from "../../../redux/action/commonActions";

import { showSnackBar } from "../../../redux/action/snackActions";
import SmartTable from "../../../components/common/SmartTable";
import DeleteModal from "../../../components/common/Modals/DeleteModal";

import AddCommonAction from "../../../components/common/Actions/AddCommonAction";
import EditCommonAction from "../../../components/common/Actions/EditAction";
import DeleteCommonAction from "../../../components/common/Actions/DeleteCommonAction";
import getErrorMessage from "../../../helpers/getErrorMessage";
import { RootUrl } from "../../../redux/types";

const PageTitle = "Restaurants";

const AddRestaurant = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurant.allRestaurants);

  const [open, setOpen] = React.useState();
  const [actionData, setActionData] = React.useState();

  const [file, setFile] = React.useState();

  const toggleAdd = (mode) => {
    setOpen(mode);
    if (mode === undefined) {
      setActionData({});
      setFile();
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
    dispatch(deleteRestaurant(actionData._id)).then((res) => {
      if (res.payload.status === 200) {
        toggleAdd();
        dispatch(showSnackBar("Deleted succesfully"));
        dispatch(getAllRestaurants());
      }
    });
  };

  const onAdd = (data) => {
    if (open === "Add") {
      dispatch(createRestaurant({ ...data, logo: file }))
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(getAllRestaurants());

            dispatch(showSnackBar("Restaurant Added Successfully", "success"));

            toggleAdd();
          } else {
            dispatch(
              showSnackBar(
                getErrorMessage(res) || "Failed to Add Restaurant",
                "error"
              )
            );
          }
        })
        .catch((err) => {
          dispatch(
            showSnackBar(
              getErrorMessage(err) || "Failed to Add Restaurant",
              "error"
            )
          );
        });
    }
    if (open === "Edit") {
      dispatch(
        updateRestaurant({
          ...actionData,
          ...data,
          ...(file && { logo: file }),
          balance: actionData.balance,
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(
              showSnackBar("Restaurant Updated Successfully", "success")
            );
            dispatch(getAllRestaurants());
            toggleAdd();
          } else {
            dispatch(showSnackBar("Failed to Update Restaurant", "error"));
          }
        })
        .catch((err) => {
          dispatch(showSnackBar("Failed to Update Restaurant", "error"));
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
    { title: "Logo", key: "logo", type: "image", sourceUrl: RootUrl },
    { title: "Restaurant Name", key: "name" },

    { title: "Branches", key: "branchCount" },

    { title: "Total Users", key: "userCount" },

    { title: "Subscription Start Date", key: "subStartDate" },
    { title: "Subscription End Date", key: "subEndDate" },
  ];

  React.useEffect(() => {
    dispatch(getAllRestaurants());
    dispatch(getAllThemes());
    dispatch(getAllSubscriptions());
  }, []);

  return (
    <div>
      <DeleteModal
        size="md"
        open={open === "Delete"}
        title={actionData?.name}
        onClose={() => toggleAdd()}
        onConfirm={() => confirmDelete()}
      />
      <AddModal
        open={open === "Add" || open === "Edit"}
        onClose={() => toggleAdd()}
        mode={open}
        file={file}
        setFile={(e) => setFile(e)}
        onSubmit={(e) => onAdd(e)}
        data={actionData}
      />

      <SmartTable
        title={PageTitle}
        headAction={AddAction}
        actions={[EditAction, DeleteAction]}
        tableData={[...restaurants]}
        headers={headers}
        sortable={true}
        paginated={true}
        searchByLabel={"Restaurant name"}
        searchByField={"name"}
      />
    </div>
  );
};

export default AddRestaurant;

// import React from "react";
// import ModalContainer from "../../../components/common/ModalContainer";
// import AddModal from "./AddModal";
// import { Button, Modal } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createRestaurant,
//   deleteRestaurant,
//   getAllRestaurants,
//   updateRestaurant,
// } from "../../../redux/action/restaurantActions";

// import {
//   getAllThemes,
//   getAllSubscriptions,
// } from "../../../redux/action/commonActions";

// import { showSnackBar } from "../../../redux/action/snackActions";
// import SmartTable from "../../../components/common/SmartTable";
// import DeleteModal from "../../../components/common/Modals/DeleteModal";

// import AddCommonAction from "../../../components/common/Actions/AddCommonAction";
// import EditCommonAction from "../../../components/common/Actions/EditAction";
// import DeleteCommonAction from "../../../components/common/Actions/DeleteCommonAction";
// import getErrorMessage from "../../../helpers/getErrorMessage";
// import { RootUrl } from "../../../redux/types";

// const PageTitle = "Restaurants";

// const AddRestaurant = () => {
//   const dispatch = useDispatch();
//   const restaurants = useSelector((state) => state.restaurant.allRestaurants);

//   const [open, setOpen] = React.useState("Add");
//   const [deleteOpen, setDeleteOpen] = React.useState("Add");

//   const [actionData, setActionData] = React.useState();

//   const [file, setFile] = React.useState();

//   const toggleAdd = (mode) => {
//     setOpen(mode);
//     if (mode === undefined) {
//       setActionData({});
//       setFile();
//     }
//   };

//   const handleEdit = (data) => {
//     toggleAdd("Edit");
//     setActionData(data);
//   };

//   const handleDelete = (data) => {
//     // toggleAdd("Delete");
//     setDeleteOpen(true);
//     setActionData(data);
//   };

//   const confirmDelete = (data) => {
//     dispatch(deleteRestaurant(actionData._id)).then((res) => {
//       if (res.payload.status === 200) {
//         // toggleAdd();
//         setDeleteOpen(false);
//         dispatch(showSnackBar("Deleted succesfully"));
//         dispatch(getAllRestaurants());
//       }
//     });
//   };

//   const onAdd = (data) => {
//     if (open === "Add") {
//       dispatch(createRestaurant({ ...data, logo: file }))
//         .then((res) => {
//           if (res.payload.status === 200) {
//             dispatch(getAllRestaurants());

//             dispatch(showSnackBar("Restaurant Added Successfully", "success"));

//             // toggleAdd();
//           } else {
//             dispatch(getAllRestaurants());
//             dispatch(
//               showSnackBar(
//                 getErrorMessage(res) || "Failed to Add Restaurant",
//                 "error"
//               )
//             );
//           }
//         })
//         .catch((err) => {
//           dispatch(getAllRestaurants());

//           dispatch(
//             showSnackBar(
//               getErrorMessage(err) || "Failed to Add Restaurant",
//               "error"
//             )
//           );
//         });
//     }
//     if (open === "Edit") {
//       dispatch(
//         updateRestaurant({
//           ...actionData,
//           ...data,
//           ...(file && { logo: file }),
//           balance: actionData.balance,
//         })
//       )
//         .then((res) => {
//           if (res.payload.status === 200) {
//             dispatch(
//               showSnackBar("Restaurant Updated Successfully", "success")
//             );
//             dispatch(getAllRestaurants());
//             toggleAdd();
//           } else {
//             dispatch(showSnackBar("Failed to Update Restaurant", "error"));
//           }
//         })
//         .catch((err) => {
//           dispatch(showSnackBar("Failed to Update Restaurant", "error"));
//         });
//     }
//   };

//   const AddAction = () => {
//     return (
//       <AddCommonAction
//         onClick={() => toggleAdd("Add")}
//         // onClick={() =>
//         {}
//         //   onAdd({
//         //     name: "ddsf",
//         //     email: "asdsa@d.com",
//         //     contactPerson: "asdsa@.com",
//         //     contactNumber: "9845612305",
//         //     address: "9845612305",
//         //     balance: "0",
//         //     cgst: "9845612305",
//         //     sgst: "9845612305",
//         //     tagLine: "9845612305",
//         //     themeId: "6039f4c908e4d230a42a9752",
//         //     status: "true",
//         //   })
//         // }
//         title={PageTitle}
//       />
//     );
//   };

//   const EditAction = (action) => (
//     <EditCommonAction onClick={() => handleEdit(action.data)} />
//   );

//   const DeleteAction = (action) => (
//     <DeleteCommonAction onClick={() => handleDelete(action.data)} />
//   );

//   const headers = [
//     { title: "Logo", key: "logo", type: "image", sourceUrl: RootUrl },
//     { title: "Restaurant Name", key: "name" },

//     { title: "Branches", key: "branchCount" },

//     { title: "Total Users", key: "userCount" },

//     { title: "Subscription Start Date", key: "subStartDate" },
//     { title: "Subscription End Date", key: "subEndDate" },
//   ];

//   React.useEffect(() => {
//     dispatch(getAllRestaurants());
//     dispatch(getAllThemes());
//     dispatch(getAllSubscriptions());
//   }, []);

//   return (
//     <div>
//       <DeleteModal
//         size="md"
//         open={deleteOpen}
//         title={actionData?.name}
//         onClose={() => {
//           setDeleteOpen(false);
//         }}
//         onConfirm={() => confirmDelete()}
//       />
//       <AddModal
//         open={open === "Add" || open === "Edit"}
//         onClose={() => toggleAdd()}
//         mode={open}
//         file={file}
//         setFile={(e) => setFile(e)}
//         onSubmit={(e) => onAdd(e)}
//         data={actionData}
//       />

//       <SmartTable
//         title={PageTitle}
//         headAction={AddAction}
//         actions={[EditAction, DeleteAction]}
//         tableData={[...restaurants]}
//         headers={headers}
//         sortable={true}
//         paginated={true}
//         searchByLabel={"Restaurant name"}
//         searchByField={"name"}
//       />
//     </div>
//   );
// };

// export default AddRestaurant;
