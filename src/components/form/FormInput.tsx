import { useFormContext } from "react-hook-form";
import React from "react";

export interface FormInputProps {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    showValidFeedback?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
                                                 name,
                                                 label,
                                                 type,
                                                 placeholder = "",
                                                 showValidFeedback = false,
                                             }: FormInputProps) => {
    const {
        register,
        formState: { errors, dirtyFields },
    } = useFormContext();

    return (
        <div className={`mb-${(errors[name] && "0") || "3"} has-validation`}>
            <label htmlFor={name}>{label}:</label>
            <input
                {...register(name, { valueAsNumber: type === "number" })}
                type={type}
                id={name}
                placeholder={placeholder}
                accept={type === "file" ? "image/png, image/jpeg" : undefined}
                className={`form-control

        ${
                    (errors[name] && "is-invalid") ||
                    (showValidFeedback && dirtyFields[name] && "is-valid") ||
                    ""
                }`}
            />
            <div className="invalid-feedback my-0">
                <small>{errors[name]?.message?.toString()}</small>
            </div>
        </div>
    );
};

export default FormInput;