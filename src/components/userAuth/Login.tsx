import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput, { FormInputProps } from "../form/FormInput.tsx";
import { googleSignin, login } from "../../services/user-service";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";

const schema = z.object({
    email: z.string().email("Email is invalid"),
    password: z.string().min(5, "Password must contain at least 5 characters"),
});

type FormData = z.infer<typeof schema>;

const inputFields: FormInputProps[] = [
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
        placeholder: "your secret password",
    },
];

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [shake, setShake] = useState(false);
    const [submittedUnauthorized, setSubmittedUnauthorized] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onErrorSubmit = () => {
        setSubmittedUnauthorized(false);
        setShake(true);
    };

    const onSubmit = async ({ email, password }: FormData) => {
        setSubmittedUnauthorized(false);
        try {
            await login({
                email,
                password,
            });
            navigate("/");
        } catch (err) {
            setShake(true);
            setSubmittedUnauthorized(true);
        }
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
        <div className="d-flex min-vh-100 align-items-center justify-content-center bg-light">
            <div
                className={`card shadow-lg border-0 rounded-3 ${shake && "shake"}`}
                onAnimationEnd={() => setShake(false)}
                style={{
                    maxWidth: "30rem",
                }}
            >
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold mb-2">Welcome Back</h2>
                        <p className="text-muted">
                            Sign in to continue to your account
                        </p>
                    </div>

                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit, onErrorSubmit)}>
                            {inputFields.map((field) => (
                                <FormInput key={field.name} {...field} />
                            ))}


                            {submittedUnauthorized && (
                                <div className="alert alert-danger py-2 text-center" role="alert">
                                    Invalid email or password
                                </div>
                            )}

                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary py-2 fw-bold">
                                    Sign In
                                </button>

                                <div className="position-relative my-3">
                                    <hr className="text-muted" />
                                    <span className="position-absolute top-50 start-50 translate-middle px-3 bg-white text-muted small">
                                        or continue with
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary py-2"
                                    onClick={() => googleLogin()}
                                >
                                    <i className="bi bi-google me-2"></i>
                                    Sign in with Google
                                </button>
                            </div>
                        </form>
                    </FormProvider>

                    <div className="text-center mt-4">
                        <p className="mb-0">
                            Don't have an account?{" "}
                            <a href="/register" className="text-decoration-none fw-medium">
                                Create an account
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;