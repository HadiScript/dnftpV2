//@ts-nocheck
import axios from "axios";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { useAccount } from "../../../hooks/web3";
import { GlobalStyles } from "../../../styles/page-style/GlobalStyles";
import { Tabs, Tab, Row, Col, Card } from "react-bootstrap";
import VendorsStat from "../dashboard/VendorsStat";
import BoxStats from "../../../UI/components2/MyProfileStats/BoxStats";
import BoxRowStats from "../../../UI/components2/MyProfileStats/BoxRowStats";
import Link from "next/link";
import { UserContext } from "../../../context";

const MyProfile = () => {
  const { account } = useAccount();
  const [myProfile, setmyProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [state] = useContext(UserContext);
  const [myPosts, setMyposts] = useState([]);

  React.useEffect(() => {
    if (account && account.data) {
      fetecingMyProfile();
    }
  }, [account && account.data]);

  React.useEffect(() => {
    if (state && state.user) fetchMyNewsFeed();
  }, [state && state.user]);

  const fetchMyNewsFeed = async () => {
    try {
      const { data } = await axios.post(`http://localhost:8000/api/my-feeds/`, {
        logedIn_id: state.user._id,
        logedIn: state.user ? true : false,
      });
      setMyposts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetecingMyProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `http://localhost:8000/api/my-profile`,
        {
          account: account.data,
        }
      );
      setLoading(false);
      setmyProfile(data);
    } catch (error) {
      setLoading(false);
    }
  };

  console.log(myProfile, "from my profile");

  return (
    <>
      <GlobalStyles />
      <div className="spacer-double"></div>

      <section className="container no-bottom">
        <div className="row">
          <div className="col-md-12">
            {loading ? (
              <p>loading ...</p>
            ) : (
              myProfile && (
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {myProfile.image ? (
                        <img src={myProfile.image.url} alt="" />
                      ) : (
                        <img src="/img/author/author-11.jpg" alt="" />
                      )}
                      <div className="profile_name">
                        <h4>
                          {myProfile.name ? myProfile.name : "some one"}
                          <small className="profile_username text-light">
                            {myProfile.about ? (
                              myProfile.about
                            ) : (
                              <>
                                <Link href="/dnftp/accountMine/editProfile">
                                  <a>Edit</a>
                                </Link>
                              </>
                            )}
                          </small>
                          <div className="profile_wallet">
                            {myProfile.account}..
                          </div>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        connections{" "}
                        {myProfile.following &&
                          myProfile.following.length + myProfile.followers &&
                          myProfile.followers.length}
                      </div>
                    </div>
                    <div className="de-flex-col">
                      <span className="btn-main">See</span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="spacer-3"></div>
          <Row>
            <Col sm={6} xl={3}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted text-uppercase fs-12 fw-bold">
                      Likes
                    </span>
                    <h3 className="mb-0">
                      {myProfile.likes && myProfile.likes.length}
                    </h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={6} xl={3}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted text-uppercase fs-12 fw-bold">
                      Owned NFTs
                    </span>
                    <h3 className="mb-0">
                      {myProfile.ownedNfts && myProfile.ownedNfts.length}
                    </h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} xl={3}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted text-uppercase fs-12 fw-bold">
                      total buyers
                    </span>
                    <h3 className="mb-0">
                      {myProfile.buyers && myProfile.buyers.length}
                    </h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={6} xl={3}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted text-uppercase fs-12 fw-bold">
                      total posts
                    </span>
                    <h3 className="mb-0">{myPosts && myPosts.length}</h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="spacer-double"></div>
          <div className="col-md-6 mt-3">
            <div id="tabs1">
              <Tabs fill defaultActiveKey="BNFTs">
                <Tab eventKey="BNFTs" title="Bought NFTs">
                  <div
                    style={{
                      height: "420px",
                    }}
                  >
                    <BoxStats />
                  </div>
                </Tab>
                <Tab eventKey="Created" title="Created">
                  <div
                    style={{
                      height: "420px",
                    }}
                  >
                    <BoxStats />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>

          <div className="col-md-6 mt-3">
            <div id="tabs2">
              <Tabs fill defaultActiveKey="Your All Acitivity">
                <Tab eventKey="Your All Acitivity" title="Your All Acitivity">
                  <div
                    className="card p-2"
                    style={{
                      height: "380px",
                      overflowX: "hidden",
                      overflowY: "auto",
                    }}
                  >
                    <ul className="activity-list">
                      {myProfile.activity && myProfile.activity.length === 0 ? (
                        <h4>Zero Activity</h4>
                      ) : (
                        <>
                          {myProfile.activity &&
                            myProfile.activity.map((x, index) => (
                              <li className="act_follow" key={index}>
                                <div className="">
                                  <h4>{x.title}</h4>
                                  {x.descp}{" "}
                                  <span className="color">
                                    {x.optional && (
                                      <Link href={x.optional}>
                                        <a target="_#">Link</a>
                                      </Link>
                                    )}
                                  </span>
                                  <br />
                                  <span className="act_list_date">
                                    {x.createdAt}
                                  </span>
                                </div>
                              </li>
                            ))}
                        </>
                      )}
                    </ul>
                  </div>
                </Tab>

                <Tab eventKey="Followers" title="Followers">
                  <div
                    className="card p-2"
                    style={{
                      height: "420px",
                      overflowX: "hidden",
                      overflowY: "auto",
                    }}
                  >
                    <ul className="activity-list">
                      <li className="act_follow">
                        <img
                          className="lazy"
                          src="/img/author/author-1.jpg"
                          alt=""
                        />
                        <div className="act_list_text">
                          <h4>Monica Lucas</h4>
                          <span>Artist</span>
                          <span className="act_list_date">likes 10 </span>
                        </div>
                      </li>

                      <li className="act_follow">
                        <img
                          className="lazy"
                          src="/img/author/author-1.jpg"
                          alt=""
                        />
                        <div className="act_list_text">
                          <h4>Monica Lucas</h4>
                          <span>Artist</span>
                          <span className="act_list_date">likes 10 </span>
                        </div>
                      </li>

                      <li className="act_follow">
                        <img
                          className="lazy"
                          src="/img/author/author-1.jpg"
                          alt=""
                        />
                        <div className="act_list_text">
                          <h4>Monica Lucas</h4>
                          <span>Artist</span>
                          <span className="act_list_date">likes 10 </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
          {/* <div className="spacer-double"></div>
          <div className="col-md-12">
            <h3>Transections</h3>
            <VendorsStat />
          </div> */}
        </div>
      </section>
    </>
  );
};

export default MyProfile;
