import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import FormInput, { FormInputProps } from "../../form/FormInput";
import {
  Review,
  ReviewSubmition,
  editReview,
  getReviewById,
} from "../../../services/review-service";
import { uploadPhoto } from "../../../services/file-service";
import FormInputImage from "../../form/FormInputFile";
import FormTextArea from "../../form/FormTextArea";

const schema = z.object({
  description: z.string().min(1, "Description can't be empty"),
  score: z.number().min(1).max(5),
  reviewPicture: z.any(),
});

type FormData = z.infer<typeof schema>;

const inputFields: FormInputProps[] = [
  {
    name: "score",
    label: "Score",
    type: "number",
    placeholder: "4",
  },
  {
    name: "description",
    label: "Description",
    type: "textArea",
    placeholder: "Write your review here...",
  },
];

const EditReviewForm: React.FC = () => {
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const [review, setReview] = useState<Review | null>(null);
  const [shake, setShake] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    const fetchReview = async () => {
      try {
        if (reviewId) {
          const review = await getReviewById(reviewId);
          setReview(review);
          form.reset(review);
        } else {
          navigate("/myreviews");
        }
      } catch (error) {
        navigate("/");
      }
    };
    fetchReview();
  }, []);

  const onSubmit = async ({ description, score, reviewPicture }: FormData) => {
    if (
        description !== review?.description ||
        score !== review?.score ||
        reviewPicture.length !== 0
    ) {
      const imgUrl =
          reviewPicture.length !== 0
              ? await uploadPhoto(reviewPicture[0])
              : review?.reviewImgUrl!;

      const updatedReview: ReviewSubmition = {
        tvShowTitle: review!.tvShowTitle,
        description,
        score,
        reviewImgUrl: imgUrl,
      };

      await editReview(reviewId!, updatedReview);
    }
    navigate("/myreviews");
  };

  const onErrorSubmit = () => {
    setShake(true);
  };

  return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className={`card shadow ${shake ? "shake" : ""}`} onAnimationEnd={() => setShake(false)}>
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Edit Review</h2>
                <h5 className="text-center text-muted mb-4">{review?.tvShowTitle}</h5>
                <FormProvider {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit, onErrorSubmit)}>
                    <FormInputImage
                        name="reviewPicture"
                        label="Review Picture"
                        fullWidth
                        defaultImage={review?.reviewImgUrl || ""}
                    />
                    {inputFields.map((field) =>
                        field.type === "textArea" ? (
                            <FormTextArea key={field.name} {...field} showValidFeedback />
                        ) : (
                            <FormInput key={field.name} {...field} showValidFeedback />
                        )
                    )}
                    <div className="text-center mt-4">
                      <button type="submit" className="btn btn-primary btn-lg">
                        Update Review
                      </button>
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EditReviewForm;