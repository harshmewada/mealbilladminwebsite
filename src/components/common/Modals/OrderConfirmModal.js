import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useForm } from "react-hook-form";
import { mobileRegex } from "../../../helpers/regex";
const OrderConfirmModal = ({
  open,
  text,
  onConfirm,
  onCancel,
  enableRemarks,
  customerName,
  customerMobile,
  hideAllInputs,
}) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    onConfirm(data);
    console.log(data);
  };

  // console.log(
  //   "rendere",
  //   open,
  //   text,
  //   onConfirm,
  //   onCancel,
  //   enableRemarks,
  //   customerName,
  //   customerMobile,
  //   hideAllInputs
  // );
  // const [state, setState] = React.useState({
  //   customerName: "Jamna",
  //   customerMobile: "89888888888",
  //   remarks: undefined,
  // });
  const [state, setState] = React.useState({
    customerName: customerName,
    customerMobile: customerMobile,
    remarks: undefined,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  console.log("errors", errors);
  return (
    <SweetAlert
      info
      placeHolder="Customer Mobile Number"
      showCancel={false}
      showConfirm={false}
      confirmBtnText="Confirm"
      confirmBtnBsStyle="success"
      title="Confirm Order?"
      // onConfirm={() => onConfirm(state)}
      onCancel={() => onCancel()}
      focusCancelBtn
    >
      {text}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="customerName"
          className="form-control mt-3 "
          style={{
            borderColor: "gray",
          }}
          placeholder="Customer Name"
          ref={register}
          defaultValue={customerName}

          // onChange={(e) => handleChange(e)}
        />
        {errors.customerName && <span>This field is required</span>}
        <input
          name="customerMobile"
          type="text"
          className="form-control mt-3 "
          style={{
            borderColor: "gray",
          }}
          ref={register({
            pattern: {
              value: mobileRegex,
              message: "Invalid mobile Number",
            },
          })}
          defaultValue={customerMobile}
          // onChange={(e) => handleChange(e)}

          // value={state.customerMobile}
          placeholder="Customer Mobile Number"
        />
        {errors.customerMobile && (
          <div
            style={{ width: "100%" }}
            className="d-flex justify-content-start mt-2"
          >
            <span style={{ fontSize: 12, color: "red", textAlign: "left" }}>
              {errors.customerMobile.message}
            </span>
          </div>
        )}

        {enableRemarks && (
          <textarea
            name="remarks"
            rows="4"
            className="form-control mt-3 "
            style={{
              borderColor: "gray",
            }}
            ref={register}
            // onChange={(e) => handleChange(e)}

            // value={state.remarks}
            placeholder="Remarks"
          />
        )}
        <div className="d-flex align-items-center justify-content-around mt-3">
          <button type="submit" className="btn btn-primary ">
            Confirm
          </button>
          <button className="btn btn-info" onClick={() => onCancel()}>
            Cancel
          </button>
        </div>
      </form>
    </SweetAlert>
  );
};

export default React.memo(OrderConfirmModal);
