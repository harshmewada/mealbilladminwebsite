import React from "react";

const CustomCashRow = ({ row, datakey, textAlign }) => {
  const currRow = row[datakey];
  return (
    <div
      className={currRow?.isSubtitle ? "ml-2" : ""}
      style={{
        textAlign: textAlign,
      }}
    >
      {currRow?.isStrong ? <strong>{currRow?.value}</strong> : currRow?.value}
    </div>
  );
};

export default CustomCashRow;
