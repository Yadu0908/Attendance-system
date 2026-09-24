// import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function Navbar({ role, setRole }) {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav
      className={`${darkMode ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-800"} border-b px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors duration-300 shadow-md`}
    >
      <div className="flex items-center space-x-3">
        <h1 className="text-xl font-bold tracking-wide">
          Smart Attendance Management
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <div
          className={`${darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-300"} p-1 rounded-2xl border flex`}
        >
          <button
            onClick={() => setRole("faculty")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${role === "faculty" ? "bg-indigo-600 text-white shadow" : "text-gray-400 hover:text-indigo-500"}`}
          >
            Faculty
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${role === "admin" ? "bg-indigo-600 text-white shadow" : "text-gray-400 hover:text-indigo-500"}`}
          >
            Admin
          </button>
          <button
            onClick={() => setRole("student")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${role === "student" ? "bg-indigo-600 text-white shadow" : "text-gray-400 hover:text-indigo-500"}`}
          >
            Student
          </button>
        </div>

        {/* Theme Toggle Icon Button */}
        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-xl transition ${darkMode ? "text-yellow-400 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-200"}`}
          title="Toggle Dark/Light Mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}
