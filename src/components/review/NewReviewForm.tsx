import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import FormInput, { FormInputProps } from "../form/FormInput";
import { uploadPhoto } from "../../services/file-service";
import { ReviewSubmition, createReview } from "../../services/review-service";
import { TvShow, getTvShowById } from "../../services/tv-show-service";
import FormTextArea from "../form/FormTextArea";
import FormInputImage from "../form/FormInputFile";
import placeholderImgUrl from "/src/images/placeholder.jpg";

const schema = z
    .object({
      description: z.string().min(1, "Description can't be empty"),
      score: z.number().min(1).max(5),
      reviewPicture: z
          .any()
          .refine((val) => val.length > 0, "Review picture is required"),
    })
    .refine(
        (values) => {
          return values.score;
        },
        {
          message: "Score can't be empty",
          path: ["score"],
        }
    );

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
  const { movieId } = useParams();
  const [tvShow, setTvShow] = useState<TvShow | null>(null);
  const [shake, setShake] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    const fetchTvShow = async () => {
      try {
        if (movieId) {
          const tvShow = await getTvShowById(parseInt(movieId));
          setTvShow(tvShow);
        } else {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
      }
    };
    fetchTvShow();
  }, []);

  const onSubmit = async ({ description, score, reviewPicture }: FormData) => {
    const imgUrl = await uploadPhoto(reviewPicture[0]);

    const review: ReviewSubmition = {
      tvShowTitle: tvShow!.original_name,
      description,
      score,
      reviewImgUrl: imgUrl,
    };

    await createReview(review);
    navigate("/");
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
                <h2 className="card-title text-center mb-4">Add Review</h2>
                <h5 className="text-center text-muted mb-4">{tvShow?.original_name}</h5>
                <FormProvider {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit, onErrorSubmit)}>
                    <FormInputImage
                        name="reviewPicture"
                        label="Review Picture"
                        fullWidth
                        defaultImage={placeholderImgUrl}
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
                        Submit Review
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

export default NewReviewForm;