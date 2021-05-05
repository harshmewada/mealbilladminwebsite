import React from "react";
import { useSelector } from "react-redux";

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
  const handleSelectType = (e, tableTypeId) => {
    setSelected({
      type: e,
      tableTypeId: tableTypeId,
    });
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
        class={`btn btn-${selected.type === "all" ? "primary" : "info"}`}
      >
        All
      </button>
      <button
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
      </button>
    </div>
  );
};

export default TableTypeSelector;
