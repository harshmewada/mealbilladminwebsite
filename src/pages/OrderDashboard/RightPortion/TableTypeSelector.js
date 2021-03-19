import React from "react";
import { useSelector } from "react-redux";

const TableTypeSelector = ({ selected, setSelected }) => {
  const tableTypes = useSelector((state) => state.order.tableTypes);

  const handleSelectType = (e) => {
    setSelected(e);
  };
  return (
    <div
      class="btn-group"
      style={{ width: "100%" }}
      role="group"
      aria-label="Basic example"
    >
      <button
        type="button"
        onClick={() => handleSelectType("all")}
        class={`btn btn-${selected == "all" ? "primary" : "info"}`}
      >
        All
      </button>
      {tableTypes.map((type, index) => {
        return (
          <button
            type="button"
            onClick={() => handleSelectType(type.tableTypeId)}
            class={`btn btn-${
              selected == type.tableTypeId ? "primary" : "info"
            }`}
          >
            {type.tableTypeName}
          </button>
        );
      })}
    </div>
  );
};

export default TableTypeSelector;
