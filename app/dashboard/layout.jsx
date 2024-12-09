"use client";
import React, { useState } from "react";
import DashboardHeader from "./_components/DashboardHeader";
import SideBar from "./_components/SideBar";
import { Menu } from "lucide-react";
import { CourseCountContext } from "../_context/CourseCountContext";

function DashboardLayout({ children }) {

  const [totalCourse, setTotalCourse] = useState(0);  

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <CourseCountContext.Provider value={{totalCourse, setTotalCourse}}>
    <div>
      {/* Sidebar */}
      <div
        className={`fixed z-20 bg-white h-screen w-64 shadow-md transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300`}
      >
        <SideBar />
      </div>

      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-5 left-5 z-30">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-gray-100 rounded-md shadow-md"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div
        className={`md:ml-64 transition-all duration-300 ${
          isSidebarOpen && "opacity-50 md:opacity-100"
        }`}
      >
        <div className="sticky top-0 z-10 bg-white">
          <DashboardHeader />
        </div>
        <div className="p-10">{children}</div>
      </div>
    </div>
    </CourseCountContext.Provider>
  );
}

export default DashboardLayout;
