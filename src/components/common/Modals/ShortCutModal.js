import React, { useRef, useState } from "react";
import { Button, Overlay, Popover, Table } from "react-bootstrap";
import { SHORTCUTKEYS } from "../../../contants/index";
const ShortCutModal = React.forwardRef((props, ref) => {
  const show = props.open;
  const onClose = props.onClose;
  return (
    <Overlay
      show={show}
      rootClose
      target={ref.current}
      placement="bottom"
      container={ref.current}
      containerPadding={20}
      onHide={() => onClose()}
    >
      <Popover id="popover-contained " className="popover-shortcuts ">
        <Popover.Title as="h3" className="popover-title">
          Shortcut Keys
        </Popover.Title>
        <Popover.Content className="popover-body">
          <Table class="table table-dark" borderless>
            {}
            <tbody>
              {SHORTCUTKEYS.map((data, index) => {
                return (
                  <tr key={index}>
                    {/* <td>{index + 1}</td> */}
                    <td>{data.key}</td>
                    <td>{data.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Popover.Content>
      </Popover>
    </Overlay>
  );
});

export default ShortCutModal;
