//@ts-nocheck
import React from "react";
import { Card, Dropdown } from "react-bootstrap";

// components
import { WorldVectorMap } from "../../VectorMap";

const LocationChart = () => {


  // vector map config
  const options = {
    zoomOnScroll: false,
    markers: [
      {
        coords: [31.5600376, 74.4173763],
      },
    ],
    markerStyle: {
      initial: {
        r: 9,
        fill: "#5369f8",
        "fill-opacity": 0.9,
        stroke: "#fff",
        "stroke-width": 7,
        "stroke-opacity": 0.4,
      },
      hover: {
        fill: "#727cf5",
        stroke: "#fff",
        "fill-opacity": 1,
        "stroke-width": 1.5,
      },
    },
    backgroundColor: "transparent",
    regionStyle: {
      initial: {
        fill: "#d4dadd",
      },
    },
  };

  return (
    <Card>
      <Card.Body>
      <h4 className="card-title header-title">Session by Location</h4>

        <WorldVectorMap height="487px" width="100%" options={options} />
      </Card.Body>
    </Card>
  );
};

export default LocationChart;
