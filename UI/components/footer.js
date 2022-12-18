import React from "react";
import { Link } from "@reach/router";

const footer = () => (
  <footer className="footer-light">
    <div className="subfooter">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex">
              <div className="de-flex-col">
                <span onClick={() => window.open("", "_self")}>
                  <span className="copy">
                    &copy; Copyright 2022 - 2023 - Development of NFTs Platform
                  </span>
                  <br />
                  <span className="copy">Developed By: hadiraza.com</span>
                  <br />
                  <span className="copy">Group : 6th</span>
                  <br />
                  <span className="copy">Lead By : Syed Hadi Rizvi (519) </span>
                  <br />
                  <span className="copy">Team : Akasha Habib (511), Mubeen Bajwa (527), Umair (501) </span>
                </span>
              </div>
              <div className="de-flex-col">
                <div className="social-icons">
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-facebook fa-lg"></i>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-twitter fa-lg"></i>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-linkedin fa-lg"></i>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-pinterest fa-lg"></i>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-rss fa-lg"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
export default footer;
