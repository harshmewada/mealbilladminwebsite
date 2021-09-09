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
  formData,
  defaultValues,
  size,
  optionsData,
}) => {
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

  const isLoading = useSelector((state) => state.util.spinner);
  const [formErrors, setFormErrors] = React.useState({});
  const [fileFields, setFileFields] = React.useState();
  const [otherFields, setOtherFields] = React.useState({});

  const handleOtherChange = ({ name, value }) => {
    setOtherFields({
      ...otherFields,
      [name]: value,
    });
  };
  const handleFileFieldChange = (name, file) => {
    console.log("upcomin", file);
    setFileFields({
      [name]: file,
    });
  };
  const localSubmit = (values) => {
    onSubmit({ ...data, ...values, ...fileFields, ...otherFields });
  };
  React.useEffect(() => {
    setFormErrors(formState.errors);
  }, [formState]);

  return (
    open && (
      <ModalContainer
        open={open}
        onClose={() => {
          onClose();
          setFormErrors();
          reset();
        }}
        size={size}
        title={`${mode} ${title}`}
      >
        <FormProvider {...methods}>
          <form class="form-parsley" onSubmit={handleSubmit(localSubmit)}>
            <div class="row">
              {formData.map((item, index) => {
                const MyInput = Inputs[item.type];
                console.log(
                  "input value",
                  item.hasOptions,
                  // data[item.name],
                  optionsData
                );
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
                      setValue={setValue}
                      onCustomChange={handleOtherChange}
                      onFileChange={handleFileFieldChange}
                      control={control}
                      {...(item?.hasOptions && {
                        options: optionsData[item.name],
                      })}
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
