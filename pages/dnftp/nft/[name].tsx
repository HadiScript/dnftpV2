
//@ts-nocheck
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { API } from "../../../config/API";
import { UserContext } from "../../../context";
import { useAccount, useListedNfts } from "../../../hooks/web3";
import { GlobalStyles } from "../../../styles/page-style/GlobalStyles";

const DetailNFT = () => {
  const [state] = React.useContext(UserContext);
  const { account } = useAccount();

  const { nfts } = useListedNfts();
  const { buyNft } = nfts;
  const router = useRouter();
  const name = router.query.name;
  const [nft, setNft] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    likes: [],
    description: "",
    creatorAccount: "",
    _id: "",
  });
  const [user, setUser] = useState({ name: "", image: { url: "" } });
  const [loading, setLoading] = useState(false);
  const [userloading, setUserLoading] = useState(false);

  useEffect(() => {
    if (name) {
      FetchingOneNFTData();
    }
  }, [name]);

  useEffect(() => {
    if (name && nft && nft.creatorAccount) {
      fineAUser();
    }
  }, [name, nft, nft.creatorAccount]);

  const FetchingOneNFTData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${API}/finding-one-nft`, { name });
      setNft(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fineAUser = async () => {
    try {
      setUserLoading(true);
      const { data } = await axios.get(`${API}/creator/${nft.creatorAccount}`);
      setUser(data);

      setUserLoading(false);
    } catch (error) {
      console.log(error);
      setUserLoading(false);
    }
  };

  let selectedNFT: any;
  if (name && nft.name) {
    selectedNFT = nfts.data.find((x: any) => x.meta.name === nft.name);
  }

  const handleLike = async (_id) => {
    // console.log("like", _id)
    try {
      const { data } = await axios.put(`${API}/like-nft`, {
        nftId: _id,
        logedIn: state.user ? true : false,
        logedIn_id: state.user && state.user._id,
      });
      FetchingOneNFTData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async (_id) => {
    // console.log("like", _id)
    try {
      const { data } = await axios.put(`${API}/unlike-nft`, {
        nftId: _id,
        logedIn: state.user ? true : false,
        logedIn_id: state.user && state.user._id,
      });
      FetchingOneNFTData();
    } catch (error) {
      console.log(error);
    }
  };

  const goingToBuyNft = async (x) => {
    try {
      const boughtNft = await axios.post(`http://localhost:8000/api/buy-nft`, {
        buyer: state.user.account,
        item: x,
      });
      console.log(boughtNft, "from nft items");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <GlobalStyles />

      <section className="container">
        <div className="row mt-md-5 pt-md-4">
          <div className="col-md-6 text-center">
            <img
              src={nft.image}
              className="img-fluid img-rounded mb-sm-30"
              alt=""
              height="100%"
              width="100%"
            />
          </div>
          <div className="col-md-6">
            <div className="item_info">
              {nft.category}
              <h2>{nft.name}</h2>
              <div className="item_info_counts">
                <div className="item_info_type">
                  <i className="fa fa-eth"></i>{" "}
                  <span style={{ fontWeight: "bold", color: "#8364e2" }}>
                    {" "}
                    ETH 0.2{" "}
                  </span>
                </div>
                <div className="item_info_views" style={{ cursor: "pointer" }}>
                  {state &&
                  state.user &&
                  nft.likes &&
                  nft.likes.includes(state.user._id) ? (
                    <i
                      className="fa fa-heart text-danger px-2 "
                      onClick={() => handleUnlike(nft._id)}
                    ></i>
                  ) : (
                    <i
                      onClick={() => handleLike(nft._id)}
                      className="fa fa-heart px-2 "
                    ></i>
                  )}
                  {nft.likes?.length}
                </div>
              </div>
              <p>{nft.description} </p>
              <h6>Creator</h6>
              <div className="item_author">
                <div className="author_list_pp">
                  <span
                    onClick={() =>
                      router.push(`/dnftp/vendors/${nft.creatorAccount}`)
                    }
                  >
                    <img
                      className="lazy"
                      src={
                        user.image && user.image.url
                          ? user.image.url
                          : "/img/author/author-1.jpg"
                      }
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </span>
                </div>
                <div className="author_list_info">
                  <span>
                    {" "}
                    <Link href={`/dnftp/vendors/${nft.creatorAccount}`}>
                      <a style={{ textDecoration: "none", color: "white" }}>
                        {user.name}
                      </a>
                    </Link>{" "}
                  </span>
                </div>
              </div>
              <div className="spacer-40"></div>
              {account && (
                <>
                  {selectedNFT !== undefined && (
                    <button
                      className="btn-main"
                      onClick={() => {
                        buyNft(selectedNFT.tokenId, selectedNFT.price);
                        goingToBuyNft(selectedNFT);
                      }}
                    >
                      Buy It
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailNFT;
