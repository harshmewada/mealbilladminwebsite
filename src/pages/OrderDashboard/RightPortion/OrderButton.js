import React from "react";

const OrderButton = ({ onClick }) => {
  const orderTypes = [
    { type: "Cash", id: 0, icon: "mdi mdi-cash-multiple" },

    { type: "Card", id: 1, icon: "mdi mdi-credit-card" },
    { type: "Other", id: 2, icon: "mdi mdi-wallet-outline" },
  ];
  return (
    <div
      class="btn-group mt-0 pt-0"
      style={{ width: "100%" }}
      role="group"
      aria-label="Basic example"
    >
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
