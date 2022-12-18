//@ts-nocheck

import { useRouter } from "next/router";
import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../context";

const AuthorInSearchRes = ({ stu, handleFollow, handleUnfollow }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();
  console.log(stu, "from authors");
  return (
    <>
      <li className="act_follow">
        <img
          className="lazy"
          src={
            stu.image && stu.image.url
              ? stu.image.url
              : "/img/author/author-1.jpg"
          }
          alt=""
        />
        <div className="act_list_text">
          <h4>{stu.name ? stu.name : "some one"}</h4>
          {state &&
          state.user &&
          stu.followers &&
          stu.followers.includes(state.user._id) ? (
            <>
              connected{" "}
              <span
                className="color"
                style={{ cursor: "pointer" }}
                onClick={() => handleUnfollow(stu)}
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
                onClick={() => handleFollow(stu)}
              >
                <i className="fa fa-link"></i>
              </span>
            </>
          )}
          {/* connect <span className="color"><i className="fa fa-link" onClick={() => handleFollow(stu)}></i></span> */}
          <span className="act_list_date pt-3"> </span>
        </div>
      </li>
    </>
  );
};

export default AuthorInSearchRes;
