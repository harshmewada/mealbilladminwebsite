import SweetAlert from "react-bootstrap-sweetalert";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../../../redux/action/alertActions";

const SiteAlert = () => {
  const dispatch = useDispatch();
  const { open, severity, message } = useSelector((state) => state.alert);

  const hide = () => {
    dispatch(hideAlert());
  };
  return (
    <SweetAlert
      type={severity || "default"}
      title={message}
      onConfirm={() => hide()}
      onCancel={() => hide()}
      // timeout={4000}
      show={open}
    />
  );
};

export default SiteAlert;
