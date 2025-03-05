import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Menu, Globe2, Bell } from "lucide-react";
import HemisLogo from "./components/HemisLogo";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import CreateFaculty from "./pages/CreateFaculty.jsx";
import CreateCategory from "./pages/CreateCategory.jsx";
import Schedule from "./pages/Schedule";
import Groups from "./pages/Groups";
import Subjects from "./pages/Subjects";
import Controls from "./pages/Controls";
import RatingBook from "./pages/RatingBook";
import Attendance from "./pages/Attendance";
import Applications from "./pages/Applications";
import Records from "./pages/Records";
import Contracts from "./pages/Contracts";
import Payments from "./pages/Payments";
import Scholarship from "./pages/Scholarship";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { Toaster } from "react-hot-toast";
import CategoryList from "./pages/CategoryList.jsx";


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (

      <div className="min-h-screen  flex flex-col">
        {/* Header */}
        <header className="bg-[#3697A5] text-white fixed w-full z-10">
          <div className="px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Menu
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <HemisLogo className="h-8" />
              </div>
              <div className="flex items-center space-x-6">
                {/* <Globe2 className="h-5 w-5 cursor-pointer" /> */}
                <Bell className="h-5 w-5 cursor-pointer" />
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm font-medium">JS</span>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium">John Smith</div>
                    <div className="text-xs text-gray-300">Student</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex pt-16">
          <Sidebar isOpen={isSidebarOpen} />

          <main
            className={`flex-1 p-6 transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-20"
            }`}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create-faculty" element={<CreateFaculty />} />
              <Route path="/create-category" element={<CreateCategory />} />
              <Route path="/list-category" element={<CategoryList />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/controls" element={<Controls />} />
              <Route path="/rating-book" element={<RatingBook />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/records" element={<Records />} />
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/scholarship" element={<Scholarship />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />

            </Routes>
            <Toaster />
          </main>
        </div>
      </div>

  );
}

export default App;
