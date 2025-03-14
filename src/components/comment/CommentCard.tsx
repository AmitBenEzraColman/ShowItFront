import React from "react";
import { Comment } from "../../services/comment-service";
import UserAndTimestampCardHeader from "../UserAndTimestampCardHeader";

interface CommentCardProps extends Comment {}

const CommentCard: React.FC<CommentCardProps> = ({
  timeStamp,
  description,
  author,
}) => {
  console.log(author);
  return (
    <div className="w-50 mx-auto p-3 card border mb-3">
      <UserAndTimestampCardHeader author={author} timeStamp={timeStamp} />
      <p className="card-text card-body mb-0 pb-0 multiline">{description}</p>
    </div>
  );
};

export default CommentCard;
