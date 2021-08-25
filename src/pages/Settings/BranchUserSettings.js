import React from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PrintSetting from "./PrintSetting";
// import {
//   deleteReceiptMessage,
//   updateReceiptMessage,
// } from "../../redux/action/branchActions";

const BranchUserSettings = () => {
  return (
    <div class="page-content-tab">
      <PrintSetting />
    </div>
  );
};

export default BranchUserSettings;
