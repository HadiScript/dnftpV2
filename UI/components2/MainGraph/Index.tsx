//@ts-nocheck

import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HistoricalChart, SingleCoin } from "../../../config/CoinAPI";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Index = () => {
  const [historicData, setHistoricData] = useState();

  const fetchHistoricData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart("ethereum", 360, "PKR"));
      setHistoricData(data.prices);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchHistoricData();
  }, [fetchHistoricData]);

  const series = [
    {
      name: "ETH in PKR",
      data: historicData && historicData?.map((ethereum) => ethereum[1]),
    },
  ];

  const options = {
    chart: {
      type: "area",
      stacked: false,
      toolbar: {
        show: true,
      },
    },

    dataLabels: {
      enabled: false,
    },

    markers: {
      size: 0,
    },
    colors: ["#8364E2", "#E91E63", "#9C27B0"],
    grid: {
      row: {
        colors: ["white", "white"], // takes an array which will be repeated on columns
        opacity: 0.01,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
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

    yaxis: {
      show: false,
      showAlways: false,
      labels: {
        style: {
          colors: "white",
        },
      },
    },

    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "white",
        },
      },
      categories:
        historicData &&
        historicData?.map((coin) => {
          let date = new Date(coin[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;
          return 360 === 1 ? time : date.toLocaleDateString();
        }),
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
        height={500}
      />
    </>
  );
};

export default Index;
