import React from "react";
import {
  stableSort,
  getComparator,
} from "../../../components/common/SmartTable/functions";
const HotKeySelector = ({ items, handleClick }) => {
  const styles = {
    root: {
      width: 80,

      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
      overflowY: "auto",
    },
    keyContainer: {
      cursor: "pointer",
      userSelect: "none",
      height: 40,
      width: 40,
      marginBottom: 10,
      borderRadius: 500,
      display: "block",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: ` linear-gradient(145deg, #5bc6ff, #249fe0)`,
      borderColor: "#249fe0",
    },
    key: {
      color: "white",
    },
  };
  const renderKey = (item, index) => {
    return (
      <div
        key={index}
        style={styles.keyContainer}
        onClick={() => handleClick(item, index)}
      >
        <span style={styles.key}>{item.hotKey}</span>
      </div>
    );
  };

  return (
    <div style={styles.root}>
      {stableSort(items, getComparator("asc", "hotKey")).map((item, index) => {
        return renderKey(item, index);
      })}
    </div>
  );
};

export default HotKeySelector;
