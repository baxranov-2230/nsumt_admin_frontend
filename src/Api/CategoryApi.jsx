import axios from "axios";

const API_URL =  import.meta.env.VITE_API_URL;
import axiosInstance from "./axiosInstance";


export const GetAllCategory = async () => {
    const allCategory = await axios.get(`${API_URL}/category/get_categories`);
    return allCategory.data;
};

export const CreateCategoryApi = async (categoryDate) => {
    try {
        const response = await axiosInstance.post(
            `${API_URL}/category/add_category`,
            {
                name_uz: categoryDate.name_uz,
                name_ru: categoryDate.name_ru,
                name_en: categoryDate.name_en,
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
export const DeleteCategory = async (categoryId) => {
    const Category = await axiosInstance.delete(
        `${API_URL}/category/delete_category/${categoryId}`
        // {
        //   method: "DELETE",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token.access_token}`
        //   },
        // }
    );
    return Category.data;
};
//
export const detailCategory = async (categoryId) => {
    const category = await axiosInstance.get(`${API_URL}/category/category_detail/${categoryId}`, {});
    return category.data;
};
//
export const UpdateCategoryApi = async (categoryDate) => {
    const response = await axiosInstance.put(
        `${API_URL}/category/update_category/${categoryDate?.categoryId}`,
        {
            name_uz: categoryDate.name_uz,
            name_ru: categoryDate.name_ru,
            name_en: categoryDate.name_en,
        },
    );
    return response.data;
};
