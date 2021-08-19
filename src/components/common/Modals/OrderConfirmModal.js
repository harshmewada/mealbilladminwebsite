import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
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
  return (
    <SweetAlert
      info
      placeHolder="Customer Mobile Number"
      showCancel
      confirmBtnText="Confirm"
      confirmBtnBsStyle="success"
      title="Confirm Order?"
      onConfirm={() => onConfirm(state)}
      onCancel={() => onCancel()}
      focusCancelBtn
    >
      {text}
      <input
        type="text"
        name="customerName"
        onChange={(e) => handleChange(e)}
        className="form-control mt-3 "
        style={{
          borderColor: "gray",
        }}
        placeholder="Customer Name"
        value={state.customerName}
      />
      <input
        name="customerMobile"
        type="number"
        max="10"
        maxLength="10"
        onChange={(e) => handleChange(e)}
        className="form-control mt-3 "
        style={{
          borderColor: "gray",
        }}
        value={state.customerMobile}
        placeholder="Customer Mobile Number"
      />
      {enableRemarks && (
        <textarea
          name="remarks"
          rows="4"
          onChange={(e) => handleChange(e)}
          className="form-control mt-3 "
          style={{
            borderColor: "gray",
          }}
          value={state.remarks}
          placeholder="Remarks"
        />
      )}
    </SweetAlert>
  );
};

export default React.memo(OrderConfirmModal);
