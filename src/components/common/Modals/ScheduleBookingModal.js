import React from "react";
import AddCommonAction from "../Actions/AddCommonAction";
import DeleteCommonAction from "../Actions/DeleteCommonAction";
import ModalContainer from "../ModalContainer";
import { getEntriesOptions } from "../SmartTable/functions";
import TableHeading from "../SmartTable/TableHeading";
import TableTitle from "../SmartTable/TableTitle";
import { useSelector } from "react-redux";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-big-calendar/lib/sass/styles";
const localizer = momentLocalizer(moment);
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.

const Nodata = () => (
  <td colSpan={"8"} className="text-center">
    {"No Data Available"}
  </td>
);

const initEvent = {
  start: new Date(),
  end: new Date(),
  title: "",
};
const CalComp = () => {
  const [events, setEvents] = React.useState([]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      setEvents([
        ...events,
        {
          start,
          end,
          title,
        },
      ]);
  };
  return (
    <Calendar
      selectable
      localizer={localizer}
      events={events}
      scrollToTime={new Date(1970, 1, 1, 6)}
      defaultDate={new Date(2015, 3, 12)}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      defaultView={Views.WEEK}
      onSelectEvent={(event) => alert(event.title)}
      onSelectSlot={handleSelect}
    />
  );
};

