//@ts-nocheck
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Row, Col, Card } from "react-bootstrap";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { ApexOptions } from "apexcharts";

// components
import StatisticsChartWidget from "../../../UI/components2/Dashboard/StatisticsChartWidget";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../../../config/API";

const Statistics = () => {
  const [creatorCount, setCreatorCount] = useState([]);
  const [transectionCount, setTransectionCount] = useState([]);
  const [nftsCount, setNftsCount] = useState([]);
  const [postsCount, setPostsCount] = useState([]);
  const [allcreator, setAllcreator] = useState(0);
  const [alltransections, setalltransections] = useState(0);
  const [allnfts, setallnfts] = useState(0);
  const [allposts, setallposts] = useState(0);

  useEffect(() => {
    fetchCreatorCounts();
  }, []);

  const fetchCreatorCounts = async () => {
    const createCountLet = [];
    const transectionCountLet = [];
    const nftsCountLet = [];
    const postsCountLet = [];
    const allCreatorLet = 0;
    const allnftsLet = 0;
    const allpostsLet = 0;
    const alltransLet = 0;

    try {
      const { data } = await axios.get(`${API}/eachDays`);
      // creator datas
      data.creators.map((x) => {
        allCreatorLet += x.count;
        createCountLet.push(x.count);
      });
      setAllcreator(allCreatorLet);
      setCreatorCount(createCountLet);

      // transections datas
      data.transections.map((x) => {
        alltransLet += x.count;
        transectionCountLet.push(x.count);
      });
      setalltransections(alltransLet);
      setTransectionCount(transectionCountLet);

      data.nfts.map((x) => {
        allnftsLet += x.count;
        nftsCountLet.push(x.count);
      });
      setallnfts(allnftsLet);
      setNftsCount(nftsCountLet);

      data.posts.map((x) => {
        allpostsLet += x.count;
        postsCountLet.push(x.count);
      });
      setallnfts(allnftsLet);
      setPostsCount(postsCountLet);
    } catch (error) {
      toast.error(error);
    }
  };

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
    colors: ["#727cf5", "#f77e53", "#43d39e", "#ffbe0b"],
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

  return (
    <div>
      <h5>All Stats</h5>
      <Row>
        <Col sm={6} xl={3}>
          <Card>
            <Card.Body>
              <div className="d-flex">
                <div className="flex-grow-1">
                  <span className="text-muted text-uppercase fs-12 fw-bold">
                    Creators
                  </span>
                  <h3 className="mb-0">{allcreator}</h3>
                </div>
                <div className="align-self-center flex-shrink-0">
                  <Chart
                    className="apex-charts"
                    options={options}
                    series={[
                      {
                        data: creatorCount,
                      },
                    ]}
                    type="area"
                    height={45}
                    width={80}
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card>
            <Card.Body>
              <div className="d-flex">
                <div className="flex-grow-1">
                  <span className="text-muted text-uppercase fs-12 fw-bold">
                    transections
                  </span>
                  <h3 className="mb-0">{alltransections}</h3>
                </div>
                <div className="align-self-center flex-shrink-0">
                  <Chart
                    className="apex-charts"
                    options={options}
                    series={[
                      {
                        data: transectionCount,
                      },
                    ]}
                    type="area"
                    height={45}
                    width={80}
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card>
            <Card.Body>
              <div className="d-flex">
                <div className="flex-grow-1">
                  <span className="text-muted text-uppercase fs-12 fw-bold">
                    NFTs
                  </span>
                  <h3 className="mb-0">{allnfts}</h3>
                </div>
                <div className="align-self-center flex-shrink-0">
                  <Chart
                    className="apex-charts"
                    options={options}
                    series={[
                      {
                        data: nftsCount,
                      },
                    ]}
                    type="area"
                    height={45}
                    width={80}
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card>
            <Card.Body>
              <div className="d-flex">
                <div className="flex-grow-1">
                  <span className="text-muted text-uppercase fs-12 fw-bold">
                    Posts
                  </span>
                  <h3 className="mb-0">{allposts}</h3>
                </div>
                <div className="align-self-center flex-shrink-0">
                  <Chart
                    className="apex-charts"
                    options={options}
                    series={[
                      {
                        data: postsCount,
                      },
                    ]}
                    type="area"
                    height={45}
                    width={80}
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistics;
