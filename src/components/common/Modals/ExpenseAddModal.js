import { Modal, Button } from "react-bootstrap";
import React from "react";
import ModalContainer from "../ModalContainer";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Inputs from "../Inputs";
import { MEASUREUNITS } from "../../../contants";

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

  const [selectedSubExpense, setSelectedSubExpense] = React.useState();

  const handleClose = () => {
    setSubExpenseTypes([]);
    setShowQuantityOptions();
    onClose();
  };

  const formData = [
    {
      type: "select",
      name: "expenseTypeId",
      label: "Expense Type",
      options: restaurantExpenseTypes,
      optionLabelProp: "expenseType",
      optionValueProp: "id",
      disabled: mode === "Edit",

      defaultOption: () => <option>Select Expense Type</option>,
    },
    {
      type: subExpenseTypes.length > 0 ? "select" : "none",
      name: "subExpenseType",
      label: "Sub Expense Type",
      options: subExpenseTypes,
      optionLabelProp: "subExpenseType",
      optionValueProp: "subExpenseType",
      disabled: mode === "Edit",

      defaultOption: () => (
        <option selected disabled>
          Select Sub Expense Type
        </option>
      ),
    },
    {
      type: "text",
      name: "expenseTitle",
      label: "Remarks",
      placeholder: "Type Remarks",
      required: false,
    },
    {
      type: showQuantityOptions ? "number" : "none",

      name: "quantity",
      label: quantityLabel
        ? `Expense Quantity (${quantityLabel})`
        : "Expense Quantity",
      placeholder: "Type Expense Quantity",
      dependentOn: "",
    },
    // {
    //   type: showQuantityOptions ? "select" : "none",

    //   name: "quantityType",
    //   size: 4,

    //   label: "Quantity Type",
    //   options: MEASUREUNITS,
    //   optionLabelProp: "title",
    //   optionValueProp: "value",
    // },

    {
      type: "number",
      name: "expensePrice",
      label: "Expense Price",

      required: true,
      rules: {
        required: {
          value: true,
          message: "Branch Name is required",
        },
      },
    },
  ];
  const methods = useForm({
    defaultValues: data,
  });
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    formState,
    reset,
    setValue,
    getValues,
  } = methods;

  const watchExpenseType = watch("expenseTypeId");
  const watchSubExpenseType = watch("subExpenseType");

  const isLoading = useSelector((state) => state.util.spinner);
  const [formErrors, setFormErrors] = React.useState({});
  // const dispatch = useDispatch();

  // console.log("error", errors);
  React.useEffect(() => {
    setFormErrors(formState.errors);
  }, [formState]);

  React.useEffect(() => {
    if (watchExpenseType) {
      const founddata = restaurantExpenseTypes.find(
        (item) => item.id === watchExpenseType
      );
      console.log("founddata", founddata);
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
    console.log("founddata watchSubExpenseType", watchSubExpenseType);

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
      // console.log("founddata data", data);
    }
  }, [open, mode]);
  console.log("founddata mainExpense", showQuantityOptions);

  const localSubmit = (values) => {
    console.log("founddata localsubmit", values);
    onSubmit({
      ...defaultValues,
      ...values,
      ...(quantityLabel && { quantityType: quantityLabel }),
    });
  };
  return (
    open && (
      <ModalContainer
        open={open}
        onClose={() => {
          handleClose();
          setFormErrors();
          reset();
        }}
        title={`${mode} ${title}`}
      >
        <FormProvider {...methods}>
          <form class="form-parsley" onSubmit={handleSubmit(localSubmit)}>
            <div class="row">
              {formData.map((item, index) => {
                const MyInput = Inputs[item.type];

                return (
                  mode !== item?.hideAt && (
                    <>
                      <MyInput
                        {...item}
                        key={index}
                        name={item.name}
                        label={item.label}
                        placeholder={item.placeholder}
                        defaultValue={data ? data[item.name] : ""}
                        ref={register(item.rules)}
                        error={formErrors[item.name]?.message}
                        mode={mode}
                        disabled={item.disabled}
                      />
                    </>
                  )
                );
              })}
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
              <button
                type="reset"
                class="btn btn-gradient-danger waves-effect ml-3"
                onClick={() => handleClose()}
              >
                Cancel
              </button>
            </div>
          </form>
        </FormProvider>
      </ModalContainer>
    )
  );
};

export default CommonAddModal;
