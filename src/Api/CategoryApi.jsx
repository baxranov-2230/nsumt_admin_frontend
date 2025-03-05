import axios from "axios";
// import { getCurrentUser } from "./AuthService/LoginApi";
const API_URL = "http://127.0.0.2:8000/v1/category";
// import axiosInstance from "./axiosInstance";




export const GetAllCategory = async () => {
    const allCategory = await axios.get(`${API_URL}/get_categories`);
    return allCategory.data;
};

export const CreateCategoryApi = async (categoryDate) => {
    try {
        const response = await axios.post(
            `${API_URL}/add_category`,
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
    const Category = await axios.delete(
        `${API_URL}/delete_category/${categoryId}`
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
// export const detailBook = async (bookId) => {
//     const book = await axiosInstance.get(`${API_URL}/book_detail/${bookId}`, {
//     });
//     return book.data;
// };
//
// export const UpdateBookApi = async (bookDate) => {
//     const response = await axiosInstance.put(
//         `${API_URL}/update_book/${bookDate?.bookId}`,
//         {
//             name: bookDate.name,
//             auther: bookDate.auther,
//             quantity: bookDate.quantity,
//         },
//     );
//     return response.data;
// };
