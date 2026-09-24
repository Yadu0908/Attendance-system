import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { subjects, calculateSubjectAttendance } from "../data/mockData";

export default function StudentView({ students }) {
  const { darkMode } = useTheme();
  const [currentStudentId, setCurrentStudentId] = useState(students[0].id);

  // Find currently selected student
  const student =
    students.find((s) => s.id === Number(currentStudentId)) || students[0];

  return (
    <div className="space-y-6">
      <div
        className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200 shadow-sm"} p-6 rounded-2xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors`}
      >
        <div>
          <h2 className="text-2xl font-bold">Welcome, {student.name}</h2>
          <p
            className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}
          >
            Roll No: {student.roll} | Department: {student.department} (Sec{" "}
            {student.section})
          </p>
        </div>

        {/* Student Switcher Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Switch Student:</span>
          <select
            value={currentStudentId}
            onChange={(e) => setCurrentStudentId(e.target.value)}
            className={`${darkMode ? "bg-gray-900 border-gray-750 text-white" : "bg-gray-50 border-gray-300 text-gray-800"} border text-sm rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.roll})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjects.map((sub) => {
          const { total, attended } = calculateSubjectAttendance(student, sub);
          const pct = total === 0 ? 100 : Math.round((attended / total) * 100);
          const isWarning = pct < 75;

          return (
            <div
              key={sub}
              className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200 shadow"} p-6 rounded-2xl border space-y-4`}
            >
              <h3 className="font-bold text-lg">{sub}</h3>
              <div
                className={`flex justify-between text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                <span>
                  Attended: {attended}/{total}
                </span>
                <span
                  className={`font-bold ${isWarning ? "text-rose-500" : "text-emerald-500"}`}
                >
                  {pct}%
                </span>
              </div>
              <div
                className={`w-full ${darkMode ? "bg-gray-700" : "bg-gray-200"} h-2.5 rounded-full overflow-hidden`}
              >
                <div
                  className={`h-full rounded-full ${isWarning ? "bg-rose-500" : "bg-emerald-500"}`}
                  style={{ width: `${pct}%` }}
                ></div>
              </div>
              {isWarning && (
                <p className="text-xs text-rose-500 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                  Warning: Below 75% threshold!
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
