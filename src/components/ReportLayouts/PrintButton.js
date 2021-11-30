import React from "react";
import { useDispatch } from "react-redux";
import PrintButtonAction from "../common/Actions/PrintButtonAction";
import { setPrintData } from "../../redux/action/utilActions";
const PrintButton = (props) => {
  const dispatch = useDispatch();
  const { headers, data, tableOptions, printType, selectedParams } = props;

  const onPrintCashBook = () => {
    dispatch(setPrintData());

    setTimeout(() => {
      dispatch(setPrintData({ selectedParams, data: data }, printType));
    }, 500);
  };

  return (
    <div class="card" style={{ height: "94%" }}>
      <div class="card-body">
        <PrintButtonAction title="Print" onClick={() => onPrintCashBook()} />
      </div>
    </div>
  );
};

export default PrintButton;
