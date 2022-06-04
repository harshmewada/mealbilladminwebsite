import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTableType } from "../../../redux/action/newOrderActions";
const TableTypeSelector = () => {
  const dispatch = useDispatch();
  const { tableTypes, activeTableType: selected } = useSelector(
    (state) => state.order
  );

  const handleSelectType = (e) => {
    dispatch(setTableType(e.target.value));
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
            <option key={index} value={type.id}>
              {type.tableTypeName}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TableTypeSelector;
