import React, {useEffect, lazy, useRef, useState, useMemo} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import JoditEditor from "jodit-react";

// const SITE_URL = import.meta.env.VITE_SITE_URL;
const API_URL = import.meta.env.VITE_API_URL;

import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";



import {CreateFacultyPageApi} from "../../Api/FacultyPageApi.jsx";
import {GetAllDepartment} from "../../Api/DepartmentApi.jsx";
import {CreateDepartmentPageApi} from "../../Api/DepartmentPageApi.jsx";


// const JoditEditor = lazy(() => import("jodit-react"));


function CreateDepartmentPage() {
    const navigate = useNavigate();


    const editorRef = useRef(null);
    const {isError, isLoading, data, error, refetch} = useQuery({
        queryKey: ["list-department"],
        queryFn: GetAllDepartment,
    });
    const departmentPageMutation = useMutation({
        mutationKey: ["create-department-page"],
        mutationFn: CreateDepartmentPageApi,
        onSuccess: (data) => {
            toast.success(data.message || "Kafedra page muvaffaqiyatli yaratildi");
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
            title_uz: "",
            title_ru: "",
            title_en: "",
            text_uz: "",
            text_ru: "",
            text_en: "",
            departmentId: "",
        },
        validationSchema: Yup.object({
            name_uz: Yup.string().required("!!! To'ldirish shart"),
            name_ru: Yup.string().required("!!! To'ldirish shart"),
            name_en: Yup.string().required("!!! To'ldirish shart"),
            title_uz: Yup.string().required("!!! To'ldirish shart"),
            title_ru: Yup.string().required("!!! To'ldirish shart"),
            title_en: Yup.string().required("!!! To'ldirish shart"),
            text_uz: Yup.string().required("!!! To'ldirish shart"),
            text_ru: Yup.string().required("!!! To'ldirish shart"),
            text_en: Yup.string().required("!!! To'ldirish shart"),
            departmentId: Yup.string().required("Fakultetni tanlash shart"),
        }),
        onSubmit: (values) => {
            // setFormData(values);
            const departmentPageData = {
                name_uz: values.name_uz,
                name_ru: values.name_ru,
                name_en: values.name_en,
                title_uz: values.title_uz,
                title_ru: values.title_ru,
                title_en: values.title_en,
                text_uz: values.text_uz,
                text_ru: values.text_ru,
                text_en: values.text_en,
                departmentId: values.departmentId,
            };
            departmentPageMutation.mutate(departmentPageData);
        },
    });
    const config = useMemo(() => ({
        readonly: false,
        height: 300,
        toolbarButtonSize: "middle",
        style: {
            table: {
                border: '1px solid #ccc',
                'border-collapse': 'collapse'
            },
            'td, th': {
                border: '1px solid #ccc',
                padding: '5px'
            }
        },
        uploader: {
            url: `${API_URL}/upload`,
            insertImageAsBase64URI: false,
            imagesExtensions: ["jpg", "png", "jpeg", "gif"],
            method: "POST",
            format: "json",
            prepareData: function (formData) {
                const file = formData.get("files[0]");
                formData.delete("files[0]");            // eski nomni o‘chirib tashlaymiz
                formData.append("upload_file", file);   // backend kutayotgan nom
                return formData;
                // const formData = new FormData();
                // const file = data.files[0];
                // if (file) {
                //     formData.append("upload_file", file);
                // } else {
                //     console.error("Fayl yo‘q yoki noto‘g‘ri format!");
                // }
                // return formData;
            },
            headers: {},
            isSuccess: function (resp) {
                return resp.file_url !== undefined;
            },
            process: function (resp) {
                console.log("Serverdan qaytgan javob:", resp.file_url);
                if (resp.file_url) {
                    return {
                        files: [resp.file_url],
                    };
                }
                return {
                    files: [],
                };
            },
            defaultHandlerSuccess: function (data) {
                if (data.files && data.files[0]) {
                    const fileUrl = data.files[0]; // Fayl URL manzili
                    let htmlContent = '';

                    // Fayl turini aniqlash uchun URL oxirgi qismini tekshirish
                    const fileExtension = fileUrl.split('.').pop().toLowerCase();

                    switch (fileExtension) {
                        case 'jpg':
                        case 'jpeg':
                        case 'png':
                        case 'gif':
                            // Rasm fayllari uchun
                            htmlContent = `<img src="${fileUrl}" alt="Yuklangan rasm" style="max-width: 100%;">`;
                            break;

                        case 'pdf':
                            htmlContent = `<a href="${fileUrl}" target="_blank" 
                            class="text-blue-600 cursor-pointer"> pdf </a>`;

                            break;

                        case 'doc':
                        case 'docx':
                            // Word fayllari uchun havola
                            htmlContent = `<a href="${fileUrl}" target="_blank">Word faylni yuklab olish</a>`;
                            break;

                        case 'xls':
                        case 'xlsx':
                            // Excel fayllari uchun havola
                            htmlContent = `<a href="${fileUrl}" target="_blank">Excel faylni yuklab olish</a>`;
                            break;

                        default:
                            // Noma'lum fayl turlari uchun umumiy havola
                            htmlContent = `<a href="${fileUrl}" target="_blank">Faylni yuklab olish</a>`;
                            break;
                    }

                    console.log("HTML Content:", htmlContent);
                    this.s.insertHTML(htmlContent); // Mavjud kontentga qo‘shish
                }


            },
        },

    }), []);

    const isSuccess = departmentPageMutation.isSuccess;
    useEffect(() => {
        if (isSuccess) {
            navigate("/list-department-page");
        }
    }, [navigate, isSuccess]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800"> Kafedra sahifa qo‘shish</h2>

            <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b bg-gray-50  ">
                    <form
                        onSubmit={formik.handleSubmit}
                        className="grid grid-cols-1 gap-3"
                    >

                        <div className="w-full flex gap-3">
                            <div className="w-1/3">
                                <label
                                    htmlFor="name_uz"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    kategory uzb nomi
                                </label>
                                <input
                                    type="text"
                                    id="name_uz"
                                    name="name_uz"
                                    {...formik.getFieldProps("name_uz")}
                                    className="block w-full p-4  text-gray-900 border border-gray-300 rounded-lg bg-white text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className="w-1/3">
                                <label
                                    htmlFor="name_ru"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    kategory rus nomi
                                </label>
                                <input
                                    type="text"
                                    id="name_ru"
                                    name="name_ru"
                                    {...formik.getFieldProps("name_ru")}
                                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-white text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className="w-1/3">
                                <label
                                    htmlFor="name_en"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    kategory eng nomi
                                </label>
                                <input
                                    type="text"
                                    id="name_en"
                                    name="name_en"
                                    {...formik.getFieldProps("name_en")}
                                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-white text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Kafedra tanlash</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.departmentId}
                                label="Fakultet"
                                name="departmentId"
                                onChange={formik.handleChange}
                            >
                                {isLoading ? (
                                    <MenuItem disabled>Loading...</MenuItem>
                                ) : (
                                    data?.map((department) => (
                                        <MenuItem key={department?.department_id} value={department?.department_id}>
                                            {department?.department_name_uz}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>
                        <div className="w-full">
                            <label
                                htmlFor="title_uz"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Sahifa uzbekcha mavzusini kiriting
                            </label>
                            <input
                                type="text"
                                id="title_uz"
                                name="title_uz"
                                {...formik.getFieldProps("title_uz")}
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-white text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="title_ru"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Sahifa ruscha mavzusini kiriting
                            </label>
                            <input
                                type="text"
                                id="title_ru"
                                name="title_ru"
                                {...formik.getFieldProps("title_ru")}
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-white text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="title_en"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Sahifa inglizcha mavzusini kiriting
                            </label>
                            <input
                                type="text"
                                id="title_en"
                                name="title_en"
                                {...formik.getFieldProps("title_en")}
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-white text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>

                        <div className="w-full">
                            <label htmlFor="text_uz" className="text-xl mb-2 mt-7">
                                Sahifa uzbekcha matnini kiriting
                            </label>
                            <JoditEditor
                                ref={editorRef}
                                config={config}
                                value={formik.values.text_uz}
                                onChange={(value) => {

                                    formik.setFieldValue("text_uz", value);
                                }}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="text_ru" className="text-xl mb-2 mt-7">
                                Sahifa ruscha matnini kiriting
                            </label>
                            <JoditEditor
                                ref={editorRef}
                                config={config}
                                value={formik.values.text_ru}
                                onChange={(value) => {
                                    formik.setFieldValue("text_ru", value);
                                }}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="text_en" className="text-xl mb-2 mt-7">
                                Sahifa englizcha matnini kiriting
                            </label>
                            <JoditEditor
                                ref={editorRef}
                                config={config}
                                value={formik.values.text_en}
                                onChange={(value) => {

                                    formik.setFieldValue("text_en", value);
                                }}
                            />
                        </div>
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

export default CreateDepartmentPage;
