//@ts-nocheck
import React from "react";
import { Row, Col } from "react-bootstrap";

// components
import StatisticsChartWidget from "../Dashboard/StatisticsChartWidget";

const BoxRowStats = ({totalLikes, totalPosts, totalColections, totalBuyers}) => {
  return (
    <div>
      <Row>
        <Col sm={6} xl={3}>
          <StatisticsChartWidget
            title="Total Likes"
            stats={totalLikes}
            trend={{
              textClass: "text-success",
              icon: "uil uil-arrow-up",
              value: "10.21%",
            }}
            colors={["#727cf5"]}
          />
        </Col>

        <Col sm={6} xl={3}>
          <StatisticsChartWidget
            title="Total Posts"
            stats={totalPosts}
            trend={{
              textClass: "text-danger",
              icon: "uil uil-arrow-down",
              value: "5.05%",
            }}
            colors={["#f77e53"]}
          />
        </Col>
        <Col sm={6} xl={3}>
          <StatisticsChartWidget
            title="Colections"
            stats={totalColections}
            trend={{
              textClass: "text-success",
              icon: "uil uil-arrow-up",
              value: "21.16%",
            }}
            colors={["#43d39e"]}
          />
        </Col>

        <Col sm={6} xl={3}>
          <StatisticsChartWidget
            title="Buyers"
            stats={totalBuyers}
            trend={{
              textClass: "text-danger",
              icon: "uil uil-arrow-down",
              value: "5.05%",
            }}
            colors={["#ffbe0b"]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default BoxRowStats;
