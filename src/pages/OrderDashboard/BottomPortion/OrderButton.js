import React from "react";
import { TYPESOFPAYMENTS } from "../../../contants/index";
const OrderButton = ({ onClick, enableKOT, onKOTButtonClick }) => {
  const orderTypes = TYPESOFPAYMENTS;
  return (
    <div
      class="btn-group mt-0 pt-0"
      style={{ width: "100%" }}
      role="group"
      aria-label="Basic example"
    >
      {enableKOT && (
        <button
          onClick={() => onKOTButtonClick()}
          type="button"
          class="btn btn-outline-primary"
        >
          <i class={`dripicons-print mr-2`}></i>
          KOT
        </button>
      )}
      {orderTypes.map((ot, otinex) => {
        return (
          <button
            onClick={() => onClick(ot)}
            key={otinex}
            type="button"
            class="btn btn-outline-primary"
          >
            <i class={`${ot.icon} mr-2`}></i>
            {ot.type}
          </button>
        );
      })}
    </div>
  );
};

export default OrderButton;
