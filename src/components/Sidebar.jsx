import React, {useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {RiFolderAddLine} from "react-icons/ri";
import { CiViewList } from "react-icons/ci";
import {
    Home,
    BookOpen,
    Calendar,
    Users,
    FileText,
    Settings,
    GraduationCap,
    ClipboardList,
    Award,
    BookCheck,
    ScrollText,
    Building2,
    CreditCard,
    UserCircle,
    Wallet,
    ChevronRight,
    ChevronDown,

} from "lucide-react";

function Sidebar({isOpen}) {
    const location = useLocation();
    const [expandedCategories, setExpandedCategories] = useState(["/"]);

    const toggleCategory = (category) => {
        setExpandedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    let menuCategories;
    menuCategories = [
        {
            id: "main",
            items: [{icon: Home, label: "Bosh sahifa", path: "/"}],
        },
        {
            id: "academic",
            title: "Faculty",
            items: [
                {icon: RiFolderAddLine, label: "Fakultet qo'shish", path: "/create-faculty"},
                {icon: CiViewList, label: "Hamma fakultetlar", path: "/schedule"},
            ],
        },
        {
            id: "category",
            title: "Category",
            items: [
                {icon: RiFolderAddLine, label: "Kategory qo'shish", path: "/create-category"},
                {icon: CiViewList, label: "Hamma kategoriyalar", path: "/list-category"},
            ],
        },
        // {
        //     id: "academics",
        //     title: "O'quv jarayoni",
        //     items: [
        //         {icon: BookOpen, label: "O'quv reja", path: "/study-plan"},
        //         {icon: Calendar, label: "Dars jadvali", path: "/schedule"},
        //         {icon: Users, label: "Guruhlar", path: "/groups"},
        //         {icon: GraduationCap, label: "Fanlar", path: "/subjects"},
        //         {icon: ClipboardList, label: "Nazoratlar", path: "/controls"},
        //         {icon: Award, label: "Reyting daftarcha", path: "/rating-book"},
        //         {icon: BookCheck, label: "Davomatlar", path: "/attendance"},
        //         {icon: BookCheck, label: "Department", path: "/department"},
        //     ],
        // },
        // {
        //     id: "documents",
        //     title: "Hujjatlar",
        //     items: [
        //         {icon: ScrollText, label: "Arizalar", path: "/applications"},
        //         {icon: FileText, label: "Qaydnomalar", path: "/records"},
        //         {icon: Building2, label: "Shartnomalar", path: "/contracts"},
        //     ],
        // },
        // {
        //     id: "finance",
        //     title: "Moliya",
        //     items: [
        //         {icon: CreditCard, label: "To'lovlar", path: "/payments"},
        //         {icon: Wallet, label: "Stipendiya", path: "/scholarship"},
        //     ],
        // },
        // {
        //     id: "settings",
        //     title: "Sozlamalar",
        //     items: [
        //         {icon: UserCircle, label: "Profil", path: "/profile"},
        //         {icon: Settings, label: "Tizim", path: "/settings"},
        //     ],
        // },
    ];

    return (
        <aside
            className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 ${
                isOpen ? "w-64" : "w-20"
            } z-10 overflow-y-auto`}
        >
            <nav className="p-4">
                {menuCategories.map((category) => (
                    <div key={category.id} className="mb-4">
                        {category.title && isOpen && (
                            <button
                                onClick={() => toggleCategory(category.id)}
                                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-500"
                            >
                                {category.title}
                                {expandedCategories.includes(category.id) ? (
                                    <ChevronDown className="h-4 w-4"/>
                                ) : (
                                    <ChevronRight className="h-4 w-4"/>
                                )}
                            </button>
                        )}
                        <ul
                            className={`space-y-1 ${
                                category.title &&
                                !expandedCategories.includes(category.id) &&
                                isOpen
                                    ? "hidden"
                                    : ""
                            }`}
                        >
                            {category.items.map((item, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={item.path}
                                        className={({isActive}) => `
                      flex items-center p-3 rounded-lg transition-colors
                      ${
                                            isActive
                                                ? "bg-blue-50 text-[#2557A7]"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }
                    `}
                                    >
                                        <item.icon
                                            className={`h-5 w-5 ${
                                                location.pathname === item.path
                                                    ? "text-[#2557A7]"
                                                    : "text-gray-500"
                                            }`}
                                        />
                                        <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>
                      {item.label}
                    </span>
                                        {location.pathname === item.path && isOpen && (
                                            <ChevronRight className="ml-auto h-4 w-4 text-[#2557A7]"/>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
