import React, {useState} from "react";
import {useQuery, useMutation} from "@tanstack/react-query";
import {DeleteFaculty, GetAllFaculty} from "../../Api/FacultyApi.jsx";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import {FaRegEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
const SITE_URL = import.meta.env.VITE_SITE_URL;




function ListFaculty() {
    const [isModalOpen, setIsModalOpen] = useState(null);
    const {isError, isSuccess, isLoading, data, error, refetch} = useQuery({
        queryKey: ["list-faculty"], queryFn: GetAllFaculty,
    });

    const facultyMutation = useMutation({
        mutationKey: ["delete-faculty"], mutationFn: DeleteFaculty, onSuccess: (data) => {
            toast.success(data.message || "Fakultet muvaffaqiyatli o'chirildi");
        }, onError: (error) => {
            toast.error(error.message || "Xatolik yuz berdi");
        },
    });

    const handleDeleteClick = (facultyId) => {
        setIsModalOpen(facultyId); // Modalni ochish
    };
    const deleteHandler = async (facultyId) => {
        facultyMutation
            .mutateAsync(facultyId)
            .then(() => {
                refetch();
            })
            .catch((e) => console.log(e));
    };
    const cancelDelete = () => {
        setIsModalOpen(null); // Modalni bekor qilish
    };

    return (<div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Fakultetlar ro'yxati</h2>

        <div className="bg-white rounded-lg shadow">
            <div className="p-4">
                <table className="w-full">
                    <thead>
                    <tr className="text-left bg-gray-50">
                        <th className="p-3 text-gray-600">№</th>
                        <th className="p-3 text-gray-600">Fakultet uzb</th>
                        <th className="p-3 text-gray-600">Ikonka</th>
                        {/*<th className="p-3 text-gray-600">Kategoriya ru</th>*/}
                        <th className="p-3 text-gray-600 text-center">Action</th>

                    </tr>
                    </thead>
                    <tbody>
                    {data?.map((faculty, index) => {
                        return (<tr className="border-t" key={faculty?.faculty_id}>
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3">{faculty?.faculty_name_uz}</td>
                            <td className="p-3">
                                <img src={`${SITE_URL}/${faculty?.faculty_icon}`} alt="" className="w-12 h-12"/>
                            </td>
                            {/*<td className="p-3">{faculty?.faculty_icon}</td>*/}
                            <td className="p-3">
                                <div className="flex justify-center">
                                    <Link
                                        className=" flex items-center justify-start   pr-8"
                                        to={`/update-faculty/${faculty?.faculty_id}`}
                                    >
                                        <button><FaRegEdit className="text-2xl text-[#3697A5]"/></button>
                                    </Link>
                                    <button
                                        className="flex items-center justify-start  "

                                        onClick={() => handleDeleteClick(faculty?.faculty_id)}
                                    >
                                        <MdDelete className="text-2xl text-red-600"/>
                                    </button>
                                    {isModalOpen === faculty?.faculty_id && (<div
                                        className="fixed inset-0 flex items-center justify-center bg-gray-500/50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg">
                                            <h2 className="text-lg font-semibold mb-4">
                                                Haqiqatan ham o‘chirmoqchimisiz?
                                            </h2>
                                            <p className="mb-6">
                                                            <span className="text-red-600">
                                                             {faculty?.faculty_name_uz || "Bu element"}
                                                             </span>{" "}
                                                ni o‘chirishni tasdiqlaysizmi?
                                            </p>
                                            <div className="flex justify-end gap-4">
                                                <button
                                                    className="px-4 py-2 bg-gray-300 rounded "
                                                    onClick={cancelDelete}
                                                >
                                                    Bekor qilish
                                                </button>
                                                <button
                                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                                    onClick={() => deleteHandler(faculty?.faculty_id)}
                                                >
                                                    O‘chirish
                                                </button>

                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            </td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
}

export default ListFaculty;
