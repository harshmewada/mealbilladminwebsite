import React from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { togglePrintSetting } from "../../redux/action/userActions";
const PrintSetting = () => {
  const dispatch = useDispatch();

  const handleChangeCheckBox = (name, value) => {
    dispatch(
      togglePrintSetting({
        [name]: value,
      })
    );
  };

  const {
    enablePrinting,
    enableBranchName,
    enableKOT,
    enableKDS,
    enableLogo,
    enableAddress,
    enableGSTNumber,
    enableCustomer,
  } = useSelector((state) => state.util);

  const renderCheckboxInput = ({ name, label, onChange, value }) => {
    return (
      <div class="custom-control custom-switch switch-primary">
        <input
          type="checkbox"
          class="custom-control-input"
          id={`customSwitchPrimary${name}`}
          checked={value}
          onChange={(e) => {
            const checked = e.target.checked;
            onChange(name, checked);
          }}
        />
        <label class="custom-control-label" for={`customSwitchPrimary${name}`}>
          {label}
        </label>
      </div>
    );
  };

  return (
    <div>
      <Card>
        <Card.Header class="card-header bg-primary">
          <h5 class="text-white"> Setting</h5>
        </Card.Header>
        <Card.Body>
          {renderCheckboxInput({
            name: "enablePrinting",
            value: enablePrinting,
            onChange: (name, value) => handleChangeCheckBox(name, value),
            label: " Enable Printing",
          })}

          {renderCheckboxInput({
            name: "enableKOT",
            value: enableKOT,
            onChange: (name, value) => handleChangeCheckBox(name, value),
            label: "Enable KOT",
          })}
          {renderCheckboxInput({
            name: "enableKDS",
            value: enableKDS,
            onChange: (name, value) => handleChangeCheckBox(name, value),
            label: "Enable Kitchen Display System",
          })}

          {renderCheckboxInput({
            name: "enableLogo",
            value: enableLogo,
            onChange: (name, value) => handleChangeCheckBox(name, value),
            label: "Enable Logo Printing",
          })}
          {renderCheckboxInput({
            name: "enableBranchName",
            value: enableBranchName,
            onChange: (name, value) => handleChangeCheckBox(name, value),
            label: "Enable Branch Name Printing",
          })}

          {renderCheckboxInput({
            name: "enableAddress",
            value: enableAddress,
            onChange: (name, value) => handleChangeCheckBox(name, value),
            label: "Enable Address Printing",
          })}
          {renderCheckboxInput({
            name: "enableGSTNumber",
            value: enableGSTNumber,
            onChange: (name, value) => handleChangeCheckBox(name, value),
            label: "Enable GST Number Printing",
          })}
          {renderCheckboxInput({
            name: "enableCustomer",
            value: enableCustomer,
            onChange: (name, value) => handleChangeCheckBox(name, value),
            label: "Enable Cutomer Info Printing",
          })}
        </Card.Body>
      </Card>
    </div>
  );
};

export default PrintSetting;
