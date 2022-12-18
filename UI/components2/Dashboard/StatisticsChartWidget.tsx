
//@ts-nocheck
import React from "react";
import { Card } from "react-bootstrap";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { ApexOptions } from "apexcharts";
// import classNames from "classnames";

interface StatisticsChartWidgetProps {
  title?: string;
  stats?: string;
  trend: {
    textClass: string;
    icon: string;
    value: string;
  };
  colors?: Array<string>;
  transData?: Array<number>;
  creatorData?: Array<number>;
  visitorsData?: Array<number>;
  collectionsData?: Array<number>;
}

const StatisticsChartWidget = ({
  title,
  stats,
  trend,
  colors,
  transData,
  creatorData,
  visitorsData,
  collectionsData,
}: StatisticsChartWidgetProps) => {
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
    colors: colors,
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
      data: [1, 2, 23],
    },
  ];

  return (
    <Card>
      <Card.Body>
        <div className="d-flex">
          <div className="flex-grow-1">
            <span className="text-muted text-uppercase fs-12 fw-bold">
              {title}
            </span>
            <h3 className="mb-0">{stats}</h3>
          </div>
          <div className="align-self-center flex-shrink-0">
            <Chart
              className="apex-charts"
              options={options}
              series={series}
              type="area"
              height={45}
              width={80}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatisticsChartWidget;
