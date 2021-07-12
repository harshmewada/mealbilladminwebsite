import { Modal, Button } from "react-bootstrap";
import React from "react";
import ModalContainer from "../ModalContainer";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Inputs from "../Inputs";

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
  const formData = [
    {
      type: "select",
      name: "expenseTypeId",
      label: "Expense Type",
      options: restaurantExpenseTypes,
      optionLabelProp: "expenseType",
      optionValueProp: "id",
      defaultOption: () => (
        <option selected disabled>
          Select Expense Type
        </option>
      ),
    },
    {
      type: "text",
      name: "expenseTitle",
      label: "Expense Title",
      placeholder: "Type Expense Title",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Expense Title is required",
        },
      },
    },
    {
      type: showQuantityOptions ? "number" : "none",

      name: "quantity",
      label: "Expense Quantity",
      placeholder: "Type Expense Quantity",
      dependentOn: "",
    },
    {
      type: showQuantityOptions ? "select" : "none",

      name: "quantityType",
      size: 4,

      label: "Quantity Type",
      options: [
        {
          title: "Kg, ",
          value: "kg",
        },
        {
          title: "Gram",
          value: "Gram",
        },
        {
          title: " Nos.",
          value: " Nos.",
        },
        {
          title: "Litres",
          value: "Litres",
        },
      ],
      optionLabelProp: "title",
      optionValueProp: "value",
    },

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
    defaultValues: defaultValues,
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
      if (founddata && founddata.includeQuantity) {
        setShowQuantityOptions(true);
      } else {
        setShowQuantityOptions(false);
      }
    }
  }, [watchExpenseType]);
  return (
    open && (
      <ModalContainer
        open={open}
        onClose={() => {
          onClose();
          setFormErrors();
          reset();
        }}
        title={`${mode} ${title}`}
      >
        <FormProvider {...methods}>
          <form class="form-parsley" onSubmit={handleSubmit(onSubmit)}>
            <div class="row">
              {formData.map((item, index) => {
                const MyInput = Inputs[item.type];

                return (
                  mode !== item?.hideAt && (
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
                    />
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
                onClick={() => onClose()}
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
