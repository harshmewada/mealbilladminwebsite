import React from "react";
import { useSelector } from "react-redux";
import { TYPESOFORDERS } from "../../../contants";

const TableTypeSelector = ({ selected, setSelected }) => {
  const allTables = useSelector((state) => state.order.allTables);
  const getTableTypes = () => {
    const key = "tableType";

    const arrayUniqueByKey = [
      ...new Map(allTables.map((item) => [item[key], item])).values(),
    ];

    return arrayUniqueByKey;
  };

  // tablesTypes={getTableTypes().map((data) => {
  //   return {
  //     tableTypeName: data.tableType,
  //     tableTypeId: data.tableTypeId,
  //   };
  // })}
  const handleSelectType = (orderTypeId) => {
    setSelected(orderTypeId);
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
        onClick={() => handleSelectType("active")}
        class={`btn btn-${selected === "active" ? "primary" : "info"}`}
      >
        Active
      </button>
      {TYPESOFORDERS.map((t, i) => {
        return (
          <button
            type="button"
            onClick={() => handleSelectType(t.value)}
            class={`btn btn-${selected === t.value ? "primary" : "info"}`}
          >
            {t.key}
          </button>
        );
      })}
      {/* <button
        type="button"
        onClick={() => handleSelectType(0)}
        class={`btn btn-${selected.type === 0 ? "primary" : "info"}`}
      >
        Tables
      </button>
      <button
        type="button"
        onClick={() => handleSelectType(1)}
        class={`btn btn-${selected.type === 1 ? "primary" : "info"}`}
      >
        Parcel
      </button>
      <button
        type="button"
        onClick={() => handleSelectType(2)}
        class={`btn btn-${selected.type === 2 ? "primary" : "info"}`}
      >
        Home Delivery
      </button> */}
    </div>
  );
};

export default TableTypeSelector;