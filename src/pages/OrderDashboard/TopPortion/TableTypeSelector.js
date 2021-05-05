import React from "react";
import { useSelector } from "react-redux";

const TableTypeSelector = ({
  selected,
  tablesTypes: tableTypes,
  setSelected,
}) => {
  // const tableTypes = useSelector((state) => state.order.tableTypes);

  const handleSelectType = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div class="form-group mb-0 " style={{ width: "100%" }}>
      <select
        name="theme"
        label="Select Table Type"
        class="form-control"
        value={selected}
        onChange={(e) => handleSelectType(e)}
      >
        <option value="all">All Tables</option>
        {tableTypes.map((type, index) => {
          // console.log("table type", type);
          return (
            <option key={index} value={type.tableTypeId}>
              {type.tableTypeName}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TableTypeSelector;
