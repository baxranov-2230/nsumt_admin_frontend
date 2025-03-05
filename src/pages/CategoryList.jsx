import React from "react";
import {useQuery, useMutation} from "@tanstack/react-query";
import {DeleteCategory, GetAllCategory} from "../Api/CategoryApi.jsx";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function CategoryList() {
    const {isError, isSuccess, isLoading, data, error, refetch} = useQuery({
        queryKey: ["list-category"],
        queryFn: GetAllCategory,
    });

    const categoryMutation = useMutation({
        mutationKey: ["delete-category"],
        mutationFn: DeleteCategory,
        onSuccess: (data) => {
            toast.success(data.message || "Kitob muvaffaqiyatli o'chirildi");
        },
        onError: (error) => {
            toast.error(error.message || "Xatolik yuz berdi");
        },
    });

    const deleteHandler = async (categoryId) => {
        categoryMutation
            .mutateAsync(categoryId)
            .then(() => {
                refetch();
            })
            .catch((e) => console.log(e));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Kategoriyalar ro'yxati</h2>

            <div className="bg-white rounded-lg shadow">
                <div className="p-4">
                    <table className="w-full">
                        <thead>
                        <tr className="text-left bg-gray-50">
                            <th className="p-3 text-gray-600">Kategoriya uzb</th>
                            <th className="p-3 text-gray-600">Kategoriya en</th>
                            <th className="p-3 text-gray-600">Kategoriya ru</th>
                            <th className="p-3 text-gray-600">Action</th>

                        </tr>
                        </thead>
                        <tbody>
                        {data?.map((category, index) => {
                            return (
                                <tr className="border-t">
                                    <td className="p-3 ">{category?.category_name_uz}</td>
                                    <td className="p-3">{category?.category_name_ru}</td>
                                    <td className="p-3">{category?.category_name_en}</td>
                                    <td className="p-3">
                                        <div className="flex justify-center">
                                            <Link
                                                className=" flex items-center justify-start   pr-8"
                                                // to={`/dashboard/edit-book/${book?.book_id}`}
                                            >
                                                <button><FaRegEdit className="text-2xl text-[#3697A5]"/></button>
                                            </Link>
                                            <button
                                                className="flex items-center justify-start  "
                                                onClick={() => deleteHandler(category?.category_id)}
                                            >
                                                <MdDelete className="text-2xl text-red-600"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CategoryList;
