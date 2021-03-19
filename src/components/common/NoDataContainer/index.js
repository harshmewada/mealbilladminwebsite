import React from "react";
const styles = {
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "gray",
    fontSize: "45px",
  },
};
const NoDataContainer = ({ title, subTitle }) => {
  return (
    <div style={styles.container}>
      <div style={styles.iconContainer}>
        <i class="mdi mdi-information-outline" style={styles.icon} />
      </div>
      <div style={styles.titleContainer}>
        <h2>{title || "No Data Available"}</h2>
      </div>
      {subTitle && (
        <div style={styles.titleContainer}>
          <h6>{subTitle}</h6>
        </div>
      )}
    </div>
  );
};

export default NoDataContainer;
