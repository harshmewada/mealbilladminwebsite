import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalContainer = ({ open, Footer, onClose, title, children, size }) => {
  return (
    <Modal size={size || "xl"} show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {Footer && (
        <Modal.Footer>
          <Footer />
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ModalContainer;
