

const API_URL =  import.meta.env.VITE_API_URL;
import axiosInstance from "./axiosInstance";

export const CreateCategoryPageApi = async (categoryPageDate) => {
    console.log(categoryPageDate)
    try {
        const response = await axiosInstance.post(
            `${API_URL}/page/add_page`,
            {
                name_uz: categoryPageDate.name_uz,
                name_ru: categoryPageDate.name_ru,
                name_en: categoryPageDate.name_en,
                title_uz: categoryPageDate.title_uz,
                title_ru: categoryPageDate.title_ru,
                title_en: categoryPageDate.title_en,
                text_uz: categoryPageDate.text_uz,
                text_ru: categoryPageDate.text_ru,
                text_en: categoryPageDate.text_en,
                category_id: categoryPageDate.categoryId
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

export const GetAllCategoryPage = async () => {
    const allCategoryPage = await axiosInstance.get(`${API_URL}/page/get_pages`);
    return allCategoryPage.data;
};
export const DeleteCategoryPage = async (categoryPageId) => {
    const CategoryPage = await axiosInstance.delete(
        `${API_URL}/page/delete_page/${categoryPageId}`
    );
    return CategoryPage.data;
};

export const detailCategoryPage = async (categoryPageId) => {
    const categoryPage = await axiosInstance.get(`${API_URL}/page/page_detail/${categoryPageId}`, {});
    return categoryPage.data;
};
export const UpdateCategoryPageApi = async (categoryPageDate) => {
    const response = await axiosInstance.put(
        `${API_URL}/page/update_page/${categoryPageDate?.categoryPageId}`,
        {
            name_uz: categoryPageDate.name_uz,
            name_ru: categoryPageDate.name_ru,
            name_en: categoryPageDate.name_en,
            title_uz: categoryPageDate.title_uz,
            title_ru: categoryPageDate.title_ru,
            title_en: categoryPageDate.title_en,
            text_uz: categoryPageDate.text_uz,
            text_ru: categoryPageDate.text_ru,
            text_en: categoryPageDate.text_en,
            category_id: categoryPageDate.categoryId
        }
    );
    return response.data;
};