const ScheduleBookingModal = ({
  open,
  onClose,
  data,
  onSubmit,
  mode,
  title,
}) => {
  const isLoading = useSelector((state) => state.util.spinner);

  return (
    <div>
      <ModalContainer
        open={open}
        onClose={() => {
          onClose();
          // setFormErrors();
          // reset();
        }}
        title={`${mode} ${title}`}
      >
        <div class="row">
          <div class="col-12">
            <TableTitle
              title={"Schedule"}
              // endActions={[
              //   () => (
              //     <AddCommonAction
              //       title="New Event"
              //       // onClick={() => push(emptyRow)}
              //     />
              //   ),
              // ]}
            />
            <div class="d-flex justify-content-between align-items-center mb-4"></div>
            <div class={"table-responsive "}></div>
          </div>
        </div>
        <div className="col-12">
          <CalComp />
        </div>

        <div class="form-group mb-0">
          <button
            type="submit"
            disabled={isLoading}
            class="btn btn-gradient-primary waves-effect waves-light"
          >
            {isLoading && (
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Submit
          </button>
        </div>
      </ModalContainer>
    </div>
  );
};

export default ScheduleBookingModal;

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { showSnackBar } from "../../redux/action/snackActions";
// import SmartTable from "../../components/common/SmartTable";

// import DeleteModal from "../../components/common/Modals/DeleteModal";
// import AddCommonAction from "../../components/common/Actions/AddCommonAction";
// import EditCommonAction from "../../components/common/Actions/EditAction";
// import DeleteCommonAction from "../../components/common/Actions/DeleteCommonAction";
// import CommonAddModal from "../../components/common/Modals/ExpenseAddModal";
// import {
//   createExpense,
//   deleteExpense,
//   getAllexpenseTypes,
//   updateExpense,
//   importExpenseTypes,
//   getAllExpenses,
//   getRestaurantExpenseType,
// } from "../../redux/action/expenseActions";
// import { RootUrl } from "../../redux/types";
// import { getAllBranches } from "../../redux/action/branchActions";
// import getErrorMessage from "../../helpers/getErrorMessage";
// import CommonImportModal from "../../components/common/Modals/CommonImportModal";
// import ImportCommonAction from "../../components/common/Actions/ImportCommonAction";

// //date
// import DateRangePicker from "react-bootstrap-daterangepicker";
// import "bootstrap-daterangepicker/daterangepicker.css";
// import moment from "moment";
// import { DATEFORMAT, dateRanges } from "../../contants";

// const SubExpensesModal = () => {
//   const { expenses: arraycat, restaurantExpenseTypes } = useSelector(
//     (state) => state.branch
//   );
//   const { role, restaurantId, branchId } = useSelector((state) => state.user);

//   const isBranchAdmin = ["branchadmin"].includes(role);

//   const isBranchUser = ["branchuser"].includes(role);

//   const PageTitle = "Expenses";

//   const [open, setOpen] = React.useState();

//   const [importOpen, setImportOpen] = React.useState();

//   const currRestaurantId = restaurantId || undefined;

//   const currBranchId = branchId;
//   const expenses = arraycat;

//   const [state, setState] = React.useState({
//     start: moment(),
//     end: moment(),
//   });
//   const { start, end } = state;

//   const handleCallback = (start, end) => {
//     // props.setValue({ start, end });
//     // onChange(setState({ start, end }));
//     setState({ start, end });
//   };

//   const dispatch = useDispatch();
//   // const Cateogrys = useSelector((state) => state.common.Cateogrys);

//   const [actionData, setActionData] = React.useState();

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
//     dispatch(deleteExpense({ ...actionData, role: role }))
//       .then((res) => {
//         if (res.payload.status === 200) {
//           toggleAdd();
//           dispatch(showSnackBar("Deleted succesfully"));
//           getAllData();
//         } else {
//           dispatch(
//             showSnackBar(
//               getErrorMessage(res) || "Failed to Delete Cateogry",
//               "error"
//             )
//           );
//         }
//       })
//       .catch((err) => {
//         console.log("err", err);
//         dispatch(
//           showSnackBar(
//             getErrorMessage(err) || "Failed to Delete Cateogry",
//             "error"
//           )
//         );
//       });
//   };

//   const getAllData = (selectedBranch) => {
//     if (isBranchAdmin || isBranchUser) {
//       dispatch(getRestaurantExpenseType(restaurantId));
//       dispatch(getAllExpenses(state));
//     }
//   };

//   console.log("restaurantExpenseTypes", restaurantExpenseTypes);

//   const onAdd = (data) => {
//     if (open === "Add") {
//       dispatch(
//         createExpense({
//           ...data,
//           role: role,
//           // branchId: branchId || data.branchId,

//           ...(currRestaurantId && { restaurantId: restaurantId }),
//           ...(currBranchId && { branchId: currBranchId }),
//         })
//       )
//         .then((res) => {
//           if (res.payload.status === 200) {
//             toggleAdd();
//             dispatch(showSnackBar("Expense created successfully"));
//             getAllData();
//           } else {
//             dispatch(
//               showSnackBar(
//                 getErrorMessage(res) || "Failed to Add Cateogry",
//                 "error"
//               )
//             );
//           }
//         })
//         .catch((err) => {
//           dispatch(
//             showSnackBar(
//               getErrorMessage(err) || "Failed to Add Cateogry",
//               "error"
//             )
//           );
//         });
//     }
//     if (open === "Edit") {
//       dispatch(
//         updateExpense({
//           ...actionData,
//           ...data,
//           role: role,
//         })
//       )
//         .then((res) => {
//           if (res.payload.status === 200) {
//             dispatch(showSnackBar("Cateogry Updated Successfully", "success"));
//             getAllData();

//             toggleAdd();
//           } else {
//             dispatch(
//               showSnackBar(
//                 getErrorMessage(res) || "Failed to Update Cateogry",
//                 "error"
//               )
//             );
//           }
//         })
//         .catch((err) => {
//           console.log("err", err);
//           dispatch(
//             showSnackBar(
//               getErrorMessage(err) || "Failed to Update Cateogry",
//               "error"
//             )
//           );
//         });
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

//   const branchtableheaders = [
//     { title: "Expense Title", key: "expenseTitle" },
//     { title: "Expense Type", key: "expenseType" },
//     { title: "Quantity", key: "quantity" },

//     { title: "Expense Price", key: "expensePrice", isCurrency: true },
//   ];
//   const headers = branchtableheaders;

//   const defaultValues = {
//     restaurantId: restaurantId,
//   };

//   const DatePicker = (action) => (
//     <div class="">
//       <DateRangePicker
//         initialSettings={{
//           startDate: start.toDate(),
//           endDate: end.toDate(),

//           locale: {
//             format: DATEFORMAT,
//           },
//           maxDate: new Date(),

//           ranges: dateRanges,
//         }}
//         onCallback={handleCallback}
//       >
//         <input type="text" class="form-control" />
//       </DateRangePicker>
//     </div>
//   );

//   const headerComponents = {
//     branchadmin: [DatePicker],
//   };
//   React.useEffect(() => {
//     getAllData();
//   }, [state]);

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
//           restaurantExpenseTypes={restaurantExpenseTypes}
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
//           tableData={expenses}
//           headers={headers}
//           sortable={true}
//           paginated={true}
//           searchByLabel={"Expense Title"}
//           searchByField={"expenseTitle"}
//           rowsPerPage={5}
//         />
//       </div>
//     </>
//   );
// };

// export default SubExpensesModal;
