//@ts-nocheck
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createGlobalStyle } from "styled-components";
import { UserContext } from "../../context";
import { GlobalStyles } from "../../styles/page-style/GlobalStyles";
import CreatePostForm from "../../UI/components2/CreatePostForm";
import Searching from "../../UI/components2/Searching";
import { API } from "../../config/API";
import PostList from "../../UI/components2/post/PostList";
import { Button, Modal } from "react-bootstrap";
import CommentForm from "../../UI/components2/post/CommentForm";
import PostChart from "../../UI/components2/post/PostChart";
import { useAccount } from "../../hooks/web3";

const Timelines = () => {
  const [state, setState] = useContext(UserContext);
  const { account } = useAccount();
  const [content, setContent] = useState("");
  // const [image, setImage] = useState({});
  // const [loadingImage, setLoadingImage] = useState(false);
  const [posts, setPosts] = useState([]);
  const [myPosts, myMyPosts] = useState([]);
  const router = useRouter();
  const [postLoading, setPostLoading] = useState(false);
  const [postLoading2, setPostLoading2] = useState(false);

  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [count, setCount] = useState([]);
  const [eachDay, setEachDay] = useState([]);

  useEffect(() => {
    if (state && state.user) {
      fetchMyNewsFeed();
      fetched();
    }
  }, [state && state.user]);

  const fetchVisitorsPosts = async () => {
    try {
      setPostLoading2(true);
      const { data } = await axios.get(`http://localhost:8000/api/timelines/`);
      myMyPosts(data);
      setPostLoading2(false);
    } catch (error) {
      setPostLoading2(false);

      console.log(error);
    }
  };

  const fetchMyNewsFeed = async () => {
    try {
      setPostLoading(true);
      const { data } = await axios.post(`http://localhost:8000/api/my-feeds/`, {
        logedIn_id: state.user._id,
        logedIn: state.user ? true : false,
      });
      myMyPosts(data);
      setPostLoading(false);
    } catch (error) {
      setPostLoading(false);

      console.log(error);
    }
  };

  const fetched = async () => {
    const eachDaysLet = [];
    const countLet = [];

    try {
      const { data } = await axios.get(`${API}/ForEachDay`);
      // console.log(data, "from eachday post timelines")
      data.map((x) => {
        eachDaysLet.push(x._id);
        countLet.push(x.count);
      });
      setEachDay(eachDaysLet);
      setCount(countLet);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/create-post`,
        {
          content,
          userID: state.user._id,
          userAcc: state.user.account,
          logedIn: state.user ? true : false,
          logedIn_id: state.user && state.user._id,
          logedIn_Acc: state.user && state.user.account,
        },
        { headers: { "Content-Type": "Application/json" } }
      );

      if (data.error) {
        toast.error(data.error);
      } else {
        fetchMyNewsFeed();
        toast.success("Post has been created !!");
        setContent("");
        fetched();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = (post) => {
    if (!account.data && !state.user) {
      toast.error("Please connect your meta wallet");
    } else {
      setCurrentPost(post);
      setVisible(true);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    console.log(currentPost._id, "comment post id");
    console.log(comment, "comment gooiung to be saved");

    try {
      const { data } = await axios.put(`${API}/add-comment`, {
        comment,
        postId: currentPost._id,
        logedIn: state.user ? true : false,
        logedIn_id: state.user && state.user._id,
      });

      console.log(data);
      setComment("");
      setVisible(false);
      fetchMyNewsFeed();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (_id) => {
    // console.log("like", _id)

    if (!account.data && !state.user) {
      toast.error("Connect Your Wallet");
    } else {
      try {
        const { data } = await axios.put(`${API}/like-post`, {
          postId: _id,
          logedIn: state.user ? true : false,
          logedIn_id: state.user && state.user._id,
        });
        // console.log(data, "like data")
        fetchMyNewsFeed();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUnlike = async (_id) => {
    // console.log("like", _id)
    if (!account.data && !state.user) {
      toast.error("Connect Your Wallet");
    } else {
      try {
        const { data } = await axios.put(`${API}/unlike-post`, {
          postId: _id,
          logedIn: state.user ? true : false,
          logedIn_id: state.user && state.user._id,
        });
        // console.log(data, "unlike data")
        fetchMyNewsFeed();
      } catch (error) {
        console.log(error);
      }
    }
  };
  // console.log(state, "from timeslines");

  return (
    <div>
      <GlobalStyles />

      <section className="bg">
        <div className="spacer-double"></div>
        <div className="row">
          {/* right box */}
          <div className="col-lg-7 offset-lg-1 mb-5">
            <div className="nft__item m-0">
              {state &&
              state.user &&
              state.user.followers &&
              state.user.followers.length > 0 ? (
                <CreatePostForm
                  postSubmit={postSubmit}
                  content={content}
                  setContent={setContent}
                />
              ) : (
                <h5>
                  {" "}
                  Timelines{" "}
                  <i
                    className="fa fa-clock-o px-2"
                    style={{ color: "#8364E2" }}
                  ></i>{" "}
                </h5>
              )}
            </div>
            <div className="spacer-double"></div>

            <PostList
              posts={myPosts}
              loading={postLoading}
              handleComment={handleComment}
              addComment={addComment}
              // removeComment={removeComment}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              state={state}
              // handleDelete={handleDelete}
            />
          </div>

          {/* left box */}

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <div className="nft__item m-0">
              <PostChart count={count} eachDay={eachDay} />
            </div>
          </div>
        </div>
      </section>

      <Modal
        size="lg"
        ariaLabelledby="contained-modal-title-vcenter"
        centered
        show={visible}
        onHide={() => setVisible(false)}
      >
        <Modal.Body>
          <CommentForm
            addComment={addComment}
            comment={comment}
            setComment={setComment}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Timelines;
