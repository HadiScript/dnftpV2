import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Card, CardGroup, Col, Row } from "react-bootstrap";
import { API } from "../../../config/API";
import { GlobalStyles } from "../../../styles/page-style/GlobalStyles";
import { UserContext } from "../../../context";

const ProfileOne = () => {
  const router = useRouter();
  const account = router.query.account;

  const [state, setState] = useContext(UserContext);

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [allHisPosts, setAllHisPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(false);

  useEffect(() => {
    if (account) {
      fetchUser();
      fetchingAllOFHisPosts();
    }
  }, [account]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/creator/${account}`);
      // console.log(data);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchingAllOFHisPosts = async () => {
    try {
      setPostLoading(true);
      const { data } = await axios.post(`${API}/any-user-posts`, {
        userAccount: account,
      });

      setAllHisPosts(data);
      setPostLoading(false);
    } catch (error) {
      console.log(error);
      setPostLoading(false);
    }
  };

  const handleUserLike = async (_id) => {
    // console.log("like", _id)
    try {
      const { data } = await axios.put(`${API}/like-user`, {
        userID: _id,
        logedIn: state.user ? true : false,
        logedIn_id: state.user && state.user._id,
      });
      // console.log(data, "like data")
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserUnlike = async (_id) => {
    // console.log("like", _id)
    try {
      const { data } = await axios.put(`${API}/unlike-user`, {
        userID: _id,
        logedIn: state.user ? true : false,
        logedIn_id: state.user && state.user._id,
      });
      // console.log(data, "unlike data")
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async (user) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/user-follow`,
        {
          _id: user._id,
          account: state.user._id,
        }
      );
      // console.log(data, 'handle follow response');

      // update localstrorage, keep toeken, update user
      let auths = JSON.parse(window.localStorage.getItem("auth"));
      auths.user = data;

      localStorage.setItem("auth", JSON.stringify(auths));

      // update state,
      setState({ ...state, user: data });

      // update stuudents state,
      // let filtered = result.filter((i) => i._id !== user._id);
      // setResult(filtered);

      fetchUser();

      toast.success(`following ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async (user) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/user-unfollow`,
        {
          _id: user._id,
          account: state.user._id,
        }
      );
      // update localstrorage, keep toeken, update user
      let auths = JSON.parse(window.localStorage.getItem("auth"));
      auths.user = data;

      localStorage.setItem("auth", JSON.stringify(auths));

      // update state,
      setState({ ...state, user: data });

      // update stuudents state,
      let filtered = result.filter((i) => i._id !== user._id);
      setResult(filtered);

      // re render the postt in news feed

      toast.success(`unfollowed ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };

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
              user && (
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={
                          user.image && user.image.url
                            ? user.image.url
                            : "/img/author/author-11.jpg"
                        }
                        alt=""
                      />

                      <div className="profile_name">
                        <h4>
                          {user.name ? user.name : "some one"}
                          <small className="profile_username text-light">
                            {user.about}
                          </small>
                          <div className="profile_wallet">{user.account}..</div>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        connections{" "}
                        {user.following &&
                          user.following.length + user.followers &&
                          user.followers.length}
                      </div>
                    </div>
                    <div className="de-flex-col">
                      <span className="btn-main">
                        {/* // give him a star */}
                        {user &&
                        user.buyers &&
                        user.buyers.find(
                          (x) => x.buyer === state.user.account
                        ) ? (
                          <>
                            {state &&
                            state.user &&
                            user.followers &&
                            user.followers.includes(state.user._id) ? (
                              <>
                                connected{" "}
                                <span
                                  className="color"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleUnfollow(user)}
                                >
                                  <i className="fa fa-chain-broken"></i>
                                </span>
                              </>
                            ) : (
                              <>
                                connect{" "}
                                <span
                                  className="color"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleFollow(user)}
                                >
                                  <i className="fa fa-link"></i>
                                </span>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {state &&
                            state.user &&
                            user.likes &&
                            user.likes.includes(state.user._id) ? (
                              <i
                                className="fa fa-star text-danger px-2 "
                                onClick={() => handleUserUnlike(user._id)}
                              >
                                {" "}
                              </i>
                            ) : (
                              <i
                                onClick={() => handleUserLike(user._id)}
                                className="fa fa-star px-2 "
                              ></i>
                            )}
                          </>
                        )}
                      </span>
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
                      collection
                    </span>
                    <h3 className="mb-0">
                      {state &&
                        state.user &&
                        user.ownedNfts}
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
                      posts
                    </span>
                    <h3 className="mb-0">
                      {postLoading
                        ? "loading"
                        : allHisPosts && allHisPosts.length}
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
                      likes
                    </span>
                    <h3 className="mb-0">
                      {state && state.user && user.likes && user.likes.length}
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
                      buyers
                    </span>
                    <h3 className="mb-0">
                      {state && state.user && user.buyers && user.buyers.length}
                    </h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="spacer-double"></div>
          <div className="container">
            {state &&
              state.user &&
              user.ownedNfts &&
              JSON.stringify(user.ownedNfts)}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileOne;
