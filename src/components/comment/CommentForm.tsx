import React, { useRef } from "react";
import { createComment } from "../../services/comment-service";

interface CommentFormProps {
  reviewId?: string;
  postCommentCallback: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  reviewId,
  postCommentCallback,
}) => {
  const commentContent = useRef<HTMLTextAreaElement>(null);

  const handleCommentSubmit = async () => {
    if (commentContent.current?.value.trim() !== "") {
      try {
        await createComment({
          description: commentContent.current?.value!,
          reviewId: reviewId!,
        });
        commentContent.current!.value = "";
        postCommentCallback();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="col-4">
        <textarea
          className="form-control border-dark"
          ref={commentContent}
          placeholder="Enter your comment..."
        />
      </div>
      <div className="ms-2">
        <button className="btn btn-outline-dark" onClick={handleCommentSubmit}>
          Post
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
