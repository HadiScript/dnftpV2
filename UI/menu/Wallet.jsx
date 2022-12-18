import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Breakpoint, BreakpointProvider } from "react-socks";

const Wallet = ({ isInstalled, isLoading, connect, account, state }) => {
  const [openMenu2, setOpenMenu2] = useState(false);
  const [showpop, btn_icon_pop] = useState(false);

  const SRCImage =
    state && state.user && state.user.image && state.user.image.url;


  const closeMenu2 = () => {
    setOpenMenu2(false);
  };
  const ref2 = useOnclickOutside(() => {
    closeMenu2();
  });

  const closePop = () => {
    btn_icon_pop(false);
  };

  const refpop = useOnclickOutside(() => {
    closePop();
  });

  if (isLoading) {
    return <div className="btn-main">Loading...</div>;
  }

  if (account) {
    return (
      // <BreakpointProvider>
      //   <Breakpoint xl>
      <div className="mainside">
        <div className="logout">
          <div ref={ref2} className="de-menu-profile">
            {/* <div
              className="dropdown-custom  btn"
              onMouseEnter={handleBtnClick2}
              onMouseLeave={closeMenu2}
            > */}
            <div
              id="de-click-menu-profile"
              className="de-menu-profile"
              onClick={() => btn_icon_pop(!showpop)}
              ref={refpop}
            >
              {/* <Image
                style={{ borderRadius: "50%" }}
                className="lazy"
                src="/img/author/author-11.jpg"
                height={50}
                width={50}
                alt=""
              /> */}
              {state &&
              state.user &&
              state.user.image &&
              state.user.image.url ? (
                <Image
                  style={{ borderRadius: "50%" }}
                  className="lazy"
                  loader={() => SRCImage}
                  src={SRCImage}
                  height={50}
                  width={50}
                  alt=""
                />
              ) : (
                <Image
                  style={{ borderRadius: "50%" }}
                  className="lazy"
                  src="/img/author/author-11.jpg"
                  height={50}
                  width={50}
                  alt=""
                />
              )}
              {showpop && (
                <div className="popshow">
                  <div className="d-name">
                    {state && state.user && state.user.name && (
                      <h4 className="text-dark">{state.user.name}</h4>
                    )}
                  </div>
                  <div className="d-balance">
                    <h4>Balance</h4>
                    12.858 ETH
                  </div>
                  <div className="d-wallet">
                    <h4>My Wallet</h4>
                    <span id="wallet" className="d-wallet-address">
                      DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME
                    </span>
                    <button
                      id="btn_copy"
                      title="Copy Text"
                      onClick={() =>
                        navigator.clipboard.writeText("address it is!")
                      }
                    >
                      Copy
                    </button>
                  </div>
                  <div className="d-line"></div>
                  <ul className="de-submenu-profile">
                    <li>
                      <span>
                        <i className="fa fa-user-secret"></i>{" "}
                        <Link href="/dnftp/accountMine/myProfile">
                          <a>My Profile</a>
                        </Link>
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="fa fa-pencil"></i>
                        <Link href="/dnftp/accountMine/editProfile">
                          <a>Edit Profile</a>
                        </Link>
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="fa fa-bars"></i>
                        <Link href="/dnftp/accountMine/collection">
                          <a>My Collections</a>
                        </Link>
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      //   </Breakpoint>
      // </BreakpointProvider>
    );
  }

  if (isInstalled) {
    return (
      <div>
        <button
          onClick={() => {
            connect();
          }}
          type="button"
          className="btn-main"
        >
          Connect Wallet
        </button>
        {/* <Check /> */}
      </div>
    );
  } else {
    return (
      <div>
        <button
          onClick={() => {
            window.open("https://metamask.io", "_ blank");
          }}
          type="button"
          className="btn-main"
        >
          No Wallet
        </button>
      </div>
    );
  }
};

export default Wallet;
