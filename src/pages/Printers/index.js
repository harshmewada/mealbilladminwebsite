import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { togglePrinting } from "../../redux/action/utilActions";

const Printers = () => {
  const dispatch = useDispatch();
  const enablePrinting = useSelector((state) => state.util.enablePrinting);
  return (
    <div class="page-content-tab">
      <Card>
        <Card.Body>
          <div class="custom-control custom-switch switch-primary">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customSwitchPrimary"
              checked={enablePrinting}
              onChange={(e) => {
                const checked = e.target.checked;
                dispatch(togglePrinting(checked));
              }}
            />
            <label class="custom-control-label" for="customSwitchPrimary">
              Enable Printing
            </label>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Printers;
