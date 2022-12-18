//@ts-nocheck

import React from "react";
import dynamic from "next/dynamic";
import { Card } from "react-bootstrap";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";
// import classNames from "classnames";

const BoxStats = () => {
  //  default options
  const options: ApexOptions = {
    chart: {
      type: "area",
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    colors: ["#727cf5"],
    tooltip: {
      theme: "dark",
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: (seriesName) => {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [45, 100],
      },
    },
  };

  // chart data
  const series = [
    {
      data: [2, 0, 0, 0, 0, 12, 2, 1, 9],
      data2: [22, 23, 1,20, 0, 12, 2, 1, 9],
    },
  ];

  return (
    <Card>
      <Card.Body>
        <Chart
          className="apex-charts"
          options={options}
          series={series}
          type="area"
        />
      </Card.Body>
    </Card>
  );
};

export default BoxStats;
