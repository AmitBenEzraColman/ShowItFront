import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import FormInput from "../form/FormInput";
import { uploadPhoto } from "../../services/file-service";
import { User, getMyUserData, update } from "../../services/user-service";
import FormInputImage from "../form/FormInputFile";

const schema = z.object({
    fullName: z
        .string()
        .regex(/^[a-zA-Z]{2,}(?: [a-zA-Z]{2,}){1,3}$/, "Please provide a valid full name")
        .min(1, "Full Name must not be empty")
        .max(30, "Full Name must be less than 30 characters"),
    email: z.string().email("Email is invalid"),
    profilePicture: z.any(),
});

type FormData = z.infer<typeof schema>;

const inputFields = [
    {
        name: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "John Doe",
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "a@example.com",
    },
];

const EditProfile: React.FC = () => {
    const navigate = useNavigate();
    const [originalUser, setOriginalUser] = useState<User | null>(null);

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getMyUserData();
            setOriginalUser(user);
            form.reset(user);
        };
        fetchUser();
    }, []);

    const onSubmit = async ({ fullName, email, profilePicture }: FormData) => {
        if (
            fullName !== originalUser?.fullName ||
            email !== originalUser?.email ||
            profilePicture.length !== 0
        ) {
            const imgUrl =
                profilePicture.length !== 0
                    ? await uploadPhoto(profilePicture[0])
                    : originalUser?.imgUrl;

            const user: User = { fullName, email, imgUrl };
            await update(user);
        }
        navigate("/");
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Edit My Profile</h2>
                            <FormProvider {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormInputImage
                                        name="profilePicture"
                                        label="Profile Picture"
                                        defaultImage={originalUser?.imgUrl || ""}
                                    />
                                    {inputFields.map((field) => (
                                        <FormInput key={field.name} {...field} />
                                    ))}
                                    <div className="d-grid gap-2 mt-4">
                                        <button type="submit" className="btn btn-primary">
                                            Update Profile
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

export default EditProfile;