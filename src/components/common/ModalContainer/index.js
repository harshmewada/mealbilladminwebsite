import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalContainer = ({
  open,
  Footer,
  onClose,
  title,
  children,
  size,
  centered,
  noPadding,
}) => {
  return (
    <Modal size={size || "xl"} show={open} onHide={onClose} centered={centered}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={noPadding && { padding: 0 }}>{children}</Modal.Body>
      {Footer && (
        <Modal.Footer>
          <Footer />
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ModalContainer;
