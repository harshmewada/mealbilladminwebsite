import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TYPESOFORDERS } from "../../../contants";
import {
  setOrderType,
  addNewOtherOrder,
  activateOrder,
} from "../../../redux/action/orderActions";

const OrderTypeSelector = () => {
  const dispatch = useDispatch();
  const { selectedOrderTypeId } = useSelector((state) => state.order);

  const handleSelectType = (type) => {
    dispatch(activateOrder({ orderType: type.value, orderTypeId: type.key }));
  };
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
            onClick={() => handleSelectType(type)}
            // class={`btn  shadow-none btn-${
            //   selectedOrderTypeId === type.value ? "primary" : "warning"
            // }`}
            class={`btn  shadow-none btn-warning`}
          >
            {type.key}
          </button>
        );
      })}
    </div>
  );
};

export default OrderTypeSelector;
