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
                                             }) => {
    const {
        register,
        formState: { errors, dirtyFields },
    } = useFormContext();

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <input
                {...register(name, { valueAsNumber: type === "number" })}
                type={type}
                id={name}
                placeholder={placeholder}
                accept={type === "file" ? "image/png, image/jpeg" : undefined}
                className={`form-control ${
                    errors[name] ? "is-invalid" : showValidFeedback && dirtyFields[name] ? "is-valid" : ""
                }`}
            />
            {errors[name] && (
                <div className="invalid-feedback">{errors[name]?.message?.toString()}</div>
            )}
            {showValidFeedback && dirtyFields[name] && !errors[name] && (
                <div className="valid-feedback">Looks good!</div>
            )}
        </div>
    );
};

export default FormInput;