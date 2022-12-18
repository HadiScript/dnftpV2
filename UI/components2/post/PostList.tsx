//@ts-nocheck

import React from "react";
import renderHTML from "react-render-html";
import moment from "moment";
import { useRouter } from "next/router";
import Loader from "../../../styles/page-style/Loader";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { TfiCommentsSmiley } from "react-icons/tfi";

const PostList = ({
  posts,
  loading,
  handleComment,
  addComment,
  handleLike,
  handleUnlike,
  state,
}) => {
  const router = useRouter();

  return (
    <>
      {loading ? (
        <section className="container">
          <Loader />
        </section>
      ) : (
        posts.map((x) => (
          <div className=" p-2">
            <ul className="post-list">
              <li className="">
                <img
                  className="lazy"
                  src={
                    x.userImageUrl
                      ? x.userImageUrl
                      : `/img/author/author-11.jpg`
                  }
                  alt=""
                />
                <div className="act_list_text">
                  <h4>{x.userName ? x.userName : "some one"}</h4>
                  <span>{renderHTML(x.content)}</span>
                  <div className="my-2"></div>
                  <span className="act_list_date">
                    {/* <i className="fa fa-heart px-2"></i>  */}
                    <span className="px-2">{x.likes.length}</span>
                    {state &&
                    state.user &&
                    x.likes &&
                    x.likes.includes(state.user._id) ? (
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
                    {x.comments.length}
                    <span className="px-2">{moment(x.created).fromNow()}</span>
                    <span
                      className="px-2"
                      onClick={() => router.push(`/dnftp/post/${x._id}`)}
                      style={{ color: "#8364e2" }}
                    >
                      discussion
                    </span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        ))
      )}
    </>
  );
};

export default PostList;
