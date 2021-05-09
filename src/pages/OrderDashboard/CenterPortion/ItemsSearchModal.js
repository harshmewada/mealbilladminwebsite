import React, { useState, Fragment } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { pushItemToActiveOrder } from "../../../redux/action/orderActions";
function ItemsSearchModal({ open, onClose }) {
  const [selectValues, setSelectedValues] = React.useState([]);
  const handleClose = () => onClose();
  const dispatch = useDispatch();
  const textField = React.useRef();

  const { activeOrderIndex, selectedOrderTypeId, allItems } = useSelector(
    (state) => state.order
  );

  const handleAddItem = (selected) => {
    if (selected.length > 0) {
      const item = selected[0];

      if (activeOrderIndex || activeOrderIndex === 0) {
        if (selectedOrderTypeId === 0) {
          if (activeOrderIndex || activeOrderIndex === 0) {
            dispatch(pushItemToActiveOrder(item, selectedOrderTypeId));
          } else {
            alert("No Tables Active");
          }
        } else {
          dispatch(pushItemToActiveOrder(item, selectedOrderTypeId));
        }
        setSelectedValues([]);
      } else {
        alert("No Active Order");
      }
    } else {
      setSelectedValues([]);
    }
  };

  return (
    <>
      <Modal
        autoFocus={false}
        show={open}
        enforceFocus={false}
        restoreFocus={false}
        size="sm"
        onHide={handleClose}
        onEntered={() => {
          textField.current.focus();
        }}
      >
        <Modal.Body>
          <Row>
            <Col lg={10}>
              <Fragment>
                <Typeahead
                  //   {...props}
                  ref={textField}
                  id="rendering-example"
                  options={allItems || []}
                  placeholder="Search Item By Name and hotkeys"
                  labelKey="itemName"
                  filterBy={["itemName", "hotKey"]}
                  selected={selectValues}
                  emptyLabel
                  onChange={(selected) => handleAddItem(selected)}
                  //   autoFocus={true}
                  selectHintOnEnter
                  renderMenuItemChildren={(child) => (
                    <div>{child.itemName}</div>
                  )}
                  //   renderInput={(data) => <input {...data} />}
                />
              </Fragment>
            </Col>
            <Col lg={2}>
              <a href="javascript:void(0);" onClick={() => handleClose()}>
                <i
                  class={`mdi mdi-close-circle text-danger`}
                  style={{ fontSize: 25 }}
                ></i>
              </a>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ItemsSearchModal;
