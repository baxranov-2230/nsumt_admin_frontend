import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {  GetAllFaculty } from "../../Api/FacultyApi.jsx";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CreateDepartmentApi } from "../../Api/DepartmentApi.jsx";

function CreateDepartment() {
    const navigate = useNavigate();
    const { isError, isLoading, data, error, refetch } = useQuery({
        queryKey: ["list-faculty"],
        queryFn: GetAllFaculty,
    });
    const departmentMutation = useMutation({
        mutationKey: ["create-department"],
        mutationFn: CreateDepartmentApi,
        onSuccess: (data) => {
            toast.success(data.message || "Kafedra muvaffaqiyatli yaratildi");
        },
        onError: (error) => {
            toast.error(error.message || "Xatolik yuz berdi");
        },
    });
    const formik = useFormik({
        initialValues: {
            name_uz: "",
            name_ru: "",
            name_en: "",
            facultyId: "",
        },
        validationSchema: Yup.object({
            name_uz: Yup.string().required("!!! To'ldirish shart"),
            name_ru: Yup.string().required("!!! To'ldirish shart"),
            name_en: Yup.string().required("!!! To'ldirish shart"),
            facultyId: Yup.string().required("Fakultetni tanlash shart"),
        }),
        onSubmit: (values) => {
            // setFormData(values);
            const departmentDate = {
                name_uz: values.name_uz,
                name_ru: values.name_ru,
                name_en: values.name_en,
                facultyId: values.facultyId,
            };
            departmentMutation.mutate(departmentDate);
        },
    });

    const isSuccess = departmentMutation.isSuccess;
    useEffect(() => {
        if (isSuccess) {
            navigate("/list-department");
        }
    }, [navigate, isSuccess]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Kafedra qo'shish</h2>

            <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b bg-gray-50  ">
                    <form
                        onSubmit={formik.handleSubmit}
                        className="grid grid-cols-1 gap-3"
                    >
                        <div className="w-full">
                            <label
                                htmlFor="name_uz"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Kafedra uzb nomi
                            </label>
                            <input
                                type="text"
                                id="name_uz"
                                name="name_uz"
                                {...formik.getFieldProps("name_uz")}
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="name_ru"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Kafedra rus nomi
                            </label>
                            <input
                                type="text"
                                id="name_ru"
                                name="name_ru"
                                {...formik.getFieldProps("name_ru")}
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="name_en"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Kafedra eng nomi
                            </label>
                            <input
                                type="text"
                                id="name_en"
                                name="name_en"
                                {...formik.getFieldProps("name_en")}
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Fakultet</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.facultyId}
                                label="Fakultet"
                                name="facultyId"
                                onChange={formik.handleChange}
                            >
                                {isLoading ? (
                                    <MenuItem disabled>Loading...</MenuItem>
                                ) : (
                                    data?.map((faculty) => (
                                        <MenuItem key={faculty?.faculty_id} value={faculty?.faculty_id}>
                                            {faculty?.faculty_name_uz}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>

                        <button
                            type="submit"
                            className="focus:outline-none w-full text-white bg-[#3697A5] hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        >
                            Qo'shish
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateDepartment;
