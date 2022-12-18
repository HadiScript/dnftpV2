//@ts-nocheck

import React, { useState } from "react";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../../../config/API";
import moment from "moment";

const PostChart = ({ count, eachDay }) => {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "friday",
    "saturday",
    "sunday",
  ];

  const apexBarChartOpts: ApexOptions = {
    chart: {
      height: 349,
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "25%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: eachDay,
      axisBorder: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    grid: {
      row: {
        colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: "#8364e2",
    },
    tooltip: {
      theme: "dark",
      x: {
        show: false,
      },
      y: {
        formatter: function (val) {
          return val;
          // return "96";
        },
      },
    },
  };

  const apexBarChartData = [
    {
      name: "Posts",
      data: count,
    },
  ];

  return (
    <>
      <h5 className="card-title header-title">
        Each Day Posts
        <i className="fa fa-bar-chart px-2" style={{ color: "#8364E2" }}></i>
      </h5>
      {moment().month() === 1 && "January"}
      {moment().month() === 2 && "Febuary"}
      {moment().month() === 3 && "March"}
      {moment().month() === 4 && "April"}
      {moment().month() === 5 && "May"}
      {moment().month() === 6 && "June"}
      {moment().month() === 7 && "July"}
      {moment().month() === 8 && "Auguest"}
      {moment().month() === 9 && "September"}
      {moment().month() === 10 && "Octubar"}
      {moment().month() === 11 && "November"}
      {moment().month() === 12 && "December"}
      <Chart
        options={apexBarChartOpts}
        series={apexBarChartData}
        type="bar"
        className="apex-charts mt-3"
        height={349}
        dir="ltr"
      />
    </>
  );
};

export default PostChart;
