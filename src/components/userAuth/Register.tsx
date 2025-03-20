import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import FormInput, { FormInputProps } from "../form/FormInput";
import { User, googleSignin, register } from "../../services/user-service";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import {uploadPhoto} from "../../services/file-service.ts";
import FormInputImage from "../form/FormInputFile.tsx";
import profilePicPlaceholder from "/src/images/profile_pic_placeholder.png";

const schema = z
    .object({
        fullName: z
            .string()
            .regex(
                /^[a-zA-Z]{2,}(?: [a-zA-Z]{2,}){1,3}$/,
                "Please provide a valid full name"
            )
            .min(1, "Full Name must not be empty")
            .max(20, "Full Name must be less than 30 characters"),
        email: z.string().email("Email is invalid"),
        password: z.string().min(5, "Password must contain at least 5 characters"),
        confirmPassword: z
            .string()
            .min(5, "Password must contain at least 5 characters"),
        profilePicture: z.any().refine((val) => {
            return val.length > 0;
        }, "Profile picture is required"),    })
    .refine(
        (values) => {
            return values.password === values.confirmPassword;
        },
        {
            message: "Passwords must match!",
            path: ["confirmPassword"],
        }
    );

type FormData = z.infer<typeof schema>;

const inputFields: FormInputProps[] = [
    {
        name: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "John Doe",
    },
    {
        name: "email",
        label: "Email",
        type: "text",
        placeholder: "a@example.com",
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Create a strong password",
    },
    {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "Confirm your password",
    },
];

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [shake, setShake] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async ({
                                fullName,
                                email,
                                password,
                                profilePicture
                            }: FormData) => {
        const imgUrl = await    uploadPhoto(profilePicture[0]);
        const user: User = {
            fullName,
            email,
            password,
            imgUrl
        };

        await register(user);
        navigate("/");
    };

    const onErrorSubmit = () => {
        setShake(true);
    };

    const onGoogleLoginSuccess = async (credentialResponse: CodeResponse) => {
        await googleSignin(credentialResponse);
        navigate("/");
    };

    const googleLogin = useGoogleLogin({
        onSuccess: onGoogleLoginSuccess,
        flow: "auth-code",
    });

    return (
        <div className="d-flex min-vh-100 align-items-center justify-content-center bg-light py-5">
            <div
                className={`card shadow-lg border-0 rounded-3 ${shake && "shake"}`}
                onAnimationEnd={() => setShake(false)}
                style={{
                    maxWidth: "35rem",
                    width: "35rem"
                }}
            >
                <div className="card-body">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold mb-2">Create Account</h2>
                        <p className="text-muted">
                            Join our community and get started
                        </p>
                    </div>

                    <div className="overflow-auto px-1" style={{ maxHeight: "calc(100vh - 13rem)" }}>
                        <FormProvider {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit, onErrorSubmit)}>
                                <div className="text-center mb-4">
                                    <FormInputImage
                                        name={"profilePicture"}
                                        label={"Profile Picture"}
                                        defaultImage={profilePicPlaceholder}
                                    />
                                </div>

                                {inputFields.map((field) => (
                                    <FormInput key={field.name} {...field} showValidFeedback />
                                ))}

                                <div className="d-grid gap-2 mt-4">
                                    <button type="submit" className="btn btn-primary py-2 fw-bold">
                                        Create Account
                                    </button>

                                    <div className="position-relative my-3">
                                        <hr className="text-muted" />
                                        <span className="position-absolute top-50 start-50 translate-middle px-3 bg-white text-muted small">
                                            or register with
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary py-2"
                                        onClick={() => googleLogin()}
                                    >
                                        <i className="bi bi-google me-2"></i>
                                        Sign up with Google
                                    </button>
                                </div>
                            </form>
                        </FormProvider>

                        <div className="text-center mt-4">
                            <p className="mb-0">
                                Already have an account?{" "}
                                <a href="/login" className="text-decoration-none fw-medium">
                                    Sign in
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;