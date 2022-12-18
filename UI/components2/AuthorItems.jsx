import { useRouter } from "next/router";
import React from "react";

const AuthorItems = ({ user }) => {
  const router = useRouter();
  return (
    <div className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4">
      <div className="card">
        <div className="card-body text-center">
          <img
            src={
              user.image && user.image.url
                ? user.image.url
                : "/img/author/author-11.jpg"
            }
            alt="avatar"
            className="rounded-circle img-fluid"
            style={{ width: "70px" }}
          />
          <h5
            className="my-3"
            style={{ cursor: "pointer" }}
            onClick={() => router.push(`/dnftp/vendors/${user.account}`)}
          >
            {" "}
            {user.name ? user.name : "some one"}
          </h5>
          <p className=" mb-1">{user.about && user.about}</p>
          {/* <p className="text-muted mb-4">
              <i className="fa fa-link"></i> 58
            </p> */}

          <div className="d-flex justify-content-center mb-2">
            <span className="mx-2">
              <i className="fa fa-link" style={{ color: "#8364e2" }}></i>{" "}
              {user.following &&
                user.following.length + user.followers &&
                user.followers.length}
            </span>
            <span className="mx-2">
              <i className="mx-1" style={{ color: "#8364e2" }}>
                collection
              </i>{" "}
              {user.ownedNfts && user.ownedNfts.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
