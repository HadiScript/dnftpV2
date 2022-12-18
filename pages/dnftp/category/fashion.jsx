import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../config/API";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { UserContext } from "../../../context";
// import NFTItem from "../../../UI/components2/NFTItem";
import NFTItem from "../../../UI/components2/NFTItem";
import Loader from "../../../styles/page-style/Loader";
import { useAccount, useListedNfts } from "../../../hooks/web3";
import React, { useState, useEffect, useContext } from "react";
import { GlobalStyles } from "../../../styles/page-style/GlobalStyles";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;
const Fashion = () => {
  const [loading, setLoading] = useState(false);
  const [catNft, setCatNFt] = useState([]);
  const { nfts } = useListedNfts();
  const [state] = useContext(UserContext);
  const { account } = useAccount();

  const fetchingNFTs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/category/Virtual Fashion`);
      setCatNFt(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchingNFTs();
  }, []);

  return (
    <>
      <GlobalStyles />
      <div className="spacer-20"></div>
      <section className="container">
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={0}
          duration={600}
          triggerOnce
        >
          <div className="row">
            <h5 className="d-flex justify-content align-items-center gap-2">
              Virtual Fashion
            </h5>
            {account.data ? (
              nfts.data.map((nft) => (
                <div
                  key={nft.meta.image}
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                >
                  <NFTItem nft={nft} buyNft={nfts.buyNft} />
                </div>
              ))
            ) : (
              <>
                {!catNft.length ? (
                  <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    there is no any NFT at this time :(
                  </div>
                ) : (
                  catNft.map((nft) => (
                    <div
                      key={nft._id}
                      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    >
                      <NFTItem nft={nft} offline={true} />
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}

export default Fashion