import React from "react";
import { Modal, Button } from "react-bootstrap";

const CommonConfirmModal = ({ title, open, size, onConfirm, onClose }) => {
  return (
    <Modal size={size || "xl"} show={open} centered onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span class="text-danger">&nbsp;{title} &nbsp;</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class="form-group mb-0 d-flex justify-content-around">
          <button
            type="submit"
            onClick={() => onConfirm()}
            class="btn btn-gradient-primary waves-effect waves-light"
          >
            Confirm
          </button>
          <button
            onClick={() => onClose()}
            class="btn btn-gradient-danger waves-effect ml-3 "
          >
            Cancel
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CommonConfirmModal;
