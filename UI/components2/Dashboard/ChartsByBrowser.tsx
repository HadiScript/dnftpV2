//@ts-nocheck
import React from "react";
import { Card, Dropdown } from "react-bootstrap";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";

const ChartsByBrowser = () => {
  const apexBarChartOpts: ApexOptions = {
    chart: {
      height: 356,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: -30,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    colors: ["#5369f8", "#43d39e", "#ff5c75", "#ffbe0b"],
    labels: ["Safari", "Firefox", "Chrome", "Internet Explorer"],
    legend: {
      show: false,
      floating: true,
      fontSize: "13px",
      position: "left",
      offsetX: 10,
      offsetY: 10,
      labels: {
        useSeriesColors: true,
      },
      formatter: function (seriesName, opts) {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
      },
      itemMargin: {
        horizontal: 1,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  const apexBarChartData = [76, 67, 61, 90];

  return (
    <Card>
      <Card.Body>
        <h4 className="card-title header-title">Session by Browser</h4>

        <div className="my-3" dir="ltr">
          <Chart
            options={apexBarChartOpts}
            series={apexBarChartData}
            type="radialBar"
            className="apex-charts"
            height={356}
            dir="ltr"
          />
        </div>

        <div>
          <p className="mb-1">
            <i className="uil uil-square text-primary me-1"></i> Safari
            <span className="float-end">32.8%</span>
          </p>
          <p className="mb-1">
            <i className="uil uil-square text-success me-1"></i> Firefox
            <span className="float-end">16.5%</span>
          </p>
          <p className="mb-1">
            <i className="uil uil-square text-danger me-1"></i> Chrome
            <span className="float-end">38.3%</span>
          </p>
          <p className="mb-0">
            <i className="uil uil-square text-warning me-1"></i> Internet
            Explorer
            <span className="float-end">12.4%</span>
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ChartsByBrowser;
