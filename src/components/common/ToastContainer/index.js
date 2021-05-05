import React from "react";
import { Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackBar } from "../../../redux/action/snackActions";
const ToastContainer = () => {
  const dispatch = useDispatch();
  const { open: show, message, severity } = useSelector((state) => state.snack);

  const severnitStyle = () => {
    switch (severity) {
      case "success":
        return "bg-success";

        break;

      case "error":
        return "bg-danger";

        break;

      default:
        break;
    }
  };
  return (
    show && (
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 2000,
        }}
        class="customToast"
      >
        <Toast
          show={show}
          delay={3000}
          autohide
          onClose={() => dispatch(hideSnackBar())}
          className={`text-white ${severnitStyle()}`}
        >
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </div>
    )
  );
};

export default ToastContainer;
