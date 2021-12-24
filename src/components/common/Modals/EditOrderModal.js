import React from "react";

import ModalContainer from "../ModalContainer";

import { useDispatch, useSelector } from "react-redux";
import ActiveTableSelector from "../../../pages/OrderDashboard/RightPortion/ActiveTableSelector2";

import {
  changeItemQuantityRedux,
  checkIfQuantityExceeds,
  isThatItemInMyOrder,
  pushItemToActiveOrderRedux,
  removeItemRedux,
} from "../../../redux/reducers/newOrderReducer";

import getOrderNeccesaryData from "../../../helpers/getOrderNeccesaryData";
import moment from "moment";
import { CURRENCY, DATETIMEFORMAT, ITEMSTATUS } from "../../../contants";
import calculateOrderTotals from "../../../helpers/calculateOrderTotals";
import flattentItemsArray from "../../../helpers/flattenItemsArray";

const EditOrderModal = ({
  open,
  onClose,
  data: orderData,
  onSubmit,
  mode,
  onPrint,
}) => {
  const isViewMode = mode === "View";
  const ready = getOrderNeccesaryData();

  const isLoading = useSelector((state) => state.util.spinner);
  const [activeOrders, setActiveOrders] = React.useState([]);
  const [editRemarks, setEditRemarks] = React.useState(undefined);

  const handleChangeRemarks = (e) => {
    const {
      target: { value },
    } = e;

    setEditRemarks(value);
  };
  const [activeOldOrders, setActiveOldOrders] = React.useState([]);

  const { allItems } = useSelector((state) => state.order);
  const { enablePrinting } = useSelector((state) => state.util);

  const activeOrder = activeOrders[0];
  const activeOldOrder = activeOldOrders[0];
  const formatData = (data) => {
    const orderItems = data.orderItems;

    return {
      ...data,
      tablePrice: data?.tablePrice || 0,
      orderItems: orderItems,
      orderType: parseInt(data.orderType),
      ...(mode === "EditOrder" && { isEdited: true }),
    };
  };

  const handleItemQuantity = ({ quantity, itemId }) => {
    // dispatch(changeItemQuantity(parseInt(quantity), itemindex));
    setActiveOrders([
      ...changeItemQuantityRedux({
        activeOrders,
        refId: activeOrder.refId,
        quantity: parseInt(quantity),
        itemId,
      }),
    ]);
  };
  const deleteItem = (itemId) => {
    // dispatch(removeItem(index));

    if (activeOrder.orderItems.length < 2) {
      alert("Can not remove only item from the order");
    } else {
      setActiveOrders([
        ...removeItemRedux({
          activeOrders,
          refId: activeOrder.refId,

          itemId,
        }),
      ]);
    }
  };

  const handleSearchAndAddItem = (selected) => {
    if (selected.length > 0) {
      const item = selected[0];
      const isVariant = item?.isVariant ? true : false;
      const refId = activeOrder.refId;

      const itemId = item?.variantId || item?.id || item?.id;

      const currItem = isThatItemInMyOrder(activeOrder, itemId);
      if (currItem) {
        if (checkIfQuantityExceeds(currItem, currItem.quantity + 1)) {
          return null;
        }
        setActiveOrders([
          ...changeItemQuantityRedux({
            activeOrders,
            refId: refId,
            quantity: parseInt(currItem.quantity) + 1,
            itemId,
          }),
        ]);
      } else {
        if (checkIfQuantityExceeds(item, 1)) {
          return null;
        }

        const netItem = {
          ...item,
          itemId: item?.variantId || item?._id || item?.id,
          isVariant: isVariant,
          quantity: 1,

          itemTotal: 1 * item.itemPrice,
          itemStatus: ITEMSTATUS[0].key,
          itemStatusId: ITEMSTATUS[0].value,
          kotQuantity: 0,
          kotTotal: 0,
        };

        setActiveOrders([
          ...pushItemToActiveOrderRedux({
            activeOrders,
            refId: activeOrder.refId,
            item: netItem,
          }),
        ]);
      }
    }
  };

  React.useEffect(() => {
    if (open) {
      const myData = formatData(orderData);

      setActiveOrders([myData]);
      if (myData?.oldOrder) {
        const emyData = formatData(orderData.oldOrder);

        setActiveOldOrders([emyData]);
      }
    }
  }, [open]);

  const getData = (orderData) => {
    let mydata = orderData || activeOrder;
    return mydata
      ? calculateOrderTotals(
          mydata,
          mydata?.cgst,
          mydata?.sgst,
          mydata?.otherCharges,
          mydata?.discount
        )
      : {};
  };

  const bottomTableData = (varData) => [
    [
      {
        value: "Order Date : ",
      },
      {
        value: moment(varData.createdAt).format(DATETIMEFORMAT),
      },
      {
        value: "Sub Total : ",
      },
      {
        value: getData(varData).itemsTotal,
        isCurrency: true,
      },
    ],
    [
      {
        value: "User : ",
      },
      {
        value: varData?.orderBy,
      },
      {
        value: "GST : ",
      },
      {
        renderTd: (row) => (
          <td>
            {CURRENCY}
            {getData(varData).sgstCharges + getData(varData).cgstCharges}
          </td>
        ),
        isCurrency: true,
      },
    ],
    [
      {
        value: "Payment : ",
      },
      {
        value: varData?.paymentType,
      },
      {
        value: "Charges : ",
      },
      {
        value: getData(varData)?.otherCharges,
        isCurrency: true,
      },
    ],
    [
      {
        value: "Customer Name : ",
      },
      {
        value: varData?.customerName,
      },
      {
        value: "Discount : ",
      },
      {
        value: varData?.discount,
        isCurrency: true,
      },
    ],
    [
      {
        value: "Mobile Number : ",
      },
      {
        value: varData?.customerMobile,
      },
      {
        value: "Grand Total : ",
        renderTd: (row) => (
          <td>
            <strong>Grand Total : </strong>
          </td>
        ),
      },
      {
        renderTd: (row) => (
          <td>
            <strong>
              {CURRENCY}
              {getData(varData)?.grandTotal}
            </strong>
          </td>
        ),

        isCurrency: true,
      },
    ],
  ];

  return (
    <div>
      <ModalContainer
        open={open}
        onClose={() => {
          onClose();
          // setFormErrors();
          // reset();
        }}
        title={`Order : # ${activeOrder?.branchOrderNumber}`}
        // title={`${mode} ${title}`}
        size={activeOldOrder ? "xl" : "md"}
      >
        <div class="row">
          {activeOldOrder && (
            <div className="col-md-6">
              <h5>Old Order </h5>

              <ActiveTableSelector
                tables={activeOldOrders}
                activeOrdersLength={1}
                scrollable
                orderDeletable={false}
                active={activeOldOrder}
                handleItemQuantity={() => {}}
                deleteItem={() => {}}
                handleSearchAndAddItem={() => {}}
                allItems={flattentItemsArray(allItems)}
                disabled={true}
                hideSearch={true}
                makeTableActive={() => {}}
                isEditMode
              />
              <BottomTable tableData={bottomTableData(activeOldOrder)} />
            </div>
          )}

          {activeOrders.length > 0 && (
            <div className={activeOldOrder ? "col-md-6" : "col-md-12"}>
              {activeOldOrder && <h5>Current Order </h5>}
              <ActiveTableSelector
                tables={activeOrders}
                activeOrdersLength={1}
                scrollable
                orderDeletable={false}
                active={activeOrder}
                handleItemQuantity={handleItemQuantity}
                deleteItem={deleteItem}
                handleSearchAndAddItem={handleSearchAndAddItem}
                allItems={flattentItemsArray(allItems)}
                disabled={
                  activeOldOrder || isViewMode || activeOrder?.editCount >= 1
                }
                hideSearch={isViewMode}
                makeTableActive={() => {}}
                isEditMode
              />
              <BottomTable tableData={bottomTableData(activeOrder)} />
            </div>
          )}
        </div>
        <div class="form-group mt-3 mb-3">
          <div class={`form-group col-md-${"12"}`}>
            <label>Remarks</label>
            <textarea
              type="text"
              class="form-control"
              placeholder={" Type Remarks"}
              rows={2}
              readOnly={activeOldOrder}
              value={editRemarks || activeOrder?.editRemarks}
              onChange={handleChangeRemarks}
            />
          </div>
        </div>
        <div class="form-group mb-0 mt-3 d-flex justify-content-center">
          {!isViewMode && activeOrder?.editCount < 1 && (
            <button
              type="submit"
              disabled={isLoading}
              class="btn btn-gradient-primary waves-effect waves-light"
              onClick={() => {
                onSubmit({
                  ...activeOrders[0],
                  editRemarks: editRemarks || activeOrder?.editRemarks,
                  ...getData(),
                });
              }}
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
          )}
          <button
            type="reset"
            class="btn btn-gradient-danger waves-effect ml-3"
            onClick={() => onClose()}
          >
            Close
          </button>
          {enablePrinting && (
            <button
              onClick={() => onPrint(activeOrder)}
              type="button"
              class="btn btn-outline-primary ml-3"
            >
              <i class={`dripicons-print mr-2`}></i>
              Print
            </button>
          )}
        </div>
      </ModalContainer>
    </div>
  );
};

export default EditOrderModal;

const BottomTable = ({ tableData }) => {
  return (
    <div>
      <div class="table-responsive-sm">
        <table class="table table-sm mb-0">
          <tbody>
            {tableData.map((row, rowIndex) => {
              return (
                <tr>
                  {row.map((td) => {
                    if (td.renderTd) {
                      return td.renderTd();
                    }
                    return (
                      <td>
                        {" "}
                        {td.isCurrency ? CURRENCY : ""}
                        {td.value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  paginated: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "0px 1vw",
    maxWidth: "20vw",
  },
  select: {
    margin: "0px 0.5vw",
  },
  searchGroup: {
    maxWidth: "15vw",
  },
};
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
