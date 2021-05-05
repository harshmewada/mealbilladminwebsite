import { Modal, Button } from "react-bootstrap";
import React from "react";
import ModalContainer from "../../../components/common/ModalContainer";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { mobileRegex } from "../../../helpers/regex";
const AddModal = ({
  open,
  onClose,
  title,
  onSubmit,
  file,
  setFile,
  data,
  mode,
}) => {
  const { register, handleSubmit, watch, errors, setValue } = useForm({
    defaultValues: {},
  });
  const { themes, subscriptions } = useSelector((state) => state.common);
  const onChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  // console.log("data", data);
  const disabled = mode === "Edit";
  return (
    <ModalContainer
      open={open}
      onClose={onClose}
      title={`${mode} Subscription`}
    >
      <form class="form-parsley" onSubmit={handleSubmit(onSubmit)}>
        <div class="row">
          <div class="form-group col-md-6">
            <label>Restaurant Name</label>
            <input
              disabled
              type="text"
              class="form-control"
              required
              name="name"
              placeholder="Type a name"
              ref={register}
              defaultValue={data?.name}
            />
          </div>
          {data?.startDate && (
            <div class="form-group col-md-6">
              <label> Current Subscription</label>

              <div class="form-control d-flex flex-direction-row align-items-center">
                <span
                  class="text-muted ml-3"
                  style={{
                    fontSize: "0.845rem",
                    fontWeight: "400",
                    lineHeight: "1.8",
                    flex: 1,
                  }}
                >
                  {data?.subscriptionName} {"  "} Start : {data?.startDate} End
                  : {data?.endDate}
                </span>
              </div>
            </div>
          )}

          <div class="form-group col-md-3">
            <label> New Subscription</label>
            <select name="subscriptionId" class="form-control" ref={register}>
              <option value={""}>No Subscription</option>
              {subscriptions.map((theme, index) => {
                return (
                  <option value={theme._id} key={index}>
                    {theme.subscriptionName}{" "}
                    {`(${theme.subscriptionDuration} Month)`}
                  </option>
                );
              })}
            </select>
          </div>
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
