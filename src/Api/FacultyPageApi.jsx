const API_URL =  import.meta.env.VITE_API_URL;
import axiosInstance from "./axiosInstance";

export const CreateFacultyPageApi = async (facultyPageData) => {
console.log(facultyPageData);
    try {
        const response = await axiosInstance.post(
            `${API_URL}/faculty_page/add_faculty_page`,
            {
                name_uz: facultyPageData.name_uz,
                name_ru: facultyPageData.name_ru,
                name_en: facultyPageData.name_en,
                title_uz: facultyPageData.title_uz,
                title_ru: facultyPageData.title_ru,
                title_en: facultyPageData.title_en,
                text_uz: facultyPageData.text_uz,
                text_ru: facultyPageData.text_ru,
                text_en: facultyPageData.text_en,
                faculty_id: facultyPageData.facultyId
            },
        );


        return await response.data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.response.data.detail);
    }
};

export const GetAllFacultyPage = async () => {
    const response = await axiosInstance.get(`${API_URL}/faculty_page/get_all_pages`);
    return response.data;
};
export const DeleteFacultyPage = async (facultyPageId) => {
    const response = await axiosInstance.delete(
        `${API_URL}/faculty_page/delete_page/${facultyPageId}`
    );
    return response.data;
};

export const detailFacultyPage = async (facultyPageId) => {
    const response = await axiosInstance.get(`${API_URL}/faculty_page/page_detail/${facultyPageId}`, {});
    return response.data;
};
export const UpdateFacultyPageApi = async (facultyPageData) => {
    const response = await axiosInstance.put(
        `${API_URL}/faculty_page/update_page/${facultyPageData?.facultyPageId}`,
        {
            name_uz: facultyPageData.name_uz,
            name_ru: facultyPageData.name_ru,
            name_en: facultyPageData.name_en,
            title_uz: facultyPageData.title_uz,
            title_ru: facultyPageData.title_ru,
            title_en: facultyPageData.title_en,
            text_uz: facultyPageData.text_uz,
            text_ru: facultyPageData.text_ru,
            text_en: facultyPageData.text_en,
            faculty_id: facultyPageData.facultyId
        }
    );
    return response.data;
};