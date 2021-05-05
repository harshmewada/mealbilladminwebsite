import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
const OrderConfirmModal = ({ open, text, onConfirm, onCancel }) => {
  const [mobile, setMobile] = React.useState();

  return (
    <SweetAlert
      info
      placeHolder="Customer Mobile Number"
      showCancel
      confirmBtnText="Confirm"
      confirmBtnBsStyle="success"
      title="Confirm Order?"
      onConfirm={() => onConfirm(mobile)}
      onCancel={() => onCancel()}
      focusCancelBtn
    >
      {text}

      <input
        type="number"
        max="10"
        maxLength="10"
        onChange={(e) => setMobile(e.target.value)}
        className="form-control mt-3 "
        style={{
          borderColor: "gray",
        }}
        placeholder="Customer Mobile Number"
      />
    </SweetAlert>
  );
};

export default OrderConfirmModal;
