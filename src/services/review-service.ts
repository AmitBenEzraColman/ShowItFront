import apiClient from "./api-client";
import { Comment } from "./comment-service";

export interface ReviewSubmition {
  tvShowTitle: string;
  description: string;
  score: number;
  reviewImgUrl: string;
}

export interface Review extends ReviewSubmition {
  id: string;
  timeStamp: Date;
  author: {
    fullName: string;
    imgUrl: string;
  };
  comments: [Comment];
  likes: number;
  isLiked: boolean;
}

export const getAllReviews = () => {
  return new Promise<Review[]>((resolve, reject) => {
    apiClient
      .get(`/reviews/`)
      .then((response) => {
        resolve(response.data as Review[]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getReviewById = (reviewId: string) => {
  return new Promise<Review>((resolve, reject) => {
    apiClient
      .get(`/reviews/id/${reviewId}`)
      .then((response) => {
        const review = response.data as Review;
        resolve(review);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getConnectedUserReviews = () => {
  return new Promise<Review[]>((resolve, reject) => {
    apiClient
      .get(`/reviews/connectedUser`)
      .then((response) => {
        const reviews = response.data as Review[];
        resolve(reviews);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createReview = (review: ReviewSubmition) => {
  return new Promise<void>((resolve, reject) => {
    console.log("Creating review...", review);
    apiClient
      .post("/reviews", review)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const likeReview = (reviewId: string) => {
  return new Promise<void>((resolve, reject) => {
    console.log("Creating review...", reviewId);
    apiClient
      .get(`/reviews/like/${reviewId}`)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const unlikeReview = (reviewId: string) => {
  return new Promise<void>((resolve, reject) => {
    console.log("Creating review...", reviewId);
    apiClient
      .get(`/reviews/unlike/${reviewId}`)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const editReview = (reviewId: string, review: ReviewSubmition) => {
  return new Promise<void>((resolve, reject) => {
    console.log("Editing review...", reviewId, review);
    apiClient
      .put(`/reviews/${reviewId}`, review)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const deleteReview = (reviewId: string) => {
  return new Promise<void>((resolve, reject) => {
    console.log("Deleting review...", reviewId);
    apiClient
      .delete(`/reviews/${reviewId}`)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
