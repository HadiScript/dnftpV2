import React from "react";

const CommentForm = ({ addComment, comment, setComment }) => {
  return (
    <form
      onSubmit={addComment}
      name="contactForm"
      id="contact_form"
      className="form-border"
      action="#"
    >
      <div className="field-set">
        <input
          type="text"
          name="email"
          id="email"
          className="form-control"
          placeholder="Say something..."
          autoFocus
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className="field-set">
        <input
          type="submit"
          id="send_message"
          value="Submit"
          className="btn btn-main btn-fullwidth color-2"
          onClick={addComment}
        />
      </div>
    </form>
  );
};

export default CommentForm;
