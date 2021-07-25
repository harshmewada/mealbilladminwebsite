//with formik

import { Modal, Button } from "react-bootstrap";
import React from "react";
import ModalContainer from "../ModalContainer";
// import { useForm, Controller, FormProvider,  } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Inputs from "../Inputs";
import { MEASUREUNITS } from "../../../contants";
import { useFormik, Field } from "formik";
import InputContainer from "../Inputs/InputContainer";

import FileInput from "../Inputs/File";

const CommonAddModal = ({
  open,
  onClose,
  title,
  onSubmit,

  data,
  mode,
  restaurants,
  restaurantExpenseTypes,
  defaultValues,
}) => {
  const [showQuantityOptions, setShowQuantityOptions] = React.useState();
  const [subExpenseTypes, setSubExpenseTypes] = React.useState([]);
  const [quantityLabel, setQuantityLabel] = React.useState();
  const [file, setFile] = React.useState();

  const localSubmit = (values) => {
    onSubmit({
      ...defaultValues,
      ...values,
      ...(quantityLabel && { quantityType: quantityLabel }),
      ...(file && { attachment: file }),
      cgst,
      sgst,
      expenseTotal,
    });
  };

  // const formData = [
  //   {
  //     type: "select",
  //     name: "expenseTypeId",
  //     label: "Expense Type",
  //     options: restaurantExpenseTypes,
  //     optionLabelProp: "expenseType",
  //     optionValueProp: "id",
  //     disabled: mode === "Edit",

  //     defaultOption: () => <option>Select Expense Type</option>,
  //   },
  //   {
  //     type: subExpenseTypes.length > 0 ? "select" : "none",
  //     name: "subExpenseType",
  //     label: "Sub Expense Type",
  //     options: subExpenseTypes,
  //     optionLabelProp: "subExpenseType",
  //     optionValueProp: "subExpenseType",
  //     disabled: mode === "Edit",

  //     defaultOption: () => (
  //       <option selected disabled>
  //         Select Sub Expense Type
  //       </option>
  //     ),
  //   },
  //   {
  //     type: "text",
  //     name: "expenseTitle",
  //     label: "Remarks",
  //     placeholder: "Type Remarks",
  //     required: false,
  //   },
  //   {
  //     type: showQuantityOptions ? "number" : "none",

  //     name: "quantity",
  //     label: quantityLabel
  //       ? `Expense Quantity (${quantityLabel})`
  //       : "Expense Quantity",
  //     placeholder: "Type Expense Quantity",
  //     dependentOn: "",
  //   },
  //   // {
  //   //   type: showQuantityOptions ? "select" : "none",

  //   //   name: "quantityType",
  //   //   size: 4,

  //   //   label: "Quantity Type",
  //   //   options: MEASUREUNITS,
  //   //   optionLabelProp: "title",
  //   //   optionValueProp: "value",
  //   // },

  //   {
  //     type: "number",
  //     name: "expensePrice",
  //     label: "Expense Price",

  //     required: true,
  //     rules: {
  //       required: {
  //         value: true,
  //         message: "Branch Name is required",
  //       },
  //     },
  //   },
  // ];
  // const methods = useForm({
  //   defaultValues: data,
  // });

  const {
    values,
    touched,
    errors,
    setValues,
    resetForm,
    handleChange,
    handleSubmit: formikSubmit,
  } = useFormik({
    initialValues: data || {},
    onSubmit: (values) => {
      localSubmit(values);
      // alert(JSON.stringify(values, null, 2));
    },
  });

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   errors,
  //   control,
  //   formState,
  //   reset,
  //   setValue,
  //   getValues,
  // } = methods;

  // const watchExpenseType = watch("expenseTypeId");
  // const watchSubExpenseType = watch("subExpenseType");

  const isLoading = useSelector((state) => state.util.spinner);
  // const dispatch = useDispatch();

  // console.log("error", errors);
  // React.useEffect(() => {
  //   setFormErrors(formState.errors);
  // }, [formState]);

  let watchExpenseType = values?.expenseTypeId;
  const watchSubExpenseType = values?.subExpenseType;

  const cgst = values?.cgst || 0;
  const sgst = values?.sgst || 0;
  const expensePrice = values?.expensePrice || 0;

  const expenseTotal = cgst + sgst + expensePrice;

  console.log("watchExpenseType", watchExpenseType);
  const handleClose = () => {
    setSubExpenseTypes([]);
    setShowQuantityOptions();
    resetForm();

    onClose();
  };
  React.useEffect(() => {
    if (watchExpenseType) {
      const founddata = restaurantExpenseTypes.find(
        (item) => item.id === watchExpenseType
      );
      // console.log("founddata", founddata);
      if (founddata) {
        if (founddata.subExpenseTypes.length > 0) {
          setSubExpenseTypes(founddata.subExpenseTypes);
          return null;
        } else {
          setSubExpenseTypes([]);
        }
      } else if (founddata && founddata.includeQuantity) {
        setShowQuantityOptions(true);
      } else {
        setShowQuantityOptions(false);
      }
    }
  }, [watchExpenseType]);

  React.useEffect(() => {
    // console.log("founddata watchSubExpenseType", watchSubExpenseType);

    if (watchSubExpenseType) {
      const founddata = subExpenseTypes.find(
        (item) => item.subExpenseType === watchSubExpenseType
      );
      if (founddata) {
        if (founddata.measureUnit) {
          setQuantityLabel(founddata.measureUnit);
        } else {
          setQuantityLabel();
        }
        if (founddata.includeQuantity) {
          setShowQuantityOptions(true);
        } else {
          setShowQuantityOptions(false);
        }
      } else {
        setShowQuantityOptions(false);
        setQuantityLabel();
      }
    }
  }, [watchSubExpenseType]);

  // console.log("watchSubExpenseType", watchSubExpenseType);

  React.useEffect(() => {
    if (open && data) {
      if (data.subExpenseType) {
        const mainExpense = restaurantExpenseTypes.find(
          (item) => item.id === data.expenseTypeId
        );

        if (mainExpense) {
          if (mainExpense.subExpenseTypes) {
            setSubExpenseTypes(mainExpense.subExpenseTypes);
          }
          if (mainExpense.quantity) {
            setShowQuantityOptions(true);
          }
          if (mainExpense.quantityType) {
            setQuantityLabel(mainExpense.quantityType);
          }
        }
      }
    }

    if (open && mode === "Edit") {
      setValues(data);
    }
  }, [open, mode]);

  return (
    open && (
      <ModalContainer
        open={open}
        onClose={() => {
          handleClose();
          resetForm();
        }}
        title={`${mode} ${title}`}
      >
        <form class="form-parsley p-2" onSubmit={formikSubmit}>
          <div class="row">
            <InputContainer label="Expense Type">
              <select
                className="form-control"
                name={`expenseTypeId`}
                label="Expense Type"
                disabled={mode === "Edit"}
                value={values.expenseTypeId}
                onChange={handleChange}
              >
                <option selected disabled>
                  Select Expense Type
                </option>
                {restaurantExpenseTypes.map((unit) => (
                  <option value={unit.id}>{unit.expenseType}</option>
                ))}
              </select>
            </InputContainer>

            {subExpenseTypes.length > 0 && (
              <InputContainer label="Sub Expense Type">
                <select
                  className="form-control"
                  name={`subExpenseType`}
                  label="Sub Expense Type"
                  disabled={mode === "Edit"}
                  value={values.subExpenseType}
                  onChange={handleChange}
                >
                  <option selected disabled>
                    Select Sub Expense Type
                  </option>
                  {subExpenseTypes.map((unit) => (
                    <option value={unit.subExpenseType}>
                      {unit.subExpenseType}
                    </option>
                  ))}
                </select>
              </InputContainer>
            )}
            {showQuantityOptions && (
              <InputContainer
                label={
                  quantityLabel
                    ? `Expense Quantity (${quantityLabel})`
                    : "Expense Quantity"
                }
              >
                <input
                  type="number"
                  className="form-control"
                  placeholder="Type Expense Quantity"
                  onChange={handleChange}
                  name={`quantity`}
                  value={values.quantity}
                />
              </InputContainer>
            )}

            <InputContainer label={"Expense Price"} size={3}>
              <input
                type="number"
                className="form-control"
                placeholder="Type Expense Price"
                onChange={handleChange}
                name={`expensePrice`}
                value={
                  values.expensePrice
                    ? parseInt(values.expensePrice)
                    : undefined
                }
              />
            </InputContainer>
            <InputContainer label={"CGST"} size={3}>
              <input
                type="number"
                className="form-control"
                placeholder="Type CGST"
                onChange={handleChange}
                name={`cgst`}
                value={cgst}
              />
            </InputContainer>
            <InputContainer label={"SGST"} size={3}>
              <input
                type="number"
                className="form-control"
                placeholder="Type SGST"
                onChange={handleChange}
                name={`sgst`}
                value={sgst}
              />
            </InputContainer>
            <InputContainer label={"Total Expense Amount"} size={3}>
              <input
                type="number"
                className="form-control"
                placeholder="Type SGST"
                onChange={handleChange}
                name={`expenseTotal`}
                disabled={true}
                value={expenseTotal}
              />
            </InputContainer>

            <FileInput
              defaultValue={values?.attachment}
              size={6}
              label="Choose Attachment"
              name="attachment"
              value={file}
              onChange={(data) => {
                setFile(data);
              }}
              // disabled={mode === "Edit"}
            />

            <InputContainer size={12} label={"Remarks"}>
              <textarea
                rows="4"
                className="form-control"
                placeholder="Type Expense Price"
                onChange={handleChange}
                name={`expenseTitle`}
                placeholder={"Type Remarks"}
                defaultValue={values?.expenseTitle}
                value={values?.expenseTitle}
              />
            </InputContainer>
          </div>
          <div class="form-group mb-0 mt-3">
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
            <button
              type="reset"
              class="btn btn-gradient-danger waves-effect ml-3"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
          </div>
        </form>
      </ModalContainer>
    )
  );
};

