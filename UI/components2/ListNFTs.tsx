//@ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import NFTItem from "./NFTItem";
import { DataListNFTs } from "../../Data/ListNft";
import { useAccount, useListedNfts } from "../../hooks/web3";
import axios from "axios";
import { API } from "../../config/API";
import { UserContext } from "../../context";
import { toast } from "react-toastify";

const ListNFTs = () => {
  const { nfts } = useListedNfts();
  // console.log(nfts, "from listing");
  const [state] = useContext(UserContext);
  const { account } = useAccount();

  const [allNfts, setAllNfts] = useState([]);

  const handleLike = async (_id: any) => {
    // console.log("like", _id)
    try {
      const { data } = await axios.put(`${API}/like-nft`, {
        nftID: _id,
        logedIn: state.user ? true : false,
        logedIn_id: state.user && state.user._id,
      });
      // console.log(data, "like data")
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async (_id: any) => {
    // console.log("like", _id)
    try {
      const { data } = await axios.put(`${API}/unlike-nft`, {
        nftID: _id,
        logedIn: state.user ? true : false,
        logedIn_id: state.user && state.user._id,
      });
      // console.log(data, "unlike data")
    } catch (error) {
      console.log(error);
    }
  };

  const fetchingAllNfts = async () => {
    try {
      const { data } = await axios.get(`${API}/getting-all`);
      setAllNfts(data);
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchingAllNfts();
  }, []);

  return (
    <>
      <section className="container">
        <div className="row">
          <div className="col-lg-12 mb-2">{/* <h2>NFTs</h2> */}</div>
          {account.data ? (
            nfts.data.map((nft: any) => (
              <div
                key={nft.meta.image}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              >
                <NFTItem nft={nft} buyNft={nfts.buyNft} />
              </div>
            ))
          ) : (
            <>
              {allNfts.map((nft: any) => (
                <div
                  key={nft._id}
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                >
                  <NFTItem nft={nft} offline={true} />
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ListNFTs;
