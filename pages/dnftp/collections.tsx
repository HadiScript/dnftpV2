//@ts-nocheck
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Reveal from "react-awesome-reveal";
import { keyframes } from "styled-components";
import { UserContext } from "../../context";
import { GlobalStyles } from "../../styles/page-style/GlobalStyles";
import CarouselCollection from "../../UI/components/CarouselCollection";
import SliderCarousel from "../../UI/components/SliderCarouselsingle";

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

const Collections = () => {
  const [state] = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchingAllUsers();
  }, []);

  const fetchingAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8000/api/all-users`);
      // console.log(data, "from requested users");
      setLoading(false);
      setUsers(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <GlobalStyles />

      <section
        className="jumbotron no-bg"
        style={{ backgroundImage: `url(${"/img/background/7.jpg"})` }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="spacer-single"></div>
              <Reveal
                className="onStep"
                keyframes={fadeInUp}
                delay={0}
                duration={600}
                triggerOnce
              >
                <h6 className="">
                  <span className="text-uppercase color">DNFTP</span>
                </h6>
              </Reveal>
              <div className="spacer-10"></div>
              <Reveal
                className="onStep"
                keyframes={fadeInUp}
                delay={300}
                duration={600}
                triggerOnce
              >
                <h1 className="">Collections.</h1>
              </Reveal>
              <Reveal
                className="onStep"
                keyframes={fadeInUp}
                delay={600}
                duration={600}
                triggerOnce
              >
                <p className=" lead">
                  Unit of data stored on a digital ledger, called a blockchain,
                  that certifies a digital asset to be unique and therefore not
                  interchangeable
                </p>
              </Reveal>
              <div className="spacer-10"></div>
              <Reveal
                className="onStep"
                keyframes={fadeInUp}
                delay={800}
                duration={900}
                triggerOnce
              >
                <span
                  onClick={() => window.open("/#", "_self")}
                  className="btn-main lead"
                >
                  Explore
                </span>
                <div className="mb-sm-30"></div>
              </Reveal>
              <div className="spacer-double"></div>
            </div>
            <div className="col-lg-6 px-0">
              <SliderCarousel />
            </div>
          </div>
        </div>
      </section>

      <section className="container no-top">
        <div className="row">
          <div className="spacer-50"></div>

          <div className="col-lg-12">
            <h2 className="style-2">Hot Collections</h2>
          </div>
        </div>
        <div className="container no-top">
          <div className="row">
            <div className="col-lg-12 px-0">
              <div className="row">
                <CarouselCollection users={users} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="style-2">New Items</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 px-0">
              {/* check */}

              {/* check ends */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Collections;
