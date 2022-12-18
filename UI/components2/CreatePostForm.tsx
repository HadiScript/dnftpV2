//@ts-nocheck
import React from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";

const CreatePostForm = ({
  content,
  setContent,
  postSubmit,
  handleImage,
  loadingImage,
  image,
}) => {
  return (
    <div className="">
      <div className=" pb-1">
        <form className="form-group">
          <ReactQuill
            theme="snow"
            onChange={(e) => setContent(e)}
            value={content}
            className="form-control p-2 "
            placeholder="write something here..."
          />
        </form>
      </div>

      <div className="card-footer  d-flex justify-content-between text-muted">
        <button
          disabled={content === "" && true}
          className="btn-main"
          type="submit"
          onClick={postSubmit}
        >
          Post
        </button>

        <label>
          {/* {image && image.url ? (
            <Avatar size={30} src={image.url} className="mt-1" />
          ) : loadingImage ? (
            <LoadingOutlined className="mt-1" />
          ) : (
            <CameraOutlined className="mt-1" />
          )} */}

          <input onChange={handleImage} type="file" accept="images/*" hidden />
        </label>
      </div>
    </div>
  );
};

export default CreatePostForm;
