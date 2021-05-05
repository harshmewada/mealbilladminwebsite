import React from "react";
import * as ColumnLayouts from "./ColumnLayouts";
const TableData = ({
  data,
  header,
  actions,
  selectable,
  handleCheckChange,
}) => {
  const Nodata = () => (
    <td colSpan={"8"} className="text-center">
      {"No Data Available"}
    </td>
  );
  return (
    <tbody>
      {data.length === 0 && <Nodata />}
      {data?.map((child, childindex) => {
        return (
          <tr key={childindex}>
            {selectable && (
              <td>
                <div class="checkbox">
                  <div class="custom-control" style={{ minHeight: 0 }}>
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      onChange={(e) => {
                        handleCheckChange(e.target.checked, childindex);
                      }}
                      checked={child.selected ? true : false}
                    />
                    <label class="custom-control-label"></label>
                  </div>
                </div>
              </td>
            )}
            {header.map((head, headindex) => {
              const renderRow = head.renderRow;
              const data = renderRow ? renderRow(child) : child[head.key];
              if (head.type) {
                const CurrentType = ColumnLayouts[head.type];
                return (
                  <td key={childindex + headindex}>
                    <CurrentType sourceUrl={head.sourceUrl} data={data} />
                  </td>
                );
              }
              if (head.key === "status") {
                const CurrentType = ColumnLayouts["status"];
                return (
                  <td key={childindex + headindex}>
                    <CurrentType data={data} />
                  </td>
                );
              }
              return (
                <>
                  <td key={headindex}>{data}</td>
                </>
              );
            })}
            {actions?.length > 0 && (
              <td
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  height: "100%",
                }}
              >
                {actions.map((Action, index) => {
                  return (
                    <div>
                      <Action index={index} key={index} data={child} />
                    </div>
                  );
                })}
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableData;
