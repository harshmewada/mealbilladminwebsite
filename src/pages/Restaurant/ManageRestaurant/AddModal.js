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
    <ModalContainer open={open} onClose={onClose} title={`${mode} Restaurant`}>
      <form class="form-parsley" onSubmit={handleSubmit(onSubmit)}>
        <div class="row">
          <div class="form-group col-md-8">
            <label>Restaurant Name</label>
            <input
              type="text"
              class="form-control"
              required
              name="name"
              placeholder="Type a name"
              ref={register}
              defaultValue={data?.name}
            />
          </div>
          {!disabled && (
            <div class="form-group col-md-4">
              <label>Restaurant Logo</label>
              <div class="custom-file">
                <input
                  name="gogo"
                  type="file"
                  class="custom-file-input form-control"
                  id="customFile"
                  require={mode === "Add" && true}
                  onChange={onChange}
                  disabled={disabled}
                />
                <label class="custom-file-label" for="customFile">
                  Choose file
                </label>
              </div>
            </div>
          )}

          <div class="form-group col-md-4">
            <label>E-Mail</label>
            <div>
              <input
                type="email"
                class="form-control"
                required
                name="email"
                parsley-type="email"
                placeholder="Enter a valid e-mail"
                ref={register}
                defaultValue={data?.email}
              />
            </div>
          </div>
          <div class="form-group col-md-4">
            <label>Contact Person</label>
            <input
              type="text"
              name="contactPerson"
              class="form-control"
              required
              placeholder="Enter Contact Person"
              ref={register}
              defaultValue={data?.contactPerson}
            />
          </div>
          <div class="form-group col-md-4">
            <label>Contact Mobile Number</label>
            <input
              data-parsley-type="number"
              type="text"
              name="contactNumber"
              class="form-control"
              required
              placeholder="Enter mobile number"
              defaultValue={data?.contactNumber}
              ref={register({
                pattern: {
                  value: mobileRegex,
                  message: "Invalid mobile number",
                },
              })}
            />
            {errors.contactNumber && (
              <div class="form-text-error">
                {errors.contactNumber.message || "Invalid mobile number"}
              </div>
            )}
          </div>

          <div class="form-group col-md-12">
            <label>Address</label>
            <textarea
              required
              class="form-control"
              rows="2"
              name="address"
              placeholder="Type a address"
              ref={register}
              defaultValue={data?.email}
            ></textarea>
          </div>

          <div class="form-group col-md-6">
            <label>Current Balance</label>
            <input
              data-parsley-type="number"
              type="text"
              name="balance"
              class="form-control"
              required
              placeholder="Enter balace"
              ref={register}
              defaultValue={data?.balance || 0}
              disabled={disabled}
            />
          </div>
          <div class="form-group col-md-6">
            <label>GST Taxes</label>
            <div class="row">
              <div class="col-md-6">
                <input
                  name="cgst"
                  data-parsley-type="digits"
                  type="text"
                  class="form-control"
                  required
                  placeholder="Enter CGST"
                  ref={register}
                  defaultValue={data?.cgst}
                />
              </div>
              <div class="col-md-6">
                <input
                  name="sgst"
                  data-parsley-type="digits"
                  type="text"
                  class="form-control"
                  required
                  placeholder="Enter SGST"
                  ref={register}
                  defaultValue={data?.sgst}
                />
              </div>
            </div>
          </div>
          <div class="form-group col-md-12">
            <label>Tag Line</label>
            <input
              type="text"
              name="tagLine"
              class="form-control"
              required
              placeholder="Type a tag line"
              ref={register}
              defaultValue={data?.tagLine}
            />
          </div>
          <div class="form-group col-md-4">
            <label>App Theme</label>
            <select
              name="themeId"
              class="form-control"
              defaultValue={data?.themeId}
              required
              ref={register}
            >
              {themes.map((theme, index) => {
                return (
                  <option value={theme.id} key={index}>
                    {theme.themeName}
                  </option>
                );
              })}
            </select>
          </div>
          {/* <div class="form-group col-md-4">
            <label>Subscription</label>
            <select
              name="subscriptionId"
              class="form-control"
              ref={register}
              defaultValue={data?.subscriptionId}
            >
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
          </div> */}
          <div class="form-group col-md-4">
            <label>Status</label>
            <select
              name="status"
              class="form-control"
              defaultValue={data?.status}
              required
              ref={register}
            >
              <option value={"true"}>Active</option>
              <option value={"false"}>Inactive</option>
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
