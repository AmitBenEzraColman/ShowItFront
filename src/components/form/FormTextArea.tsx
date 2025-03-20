import { useFormContext } from "react-hook-form";
import React from "react";

export interface FormTextAreaProps {
    name: string;
    label: string;
    placeholder?: string;
    showValidFeedback?: boolean;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
                                                       name,
                                                       label,
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
            <textarea
                {...register(name)}
                id={name}
                placeholder={placeholder}
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

export default FormTextArea;