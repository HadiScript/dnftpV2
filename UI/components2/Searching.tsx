//@ts-nocheck

import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { createGlobalStyle } from "styled-components";
import { UserContext } from "../../context";
import AuthorInSearchRes from "./AuthorInSearchRes";
import { GoGistSecret } from "react-icons/go";
import { useAccount } from "../../hooks/web3";
import { AiFillWallet, AiOutlineWallet } from "react-icons/ai";

const GlobalStyles = createGlobalStyle`
header#myHeader.navbar.white {
  
}
.box-login p{
  color: #a2a2a2 !important;
}
.box-login{
  border-radius: 3px;
  padding: 40px 50px;
}
`;

const Searching = () => {
  const [state, setState] = useContext(UserContext);
  const { account } = useAccount();
  // console.log(state.data, "checking from search components")

  // putting results from search
  const [result, setResult] = useState([]);

  const [query, setQuery] = useState("");

  const SearchUser = async (e) => {
    e.preventDefault();
    // console.log(query, 'from search')
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/search-author/${query}`
      );
      // console.log(data, 'from search')
      setResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async (user) => {
    // console.log(user, "following")
    if (!account.data && !state.user) {
      toast(
        <div>
          <p style={{ color: "white" }}> Connect Your Wallet!</p>
        </div>,
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } else {
      try {
        // _id: creator._id,
        // account: state._id,
        //  console.log( user.buyers.includes(state.user._id), "hanldeflow check")

        if (!user.buyers.includes(state.user._id)) {
          toast.error("You cant make connection with him");
        } else {
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
          let filtered = result.filter((i) => i._id !== user._id);
          setResult(filtered);

          toast.success(`following ${user.name}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUnfollow = async (user) => {
    if (!account.data && !state.user) {
      toast.error("Connect Your Wallet");
    } else {
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
    }
  };

  return (
    <>
      <GlobalStyles />
      <p className="mb10 d-flex  align-items-center gap-1">
        {" "}
        Search Authors <GoGistSecret color="#8364E2" size={20} />
      </p>
      <form
        onSubmit={SearchUser}
        name="contactForm"
        id="contact_form"
        className="form-border"
        action="#"
      >
        <div className="field-set">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setResult([]);
            }}
            name="search"
            id="text"
            className="form-control"
            placeholder="Search User..."
          />
        </div>

        <div className="clearfix"></div>
        {result &&
          result.map((r) => (
            <ul className="post-list" key={r._id}>
              <AuthorInSearchRes
                stu={r}
                handleFollow={handleFollow}
                handleUnfollow={handleUnfollow}
              />
            </ul>
          ))}
      </form>
    </>
  );
};

export default Searching;
