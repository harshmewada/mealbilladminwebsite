import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../redux/action/snackActions";
import SmartTable from "../../components/common/SmartTable";

import DeleteModal from "../../components/common/Modals/DeleteModal";
import EditCommonAction from "../../components/common/Actions/EditAction";
import AddCommonAction from "../../components/common/Actions/AddCommonAction";
import DeleteCommonAction from "../../components/common/Actions/DeleteCommonAction";
import CommonAddModal from "../../components/common/Modals/CommonAddModal";
import {
  getBranchCategories,
  getRestaurantCategories,
} from "../../redux/action/categoryActions";
import {
  createItem,
  deleteItem,
  getRestaurantItems,
  getBranchItems,
  importItems,
  updateItem,
} from "../../redux/action/itemActions";
import { RootUrl } from "../../redux/types";
import { getAllBranches } from "../../redux/action/branchActions";
import getErrorMessage from "../../helpers/getErrorMessage";

import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import { DATEFORMAT } from "../../contants";
import { getPreviosOrders } from "../../redux/action/orderActions";

const dateRanges = {
  Today: [moment().toDate(), moment().toDate()],
  Yesterday: [
    moment().subtract(1, "days").toDate(),
    moment().subtract(1, "days").toDate(),
  ],
  "Last 7 Days": [moment().subtract(6, "days").toDate(), moment().toDate()],
  "Last 30 Days": [moment().subtract(29, "days").toDate(), moment().toDate()],
  "This Month": [
    moment().startOf("month").toDate(),
    moment().endOf("month").toDate(),
  ],
  "Last Month": [
    moment().subtract(1, "month").startOf("month").toDate(),
    moment().subtract(1, "month").endOf("month").toDate(),
  ],
};

const PageTitle = "Order History";

const OrderHistory = () => {
  const { previousOrders } = useSelector((state) => state.order);
  const { role, restaurantId, branchId } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState();

  const branches = useSelector((state) => state.branch.allBranches);
  const [selectedBranch, setSelectedBranch] = React.useState(branchId);

  const currBranchId = branchId || selectedBranch;
  const isRestaurantAdmin = ["restaurantadmin"].includes(role);
  const isBranchAdmin = ["branchadmin"].includes(role);
  const isSuperAdmin = ["superadmin"].includes(role);

  const getAllData = () => {
    if (isRestaurantAdmin) {
      dispatch(getPreviosOrders(state));
    }
    if (isBranchAdmin) {
      dispatch(getPreviosOrders(state));
    }
  };

  const dispatch = useDispatch();

  const [actionData, setActionData] = React.useState();

  const [state, setState] = React.useState({
    start: moment(),
    end: moment(),
  });
  const { start, end } = state;

  const handleCallback = (start, end) => {
    // props.setValue({ start, end });
    // onChange(setState({ start, end }));
    setState({ start, end });
  };

  const toggleAdd = (mode) => {
    setOpen(mode);
    if (mode === undefined) {
      setActionData({});
    }
  };

  const handleDelete = (data) => {
    toggleAdd("Delete");
    setActionData(data);
  };

  const confirmDelete = (data) => {
    dispatch(deleteItem({ role, id: actionData.id || actionData._id })).then(
      (res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("Item Deleted succesfully"));
          getAllData();
        }
      }
    );
  };

  const DeleteAction = (action) => (
    <DeleteCommonAction onClick={() => handleDelete(action.data)} />
  );

  const headers = [
    { title: "Order Number", key: "branchOrderNumber" },
    { title: "Items", key: "itemsLength" },
    { title: "Amount", key: "grandTotal" },
    { title: "SGST", key: "sgstCharges" },
    { title: "CGST", key: "cgstCharges" },
    { title: "Other Charges", key: "otherCharges" },
  ];

  const defaultValues = {
    // restaurantId: restaurantId,
  };

  React.useEffect(() => {
    getAllData();
  }, [selectedBranch, state]);

  const DatePicker = (action) => (
    <div class="">
      <DateRangePicker
        initialSettings={{
          startDate: start.toDate(),
          endDate: end.toDate(),

          locale: {
            format: DATEFORMAT,
          },
          maxDate: new Date(),

          ranges: dateRanges,
        }}
        onCallback={handleCallback}
      >
        <input type="text" class="form-control" />
      </DateRangePicker>
    </div>
  );

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
    restaurantadmin: [BranchFilter, DatePicker],
    branchadmin: [DatePicker],
  };
  return (
    <>
      <div class="page-content-tab">
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
          searchByLabel="Order Number"
          searchByField="orderNumber"
          // headAction={AddAction}
          // actions={[DeleteAction]}
          tableData={previousOrders}
          headers={headers}
          sortable={true}
          paginated={true}
          rowsPerPage={5}
        />
      </div>
    </>
  );
};

export default OrderHistory;
