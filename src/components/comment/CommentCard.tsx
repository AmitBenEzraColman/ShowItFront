import React from "react";
import { Comment } from "../../services/comment-service";
import UserAndTimestampCardHeader from "../UserAndTimestampCardHeader";

interface CommentCardProps extends Comment {}

const CommentCard: React.FC<CommentCardProps> = ({
                                                     timeStamp,
                                                     description,
                                                     author,
                                                 }) => {
    return (
        <div className="card shadow-sm mb-3">
            <div className="card-body">
                <UserAndTimestampCardHeader author={author} timeStamp={timeStamp} />
                <p className="card-text mt-2">{description}</p>
            </div>
        </div>
    );
};

export default CommentCard;