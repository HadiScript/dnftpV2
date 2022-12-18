//@ts-nocheck

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useOwnedNfts } from "../../../hooks/web3";
import { GlobalStyles } from "../../../styles/page-style/GlobalStyles";
import { Nft } from "../../../types/nft";
import styled from "styled-components";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Collection: NextPage = () => {
  const { nfts } = useOwnedNfts();

  const [active, setActive] = useState<Nft>();

  useEffect(() => {
    if (nfts.data && nfts.data.length > 0) {
      setActive(nfts.data[0]);
    }

    return () => setActive(undefined);
  }, [nfts.data]);

  console.log("from collcetion my collection", nfts);

  return (
    <>
      <GlobalStyles />
      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${"/img/background/7.jpg"})` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">Collection</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          {/* right box */}
          <div className="col-lg-7 offset-lg-1 mb-5">
            <div className="row">
              {(nfts.data as Nft[]).map((nft, index) => (
                <div
                  key={index}
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                  style={{ cursor: "pointer" }}
                  onClick={() => setActive(nft)}
                >
                  <div className="nft__item m-0">
                    <div className="nft__item_wrap">
                      <Outer>
                        <span>
                          <img
                            src={nft.meta.image}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </span>
                      </Outer>
                    </div>
                    <div className="nft__item_info">
                      <div className="nft__item_action">{nft.meta.name}</div>
                      {/* <div className="nft__item_action">{nft.meta.description}</div> */}
                      <div className="nft__item_action">
                        {nft.meta.category}
                      </div>
                      <div className="nft__item_price">{nft.price}</div>
                      <div className="nft__item_like"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <div className="nft__item m-0">
              {active && (
                <>
                  <img src={active.meta.image} alt="active image" />
                  <div className="spacer-10" />
                  <h4>{active.meta.name}</h4>
                  <p>{active.meta.description}</p>
                  <p>{active.meta.category}</p>
                  <div className="spacer-10" />
                  <div className="d-flex justify-content-between align-items-center">
                    <i
                      className="fa fa-download fa-lg "
                      style={{ color: "white", cursor: "pointer" }}
                    ></i>

                    <button
                      disabled={active.isListed}
                      onClick={() => {
                        nfts.listNft(active.tokenId, active.price);
                      }}
                      className="btn-main"
                    >
                      {active.isListed ? "Nft is listed" : "Sale Nft"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Collection;
