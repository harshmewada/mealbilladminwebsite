import React from "react";
import RenderChart from "../common/Charts/RenderChart";

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

  return (
    <RenderChart
      data={chartData}
      type={chartOptions.type}
      showCards={showCard}
    />
  );
};

export default Chart;
