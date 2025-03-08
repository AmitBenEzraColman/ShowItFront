import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export interface FormInputImageProps {
    name: string;
    label: string;
    defaultImage: string;
    fullWidth?: boolean;
    placeholder?: string;
    showValidFeedback?: boolean;
}

const FormInputImage: React.FC<FormInputImageProps> = ({
                                                           name,
                                                           label,
                                                           fullWidth = false,
                                                           placeholder = "",
                                                           defaultImage,
                                                           showValidFeedback = false,
                                                       }: FormInputImageProps) => {

    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        console.log("useEffect", defaultImage);
        regenerateImageURL();
    }, [defaultImage]);

    const {
        register,
        formState: { errors, dirtyFields },
    } = useFormContext();

    const regenerateImageURL = (event?: React.ChangeEvent<HTMLInputElement>) => {
        console.log("regenerateImageURL", errors, dirtyFields);
        if (!event) {
            setImageUrl(defaultImage);
            return;
        }
        const fileInput = event.target;
        if (fileInput.files && fileInput.files[0]) {
            setImageUrl(URL.createObjectURL(fileInput.files[0]));
        } else {
            setImageUrl(defaultImage);
        }
    };

    return (
        <div className={`mb-${(errors[name] && "0") || "3"} has-validation`}>
            <div className="d-flex flex-column justify-content-center">
                <img
                    src={imageUrl}
                    className={`${fullWidth ? "rounded" : "rounded-circle"} mx-auto mb-2`}
                    width={fullWidth ? "100%" : "100"}
                    height={fullWidth ? "150" : "100"}
                    alt={"aa"}
                />
                <label
                    htmlFor={name}
                    className="btn btn-outline-dark w-50 mx-auto btn-sm is-invalid"
                >
                    Choose {label}
                </label>
                {(errors[name] && (
                        <div className="invalid-feedback text-center">
                            {errors[name]?.message?.toString()}
                        </div>
                    )) ||
                    (showValidFeedback && dirtyFields[name] && (
                        <div className="valid-feedback text-center">Looks good!</div>
                    ))}
            </div>
            <input
                {...register(name, {
                    onChange: regenerateImageURL,
                })}
                type="file"
                id={name}
                placeholder={placeholder}
                accept="image/png, image/jpeg"
                className={`d-none`}
            />
            <div className="invalid-feedback my-0">
                <small>{errors[name]?.message?.toString()}</small>
            </div>
        </div>
    );
};

export default FormInputImage;