import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../../styles/page-style/Loader";

class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return <div {...props}></div>;
  }
}

const CarouselCollection = ({ users, loading }) => {
  return (
    <div className="nft ">
      {/* {JSON.stringify(users)} */}
      {loading && <Loader />}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {users && users.map((user) => (
          <CustomSlide style={{ width: "23%" }} className="itm" index={1}>
            <div className="nft_coll">
              <div className="nft_wrap">
                <span>
                  <img
                    src={
                      user.ownedNfts[0] &&
                      user.ownedNfts[0].meta &&
                      user.ownedNfts[0].meta.image
                        ? user.ownedNfts[0].meta.image
                        : "/img/collections/coll-1.jpg"
                    }
                    className="lazy img-fluid"
                    alt=""
                  />
                </span>
              </div>
              <div className="nft_coll_pp">
                <span onClick={() => window.open("/home", "_self")}>
                  <img
                    className="lazy"
                    src={
                      user.image && user.image.url
                        ? user.image.url
                        : "/img/author/author-11.jpg"
                    }
                    alt=""
                  />
                </span>
                <i className="fa fa-check"></i>
              </div>
              <div className="nft_coll_info">
                <span>
                  <h4> {user.name ? user.name : "some one"}</h4>
                </span>
                <span>{user.about ? user.about : "some description"}</span>
              </div>
            </div>
          </CustomSlide>
        ))}
      </div>
    </div>
  );
};

export default CarouselCollection;
