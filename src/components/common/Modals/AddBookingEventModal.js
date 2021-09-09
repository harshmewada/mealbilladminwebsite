import React from "react";

import ModalContainer from "../ModalContainer";
import { useForm, Controller } from "react-hook-form";

import { useSelector } from "react-redux";
import moment from "moment";
import { DATEFORMAT } from "../../contants";
import * as Inputs from "../common/Inputs";
const AddBookingEventModal = ({
  open,
  title,
  mode,
  onClose,
  data,
  onSubmit,
  optionData,
  role,
  formData,
}) => {
  const isLoading = useSelector((state) => state.util.spinner);
  const defaultValues = {
    start: new Date(),
    end: new Date(),
    eventTitle: "",
    hostedBy: "",
    mobile: "",
    remarks: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    formState,
    reset,
    getValues,
    setValue,
  } = useForm({
    defaultValues,
    branchId: "All",
    shouldUnregister: false,
  });

  const [state, setState] = React.useState({
    date: { start: moment(), end: moment() },
  });
  const [formErrors, setFormErrors] = React.useState({});

  React.useEffect(() => {
    setFormErrors(formState.errors);
  }, [formState]);

  const handleChange = (event) => {
    if (event.target) {
      const { name, value } = event.target;
      setValue(name, value);
    } else {
      setValue("date", event.date);
      setState({
        ...state,
        ...event,
      });
    }
  };
  return (
    <div>
      <ModalContainer
        open={open}
        onClose={() => {
          onClose();
          setFormErrors();
          reset();
        }}
        title={`${mode} ${title}`}
        size="lg"
      >
        <form class="form-parsley" onSubmit={handleSubmit(onSubmit)}>
          <div class="row">
            {formData.map((item, index) => {
              const MyInput = Inputs[item.type];

              return (
                role !== item?.hideAt && (
                  <MyInput
                    value={state[item.name]}
                    {...item}
                    onChange={(e) => handleChange(e)}
                    key={index}
                    noPadding
                    name={item.name}
                    label={item.label}
                    placeholder={item.placeholder}
                    defaultValue={defaultValues ? defaultValues[item.name] : ""}
                    ref={register(item.rules)}
                    error={formErrors[item.name]?.message}
                    {...(item?.hasOptions && {
                      options: optionData[item.name],
                    })}
                  />
                )
              );
            })}
          </div>
        </form>
      </ModalContainer>
    </div>
  );
};

export default AddBookingEventModal;
