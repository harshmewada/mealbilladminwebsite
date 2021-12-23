import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBranches } from "../../redux/action/branchActions";
import SmartTable from "../../components/common/SmartTable";
import DeleteModal from "../../components/common/Modals/DeleteModal";
import AddCommonAction from "../../components/common/Actions/AddCommonAction";
import EditCommonAction from "../../components/common/Actions/EditAction";
import DeleteCommonAction from "../../components/common/Actions/DeleteCommonAction";
import IconCommonAction from "../../components/common/Actions/IconCommonAction";

import { getAllRestaurants } from "../../redux/action/restaurantActions";
import ScheduleBookingModal from "../../components/common/Modals/ScheduleBookingModal";
import TableTitle from "../../components/common/SmartTable/TableTitle";
import ScheduleCalendar from "../../components/common/Booking/ScheduleCalendar";
import CommonAddModal from "../../components/common/Modals/CommonAddModal";
import { mobileRegex } from "../../helpers/regex";
import moment from "moment";
import {
  createBooking,
  getAllBookings,
  updateBooking,
} from "../../redux/action/bookingActions";
import { getAllTables } from "../../redux/action/tableActions";
import { getBranchItems } from "../../redux/action/itemActions";
import { BOOKINGSTATUS, DATEFORMAT, DATETIMEFORMAT } from "../../contants";

const PageTitle = "Bookings";

