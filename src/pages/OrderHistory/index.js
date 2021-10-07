import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../redux/action/snackActions";
import SmartTable from "../../components/common/SmartTable";

import DeleteModal from "../../components/common/Modals/DeleteModal";
import EditCommonAction from "../../components/common/Actions/EditAction";

import CommonConfirmModal from "../../components/common/Modals/CommonConfirmModal";

import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import { DATEFORMAT, dateRanges } from "../../contants";
import {
  editOrder,
  getPreviosOrders,
  setOrderToEdit,
  updateOrder,
} from "../../redux/action/orderActions";
import { useHistory } from "react-router-dom";
import EditOrderModal from "../../components/common/Modals/EditOrderModal";
import ViewCommonAction from "../../components/common/Actions/ViewCommonAction";

import { setPrintData } from "../../redux/action/utilActions";
import { uuid } from "uuidv4";

const PageTitle = "Order History";

const OrderHistory = () => {
  const history = useHistory();
  const { previousOrders, activeOrders } = useSelector((state) => state.order);
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

  const handlePrint = (data) => {
    dispatch(setPrintData({ ...data, printId: uuid() }));
  };

  const toggleAdd = (mode) => {
    if (mode === undefined) {
      setActionData({});
    }
    setOpen(mode);
  };

  const handleEdit = (data, mode) => {
    // delete data.orderItems;

    toggleAdd(mode || "EditOrder");
    setActionData(data);
  };

  const handleUpdateOrder = (data) => {
    dispatch(
      editOrder(
        {
          ...data,

          grandTotal: Math.ceil(data.grandTotal),
          orderItems: data.orderItems,
        },
        () => {
          toggleAdd();
          getAllData();
        },
        () => {},
        "Order Updated",
        "Failed To Update Order"
      )
    );
  };

  const EditAction = (action) => (
    <EditCommonAction
      onClick={() => {
        handleEdit(action.data, "EditOrder");
      }}
    />
  );
  const ViewAction = (action) => (
    <ViewCommonAction onClick={() => handleEdit(action.data, "View")} />
  );

  const headers = [
    {
      title: "Order Number",
      key: "branchOrderNumber",

      renderRow: (child) => (
        <>
          {child.branchOrderNumber}
          {child.isEdited && (
            <div className="badge badge-orange ml-2">Edited</div>
          )}
        </>
      ),
    },
    {
      title: "Items",
      key: "itemsLength",
      renderRow: (child) => child.orderItems.length,
    },

    { title: "SGST", key: "sgstCharges", isCurrency: true },
    { title: "CGST", key: "cgstCharges", isCurrency: true },
    { title: "Discount", key: "discount", isCurrency: true },

    { title: "Other Charges", key: "otherCharges", isCurrency: true },
    { title: "Amount", key: "grandTotal", isCurrency: true },
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

  const showEditModal =
    actionData?.refId || open === "EditOrder" || open === "View";
  return (
    <>
      <div class="page-content-tab">
        {/* <CommonConfirmModal
          size="md"
          open={open === "Edit"}
          title={"Please complete all active orders before editing."}
          onClose={() => toggleAdd()}
          onConfirm={() => handleEditConfirm()}
        /> */}
        {showEditModal && (
          <EditOrderModal
            data={actionData}
            open={showEditModal}
            mode={open}
            onClose={() => toggleAdd()}
            onSubmit={(data) => handleUpdateOrder(data)}
            onPrint={(data) => handlePrint(data)}
          />
        )}

        <SmartTable
          headerComponents={headerComponents[role]}
          title={PageTitle}
          searchByLabel="Order Number"
          searchByField="branchOrderNumber"
          // headActions={[AddAction]}
          actions={[EditAction, ViewAction]}
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
