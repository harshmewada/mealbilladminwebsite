import { Modal, Button } from "react-bootstrap";
import React from "react";
import ModalContainer from "../../../components/common/ModalContainer";
import { HexColorPicker } from "react-colorful";
import { useForm } from "react-hook-form";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import { Curreny } from "../../../redux/types";

const AddModal = ({ open, data, onClose, title, onSubmit }) => {
  const { register, handleSubmit, watch, errors, setValue } = useForm();
  const durationOptions = [1, 2, 3, 6, 12, 24, 36];
  return (
    <ModalContainer open={open} onClose={onClose} title="Add Subscription">
      <form class="form-parsley" onSubmit={handleSubmit(onSubmit)}>
        <div class="row">
          <div class="form-group col-md-8">
            <label>Subscription Name</label>
            <input
              type="text"
              class="form-control"
              required
              name="subscriptionName"
              placeholder="Type a name"
              ref={register}
              defaultValue={data?.subscriptionName}
            />
          </div>
          <div class="form-group col-md-4">
            <label>Status</label>
            <select
              name="status"
              ref={register}
              defaultValue={data?.status}
              class="form-control"
              required
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label>Duration</label>
            <select
              name="subscriptionDuration"
              ref={register}
              class="form-control"
              required
              defaultValue={data?.subscriptionDuration}
            >
              {durationOptions.map((opt, index) => {
                return (
                  <option value={`${opt}`} key={index}>
                    {opt} Month{opt > 1 ? "s" : undefined}
                  </option>
                );
              })}
            </select>
          </div>
          <div class="form-group col-md-6">
            <label>Amount</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupPrepend">
                  {Curreny}
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="Subscription Amount"
                required
                name="subscriptionAmount"
                maxlength="4"
                autocomplete="off"
                ref={register({
                  pattern: {
                    value: /^[0-9]*$/,
                  },
                })}
                defaultValue={data?.subscriptionAmount}
              />
            </div>
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
            class="btn btn-gradient-danger waves-effect ml-3"
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
