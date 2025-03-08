import apiClient from "./api-client";

export interface Comment {
  id: string;
  description: string;
  author: {
    fullName: string;
    imgUrl: string;
  };
  timeStamp: Date;
  reviewId: string;
}

export const createComment = (
  comment: Pick<Comment, "description" | "reviewId">
) => {
  return new Promise<void>((resolve, reject) => {
    console.log("Creating comment...");
    console.log(comment);
    apiClient
      .post(`/comments/`, comment)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
