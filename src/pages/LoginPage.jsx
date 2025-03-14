import { useEffect } from "react";
import {
    Card,
    Input,
    Checkbox,
    // Button,
    Typography,
} from "@material-tailwind/react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { replace, useFormik } from "formik";
import * as Yup from "yup";
import { LoginApi } from "../Api/LoginApi";



export default function LoginPage() {
    const navigate = useNavigate();
    // const { login, isLoggedIn } = useAuthStore();

    const loginMutation = useMutation({
        mutationKey: ["login-user"],
        mutationFn: LoginApi,
        onSuccess: (data) => {
            toast.success(data.message || "Successfully");
            // login(data);

        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    const isSuccess = loginMutation.isSuccess;
    useEffect(() => {
        if (isSuccess) {
            navigate("/");
        }
    }, [navigate, isSuccess]);
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("email is required"),
            password: Yup.string().required("password is required"),
        }),
        onSubmit: (values) => {
            const loginDate = {
                username: values.username,
                password: values.password,
            };
            loginMutation.mutate(loginDate);
        },
    });
    // const isLoading = loginMutation.isLoading;

    return (
        <div className="w-full flex justify-center">
            {/* {isLoading && <p>Loading...</p>} */}

            <Card color="transparent" shadow={false} className="bg-sky-200 p-10">
                <Typography variant="h4" color="blue-gray">
                    Sign in
                </Typography>
                <form
                    className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your username
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            name="username"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            {...formik.getFieldProps("username")}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <span>{formik.errors.username}</span>
                        )}
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            name="password"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <span>{formik.errors.password}</span>
                        )}
                    </div>
                    <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree the
                                <a
                                    href="#"
                                    className="font-medium transition-colors hover:text-gray-900"
                                >
                                    &nbsp;Terms and Conditions
                                </a>
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button type="submit" className="mt-6 bg-cyan-400" fullWidth>
                        sign in
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Already have an account?{" "}
                        <a href="#" className="font-medium text-gray-900">
                            Sign In
                        </a>
                    </Typography>
                </form>
            </Card>
        </div>
    );
}
