//@ts-nocheck
import React, { useEffect } from "react";
import Particle from "../UI/components/Particle";
import SliderMainParticle from "../UI/components/SliderMainParticle";
import SliderCarousel from "../UI/components/SliderCarouselsingle";

import FeatureBox from "../UI/components/FeatureBox";
import CarouselCollection from "../UI/components/CarouselCollection";
import CarouselNew from "../UI/components/CarouselNew";
import AuthorList from "../UI/components/authorList";
import Footer from "../UI/components/footer";
import { createGlobalStyle } from "styled-components";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import ListNFTs from "../UI/components2/ListNFTs";
import { browserName } from "react-device-detect";
import { useGeolocated } from "react-geolocated";
import { useAccount, useNetwork } from "../hooks/web3";
import { API } from "../config/API";
import axios from "axios";
import { UserContext } from "../context";
import Loader from "../styles/page-style/Loader";
import CoinGraph from "../UI/components2/MainGraph/CoinGraph";
import CoinsTable from "../UI/components2/MainGraph/CoinsTable";
import MainGraph from "../UI/components2/MainGraph/Index";
import { toast } from "react-toastify";
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

const GlobalStyles = createGlobalStyle`
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  .navbar .mainside a{
    background: #8364e2;
    &:hover{
      box-shadow: 2px 2px 20px 0px #8364e2;
    }
  }
  .item-dropdown{
    .dropdown{
      a{
        &:hover{
          background: #8364e2;
        }
      }
    }
  }
  .btn-main{
    background: #8364e2;
    &:hover{
      box-shadow: 2px 2px 20px 0px #8364e2;
    }
  }
  p.lead{
    color: #a2a2a2;
  }
  .navbar .navbar-item .lines{
    border-bottom: 2px solid #8364e2;
  }
  .jumbotron.no-bg{
    height: 100vh;
    overflow: hidden;
    background-repeat: repeat;
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;
  }
  #tsparticles{
    top: 0;
  }
  .text-uppercase.color{
    color: #8364e2;
  }
  .de_count h3 {
    font-size: 36px;
    margin-bottom: 0px;
  }
  .de_count h5{
    font-size: 14px;
    font-weight: 500;
  }
  h2 {
    font-size: 30px;
  }
  .box-url{
    text-align: center;
    h4{
      font-size: 16px;
    }
  }
  .de_countdown{
    border: solid 2px #8364e2;
  }
  .author_list_pp, .author_list_pp i, 
  .nft_coll_pp i, .feature-box.style-3 i, 
  footer.footer-light #form_subscribe #btn-subscribe i, 
  #scroll-to-top div{
    background: #8364e2;
  }
  footer.footer-light .subfooter .social-icons span i{
    background: #403f83;
  }
  .author_list_pp:hover img{
    box-shadow: 0px 0px 0px 2px #8364e2;
  }
  .nft__item_action span{
    color: #8364e2;
  }
  .feature-box.style-3 i.wm{
    color: rgba(131,100,226, .1);
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      
    }
    #lg-hide{
      display : none;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

export default function Home() {
  const [state] = React.useContext(UserContext);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const { account } = useAccount();
  const { network } = useNetwork();

  let account2 = account.data;

  let account3 = account2;

  const signedUser = async () => {
    const userAccount = account.data;
    try {
      const res = await axios.post(`${API}/sign-user`, {
        account: userAccount,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const sendingLocationAndBrowserData = async () => {
    try {
      const res = await axios.post(`${API}/browser-and-location`, {
        browser: browserName,
        lat: coords?.latitude,
        long: coords?.latitude,
      });

      console.log(res, "from home page location and browser data");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (account && account.data) {
      signedUser();
      sendingLocationAndBrowserData();
    }
  }, [account && account.data]);

  useEffect(() => {
    if (navigator.connection.downlink < 2) {
      toast("The internet connection is slow");
    } else {
      console.log("The internet connection is not slow");
    }
  }, []);


  // removing items from localstroage
  useEffect(() => {
    if (
      account.data === undefined &&
      account.error ===
        "Cannot retreive account! Please, connect to web3 wallet."
    ) {
      window.localStorage.removeItem("auth");
    }
  }, [
    account.data === undefined &&
      account.error ===
        "Cannot retreive account! Please, connect to web3 wallet.",
  ]);

  return (
    <div>
      <GlobalStyles />

      <section
        className="jumbotron no-bg"
        style={{ backgroundImage: `url(${"./img/background/8.jpg"})` }}
      >
        {/* <Particle /> */}
        {/* <div id="md-hide" className="container md-hide">
        </div> */}
        <div className="nav-icon">
          <SliderMainParticle />
        </div>
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={0}
          duration={600}
          triggerOnce
        >
          <div className="container xs-hide">
            <div className="row align-items-center">
              <MainGraph />
              {/* <div className=" row justify-content-center">
                <button className="btn-main"> Search Market Trend </button>
              </div> */}
            </div>
          </div>
        </Reveal>
      </section>

      {/* <CoinsTable /> */}
      <section className="container  no-bottom">
        <div className="row">
          <div className="spacer-double"></div>
          <div className="col-lg-12 mb-2">
            <h2>New Items</h2>
            {/* <Loader /> */}
          </div>
        </div>
        <CarouselNew />

        <h2>listing start form here</h2>

        <ListNFTs />
      </section>

      <section className="container no-top no-bottom">
        <div className="row">
          <div className="spacer-double"></div>
          <div className="col-lg-12">
            <h2>Top Sellers</h2>
          </div>
          <div className="col-lg-12">
            <AuthorList />
          </div>
        </div>
      </section>

      <section className="container no-top no-bottom">
        <div className="row">
          <div className="spacer-double"></div>
          <div className="col-lg-12 mb-2">
            <h2>Hot Collections</h2>
          </div>
          <div className="col-lg-12">
            <CarouselCollection />
          </div>
        </div>
      </section>

      <section className="container no-top">
        <div className="row">
          <div className="spacer-double"></div>
          <div className="col-lg-12 mb-3">
            <h2>Create and Sell Now</h2>
          </div>
          <FeatureBox />
        </div>
      </section>
    </div>
  );
}
