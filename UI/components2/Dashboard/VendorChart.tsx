//@ts-nocheck
import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import axios from "axios";
import { API } from "../../../config/API";
import { toast } from "react-toastify";

const SubscribersChart = () => {
  const [category, setCategory] = React.useState([]);
  const [date, setDate] = React.useState([]);

  React.useEffect(() => {
    fetched();
  }, []);

  const fetched = async () => {
    const dates = [];
    const transections = [];

    try {
      const { data } = await axios.get(`${API}/transections`);
      data.map((x) => {
        dates.push(x.createdAt);
        transections.push(x.transection);
      });
      setDate(dates);
      setCategory(transections);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const series = [
    {
      name: "created transections",
      data: category,
    },
    {
      name: "boughted transections",
      data: [0.02, 0.9, 0.023],
    },
  ];

  const options = {
    chart: {
      type: "area",
      stacked: false,
      height: 371,
      // downloads
      toolbar: {
        show: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [3],
    },

    markers: {
      size: 0,
    },
    colors: ["#5369f8"],
    grid: {
      row: {
        colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: "#f1f3fa",
    },
    fill: {
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 70, 80, 100],
      },
    },

    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          legend: {
            show: false,
          },
        },
      },
    ],

    xaxis: {
      type: "datetime",
      categories: date,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
  };

  return (
    <>
      <Chart
        options={options}
        series={series}
        type="area"
        className="apex-charts"
        height={371}
      />
    </>
  );
};

export default SubscribersChart;
