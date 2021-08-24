import React from "react";
import { CURRENCY } from "../../contants";
import SmartTable from "../common/SmartTable";
const CashBookTable = (props) => {
  const { headers, data, tableOptions } = props;

  console.log("data", data);

  const BoldTd = ({ value }) => (
    <td style={{ fontWeight: 900, fontSize: "1rem" }}>{value}</td>
  );

  return (
    <div class="card" style={{ height: "94%" }}>
      <div class="table-responsive">
        <table class="table mb-0 table-centered">
          <thead>
            <tr>
              {headers.map((head) => (
                <th width={head.width} className="bg-orange text-white">
                  {head.isCurrency ? CURRENCY : ""} {head.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <BoldTd value="Opening Balance" />
              {/* <BoldTd value="Opening Balance" /> */}

              <td>4</td>
              <td>$250</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CashBookTable;
