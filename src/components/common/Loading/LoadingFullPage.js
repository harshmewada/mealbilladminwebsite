import React from "react";

const LoadingFullPage = () => {
  return (
    <div
      style={{
        height: "100%",
        minHeight: "80vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div class="spinner-border text-primary" role="status"></div>
    </div>
  );
};

export default LoadingFullPage;
