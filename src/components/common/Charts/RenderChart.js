import React from "react";

import ReactApexChart from "react-apexcharts";

const RenderChart = ({ data, showCards }) => {
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
        <div id="chart">
          <ReactApexChart
            options={data.options}
            series={data.series}
            type={data.type}
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default RenderChart;
