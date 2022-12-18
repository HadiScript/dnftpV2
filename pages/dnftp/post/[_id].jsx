//@ts-nocheck

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { API } from "../../../config/API";
import renderHTML from "react-render-html";
import moment from "moment";
import { UserContext } from "../../../context";
import { GlobalStyles } from "../../../styles/page-style/GlobalStyles";

import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { TfiCommentsSmiley } from "react-icons/tfi";

const PostDetail = () => {
  const router = useRouter();
  const _id = router.query._id;
  const [state] = useContext(UserContext);
  const [post, setPost] = useState({});
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (_id) {
      fetchingThisPost();
    }
  }, [_id]);

  const fetchingThisPost = async () => {
    try {
      setLoad(true);
      const { data } = await axios.get(`${API}/user-post/${_id}`);
      setPost(data);
      setLoad(false);
    } catch (error) {
      toast.error(error);
      setLoad(false);
    }
  };

  return (
    <>
      <GlobalStyles />

      <section className="bg">
        <div className="spacer-double"></div>
        <div className="row">
          {/* right box */}
          <div className="col-lg-7 offset-lg-2 mb-5">
            {load ? (
              <p>loading</p>
            ) : (
              <div className=" p-2">
                <ul className="post-list">
                  <li className="">
                    <img
                      className="lazy"
                      src={
                        post.userImageUrl
                          ? post.userImageUrl
                          : `/img/author/author-11.jpg`
                      }
                      alt=""
                    />
                    <div className="act_list_text">
                      <h4>{post.userName ? post.userName : "some one"}</h4>
                      <span>
                        {post && post.content && renderHTML(post.content)}
                      </span>
                      <div className="my-2"></div>
                      <span className="act_list_date">
                        <span className="px-2">
                          {post && post.likes && post.likes.length}
                        </span>
                        {state &&
                        state.user &&
                        post.likes &&
                        post.likes.includes(state.user._id) ? (
                          <BsSuitHeartFill
                            color="#8364E2"
                            onClick={() => handleUnlike(x._id)}
                          />
                        ) : (
                          <BsSuitHeart
                            // className="px-2"
                            color="#8364E2"
                            onClick={() => handleLike(x._id)}
                          />
                        )}
                        <span className="px-2">
                          <TfiCommentsSmiley
                            // className="fa fa-comment px-2"
                            onClick={() => handleComment(x)}
                            color="#8364E2"
                          />
                        </span>
                        {post && post.comments && post.comments.length}
                        <span className="px-2">
                          {moment(post.created).fromNow()}
                        </span>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            )}
            {load ? (
              <p>loading</p>
            ) : (
              <>
                {post && post.comments && post.comments.lenght !== 0 ? (
                  <>
                    {post.comments.map((x) => (
                      <div className=" p-2" key={x._id}>
                        <ul className="comment-list">
                          <li className="">
                            <img
                              className="avatar"
                              src={
                                x.postedBy.image
                                  ? x.postedBy.image.url
                                  : `/img/author/author-11.jpg`
                              }
                              alt=""
                            />
                            <div className="act_list_text">
                              <h4>
                                {x.postedBy.name ? x.postedBy.name : "some one"}
                              </h4>
                              <span>{x.text}</span>
                              <div className="my-2"></div>
                              {state &&
                                state.user &&
                                x.postedBy &&
                                x.postedBy._id &&
                                x.postedBy._id === state.user._id && (
                                  <span className="text-danger">delete</span>
                                )}
                            </div>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </>
                ) : (
                  <h4>No Comment Yet</h4>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PostDetail;
