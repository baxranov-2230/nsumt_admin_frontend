import axios from "axios";


const API_URL =  import.meta.env.VITE_API_URL;
import axiosInstance from "./axiosInstance";


export const GetAllNews = async () => {
    const response = await axios.get(`${API_URL}/news/get_news`);
    return response.data;
};

export const CreateNewsApi = async (newsData) => {
    console.log(newsData);
    try {
        const formData = new FormData();
        formData.append("title_uz", newsData.title_uz  || "");
        formData.append("title_ru", newsData.title_ru  || "");
        formData.append("title_en", newsData.title_en  || "");
        formData.append("text_uz", newsData.text_uz  || "");
        formData.append("text_ru", newsData.text_ru  || "");
        formData.append("text_en", newsData.text_en  || "");
        if (newsData.photo) {
            formData.append('photo', newsData.photo);
        }
        const response = await axiosInstance.post(
            `${API_URL}/news/add_new`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Fayl yuborish uchun zarur sarlavha
                },
            }
        );
        console.log("Serverdan kelgan javob:", response.data)
        return await response.data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.response.data.detail);
    }
};

export const DeleteNews = async (newsId) => {
    const response = await axiosInstance.delete(
        `${API_URL}/news/delete_new/${newsId}`
    );
    return response.data;
};

export const detailNews = async (newsId) => {
    const response = await axiosInstance.get(`${API_URL}/news/news_detail/${newsId}`, {});
    return response.data;
};

export const UpdateNewsApi = async (newsId, newsData) => {
    try {
        const formData = new FormData();
        formData.append("title_uz", newsData.title_uz  || "");
        formData.append("title_ru", newsData.title_ru  || "");
        formData.append("title_en", newsData.title_en  || "");
        formData.append("text_uz", newsData.text_uz  || "");
        formData.append("text_ru", newsData.text_ru  || "");
        formData.append("text_en", newsData.text_en  || "");
        if (newsData.photo) {
            formData.append('photo', newsData.photo);
        }


        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const response = await axiosInstance.put(
            `${API_URL}/news/update_new/${newsId}`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Fayl jo‘natish uchun kerakli sarlavha
                },
            }
        );
        console.log("Serverdan kelgan javob:", response.data);
        return await response.data; // Serverdan kelgan javobni qaytarish
    } catch (error) {
        // Xatolikni tekshirish va foydalanuvchiga tushunarli xabar qaytarish
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.response.data.detail || "Fakultetni yangilashda xatolik yuz berdi");
    }
};
