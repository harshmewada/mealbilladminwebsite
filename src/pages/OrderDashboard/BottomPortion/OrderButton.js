import React from "react";
import { TYPESOFPAYMENTS } from "../../../contants/index";
const OrderButton = ({
  onClick,
  enableKOT,
  enableKDS,
  onKOTButtonClick,
  onPrePrint,
  enablePrinting,
  onSettleClick,
}) => {
  const showButton = () => {
    if (enableKOT) {
      return true;
    }
    if (enableKDS) {
      return true;
    }
    return false;

    // if (!enableKDS && !enableKOT && enablePrinting) {
    //   return false;
    // }
    // return true;
  };
  const orderTypes = TYPESOFPAYMENTS;
  return (
    <div
      class="btn-group mt-0 pt-0"
      style={{ width: "100%" }}
      role="group"
      aria-label="Basic example"
    >
      {showButton() && (
        <button
          onClick={() => onKOTButtonClick({ enableKOT })}
          type="button"
          class="btn btn-outline-primary"
        >
          {enableKOT && <i class={`dripicons-print mr-2`}></i>}
          KOT
        </button>
      )}

      {enablePrinting && (
        <button
          onClick={() => onPrePrint({ enablePrinting })}
          type="button"
          class="btn btn-outline-primary"
        >
          <i class={`dripicons-print mr-2`}></i>
          Bill
        </button>
      )}
      <button
        onClick={() => onClick({ enableKOT, enablePrinting })}
        type="button"
        class="btn btn-outline-primary"
      >
        <i class={`mr-2 mdi mdi-cash-multiple`}></i>
        Settle
      </button>
      {/* {orderTypes.map((ot, otinex) => {
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
      })} */}
    </div>
  );
};

export default OrderButton;
