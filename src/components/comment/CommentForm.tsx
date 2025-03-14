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
      <div className="card shadow-sm mb-4">
        <div className="card-body">
        <textarea
            className="form-control mb-3"
            ref={commentContent}
            placeholder="Enter your comment..."
            rows={3}
        />
          <button className="btn btn-primary" onClick={handleCommentSubmit}>
            Post Comment
          </button>
        </div>
      </div>
  );
};

export default CommentForm;