import React from "react";
import AddModal from "../../../components/common/Modals/CommonAddModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createBranch,
  updateBranch,
  deleteBranch,
  getAllBranches,
} from "../../../redux/action/branchActions";
import { showSnackBar } from "../../../redux/action/snackActions";
import SmartTable from "../../../components/common/SmartTable";
import DeleteModal from "../../../components/common/Modals/DeleteModal";
import AddCommonAction from "../../../components/common/Actions/AddCommonAction";
import EditCommonAction from "../../../components/common/Actions/EditAction";
import DeleteCommonAction from "../../../components/common/Actions/DeleteCommonAction";
import { getAllRestaurants } from "../../../redux/action/restaurantActions";
import { mobileRegex } from "../../../helpers/regex";
import getErrorMessage from "../../../helpers/getErrorMessage";

const PageTitle = "Branches";

const ManageBranches = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState();
  const [actionData, setActionData] = React.useState();

  const { role, restaurantId, branchId, currentBranches, allowedBranches } =
    useSelector((state) => state.user);

  const isSuperAdmin = role === "superadmin";

  const [selectedRes, setSelectedRes] = React.useState(restaurantId || "all");

  const restaurants = useSelector((state) => state.restaurant.allRestaurants);

  const branches = useSelector((state) => state.branch.allBranches);

  const formData = [
    {
      type: isSuperAdmin ? "select" : "none",
      name: "restaurantId",
      label: "Restaurant",
      options: restaurants,
      optionLabelProp: "name",
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
      name: "branchName",
      label: "Branch Name",
      placeholder: "Type Branch Name",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Branch Name is required",
        },
      },
    },
    {
      type: open === "Edit" ? "text" : "none",
      name: "branchCode",
      label: "Branch Code",
      placeholder: "Type Branch Code",
      disabled: true,
      rules: {
        required: {
          value: true,
          message: "Branch Code is required",
        },
      },
    },
    {
      type: "text",
      name: "contactPerson",
      label: "Contact Person",
      placeholder: "Type Contact Person Name",
      rules: {
        required: {
          value: true,
          message: "Contact Person is required",
        },
      },
    },
    {
      type: "text",
      name: "contactNumber",
      label: "Contact Number",
      placeholder: "Type Contact Person Number",
      rules: {
        required: {
          value: true,
          message: "Contact Number is required",
        },
        pattern: {
          value: mobileRegex,
          message: "Invalid mobile number",
        },
      },
    },
    {
      type: "textarea",
      name: "address",
      label: "Address",
      placeholder: "Type Branch Address",
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
    dispatch(deleteBranch(actionData))
      .then((res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("Deleted succesfully"));
          dispatch(getAllBranches(selectedRes));
        }
      })
      .catch((err) => {
        console.log("err", err);
        dispatch(
          showSnackBar(
            getErrorMessage(err) || "Failed to Delete Branch",
            "error"
          )
        );
      });
  };

  const onAdd = (data) => {
    if (open === "Add") {
      dispatch(
        createBranch({
          ...data,
          ...(!isSuperAdmin && { restaurantId: selectedRes }),
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(getAllBranches(restaurantId || selectedRes));

            dispatch(showSnackBar("Branch Added Successfully", "success"));

            toggleAdd();
          } else {
            dispatch(showSnackBar("Failed to Add Branch", "error"));
          }
        })
        .catch((err) => {
          console.log("err", err);
          dispatch(
            showSnackBar(
              getErrorMessage(err) || "Failed to Add Branch",
              "error"
            )
          );
        });
    }

    if (open === "Edit") {
      dispatch(
        updateBranch({
          ...actionData,
          ...data,
          ...(!isSuperAdmin && { restaurantId: selectedRes }),
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(showSnackBar("Branch Updated Successfully", "success"));
            dispatch(getAllBranches(restaurantId || selectedRes));

            toggleAdd();
          } else {
            dispatch(showSnackBar("Failed to Update Branch", "error"));
          }
        })
        .catch((err) => {
          console.log("err", err);
          dispatch(
            showSnackBar(
              getErrorMessage(err) || "Failed to Update Branch",
              "error"
            )
          );
        });
    }
  };

  const AddAction = () => {
    return (
      <AddCommonAction
        onClick={() => toggleAdd("Add")}
        title={PageTitle}
        disabled={currentBranches >= allowedBranches}
        disabledTitle="Can not add new branches, branch limit is exceeded."
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
    { title: "Branch Name", key: "branchName" },
    { title: "Restaurant Name", key: "restaurantName" },
    { title: "Branch Code", key: "branchCode" },

    { title: "Total Users", key: "userCount" },

    // { title: "Total Items", key: "itemCount" },
    { title: "Status", key: "status" },
  ];

  const RestaurantFilter = (action) => (
    <div class="">
      <select
        name="status"
        class="form-control"
        defaultValue="true"
        required
        value={selectedRes}
        onChange={(e) => {
          setSelectedRes(e.target.value);
        }}
      >
        <option value={"all"}>All Restaurants</option>
        {restaurants.map((res, resindex) => {
          return (
            <option key={resindex} value={res._id}>
              {res.name}
            </option>
          );
        })}
      </select>
    </div>
  );

  const headerComponents = {
    superadmin: [RestaurantFilter],
    restaurantadmin: undefined,
  };

  const defaultValues = {
    restaurantId: restaurantId,
  };
  React.useEffect(() => {
    dispatch(getAllBranches(selectedRes || restaurantId));
    dispatch(getAllRestaurants("true"));
  }, [selectedRes]);
  return (
    <div class="page-content-tab">
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
        onSubmit={(e) => onAdd(e)}
        data={actionData}
        formData={formData}
        defaultValue={defaultValues}
        title={PageTitle}
      />

      <SmartTable
        title={PageTitle}
        headerComponents={headerComponents[role]}
        headActions={[AddAction]}
        actions={[EditAction, DeleteAction]}
        tableData={branches}
        headers={headers}
        sortable={true}
        paginated={true}
        searchByLabel={"Branch name"}
        searchByField={"branchName"}
      />
    </div>
  );
};

export default ManageBranches;