export default CommonAddModal;

// import { Modal, Button } from "react-bootstrap";
// import React from "react";
// import ModalContainer from "../ModalContainer";
// import { useForm, Controller, FormProvider } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import * as Inputs from "../Inputs";
// import { MEASUREUNITS } from "../../../contants";

// const CommonAddModal = ({
//   open,
//   onClose,
//   title,
//   onSubmit,

//   data,
//   mode,
//   restaurants,
//   restaurantExpenseTypes,
//   defaultValues,
// }) => {
//   const [showQuantityOptions, setShowQuantityOptions] = React.useState();
//   const [subExpenseTypes, setSubExpenseTypes] = React.useState([]);
//   const [quantityLabel, setQuantityLabel] = React.useState();

//   const [selectedSubExpense, setSelectedSubExpense] = React.useState();

//   const handleClose = () => {
//     setSubExpenseTypes([]);
//     setShowQuantityOptions();
//     onClose();
//   };

//   const formData = [
//     {
//       type: "select",
//       name: "expenseTypeId",
//       label: "Expense Type",
//       options: restaurantExpenseTypes,
//       optionLabelProp: "expenseType",
//       optionValueProp: "id",
//       disabled: mode === "Edit",

//       defaultOption: () => <option>Select Expense Type</option>,
//     },
//     {
//       type: subExpenseTypes.length > 0 ? "select" : "none",
//       name: "subExpenseType",
//       label: "Sub Expense Type",
//       options: subExpenseTypes,
//       optionLabelProp: "subExpenseType",
//       optionValueProp: "subExpenseType",
//       disabled: mode === "Edit",

