import React from "react";
import { format } from "date-fns";

interface UserAndTimestampCardHeaderProps {
    author: { fullName?: string; imgUrl?: string };
    timeStamp: Date;
}

const UserAndTimestampCardHeader: React.FC<UserAndTimestampCardHeaderProps> = ({
                                                                                   author: { fullName, imgUrl },
                                                                                   timeStamp,
                                                                               }) => {
    return (
        <div className="card-header bg-transparent border-bottom-0">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img
                        alt="User Avatar"
                        className="rounded-circle me-2"
                        height="40"
                        width="40"
                        src={imgUrl}
                    />
                    <span className="fw-bold">{fullName}</span>
                </div>
                <small className="text-muted">
                    {format(new Date(timeStamp || 0), "MMM d, yyyy")}
                </small>
            </div>
        </div>
    );
};

export default UserAndTimestampCardHeader;