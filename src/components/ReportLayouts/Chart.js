import React from "react";
import RenderChart from "../common/Charts/RenderChart";
import RenderPieChart from "../common/Charts/RenderPieChart";

const Chart = ({ data, chartOptions, directData, headers, showCard }) => {
  const [chartData, setChartData] = React.useState({
    series: directData
      ? data
      : headers.map((head) => {
          return {
            name: head.name,
            data: data[head.key],
          };
        }),

    ...chartOptions,
  });

  React.useEffect(() => {
    setChartData({
      series: directData
        ? data
        : headers.map((head) => {
            return {
              name: head.name,
              data: data[head.key],
            };
          }),

      ...chartOptions,
    });
  }, [data]);

  //pie chart not working at first render in apex

  return chartOptions.type !== "donut" ? (
    <RenderChart
      data={chartData}
      type={chartOptions.type}
      showCards={showCard}
    />
  ) : (
    <RenderPieChart
      data={chartData}
      type={chartOptions.type}
      showCards={showCard}
    />
  );
};

export default Chart;
