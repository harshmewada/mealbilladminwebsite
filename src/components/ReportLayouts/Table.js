import React from "react";
import SmartTable from "../common/SmartTable";
const Table = (props) => {
  const { headers, data, tableOptions } = props;

  return (
    <div class="card" style={{ height: "94%" }}>
      <div class="card-body">
        <SmartTable
          tableData={data}
          noPadding
          headers={headers || []}
          {...tableOptions}
        />
      </div>
    </div>
  );
};

export default Table;