//       defaultOption: () => (
//         <option selected disabled>
//           Select Sub Expense Type
//         </option>
//       ),
//     },
//     {
//       type: "text",
//       name: "expenseTitle",
//       label: "Remarks",
//       placeholder: "Type Remarks",
//       required: false,
//     },
//     {
//       type: showQuantityOptions ? "number" : "none",

//       name: "quantity",
//       label: quantityLabel
//         ? `Expense Quantity (${quantityLabel})`
//         : "Expense Quantity",
//       placeholder: "Type Expense Quantity",
//       dependentOn: "",
//     },
//     // {
//     //   type: showQuantityOptions ? "select" : "none",

//     //   name: "quantityType",
//     //   size: 4,

//     //   label: "Quantity Type",
//     //   options: MEASUREUNITS,
//     //   optionLabelProp: "title",
//     //   optionValueProp: "value",
//     // },

//     {
//       type: "number",
//       name: "expensePrice",
//       label: "Expense Price",

//       required: true,
//       rules: {
//         required: {
//           value: true,
//           message: "Branch Name is required",
//         },
//       },
//     },
//   ];
//   const methods = useForm({
//     defaultValues: data,
//   });
//   const {
//     register,
//     handleSubmit,
//     watch,
//     errors,
//     control,
//     formState,
//     reset,
//     setValue,
//     getValues,
//   } = methods;