const ManageBranches = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState();
  const [actionData, setActionData] = React.useState();

  const { role, restaurantId, branchId, currentBranches, allowedBranches } =
    useSelector((state) => state.user);
  const {
    allBranches: branches,
    tables,
    items,
  } = useSelector((state) => state.branch);

  const isRestaurantAdmin = role === "restaurantadmin";

  const [selectedBranch, setSelectedBranch] = React.useState(branchId || "all");

  const { bookings } = useSelector((state) => state.common);

  const currentBranchId = branchId || selectedBranch || branches[0]?._id;
  function valid(current) {
    return current.isAfter(moment().subtract("1", "day"));
  }
  const formData = [
    {
      hidden: !isRestaurantAdmin,
      type: "select",
      size: 12,

      name: "branchId",
      label: "Choose Branch",
      readOnly: open === "Edit",
      defaultOption: () => (
        <option disabled selected>
          Choose Branch
        </option>
      ),
      optionLabelProp: "branchName",
      optionValueProp: "_id",
      hasOptions: true,
      required: true,
      onSelect: (value) => {
        dispatch(getAllTables(restaurantId, value));
        dispatch(getBranchItems(value));
      },
    },

    {
      type: "text",
      name: "eventName",
      label: "Event Name ",
      readOnly: open === "Edit",

      placeholder: "Type Event Name",
      required: true,
      size: 12,
      rules: {
        required: {
          value: true,
          message: "Event Name is required",
        },
      },
    },
    {
      type: "multiSelect",
      size: 12,

      name: "tables",
      label: "Choose Tables",
      optionLabelProp: "tableNumber",
      optionValueProp: "_id",
      hasOptions: true,
    },
    {
      type: "multiSelect",
      size: 12,
      defaultOption: () => (
        <option disabled selected>
          Choose Itens
        </option>
      ),
      name: "items",
      label: "Choose Items",
      optionLabelProp: "itemName",
      optionValueProp: "_id",
      hasOptions: true,
    },

    {
      type: "text",
      name: "hostedBy",
      label: "Hosted By",
      readOnly: open === "Edit",

      placeholder: "Type Host Name",
      required: true,
      size: 6,
      rules: {
        required: {
          value: true,
          message: "Host name is required",
        },
      },
    },
    {
      type: "text",
      name: "contactNumber",
      readOnly: open === "Edit",

      label: "Contact Mobile Number",
      size: 6,

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
      type: "dateTime",
      name: "start",
      size: 6,
      label: "Event Start Date & Time",
      placeholder: "Event Start Date & Time",
      required: true,
      options: {
        isValidDate: valid,
      },
      rules: {
        required: {
          value: true,
          message: "Start Date & time is required",
        },
      },
    },
    {
      type: "dateTime",
      name: "end",
      size: 6,
      label: "Event End Date & Time",
      placeholder: "Event End Date & Time",
      required: true,
      options: {
        isValidDate: valid,
      },
      rules: {
        required: {
          value: true,
          message: "End Date & time is required",
        },
      },
    },
    {
      type: "textarea",
      name: "remarks",
      label: "Remarks",
      size: 12,
      placeholder: "Type Remarks",
    },
  ];

  const toggleAdd = (mode) => {
    setOpen(mode);
    if (mode === undefined) {
      setActionData({});
    }
  };
  const handleAdd = (data) => {
    setActionData(data);

    toggleAdd("Add");
  };
  const handleEdit = (data) => {
    toggleAdd("Edit");
    setActionData({
      ...data,
      start: moment(data.start).toDate(),
      end: moment(data.end).toDate(),
    });
  };
  const handleDelete = (data) => {
    toggleAdd("Delete");
    setActionData(data);
  };

  const handleSchedule = (data) => {
    toggleAdd("schedule");
    setActionData(data);
  };

  const onRangeChange = (e) => {
    if (e?.start && e?.end) {
      dispatch(
        getAllBookings({
          branchId: currentBranchId,
          restaurantId,
          start: e.start,
          end: e.end,
        })
      );
    }
    if (Array.isArray(e)) {
      if (e.length > 5) {
        dispatch(
          getAllBookings({
            branchId: currentBranchId,
            restaurantId,
            start: e[0],
            end: e[6],
          })
        );
      }
      if (e.length === 1) {
        dispatch(
          getAllBookings({
            branchId: currentBranchId,
            restaurantId,
            start: e[0],
          })
        );
      }
    }
  };

  const confirmDelete = (data) => {};

  const onAdd = (data) => {
    if (open === "Add") {
      dispatch(
        createBooking(
          {
            ...data,
            branchId: currentBranchId,

            bookingStatus: BOOKINGSTATUS[0].key,
          },
          () => {
            toggleAdd();
            dispatch(
              getAllBookings({ branchId: currentBranchId, restaurantId })
            );
          },
          []
        )
      );
    }
    if (open === "Edit") {
      let editData = {
        ...actionData,
        ...data,
        branchId: currentBranchId,
      };

      dispatch(
        updateBooking(editData, () => {
          toggleAdd();
          dispatch(getAllBookings({ branchId: currentBranchId, restaurantId }));
        })
      );
    }
  };

  const AddAction = () => {
    return (
      <AddCommonAction
        onClick={() => handleAdd(defaultValues)}
        title={PageTitle}
      />
    );
  };

  const headers = [
    { title: "Booking Space name", key: "bookingSpace" },
    { title: "Associated With", key: "branchName" },

    // { title: "Total Items", key: "itemCount" },
    { title: "Status", key: "status" },
  ];

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
        <option value={"all"}>All Branches</option>
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
    superadmin: [],
    restaurantadmin: [BranchFilter],
  };

  const defaultValues = {
    restaurantId: restaurantId,
    // start: moment().toDate(),
    // end: moment().toDate(),
  };
  React.useEffect(() => {
    dispatch(getAllBranches(restaurantId));
    dispatch(getAllBookings({ branchId: currentBranchId, restaurantId }));
    dispatch(getAllTables(restaurantId, currentBranchId));
    dispatch(getBranchItems(currentBranchId));
  }, [currentBranchId]);
  return (
    <div class="page-content-tab">
      <DeleteModal
        size="md"
        open={open === "Delete"}
        title={actionData?.name}
        onClose={() => toggleAdd()}
        onConfirm={() => confirmDelete()}
      />
      <CommonAddModal
        title={PageTitle}
        open={open === "Add" || open === "Edit"}
        onClose={() => toggleAdd()}
        mode={open}
        onSubmit={(e) => onAdd(e)}
        data={actionData}
        formData={formData}
        defaultValues={defaultValues}
        size="md"
        optionsData={{
          tables: tables,
          branchId: branches,
          items: items,
        }}
      />
      <div class="row">
        <div class="col-12">
          <div class={"card"}>
            <div class={"card-body"}>
              <TableTitle
                headerComponents={headerComponents[role]}
                title={PageTitle}
                endActions={[AddAction]}
              />
              <ScheduleCalendar
                events={
                  bookings
                    ? bookings?.map((d) => {
                        return { ...d, title: d.eventName };
                      })
                    : []
                }
                handleSelect={(data) => handleEdit(data)}
                onRangeChange={(data) => onRangeChange(data)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBranches;
