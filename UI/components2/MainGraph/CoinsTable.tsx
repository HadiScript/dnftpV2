//@ts-nocheck
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import Select from "react-select";
import { CoinList } from "../../../config/CoinAPI";
import { GlobalStyles } from "../../../styles/page-style/GlobalStyles";
import Loader from "../../../styles/page-style/Loader";
import { numberWithCommas } from "./CoinGraph";

const customStyles = {
  option: (base, state) => ({
    ...base,
    background: "#212428",
    color: "#fff",
    borderRadius: state.isFocused ? "0" : 0,
    "&:hover": {
      background: "#16181b",
    },
  }),
  menu: (base) => ({
    ...base,
    background: "#212428 !important",
    borderRadius: 0,
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  control: (base, state) => ({
    ...base,
    padding: 2,
  }),
};

const options = [
  { value: "Last 7 days", label: "Last 7 days" },
  { value: "Last 24 hours", label: "Last 24 hours" },
  { value: "Last 30 days", label: "Last 30 days" },
  { value: "All time", label: "All time" },
];
const options1 = [
  { value: "All categories", label: "All categories" },
  { value: "Art", label: "Art" },
  { value: "Music", label: "Music" },
  { value: "Domain Names", label: "Domain Names" },
  { value: "Virtual World", label: "Virtual World" },
  { value: "Trading Cards", label: "Trading Cards" },
  { value: "Collectibles", label: "Collectibles" },
  { value: "Sports", label: "Sports" },
  { value: "Utility", label: "Utility" },
];

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList("PKR"));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  //   <input type="text" value={search} name="search" onChange={e=> setSearch()} />


  let items = [];
  let active = 1;
  for (
    let number = 1;
    number <= (handleSearch()?.length / 20).toFixed(0);
    number++
  ) {
    items.push(
      <li
        class={`pageName-item`}
        key={number}
        
        style={{ backgroundColor: "transparent", color : "#8364E2" }}
      >
        <span
          className="page-link active"
          onClick={() => {
            setPage(number);
            window.scroll(0, 450);
          }}
          style={{ backgroundColor: "transparent", color : "#8364E2" }}
        >
          {number}
        </span>
      </li>
    );
  }

  return (
    <div>
      <GlobalStyles />
      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter centerEl">
              <input
                type="text"
                value={search}
                name="search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <table className="table de-table table-rank">
              <thead>
                <tr>
                  <th scope="col">Coin</th>
                  <th scope="col">Price</th>
                  <th scope="col">24h Change</th>
                  <th scope="col">Market Cap</th>
                  <th scope="col"></th>
                </tr>
                <tr></tr>
              </thead>
              <tbody>
                {loading ? (
                  <div className="d-flex  justify-content-center">
                    <Loader />
                  </div>
                ) : (
                  <>
                    {handleSearch()
                      .slice((page - 1) * 5, (page - 1) * 5 + 5)
                      .map((row, index) => {
                        let profit = row?.price_change_percentage_24h >= 0;

                        return (
                          <tr key={index}>
                            <th scope="row">
                              <div className="coll_list_pp">
                                <img
                                  className="lazy"
                                  src={row?.image}
                                  alt={row.name}
                                />
                                <i className="fa fa-check"></i>
                              </div>
                              <span
                                className="px-2"
                                style={{
                                  color:
                                    profit > 0 ? "rgb(14, 203, 129)" : "red",
                                }}
                              >
                                {row.symbol}
                              </span>
                              {row.name}
                            </th>
                            <td>
                              PKR{" "}
                              {numberWithCommas(row.current_price.toFixed(2))}
                            </td>
                            <td style={{ color: "#34c77b" }}>
                              {profit && "+"}
                              {row.price_change_percentage_24h.toFixed(2)}%
                            </td>
                            <td style={{ color: "#34c77b" }}>
                              PKR{" "}
                              {numberWithCommas(
                                row.market_cap.toString().slice(0, -6)
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </>
                )}
              </tbody>
            </table>

            <div className="spacer-double"></div>

            {/* <ul className="pagination justify-content-center">
              <li className="active">
                <span>{(handleSearch()?.length / 20).toFixed(0)}</span>
              </li>
            </ul> */}
            <div className="d-flex justify-content-center">
              <nav aria-label="Page navigation example">
                <ul
                  className="pagination"
                  style={{ backgroundColor: "transparent" }}
                >
                  {items}
                </ul>
              </nav>
              {/* <Pagination size="sm">{items}</Pagination> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoinsTable;
