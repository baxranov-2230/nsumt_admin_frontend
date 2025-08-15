const API_URL = import.meta.env.VITE_API_URL;
import axiosInstance from "./axiosInstance";

export const CreateDepartmentPageApi = async (departmentPageData) => {
    try {
        const response = await axiosInstance.post(
            `${API_URL}/department_page/add_page`,
            {
                name_uz: departmentPageData.name_uz,
                name_ru: departmentPageData.name_ru,
                name_en: departmentPageData.name_en,
                title_uz: departmentPageData.title_uz,
                title_ru: departmentPageData.title_ru,
                title_en: departmentPageData.title_en,
                text_uz: departmentPageData.text_uz,
                text_ru: departmentPageData.text_ru,
                text_en: departmentPageData.text_en,
                department_id: departmentPageData.departmentId
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

export const GetAllDepartmentPage = async () => {
    const response = await axiosInstance.get(`${API_URL}/department_page/get_all_pages`);
    return response.data;
};
export const DeleteDepartmentPage = async (departmentPageId) => {
    const response = await axiosInstance.delete(
        `${API_URL}/department_page/delete_page/${departmentPageId}`
    );
    return response.data;
};

export const detailDepartmentPage = async (departmentPageId) => {
    const response = await axiosInstance.get(`${API_URL}/department_page/page_detail/${departmentPageId}`, {});
    return response.data;
};
export const UpdateDepartmentPageApi = async (departmentPageData) => {
    const response = await axiosInstance.put(
        `${API_URL}/department_page/update_page/${departmentPageData?.departmentPageId}`,
        {
            name_uz: departmentPageData.name_uz,
            name_ru: departmentPageData.name_ru,
            name_en: departmentPageData.name_en,
            title_uz: departmentPageData.title_uz,
            title_ru: departmentPageData.title_ru,
            title_en: departmentPageData.title_en,
            text_uz: departmentPageData.text_uz,
            text_ru: departmentPageData.text_ru,
            text_en: departmentPageData.text_en,
            department_id: departmentPageData.departmentId
        }
    );
    return response.data;
};