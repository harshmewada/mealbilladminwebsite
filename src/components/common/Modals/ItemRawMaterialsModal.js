import React from "react";
import AddCommonAction from "../Actions/AddCommonAction";
import DeleteCommonAction from "../Actions/DeleteCommonAction";
import ModalContainer from "../ModalContainer";
import { getEntriesOptions } from "../SmartTable/functions";
import TableHeading from "../SmartTable/TableHeading";
import TableTitle from "../SmartTable/TableTitle";
import { useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { MEASUREUNITS } from "../../../contants";
import { RootUrl } from "../../../redux/types";

const Nodata = () => (
  <td colSpan={"8"} className="text-center">
    {"No Data Available"}
  </td>
);

const emptyRow = {
  item: {},

  usedStock: undefined,

  status: true,
};
var convert = require("convert-units");
const headers = [
  { title: "Raw Material Name", key: "itemName" },

  // {
  //   title: "Item Image",
  //   key: "itemImage",
  //   type: "image",
  //   sourceUrl: RootUrl,
  // },
  // { title: "Hotkey", key: "hotKey" },

  { title: "Quantity used", key: "usedStock" },

  { title: "Measure Unit", key: "stockUnit" },
];

const ItemRawMaterialsModal = ({
  open,
  onClose,
  data,
  onSubmit,
  allRawMaterials,
}) => {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState("asc");

  const isLoading = useSelector((state) => state.util.spinner);
  const initialValues = {
    rawMaterials: data?.rawMaterials || [],
  };

  return (
    <div>
      <ModalContainer
        open={open}
        onClose={() => {
          onClose();
          // setFormErrors();
          // reset();
        }}
        title={`${data?.itemName} Raw Materials`}
        // title={`${mode} ${title}`}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            onSubmit({
              rawMaterials: values.rawMaterials.filter(
                (val) => val.itemName !== ""
              ),
            });
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              {console.log("values", values.rawMaterials)}
              <FieldArray name="rawMaterials">
                {({ insert, remove, push }) => (
                  <div class="row">
                    <div class="col-12">
                      <TableTitle
                        title={"Variants"}
                        endActions={[
                          () => (
                            <AddCommonAction
                              title="New Item Variant"
                              onClick={() => push(emptyRow)}
                            />
                          ),
                        ]}
                      />
                      <div class="d-flex justify-content-between align-items-center mb-4">
                        <label style={styles.paginated}>
                          Total {values.rawMaterials.length} entries
                        </label>
                      </div>
                      <div class={"table-responsive "}>
                        <table
                          id="datatable"
                          class="table table-bordered dt-responsive nowrap"
                        >
                          <TableHeading
                            data={headers || []}
                            hasActions={true}
                            onRequestSort={() => {}}
                            sortable={false}
                            selectable={false}
                            onSelectAll={(e) => {}}
                            order={order}
                          />
                          <tbody>
                            {values.rawMaterials.length === 0 && <Nodata />}
                            {values.rawMaterials.map((item, childindex) => {
                              console.log("values rawMaterials", item);

                              return (
                                <tr key={childindex}>
                                  <td>
                                    <Field
                                      disabled={isLoading}
                                      as="select"
                                      className="form-control"
                                      name={`rawMaterials.${childindex}.item`}
                                    >
                                      {(propo) => {
                                        const { field, form, meta } = propo;
                                        console.log("field", field);

                                        return (
                                          <>
                                            <select
                                              name={`rawMaterials.${childindex}.item`}
                                              className="form-control"
                                              {...field}
                                              value={field?.value?.itemIndex}
                                              onChange={(e) => {
                                                const currentIndex =
                                                  e.target.value;

                                                setFieldValue(
                                                  `rawMaterials.${childindex}.item`,
                                                  {
                                                    ...allRawMaterials[
                                                      parseInt(currentIndex)
                                                    ],
                                                    itemIndex: currentIndex,
                                                  }
                                                );
                                              }}
                                            >
                                              <option selected disabled>
                                                Choose Raw Material
                                              </option>
                                              {allRawMaterials.map(
                                                (mat, matIndex) => {
                                                  return (
                                                    <option
                                                      key={matIndex}
                                                      value={matIndex}
                                                    >
                                                      {mat.itemName}
                                                    </option>
                                                  );
                                                }
                                              )}
                                            </select>

                                            {meta.touched && meta.error && (
                                              <div className="error">
                                                {meta.error}
                                              </div>
                                            )}
                                          </>
                                        );
                                      }}
                                    </Field>
                                  </td>

                                  <td>
                                    <Field
                                      disabled={isLoading}
                                      as="select"
                                      className="form-control"
                                      name={`rawMaterials.${childindex}.stockUnit`}
                                    >
                                      <option selected disabled>
                                        Choose Measure Unit{" "}
                                        {item?.item?.measureUnit}
                                      </option>
                                      {item?.item?.measureUnit &&
                                      item?.item?.measureUnit != "count" ? (
                                        convert()
                                          .from(item?.item?.measureUnit)
                                          ?.possibilities()
                                          ?.map((pos) => {
                                            return (
                                              <option value={pos}>{pos}</option>
                                            );
                                          })
                                      ) : (
                                        <option value={"count"}>
                                          {"count"}
                                        </option>
                                      )}
                                    </Field>
                                  </td>

                                  <td>
                                    <Field
                                      disabled={isLoading}
                                      name={`rawMaterials.${childindex}.usedStock`}
                                      placeholder="Enter Quantity used"
                                      type="number"
                                      steps="0.0"
                                      className="form-control"
                                    />
                                  </td>

                                  <td
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "space-evenly",
                                      height: "100%",
                                    }}
                                  >
                                    <DeleteCommonAction
                                      title="New Sub Expense Type"
                                      onClick={() => {
                                        !isLoading && remove(childindex);
                                      }}
                                    />
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </FieldArray>

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
            </Form>
          )}
        </Formik>
      </ModalContainer>
    </div>
  );
};

export default ItemRawMaterialsModal;

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
