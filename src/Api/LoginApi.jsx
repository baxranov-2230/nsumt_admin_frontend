import axios from "axios";
const API_URL =  import.meta.env.VITE_API_URL;
import axiosInstance from "./axiosInstance";

export const saveTokens = (accessToken, refreshToken) => {
    localStorage.setItem(
        "token",
        JSON.stringify({ access_token: accessToken, refresh_token: refreshToken })
    );
};

export const refreshAccessToken = async (refreshToken) => {
    const response = await axios.post(`${API_URL}/user/refresh`, null, {
        params: { refresh_token: refreshToken },
    });
    const { access_token, refresh_token } = response.data;
    saveTokens(access_token, refresh_token);
    // console.log("New -" + response.data.access_token);
    return response.data.access_token;
};

export const LoginApi = async (loginDate) => {
    const response = await axios.post(
        `${API_URL}/user/login`,
        new URLSearchParams({
            username: loginDate.username,
            password: loginDate.password,
        }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
    if (response.data.access_token) {
        const { access_token, refresh_token } = response.data;
        saveTokens(access_token, refresh_token);
        // localStorage.setItem("token", JSON.stringify(response.data));
    }
    return response.data;
};
export const logout = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    try {
        const response = axiosInstance.put(
            `${API_URL}/user/logout`,
            {}, // Agar kerak bo'lsa, payloadni bo'sh obyekt sifatida yuboring
            {
                headers: {
                    Authorization: `Bearer ${token.access_token}`, // Authorization headerni yuborish
                },
            }
        );

        localStorage.removeItem("token");
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Xatolik yuz berdi");
    }
};
