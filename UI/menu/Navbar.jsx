import React, { useContext, useEffect, useState } from "react";
import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints,
} from "react-socks";
import { header } from "react-bootstrap";
import Link from "next/link";
import useOnclickOutside from "react-cool-onclickoutside";
import { useAccount, useNetwork } from "../../hooks/web3";
import { UserContext } from "../../context";
import Image from "next/image";
import Wallet from "./Wallet";
import styled from "styled-components";
import { ImHome2 } from "react-icons/im";
import {
  MdCreate,
  MdOutlineTimeline,
  MdOutlineCollectionsBookmark,
  MdQueryStats,
  MdOutlineGraphicEq,
} from "react-icons/md";
import { FaUserSecret } from "react-icons/fa";
import { BiHappyHeartEyes } from "react-icons/bi";
import { FcSportsMode } from "react-icons/fc";
import { AiOutlineGif } from "react-icons/ai";
import { GoPaintcan } from "react-icons/go";

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? "active" : "non-active",
      };
    }}
  />
);

const Navbar = function () {
  const { account } = useAccount();
  const { network } = useNetwork();

  const [state] = useContext(UserContext);

  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
  };
  const handleBtnClick3 = () => {
    setOpenMenu3(!openMenu3);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  const closeMenu1 = () => {
    setOpenMenu1(false);
  };
  const closeMenu2 = () => {
    setOpenMenu2(false);
  };
  const closeMenu3 = () => {
    setOpenMenu3(false);
  };
  const ref = useOnclickOutside(() => {
    closeMenu();
  });
  const ref1 = useOnclickOutside(() => {
    closeMenu1();
  });
  const ref2 = useOnclickOutside(() => {
    closeMenu2();
  });
  const ref3 = useOnclickOutside(() => {
    closeMenu3();
  });

  const refpopnot = useOnclickOutside(() => {
    closeNot();
  });
  const refpop = useOnclickOutside(() => {
    closePop();
  });

  const [showmenu, btn_icon] = useState(false);
  useEffect(() => {
    const header = document.getElementById("myHeader");
    // const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        // totop.classList.add("show");
      } else {
        header.classList.remove("sticky");
        // totop.classList.remove("show");
      }
      if (window.pageYOffset > sticky) {
        closeMenu();
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  return (
    <header id="myHeader" className="navbar white">
      <div className="container">
        <div className="row w-100-nav">
          <div className="logo px-0">
            <div className="navbar-title navbar-item">
              <NavLink href="/">
                <a>
                  <h2>DNFTP</h2>
                </a>
              </NavLink>
            </div>
          </div>

          {/* <div className="search">
            <input
              id="quick_search"
              className="xs-hide"
              name="quick_search"
              placeholder="search item here..."
              type="text"
            />
          </div> */}

          <BreakpointProvider>
            <Breakpoint l down>
              {showmenu && (
                <div className="menu">
                  <div className="navbar-item">
                    <div ref={ref}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        onClick={handleBtnClick}
                      >
                        Home <ImHome2 color="#8364E2" />
                      </div>
                      {/* mobile menu */}
                      {openMenu && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu}>
                            <div className="spacer-10"></div>

                            <NavLink href="/dnftp/category/art">
                              <a>
                                {" "}
                                Art <BiHappyHeartEyes />{" "}
                              </a>
                            </NavLink>
                            <NavLink href="/dnftp/category/sports">
                              <a>
                                {" "}
                                Sports <FcSportsMode />{" "}
                              </a>
                            </NavLink>
                            <NavLink href="/dnftp/category/gif">
                              <a>
                                {" "}
                                Gif <AiOutlineGif />
                              </a>
                            </NavLink>
                            <NavLink href="/dnftp/category/painting">
                              <a>
                                {" "}
                                Painting <GoPaintcan />{" "}
                              </a>
                            </NavLink>
                            <NavLink href="/dnftp/category/graphics">
                              <a>
                                {" "}
                                Graphics <MdOutlineGraphicEq />{" "}
                              </a>
                            </NavLink>
                            <NavLink href="/dnftp/category/memes">
                              <a> Memes </a>
                            </NavLink>
                            <NavLink href="/dnftp/category/fashion">
                              <a> Virtual Fashion </a>
                            </NavLink>
                            <NavLink href="/dnftp/category/ETicket">
                              <a>Event Tickets</a>
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="navbar-item">
                    <NavLink href="/dnftp/mintToken">
                      <a className="d-flex align-items-center gap-1">
                        mint <MdCreate color="#8364E2" />{" "}
                      </a>
                    </NavLink>
                  </div>

                  <div className="navbar-item">
                    <NavLink href="/dnftp/timelines">
                      <a className="d-flex align-items-center gap-1">
                        Timelines{" "}
                        <MdOutlineTimeline color="#8364E2" size={20} />{" "}
                      </a>
                    </NavLink>
                  </div>

                  <div className="navbar-item">
                    <NavLink href="/dnftp/authors">
                      <a className="d-flex align-items-center gap-1">
                        Authors <FaUserSecret color="#8364E2" />
                      </a>
                    </NavLink>
                  </div>

                  <div className="navbar-item">
                    <NavLink href="/dnftp/dashboard">
                      <a className="d-flex align-items-center gap-1">
                        {" "}
                        Stats <MdQueryStats color="#8364E2 " size={20} />{" "}
                      </a>
                    </NavLink>
                  </div>
                </div>
              )}
            </Breakpoint>

            <Breakpoint xl>
              <div className="menu">
                {/* <div className="navbar-item">
                  <span className="lines"></span>
                  <NavLink href="/">
                    <a className="d-flex align-items-center gap-1">
                      home <ImHome2 color="#8364E2" />
                    </a>
                  </NavLink>
                </div> */}

                <div className="navbar-item">
                  <div ref={ref1}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick1}
                      onMouseLeave={closeMenu1}
                    >
                      home <ImHome2 color="#8364E2" />
                      <span className="lines"></span>
                      {openMenu1 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu1}>
                            <div className="spacer-10"></div>
                            <small> NFTs </small>
                            <NavLink href="/dnftp/category/art">
                              <a>
                                {" "}
                                Art <BiHappyHeartEyes />{" "}
                              </a>
                            </NavLink>
                            <NavLink href="/dnftp/category/sports">
                              <a>
                                {" "}
                                Sports <FcSportsMode />{" "}
                              </a>
                            </NavLink>
                            <NavLink href="/dnftp/category/gif">
                              <a>
                                {" "}
                                Gif <AiOutlineGif />
                              </a>
                            </NavLink>
                            <NavLink href="/dnftp/category/painting">
                              <a>
                                {" "}
                                Painting <GoPaintcan />{" "}
                              </a>
                            </NavLink>
                            <NavLink href="/dnftp/category/graphics">
                              <a>
                                {" "}
                                Graphics <MdOutlineGraphicEq />{" "}
                              </a>
                            </NavLink>
                            <NavLink href="/dnftp/category/memes">
                              <a> Memes </a>
                            </NavLink>
                            <NavLink href="/dnftp/category/fashion">
                              <a> Virtual Fashion </a>
                            </NavLink>
                            <NavLink href="/dnftp/category/ETicket">
                              <a>Event Tickets</a>
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="navbar-item">
                  <span className="lines"></span>
                  <NavLink href="/dnftp/mintToken">
                    <a className="d-flex align-items-center gap-1">
                      mint <MdCreate color="#8364E2" />{" "}
                    </a>
                  </NavLink>
                </div>

                <div className="navbar-item">
                  <span className="lines"></span>
                  <NavLink href="/dnftp/timelines">
                    <a className="d-flex align-items-center gap-1">
                      Timelines <MdOutlineTimeline color="#8364E2" size={20} />{" "}
                    </a>
                  </NavLink>
                </div>

                {/* <div className="navbar-item">
                  <span className="lines"></span>
                  <NavLink href="/dnftp/collections">
                    <a className="d-flex align-items-center gap-1">
                      Collections{" "}
                      <MdOutlineCollectionsBookmark color="#8364E2" />
                    </a>
                  </NavLink>
                </div> */}

                <div className="navbar-item">
                  <span className="lines"></span>
                  <NavLink href="/dnftp/authors">
                    <a className="d-flex align-items-center gap-1">
                      Authors <FaUserSecret color="#8364E2" />
                    </a>
                  </NavLink>
                </div>

                <div className="navbar-item">
                  <span className="lines"></span>
                  <NavLink href="/dnftp/dashboard">
                    <a className="d-flex align-items-center gap-1">
                      {" "}
                      Stats <MdQueryStats color="#8364E2 " size={20} />{" "}
                    </a>
                  </NavLink>
                </div>
              </div>
            </Breakpoint>
          </BreakpointProvider>
          <div className="mainside d-flex align-items-center  ">
            <Wallet
              isInstalled={account.isInstalled}
              isLoading={account.isLoading}
              connect={account.connect}
              account={account.data}
              state={state}
            />

            {/* <span class="badge bg-white text-dark p-2 m-2">
              {network.isLoading
                ? "Loading..."
                : account.isInstalled
                ? network.data
                : "Install Web3 Wallet"}
            </span> */}
          </div>
        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>
      </div>
      {/* {account.data} */}
    </header>
  );
};
export default Navbar;
