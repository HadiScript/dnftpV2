//@ts-nocheck
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { UserContext } from "../../../context";
import { GlobalStyles } from "../../../styles/page-style/GlobalStyles";

const EditProfile = () => {
  const [state, setState] = useContext(UserContext);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState({});
  const [imageLoading, setImageLoading] = useState(false);

  // filling previous values
  useEffect(() => {
    if (state && state.user) {
      setAbout(state.user.about);
      setName(state.user.name);
      setImage(state.user.image);
    }
  }, [state && state.user]);

  // handling image
  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();

    formData.append("image", file);
    setImageLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/upload-profile-image",
        formData
      );
      // console.log('uploaded image data', data)
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setImageLoading(false);
    } catch (error) {
      console.log(error);
      setImageLoading(false);
    }
  };

  const RemovePhotoHandle = async (e) => {
    try {
      setImageLoading(true);
      const { data } = await axios.post(
        "http://localhost:8000/api/remove-profile-photo",
        { filepath: image.public_id }
      );

      if (data.result) {
        let auths = JSON.parse(window.localStorage.getItem("auth"));
        auths.image = {};
        localStorage.setItem("auth", JSON.stringify(auths));
        setState({ ...state, user: data });
        setImage({});
        setImageLoading(false);
        toast.success("image has been removed");
      }
    } catch (error) {
      console.log(error);
      setImageLoading(false);
    }
  };

  //submitting form
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      console.log("am in 1", state)

      setLoading(true);
      const { data } = await axios.put(
        `http://localhost:8000/api/update-profile`,
        {
          name,
          about,
          image,
          currentUserId: state.user._id,
        },
        { headers: { "Content-Type": "Application/json" } }
      );
      console.log("am in 2")

      console.log(data);
      console.log("am in 3")

      if (data.error) {
      console.log("am in 4")

        toast.error(data.error);
        setLoading(false);
      } else {
      console.log("am in 5")

        let auths = JSON.parse(window.localStorage.getItem("auth"));
        auths = data;

        localStorage.setItem("auth", JSON.stringify(auths));

        console.log("am in 6")
        // update context
        setState({ ...state, user: data });

        // setOk(true);
        setLoading(false);
        toast.success("Updated :)");

      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // console.log(state, image, "from upadate profile");
  // console.log(JSON.parse(window.localStorage.getItem("auth")))

  return (
    <>
      <GlobalStyles />
      {/* formic section start */}
      <section className="container">
        <div className="spacer-double"></div>

        <form
          name="contactForm"
          id="contact_form"
          className="form-border"
          action="#"
          onSubmit={submitHandler}
        >
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h3>Update Your Profile</h3>
              <div className="nft__item m-0">
                <div>
                  <Row className="">
                    {loading && <p>loading...</p>}
                    {/* {!image && !image.url && (
                      <Col>
                        <label htmlFor="formFileLg" className="form-label">
                          upload photo
                          <div className="small font-italic text-muted mb-4">
                            JPG or PNG no larger than 5 MB
                          </div>
                        </label>
                        <input
                          className="form-control form-control-lg btn-main"
                          id="formFileLg"
                          type="file"
                          onChange={handleImage}
                          accept="images/*"
                        />
                      </Col>
                    )} */}
                    {imageLoading && <p>loading...</p>}
                    {image && image.url ? (
                      <Col className="mb-2 text-center">
                        <img
                          style={{ width: "100px" }}
                          className="rounded-circle"
                          src={image.url}
                          alt=""
                        />
                        <br />
                        <span
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={RemovePhotoHandle}
                        >
                          delete photo
                        </span>
                      </Col>
                    ) : (
                      <Col>
                        <label htmlFor="formFileLg" className="form-label">
                          upload photo
                          <div className="small font-italic text-muted mb-4">
                            JPG or PNG no larger than 5 MB
                          </div>
                        </label>
                        <input
                          className="form-control form-control-lg btn-main"
                          id="formFileLg"
                          type="file"
                          onChange={handleImage}
                          accept="images/*"
                        />
                      </Col>
                    )}
                  </Row>
                </div>

                <div className="field-set">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="field-set">
                  <label>Bio:</label>
                  <input
                    type="text"
                    name="bio"
                    id="name"
                    className="form-control"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn-main">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProfile;
