import { Modal, Button } from "react-bootstrap";
import React from "react";
import ModalContainer from "../ModalContainer";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from "../../../redux/action/restaurantActions";
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
}) => {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    formState,
    reset,
    setValue,
  } = useForm({
    defaultValues: defaultValues,
  });
  const [formErrors, setFormErrors] = React.useState({});
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllRestaurants());
  }, []);
  // console.log("error", errors);
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
        title={`${mode} ${title}`}
      >
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
                  />
                )
              );
            })}
          </div>
          <div class="form-group mb-0">
            <button
              type="submit"
              class="btn btn-gradient-primary waves-effect waves-light"
            >
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
      </ModalContainer>
    )
  );
};

export default CommonAddModal;
