import SweetAlert from "react-bootstrap-sweetalert";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert, hideOderAlert } from "../../redux/action/alertActions";

const LowQuantityAlert = () => {
  const dispatch = useDispatch();
  const { openOrderLowQuantity, severity, message } = useSelector(
    (state) => state.alert
  );

  const hide = () => {
    dispatch(hideAlert());
  };

  const foreverHide = () => {
    dispatch(hideOderAlert());
  };
  return (
    <>
      <SweetAlert
        type={"warning"}
        title={message}
        onConfirm={() => foreverHide()}
        onCancel={() => hide()}
        confirmBtnText="Don't show this again"
        cancelBtnText="Close"
        cancelBtnCssClass="btn btn-danger text-white shadow-none"
        confirmBtnCssClass="btn bg-white border-color-primary text-primary shadow-none"
        showCloseButton
        showConfirm
        showCancel
        // timeout={4000}
        show={openOrderLowQuantity}
      />
    </>
  );
};

export default LowQuantityAlert;
