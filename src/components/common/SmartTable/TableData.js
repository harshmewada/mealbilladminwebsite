import React from "react";
import * as ColumnLayouts from "./ColumnLayouts";
const TableData = ({ data, header, actions }) => {
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
            {header.map((head, headindex) => {
              if (head.type) {
                const CurrentType = ColumnLayouts[head.type];
                return (
                  <td key={childindex + headindex}>
                    <CurrentType
                      sourceUrl={head.sourceUrl}
                      data={child[head.key]}
                    />
                  </td>
                );
              }
              return (
                <>
                  <td key={headindex}>{child[head.key]}</td>
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
