import React from "react";

import ReactApexChart from "react-apexcharts";

const RenderPieChart = ({ data, showCards }) => {
  return (
    <div
      class={
        showCards
          ? "card report-card d-flex flex-direction-row algin-items-center"
          : ""
      }
    >
      <div
        class={showCards ? "card-body" : ""}
        style={{ height: "100%", width: "100%" }}
      >
        {data?.series.length > 0 ? (
          <ReactApexChart
            options={data?.options}
            series={data?.series.map((ser) => parseFloat(ser))}
            type="donut"
          />
        ) : (
          <div>No Data Available</div>
        )}
      </div>
    </div>
  );
};

export default RenderPieChart;
