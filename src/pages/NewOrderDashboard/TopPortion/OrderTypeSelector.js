import React from "react";
import { TYPESOFORDERS } from "../../../contants";

const OrderTypeSelector = () => {
  return (
    <div
      class="btn-group mr-0 pr-0 shadow-none"
      style={{ width: "100%" }}
      role="group"
      aria-label="Basic example"
    >
      {TYPESOFORDERS.map((type, index) => {
        return (
          <button
            type="button"
            class={
              index === 0
                ? `btn  shadow-none btn-primary`
                : `btn  shadow-none btn-warning`
            }
          >
            {type.key}
          </button>
        );
      })}
    </div>
  );
};

export default OrderTypeSelector;
