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
                                                   }: FormTextAreaProps) => {
    const {
        register,
        formState: { errors, dirtyFields },
    } = useFormContext();

    return (
        <div className={`mb-${(errors[name] && "0") || "3"} has-validation`}>
            <label htmlFor={name}>{label}:</label>
            <textarea
                {...register(name)}
                id={name}
                placeholder={placeholder}
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

export default FormTextArea;