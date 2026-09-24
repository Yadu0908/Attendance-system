import React from "react";
import { subjects } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";

export default function FacultyView({
  students,
  selectedSubject,
  setSelectedSubject,
  selectedDate,
  setSelectedDate,
  attendanceState,
  handleToggle,
  saveAttendance,
}) {
  const { darkMode } = useTheme();

  return (
    <div className="space-y-6">
      <div
        className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200 shadow-sm"} p-6 rounded-2xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors`}
      >
        <div>
          <h2 className="text-2xl font-bold">Daily Attendance Sheet</h2>
          <p
            className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}
          >
            Select a date and subject to record or update attendance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={`${darkMode ? "bg-gray-900 border-gray-750 text-white" : "bg-gray-50 border-gray-300 text-gray-800"} border text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500`}
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className={`${darkMode ? "bg-gray-900 border-gray-750 text-white" : "bg-gray-50 border-gray-300 text-gray-800"} border text-sm rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div
        className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200 shadow-xl"} rounded-2xl border overflow-hidden transition-colors`}
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className={`${darkMode ? "bg-gray-900/50 border-gray-700 text-gray-400" : "bg-gray-50 border-gray-200 text-gray-600"} border-b text-xs uppercase tracking-wider`}
            >
              <th className="p-4">Roll No</th>
              <th className="p-4">Student Name</th>
              <th className="p-4">Department</th>
              <th className="p-4">Status on {selectedDate}</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${darkMode ? "divide-gray-700" : "divide-gray-100"}`}
          >
            {students.map((student) => {
              const status = attendanceState[student.id] || "Present";
              return (
                <tr
                  key={student.id}
                  className={`${darkMode ? "hover:bg-gray-750" : "hover:bg-gray-50"} transition`}
                >
                  <td className="p-4 font-mono text-indigo-500 font-bold">
                    {student.roll}
                  </td>
                  <td className="p-4 font-semibold">{student.name}</td>
                  <td
                    className={`${darkMode ? "text-gray-400" : "text-gray-500"} p-4`}
                  >
                    {student.department} (Sec {student.section})
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${status === "Present" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border border-rose-500/20"}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleToggle(student.id)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${status === "Present" ? "bg-rose-600 hover:bg-rose-500 text-white" : "bg-emerald-600 hover:bg-emerald-500 text-white"}`}
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          className={`${darkMode ? "bg-gray-900/40 border-gray-700" : "bg-gray-50 border-gray-200"} p-6 border-t flex justify-between items-center`}
        >
          <span className="text-xs text-gray-400">
            Marking attendance for date:{" "}
            <strong className="text-indigo-400">{selectedDate}</strong>
          </span>
          <button
            onClick={saveAttendance}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg transition transform active:scale-95"
          >
            Save Date-wise Attendance
          </button>
        </div>
      </div>
    </div>
  );
}
