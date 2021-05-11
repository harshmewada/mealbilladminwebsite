import React from "react";
import ModalContainer from "../../../components/common/ModalContainer";
import AssignSubscriptionModal from "./AssignSubscriptionModal";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  updateRestaurant,
  assignRestaurantSubScription,
  removeRestaurantSubScription,
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
import CommonAddModal from "../../../components/common/Modals/CommonAddModal";
import { emailRegex, mobileRegex } from "../../../helpers/regex";
import TableRowCommonAction from "../../../components/common/Actions/TableRowCommonAction";

const PageTitle = "Restaurants";

const AddRestaurant = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurant.allRestaurants);
  const { themes, subscriptions } = useSelector((state) => state.common);
  const [open, setOpen] = React.useState();
  const [actionData, setActionData] = React.useState();
  const [assignData, setAssignData] = React.useState();
  const [subscriptionDelete, setSubscriptionDelete] = React.useState();

  const [file, setFile] = React.useState();
  const disabled = open === "Edit";

  const formData = [
    {
      type: "text",
      name: "name",
      label: "Restaurant Name",
      size: 8,
      placeholder: "Type a name",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Restaurant Name is required",
        },
      },
    },
    {
      type: "file",
      name: "logo",
      // hideAt: "Edit",
      label: "Restaurant Logo",
      size: 4,
      // disabled: disabled,
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
      name: "email",
      label: "E-Mail",
      size: 4,

      placeholder: "Enter a valid e-mail",
      required: true,
      rules: {
        required: {
          value: true,
          message: "E-mail is required",
        },
        pattern: {
          value: emailRegex,
          message: "Invalid email",
        },
      },
    },
    {
      type: "text",
      name: "contactPerson",
      label: "Contact Person",
      size: 4,

      placeholder: "Enter a Contact Person Name",
      required: true,
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
      label: "Contact Mobile Number",
      size: 4,

      placeholder: "Enter a Contact Mobile Number Name",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Contact Mobile Number is required",
        },
        pattern: {
          value: mobileRegex,
          message: "Invalid Mobile Number",
        },
      },
    },
    {
      type: "textarea",
      name: "address",
      label: "Address",
      size: 12,
      rows: "2",
      placeholder: "Type a address",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Address is required",
        },
      },
    },
    {
      type: "number",
      name: "balance",
      label: "Current Balance",
      size: 3,

      placeholder: "Enter Current Balance",
      required: true,
      disabled: disabled,
      rules: {
        required: {
          value: true,
          message: "Current Balance is required",
        },
      },
    },
    {
      type: "text",
      name: "gstNumber",
      label: "GST Number",
      size: 3,

      placeholder: "Enter GST Number",
      required: true,
      rules: {
        required: {
          value: true,
          message: "GST Number is required",
        },
      },
    },
    {
      type: "number",
      name: "cgst",
      label: "CGST",
      size: 3,

      placeholder: "Enter CGST tax",
      required: true,
      rules: {
        required: {
          value: true,
          message: "CGST is required",
        },
      },
    },
    {
      type: "number",
      name: "sgst",
      label: "SGST",
      size: 3,

      placeholder: "Enter SGST tax",
      required: true,
      rules: {
        required: {
          value: true,
          message: "SGST is required",
        },
      },
    },

    {
      type: "text",
      name: "tagLine",
      label: "Tag Line",
      size: 12,

      placeholder: "Type a tag line",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Tag Line is required",
        },
      },
    },

    {
      type: "select",
      name: "themeId",
      size: 3,

      label: "App Theme",
      options: themes,
      optionLabelProp: "themeName",
      optionValueProp: "id",
      // disabled: disabled,
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
    },
  ];

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

  const handleDeleteSubscription = (data) => {
    setSubscriptionDelete(true);
    setAssignData(data);
  };

  const handleAssign = (data) => {
    toggleAdd("Assign");
    setAssignData(data);
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
      dispatch(
        createRestaurant(
          {
            ...data,
            ...(data?.logo[0] &&
              typeof data?.logo[0] !== "string" && {
                logo: data?.logo[0],
              }),
          },
          () => {
            toggleAdd();

            dispatch(getAllRestaurants());
          }
        )
      );
    }
    if (open === "Edit") {
      delete actionData.subscription;
      if (data.logo) {
        if (data.logo?.length < 1) {
          delete data?.logo;
        } else {
          data.logo = data?.logo[0];
        }
      }
      console.log("Editdata", data);
      dispatch(
        updateRestaurant({
          ...actionData,
          ...data,

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
  const onAddNewSubscription = (data) => {
    dispatch(
      assignRestaurantSubScription(
        {
          subscriptionId: data,
          restaurantId: assignData._id || assignData.id,
        },

        () => {
          setAssignData();
          toggleAdd();
          dispatch(getAllRestaurants());
        }
      )
    );
  };

  const deleteCurrentSubscription = (data) => {
    dispatch(
      removeRestaurantSubScription(
        {
          subscriptionId: data,
          restaurantId: assignData._id || assignData.id,
        },

        () => {
          setAssignData();
          setSubscriptionDelete();
          toggleAdd();
          dispatch(getAllRestaurants());
        }
      )
    );
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

  const AssignAction = (action) => (
    <TableRowCommonAction
      icon="mdi mdi-package-variant-closed"
      onClick={() => handleAssign(action.data)}
    />
  );

  const RemoveSubscriptionActionAssignAction = (action) => {
    return !action?.data?.endDate ? (
      <div></div>
    ) : (
      <TableRowCommonAction
        icon="dripicons-tag-delete"
        onClick={() => handleDeleteSubscription(action.data)}
      />
    );
  };

  const headers = [
    { title: "Logo", key: "logo", type: "image", sourceUrl: RootUrl },
    { title: "Restaurant Name", key: "name" },

    { title: "Branches", key: "branchCount" },

    { title: "Total Users", key: "userCount" },

    { title: "Subscription Start Date", key: "startDate" },
    { title: "Subscription End Date", key: "endDate" },
    { title: "Status", key: "status" },
  ];

  const defaultValues = {
    // restaurantId: restaurantId,
  };
  React.useEffect(() => {
    dispatch(getAllRestaurants());
    dispatch(getAllThemes("true"));
    dispatch(getAllSubscriptions("true"));
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
      <DeleteModal
        size="md"
        open={subscriptionDelete}
        title={`Current subscription of ${assignData?.name}`}
        onClose={() => setSubscriptionDelete()}
        onConfirm={() => deleteCurrentSubscription()}
      />

      <AssignSubscriptionModal
        open={open === "Assign"}
        title="Assign Subscription"
        mode="Assign"
        data={assignData}
        onClose={() => toggleAdd()}
        onSubmit={(data) => onAddNewSubscription(data.subscriptionId)}
      />
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

      {/* <AddModal
        open={open === "Add" || open === "Edit"}
        onClose={() => toggleAdd()}
        mode={open}
        file={file}
        setFile={(e) => setFile(e)}
        onSubmit={(e) => onAdd(e)}
        data={actionData}
      /> */}

      <SmartTable
        title={PageTitle}
        headAction={AddAction}
        actions={[
          RemoveSubscriptionActionAssignAction,
          AssignAction,
          EditAction,
          DeleteAction,
        ]}
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
