//@ts-nocheck

import axios from "axios";
import React from "react";
import { TrendingCoins } from "../../../config/CoinAPI";
import AliceCarousel from "react-alice-carousel";
import Link from "next/link";
import styled from "styled-components";

const styleGraphs = styled.div`
carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },


`;
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinGraph = () => {
  const [trend, setTrend] = React.useState([]);

  const fetchingCoinDataFromApi = async () => {
    const { data } = await axios.get(TrendingCoins("PKR"));
    setTrend(data);
  };

  React.useEffect(() => {
    fetchingCoinDataFromApi();
  }, []);

  const items = trend.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <div className="d-item">
        <div className="nft__item">
          <img
            src={coin?.image}
            alt={coin.name}
            height="80"
            style={{ marginBottom: 10 }}
          />
          <span>
            {coin?.symbol}
            &nbsp;
            <span
              style={{
                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                fontWeight: 500,
              }}
            >
              {profit && "+"}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>
          <span style={{ fontSize: 22, fontWeight: 500 }}>
            PKR {numberWithCommas(coin?.current_price.toFixed(2))}
          </span>
        </div>
      </div>
    );
  });

  const Res = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <>
      <styleGraphs />
      <div className="carousel">
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          responsive={Res}
          autoPlay
          disableButtonsControls
          items={items}
        />
      </div>
    </>
  );
};

export default CoinGraph;
