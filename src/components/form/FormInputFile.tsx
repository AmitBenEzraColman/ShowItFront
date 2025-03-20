import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export interface FormInputImageProps {
    name: string;
    label: string;
    defaultImage: string;
    fullWidth?: boolean;
}

const FormInputImage: React.FC<FormInputImageProps> = ({
                                                           name,
                                                           label,
                                                           fullWidth = false,
                                                           defaultImage,
                                                       }) => {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        setImageUrl(defaultImage);
    }, [defaultImage]);

    const {
        register,
        formState: { errors },
    } = useFormContext();

    const regenerateImageURL = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files[0]) {
            setImageUrl(URL.createObjectURL(fileInput.files[0]));
        } else {
            setImageUrl(defaultImage);
        }
    };

    return (
        <div className="mb-3">
            <div className="text-center">
                <img
                    src={imageUrl}
                    className={`${fullWidth ? "img-fluid" : "rounded-circle"} mb-3`}
                    style={{ width: fullWidth ? "100%" : "150px", height: fullWidth ? "auto" : "150px", objectFit: "cover" }}
                    alt={label}
                />
                <div className="d-grid gap-2 col-6 mx-auto">
                    <label htmlFor={name} className="btn btn-outline-primary">
                        Choose {label}
                    </label>
                </div>
                <input
                    {...register(name, {
                        onChange: regenerateImageURL,
                    })}
                    type="file"
                    id={name}
                    accept="image/png, image/jpeg"
                    className="d-none"
                />
            </div>
            {errors[name] && (
                <div className="invalid-feedback d-block text-center mt-2">
                    {errors[name]?.message?.toString()}
                </div>
            )}
        </div>
    );
};

export default FormInputImage;