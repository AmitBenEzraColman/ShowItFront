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

const NewReviewForm: React.FC = () => {
  const navigate = useNavigate();
  const { reviewId } = useParams();
  if (!reviewId) {
    navigate("/myreviews");
  }

  const [review, setReview] = useState<Review | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const review = await getReviewById(reviewId!);
        setReview(review);
        form.reset(review);
      } catch (error) {
        navigate("/");
      }
    };
    fetchReview();
  }, []);

  const [shake, setShake] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

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

      const user: ReviewSubmition = {
        tvShowTitle: review!.tvShowTitle,
        description,
        score,
        reviewImgUrl: imgUrl,
      };

      await editReview(reviewId!, user);
    }
    navigate("/myreviews");
  };

  const onErrorSubmit = () => {
    setShake(true);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center py-2">
        <div
          className={`border border-2 p-4 rounded ${shake && "shake"}`}
          onAnimationEnd={() => setShake(false)}
          style={{
            width: "35rem",
          }}
        >
          <div className="text-center">
            <p className="h2">Add Review</p>
            <p className="h5 my-2 text-muted">{review?.tvShowTitle}</p>
          </div>

          <div
            className="overflow-auto"
            style={{
              maxHeight: "calc(100vh - 11rem)",
            }}
          >
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit, onErrorSubmit)}>
                <FormInputImage
                  name={"reviewPicture"}
                  label={"Review Picture"}
                  fullWidth
                  defaultImage={review?.reviewImgUrl || ""}
                />
                {inputFields.map((field) =>
                  field.type === "textArea" ? (
                    <FormTextArea
                      key={field.name}
                      {...field}
                      showValidFeedback
                    />
                  ) : (
                    <FormInput key={field.name} {...field} showValidFeedback />
                  )
                )}

                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-dark w-100 mx-auto">
                    Upload
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewReviewForm;
