import React, {useEffect, useMemo, useRef} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {detailFaculty, UpdateFacultyApi, GetAllFaculty} from "../../Api/FacultyApi.jsx";
import {detailNews, UpdateNewsApi} from "../../Api/NewsPageApi.jsx";
import JoditEditor from "jodit-react";

const SITE_URL = import.meta.env.VITE_SITE_URL;


function UpdateNews() {
    const {newsId} = useParams();
    const editorRef = useRef(null);

    const navigate = useNavigate();

    const {data} = useQuery({
        queryKey: ["news-detail"],
        queryFn: () => detailNews(newsId),
    });
    const newsMutation = useMutation({
        mutationKey: ["update-faculty"],
        mutationFn: newsData => UpdateNewsApi(newsId, newsData),
        onSuccess: (data) => {
            toast.success(data.message || "Yangilik muvaffaqiyatli o'zgartirildi");
        },
        onError: (error) => {
            toast.error(error.message || "Xatolik yuz berdi");
        },
    });
    const formik = useFormik({
        initialValues: {
            title_uz: data?.title_uz || "",
            title_ru: data?.title_ru || "",
            title_en: data?.title_en || "",
            text_uz: data?.text_uz || "",
            text_ru: data?.text_ru || "",
            text_en: data?.text_en || "",
            photo: null,
        },
        enableReinitialize: true,//update qilishda qayta render qiladi 1 ta kechmasligi uchun
        validationSchema: Yup.object({
            title_uz: Yup.string().required("!!! To'ldirish shart"),
            title_ru: Yup.string().required("!!! To'ldirish shart"),
            title_en: Yup.string().required("!!! To'ldirish shart"),
            text_uz: Yup.string().required("!!! To'ldirish shart"),
            text_ru: Yup.string().required("!!! To'ldirish shart"),
            text_en: Yup.string().required("!!! To'ldirish shart"),

        }),
        onSubmit: (values) => {
            // setFormData(values);
            const newsData = {
                title_uz: values.title_uz,
                title_ru: values.title_ru,
                title_en: values.title_en,
                text_uz: values.text_uz,
                text_ru: values.text_ru,
                text_en: values.text_en,
                photo: values.photo,
                newsId
            };


            newsMutation.mutate(newsData);
        },
    });

    const isSuccess = newsMutation.isSuccess;
    useEffect(() => {
        if (isSuccess) {
            navigate("/list-news-page");
        }

    }, [navigate, isSuccess]);
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
            url: `${SITE_URL}/upload`,
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

    return (<div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Faultetni o'zgartirish</h2>


        <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b bg-gray-50  ">
                <form
                    onSubmit={formik.handleSubmit}
                    className="grid grid-cols-1 gap-3"
                >
                    <div className="w-full">
                        <label htmlFor="name"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            O'zgartirilayotgan yangilik o'zbekcha mavzusi
                        </label>
                        <input type="text"
                               id="title_uz"
                               name="title_uz"
                               {...formik.getFieldProps("title_uz")}
                               className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="title_ru"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            O'zgartirilayotgan yangilik ruscha mavzusi
                        </label>
                        <input type="text"
                               id="title_ru"
                               name="title_ru"
                               {...formik.getFieldProps("title_ru")}
                               className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="title_en"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            O'zgartirilayotgan yangilik inglizcha mavzusi
                        </label>
                        <input type="text"
                               id="title_en"
                               name="title_en"
                               {...formik.getFieldProps("title_en")}
                               className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>

                    <div className="w-full">
                        <label htmlFor="text_uz" className="text-xl mb-2 mt-7">
                            Yangilik o'zbekcha matnini kiriting
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
                            Yangilik ruscha matnini kiriting
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
                            Yangilik ruscha matnini kiriting
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

                    <div className="w-full">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="faculty_icon"
                        >
                            Fakultet ikonkasini yuklang
                        </label>
                        {data?.photo ? (
                            <div className="mb-2">
                                <p>Joriy rasm:</p>
                                <img
                                    src={`${SITE_URL}/${data.photo}`}
                                    alt="Joriy fakultet ikonasi"
                                    className="w-12 h-12 object-cover rounded"
                                />
                            </div>
                        ) : (
                            <p className="mb-2">Joriy rasm yo'q</p>
                        )}
                        <input
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="photo"
                            name="photo"
                            type="file"
                            onChange={(event) => {
                                if (event.currentTarget.files.length > 0) {
                                    formik.setFieldValue("photo", event.currentTarget.files[0]);
                                }
                            }}
                        />
                    </div>
                    <button type="submit"
                            className="focus:outline-none w-full text-white bg-[#3697A5] hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                        O'zgartirish
                    </button>
                </form>
            </div>


        </div>

    </div>);
}

export default UpdateNews;
