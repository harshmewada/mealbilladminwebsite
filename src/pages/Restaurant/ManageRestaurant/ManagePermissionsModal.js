import React from "react";
import ModalContainer from "../../../components/common/ModalContainer";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { SCOPES } from "../../../contants";
import InputContainer from "../../../components/common/Inputs/InputContainer";
const AddModal = ({
  open,
  onClose,
  title,
  onSubmit,
  file,
  setFile,
  data,
  mode,
  permissions,
}) => {
  const { register, handleSubmit, errors, reset, control } = useForm({
    defaultValues: {},
  });

  // React.useEffect(() => {
  //   if (permissions.length > 0) {
  //     let def = {};
  //     Object.keys(SCOPES).forEach(function (key) {
  //       const includes = permissions.includes(key);
  //       def = { ...def, [key]: includes };
  //     });

  //     reset(def);
  //   }
  // }, [permissions, reset]);

  // console.log("errors data", errors);

  const localSubmit = (data) => {
    const datatoPush = [];

    Object.keys(data).forEach(function (key) {
      const valu = data[key];
      if (valu) {
        datatoPush.push(key);
      }
    });

    onSubmit(datatoPush);
  };
  return (
    <ModalContainer
      open={open}
      onClose={onClose}
      title={`Manage Permissions`}
      size="sm"
    >
      <form class="form-parsley" onSubmit={handleSubmit(localSubmit)}>
        {Object.keys(SCOPES).map(function (key) {
          const name = key;

          // const value = SCOPES[key];

          return (
            <Controller
              control={control}
              name={name}
              defaultValue={permissions.includes(key)}
              render={(
                { onChange, onBlur, value, name, ref },
                { invalid, isTouched, isDirty }
              ) => (
                <div class={`form-group col-md-12`}>
                  <div class="custom-control custom-switch switch-primary">
                    <input
                      class="custom-control-input form-control"
                      id={`customSwitchPrimary${name}`}
                      ref={ref}
                      // {...props}
                      type="checkbox"
                      checked={value}
                      onChange={(e) => onChange(e.target.checked)}
                    />
                    <label
                      class="custom-control-label"
                      for={`customSwitchPrimary${name}`}
                    >
                      {name?.replace("_", " ")}
                    </label>
                  </div>
                </div>
              )}
            />
          );
        })}

        <div class="form-group mb-0">
          <button
            type="submit"
            class="btn btn-gradient-primary waves-effect waves-light"
          >
            Submit
          </button>
          <button
            type="reset"
            class="btn btn-gradient-danger waves-effect ml-3 "
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default AddModal;
