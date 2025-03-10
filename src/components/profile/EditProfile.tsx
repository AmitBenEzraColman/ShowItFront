import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import FormInput, { FormInputProps } from "../form/FormInput";
import { uploadPhoto } from "../../services/file-service";
import { User, getMyUserData, update } from "../../services/user-service";
import FormInputImage from "../form/FormInputFile";

const schema = z.object({
    fullName: z
        .string()
        .regex(
            /^[a-zA-Z]{2,}(?: [a-zA-Z]{2,}){1,3}$/,
            "Please provide a vaild full name"
        )
        .min(1, "Full Name must not be empty")
        .max(20, "Full Name must be less then 30 charecters"),
    email: z.string().email("Email is invalid"),
    profilePicture: z.any(),
});

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
];

const EditProfile: React.FC = () => {
    const navigate = useNavigate();

    const [shake, setShake] = useState(false);
    const [originalUser, setOriginalUser] = useState<User | null>(null);

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getMyUserData();
            console.log(user);
            setOriginalUser(user);
            form.reset(user);
        };
        fetchUser();
    }, []);

    const onSubmit = async ({ fullName, email, profilePicture }: FormData) => {
        console.log("submit");

        if (
            fullName !== originalUser?.fullName ||
            email !== originalUser?.email ||
            profilePicture.length !== 0
        ) {
            const imgUrl =
                profilePicture.length !== 0
                    ? await uploadPhoto(profilePicture[0])
                    : originalUser?.imgUrl;

            const user: User = {
                fullName,
                email,
                imgUrl,
            };

            await update(user);
        }
        navigate("/");
    };

    const onErrorSubmit = () => {
        console.log("error");
        setShake(true);
    };

    return (
        <div className="d-flex align-items-center justify-content-center py-2">
            <div
                className={`border border-2 p-4 rounded ${shake && "shake"}`}
                onAnimationEnd={() => setShake(false)}
                style={{
                    width: "35rem",
                }}
            >
                <div className="text-center">
                    <h1>Edit My Profile</h1>
                    <p className="text-muted mt-3">
                        Please edit your information below in order to update your profile
                    </p>
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
                                name={"profilePicture"}
                                label={"Profile Picture"}
                                defaultImage={originalUser?.imgUrl || ""}
                            />
                            {inputFields.map((field) => (
                                <FormInput key={field.name} {...field} />
                            ))}

                            <div className="text-center mt-4">
                                <button type="submit" className="btn btn-dark w-100 mx-auto">
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
