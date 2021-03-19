import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
const OrderConfirmModal = ({ text, onConfirm, onCancel }) => {
  return (
    <SweetAlert
      info
      showCancel
      confirmBtnText="Confirm"
      confirmBtnBsStyle="success"
      title="Confirm Order?"
      onConfirm={() => onConfirm()}
      onCancel={() => onCancel()}
      focusCancelBtn
    >
      {text}
    </SweetAlert>
  );
};

export default OrderConfirmModal;