//   const watchExpenseType = watch("expenseTypeId");
//   const watchSubExpenseType = watch("subExpenseType");

//   const isLoading = useSelector((state) => state.util.spinner);
//   const [formErrors, setFormErrors] = React.useState({});
//   // const dispatch = useDispatch();

//   // console.log("error", errors);
//   React.useEffect(() => {
//     setFormErrors(formState.errors);
//   }, [formState]);

//   React.useEffect(() => {
//     if (watchExpenseType) {
//       const founddata = restaurantExpenseTypes.find(
//         (item) => item.id === watchExpenseType
//       );
//       console.log("founddata", founddata);
//       if (founddata) {
//         if (founddata.subExpenseTypes.length > 0) {
//           setSubExpenseTypes(founddata.subExpenseTypes);
//           return null;
//         } else {
//           setSubExpenseTypes([]);
//         }
//       } else if (founddata && founddata.includeQuantity) {
//         setShowQuantityOptions(true);
//       } else {
//         setShowQuantityOptions(false);
//       }
//     }
//   }, [watchExpenseType]);

//   React.useEffect(() => {
//     console.log("founddata watchSubExpenseType", watchSubExpenseType);

//     if (watchSubExpenseType) {
//       const founddata = subExpenseTypes.find(
//         (item) => item.subExpenseType === watchSubExpenseType
//       );
//       if (founddata) {
//         if (founddata.measureUnit) {
//           setQuantityLabel(founddata.measureUnit);
//         } else {
//           setQuantityLabel();
//         }
//         if (founddata.includeQuantity) {
//           setShowQuantityOptions(true);
//         } else {
//           setShowQuantityOptions(false);
//         }
//       } else {
//         setShowQuantityOptions(false);
//         setQuantityLabel();
//       }
//     }
//   }, [watchSubExpenseType]);

//   React.useEffect(() => {
//     if (open && data) {
//       if (data.subExpenseType) {
//         const mainExpense = restaurantExpenseTypes.find(
//           (item) => item.id === data.expenseTypeId
//         );

//         if (mainExpense) {
//           if (mainExpense.subExpenseTypes) {
//             setSubExpenseTypes(mainExpense.subExpenseTypes);
//           }
//           if (mainExpense.quantity) {
//             setShowQuantityOptions(true);
//           }
//           if (mainExpense.quantityType) {
//             setQuantityLabel(mainExpense.quantityType);
//           }
//         }
//       }
//       // console.log("founddata data", data);
//     }
//   }, [open, mode]);
//   console.log("founddata mainExpense", showQuantityOptions);

//   const localSubmit = (values) => {
//     console.log("founddata localsubmit", values);
//     onSubmit({
//       ...defaultValues,
//       ...values,
//       ...(quantityLabel && { quantityType: quantityLabel }),
//     });
//   };
//   return (
//     open && (
//       <ModalContainer
//         open={open}
//         onClose={() => {
//           handleClose();
//           setFormErrors();
//           reset();
//         }}
//         title={`${mode} ${title}`}
//       >
//         <FormProvider {...methods}>
//           <form class="form-parsley" onSubmit={handleSubmit(localSubmit)}>
//             <div class="row">
//               {formData.map((item, index) => {
//                 const MyInput = Inputs[item.type];

//                 return (
//                   mode !== item?.hideAt && (
//                     <>
//                       <MyInput
//                         {...item}
//                         key={index}
//                         name={item.name}
//                         label={item.label}
//                         placeholder={item.placeholder}
//                         defaultValue={data ? data[item.name] : ""}
//                         ref={register(item.rules)}
//                         error={formErrors[item.name]?.message}
//                         mode={mode}
//                         disabled={item.disabled}
//                       />
//                     </>
//                   )
//                 );
//               })}
//             </div>
//             <div class="form-group mb-0">
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 class="btn btn-gradient-primary waves-effect waves-light"
//               >
//                 {isLoading && (
//                   <span
//                     class="spinner-border spinner-border-sm"
//                     role="status"
//                     aria-hidden="true"
//                   ></span>
//                 )}
//                 Submit
//               </button>
//               <button
//                 type="reset"
//                 class="btn btn-gradient-danger waves-effect ml-3"
//                 onClick={() => handleClose()}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </FormProvider>
//       </ModalContainer>
//     )
//   );
// };

// export default CommonAddModal;
