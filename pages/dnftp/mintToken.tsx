//@ts-nocheck
import React, { useState, ChangeEvent, useContext, useEffect } from "react";

import { createGlobalStyle } from "styled-components";
import axios from "axios";
import { useAccount } from "../../hooks/web3";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import { NftMeta, PinataRes } from "../../types/nft";

import { useWeb3 } from "../../providers/web3";
import { ethers } from "ethers";
import { UserContext } from "../../context";
import { BiWalletAlt } from "react-icons/bi";
import { SiEthereum } from "react-icons/si";

const ALLOWED_FIELDS = [
  "name",
  "category",
  "description",
  "image",
  "attributes",
];

const GlobalStyles = createGlobalStyle`
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  .navbar .mainside a{
    background: #8364e2;
    &:hover{
      box-shadow: 2px 2px 20px 0px #8364e2;
    }
  }
  .item-dropdown{
    .dropdown{
      a{
        &:hover{
          background: #8364e2;
        }
      }
    }
  }
  .btn-main{
    background: #8364e2;
    &:hover{
      box-shadow: 2px 2px 20px 0px #8364e2;
    }
  }
  p.lead{
    color: #a2a2a2;
  }
  .navbar .navbar-item .lines{
    border-bottom: 2px solid #8364e2;
  }

  #tsparticles{
    top: 0;
  }
  .text-uppercase.color{
    color: #8364e2;
  }
  .de_count h3 {
    font-size: 36px;
    margin-bottom: 0px;
  }
  .de_count h5{
    font-size: 14px;
    font-weight: 500;
  }
  h2 {
    font-size: 30px;
  }
  .box-url{
    text-align: center;
    h4{
      font-size: 16px;
    }
  }
  .de_countdown{
    border: solid 2px #8364e2;
  }
  .author_list_pp, .author_list_pp i, 
  .nft_coll_pp i, .feature-box.style-3 i, 
  footer.footer-light #form_subscribe #btn-subscribe i, 
  #scroll-to-top div{
    background: #8364e2;
  }
  footer.footer-light .subfooter .social-icons span i{
    background: #403f83;
  }
  .author_list_pp:hover img{
    box-shadow: 2px 2px 20px 0px #8364e2;
  }
  .nft__item_action span{
    color: #8364e2;
  }
  .feature-box.style-3 i.wm{
    color: rgba(131,100,226, .1);
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const MintToken = () => {
  const { account } = useAccount();
  const { ethereum, contract } = useWeb3();
  const [state] = useContext(UserContext);
  const router = useRouter();
  const [files, setFiles] = useState([]);

  const [nftURI, setNftURI] = useState("");
  const [hasURI, setHasURI] = useState(false);
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [nftMeta, setNftMeta] = useState<NftMeta>({
    name: "",
    description: "",
    image: "",
    category: "Art",
    attributes: [
      { trait_type: "attact", value: 0 },
      { trait_type: "health", value: 0 },
      { trait_type: "speed", value: 0 },
    ],
  });

  const getSignedData = async () => {
    const messageToSign = await axios.get("/api/verify");

    const accounts = (await ethereum?.request({
      method: "eth_requestAccounts",
    })) as string;
    // console.log(accounts, "from eth accounts")

    const account = accounts[0];

    const signedData = await ethereum?.request({
      method: "personal_sign",
      params: [
        JSON.stringify(messageToSign.data),
        account,
        messageToSign.data.id,
      ],
    });

    return {
      signedData,
      account,
    };
  };

  useEffect(() => {
    if (account && !account.data) {
      toast(
        <div>
          <p
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {" "}
            Connect Your Wallet <BiWalletAlt size={20} color="white" />
          </p>
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
    }
  }, [account && !account.data]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNftMeta({
      ...nftMeta,
      [name]: value,
    });
  };

  const HandleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.log("please select image");
      return;
    }

    const file = e.target.files[0];
    const buffer = await file.arrayBuffer();

    const bytes = new Uint8Array(buffer);
    // console.log(bytes);

    try {
      const { signedData, account } = await getSignedData();

      const promise = axios.post("/api/verify-image", {
        address: account,
        signature: signedData,
        bytes,
        contentType: file.type,
        fileName: file.name.replace(/\.[^/.]+$/, ""),
      });

      const res = await toast.promise(promise, {
        pending: "Uploading..",
        success: "Image has been uploaded",
        error: "image upload error",
      });

      const data = res.data as PinataRes;
      setNftMeta({
        ...nftMeta,
        image: `${process.env.NEXT_PUBLIC_PINATA_DOMAIN}/ipfs/${data.IpfsHash}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const attIndex = nftMeta.attributes.findIndex(
      (att) => att.trait_type === name
    );
    nftMeta.attributes[attIndex].value = value;

    setNftMeta({
      ...nftMeta,
      attributes: nftMeta.attributes,
    });
  };

  const savedMetaData = {
    name: nftMeta.name,
    description: nftMeta.description,
    image: nftMeta.image,
    category: nftMeta.category,
    price,
    creator: account.data,
  };

  const createNft = async () => {
    // console.log(nftMeta, "here is nft data");

    if (
      !nftMeta.name ||
      !nftMeta.category ||
      !nftMeta.image ||
      !nftMeta.description
    ) {
      toast.error("All Fields are important for your metadata");
    } else {
      try {
        const { signedData, account } = await getSignedData();

        const promise = axios.post("/api/verify", {
          address: account,
          signature: signedData,
          nft: nftMeta,
        });

        const res = await toast.promise(promise, {
          pending: "Uploading..",
          success: "Data has been uploaded",
          error: "Data upload error",
        });

        // console.log(signedData);
        const data = res.data as PinataRes;
        setNftURI(
          `${process.env.NEXT_PUBLIC_PINATA_DOMAIN}/ipfs/${data.IpfsHash}`
        );

        // saving nftmeta data!
        // console.log(nftURI, "uri")

        // const dataOfMeta = await axios.post(`${API}/save-meta-data`, {
        //   nftURI,
        //   creatorID: state.user._id,
        //   creatorAccount: state.user.account,
        // });
        // toast.success("Meta Data has been saved");

        setHasURI(true);
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  const createFinalNft = async () => {
    try {
      var xhr = new XMLHttpRequest();
      toast("Loading...");
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log("Success!");
        } else {
          console.log("Error!", xhr.statusText);
        }
      };
      xhr.onerror = function () {
        console.log("CORS error:", xhr.statusText);
      };
      xhr.open("GET", nftURI);
      xhr.send();
      //  xhr.response;
      const content = xhr.response;
      console.log("am here 0");
      Object.keys(content).forEach((key) => {
        if (!ALLOWED_FIELDS.includes(key)) {
          throw new Error("Invalid Json structure");
        }
      });

      // alert(price);
      // console.log("am here 1");
      const tx = await contract?.mintToken(
        nftURI,
        ethers.utils.parseEther(price),
        {
          value: ethers.utils.parseEther((0.025).toString()),
        }
      );
      // console.log("am here2");
      
      // const promise = await tx?.wait();
      const res = await toast.promise(tx!.wait(), {
        pending: "Uploading..",
        success: "Data has been uploaded",
        error: "Data upload error",
      });

      // console.log(res, "here is data");

      const res2 = await axios.post(`http://localhost:8000/api/create-nft`, {
        name: nftMeta.name,
        description: nftMeta.description,
        image: nftMeta.image,
        category: "Art",
        price,

        creatorID: state.user._id,
        creatorAccount: state.user.account,
      });
      // console.log(res2, "res from nodejs");
      toast.success("NFT has been launched");
      // alert("Nft was created!");
      router.push("/");
    } catch (e: any) {
      console.error(e.message);
      toast.error(e.message);
      // console.error(e.message, "from errring");
      if (e.code === -32603) {
        toast.error("This nft is already exist");
      }
      // -32603
      else if (e.response && e.response.status === 403) {
        toast.error("network error");
      }
    }
  };

  return (
    <div>
      <section
        className="jumbotron breadcumb no-bg"
        style={{
          backgroundImage: `url(${"/img/background/1.jpg"})`,
        }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">Mint NFT</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GlobalStyles />
      <section className="container">
        <div className="row">
          {/* right box */}
          <div className="col-lg-3 col-sm-6 col-xs-12">
            <div className="nft__item m-0">
              {!nftURI && (
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                    checked={hasURI}
                    onChange={() => setHasURI(!hasURI)}
                  />
                  <label
                    className="form-check-label"
                    for="flexSwitchCheckChecked"
                  >
                    <h5>Do you have meta data ?</h5>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* conditional right box */}
          <div className="col-lg-7 offset-lg-1 mb-5">
            {nftURI || hasURI ? (
              <>
                {/* have url form */}
                {hasURI && (
                  <>
                    <div className="field-set">
                      <form
                        id="form-create-item"
                        className="form-border"
                        action="#"
                      >
                        <h5> URI Link</h5>
                        <input
                          onChange={(e) => setNftURI(e.target.value)}
                          type="text"
                          name="uri"
                          id="uri"
                          className="form-control"
                          placeholder="http://link.com/data.json"
                        />
                        {nftURI && (
                          <>
                            <h5> Your Meta Data </h5>
                            <Link href={nftURI}>
                              <a className="underline text-indigo-600">
                                {nftURI}
                              </a>
                            </Link>
                          </>
                        )}

                        <h5> Price (ETH)</h5>
                        <input
                          onChange={(e) => setPrice(e.target.value)}
                          value={price}
                          type="number"
                          name="price"
                          id="price"
                          className="form-control"
                          placeholder="0.000034"
                        />
                        <div className="spacer-10"></div>

                        <input
                          type="button"
                          onClick={() => {
                            if (!price) {
                              toast.error(
                                <div>
                                  <p
                                    style={{
                                      color: "white",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "10px",
                                    }}
                                  >
                                    Please, Enter the price
                                    <SiEthereum size={20} color="white" />
                                  </p>
                                </div>
                              );
                            } else createFinalNft();
                          }}
                          id="submit"
                          className="btn-main"
                          value="List"
                        />
                      </form>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {/* have not url form */}
                <form id="form-create-item" className="form-border" action="#">
                  <div className="field-set">
                    <h5>Name</h5>
                    <input
                      value={nftMeta.name}
                      onChange={handleChange}
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      placeholder="Bunk NFT"
                    />

                    <div className="spacer-10"></div>

                    <h5>Select Category</h5>
                    <select
                      name="category"
                      onChange={handleChange}
                      className="form-control"
                    >
                      {" "}
                      <option value="Art">Art</option>
                      <option value="GIF">GIF</option>
                      <option value="Sports">Sports</option>
                      <option value="Painting">Painting</option>
                      <option value="Graphics">Graphics</option>
                      <option value="Memes">Memes</option>
                      <option value="Virtual Fashion">Virtual Fashion</option>
                      <option value="Event tickets">Event tickets</option>
                    </select>

                    <div className="spacer-10"></div>

                    <h5>Description</h5>
                    <small className="mt-2 text-sm text-gray-500">
                      Brief description of NFT
                    </small>
                    <textarea
                      id="description"
                      value={nftMeta.description}
                      onChange={handleChange}
                      name="description"
                      rows={3}
                      placeholder="Some nft description..."
                      className="form-control"
                    ></textarea>

                    <div className="spacer-10"></div>
                    <h5>Upload file</h5>

                    <div className="d-create-file">
                      {nftMeta.image ? (
                        <img src={nftMeta.image} alt="img" height={200} />
                      ) : (
                        <>
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer  rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span className="d-flex text-link">
                              {" "}
                              Upload File{" "}
                              <p className="pl-1"> or drag and drop</p>{" "}
                            </span>

                            <input
                              onChange={HandleImage}
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </>
                      )}
                    </div>
                    <div className="spacer-10"></div>

                    <input
                      type="button"
                      id="submit"
                      className="btn-main"
                      onClick={() => createNft()}
                      value="Save"
                    />
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MintToken;
