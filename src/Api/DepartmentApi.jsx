const API_URL =  import.meta.env.VITE_API_URL;
import axiosInstance from "./axiosInstance";
export const CreateDepartmentApi = async (departmentDate) => {
    try {
        const response = await axiosInstance.post(
            `${API_URL}/department/add_department`,
            {
                name_uz: departmentDate.name_uz,
                name_ru: departmentDate.name_ru,
                name_en: departmentDate.name_en,
                faculty_id: departmentDate.facultyId
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
export const GetAllDepartment = async () => {
    const allDepartment = await axiosInstance.get(`${API_URL}/department/get_departments`);
    return allDepartment.data;
};
export const DeleteDepartment = async (departmentId) => {
    const Department = await axiosInstance.delete(
        `${API_URL}/department/delete_department/${departmentId}`
    );
    return Department.data;
};
export const detailDepartment = async (departmentId) => {
    const department = await axiosInstance.get(`${API_URL}/department/department_detail/${departmentId}`, {});
    return department.data;
};
export const UpdateDepartmentApi = async (departmentDate) => {
    const response = await axiosInstance.put(
        `${API_URL}/department/update_department/${departmentDate?.departmentId}`,
        {
            name_uz: departmentDate.name_uz,
            name_ru: departmentDate.name_ru,
            name_en: departmentDate.name_en,
            faculty_id: departmentDate.facultyId
        }
    );
    return response.data;
};