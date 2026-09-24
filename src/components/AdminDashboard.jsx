import { useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import { calculateSubjectAttendance, subjects } from "../data/mockData";

export default function AdminDashboard({ students }) {
  const { darkMode } = useTheme();

  const { avgAttendance, defaulters } = useMemo(() => {
    let totalPctSum = 0;
    const lowAttendanceList = [];
    let countEvaluated = 0;

    students.forEach((student) => {
      let studentTotalSum = 0;
      let subCount = 0;

      subjects.forEach((sub) => {
        const { total, attended } = calculateSubjectAttendance(student, sub);
        if (total > 0) {
          const subPct = (attended / total) * 100;
          studentTotalSum += subPct;
          subCount++;
        }
      });

      const studentAvg =
        subCount > 0 ? Math.round(studentTotalSum / subCount) : 100;
      totalPctSum += studentAvg;
      countEvaluated++;

      if (studentAvg < 75) {
        lowAttendanceList.push({ ...student, percentage: studentAvg });
      }
    });

    const average =
      countEvaluated > 0 ? Math.round(totalPctSum / countEvaluated) : 0;
    return { avgAttendance: average, defaulters: lowAttendanceList };
  }, [students]);

  return (
    <div className="space-y-6">
      <div
        className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200 shadow-sm"} p-6 rounded-2xl border transition-colors`}
      >
        <h2 className="text-2xl font-bold">
          Institution Analytics & Defaulters
        </h2>
        <p
          className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}
        >
          Calculated dynamically from date-wise logs and optimized with React
          useMemo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200 shadow"} p-6 rounded-2xl border`}
        >
          <p
            className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm font-medium`}
          >
            Total Enrolled Students
          </p>
          <h3 className="text-3xl font-extrabold mt-2">{students.length}</h3>
        </div>
        <div
          className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200 shadow"} p-6 rounded-2xl border`}
        >
          <p
            className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm font-medium`}
          >
            Average Institution Attendance
          </p>
          <h3 className="text-3xl font-extrabold text-emerald-500 mt-2">
            {avgAttendance}%
          </h3>
        </div>
        <div
          className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200 shadow"} p-6 rounded-2xl border`}
        >
          <p
            className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm font-medium`}
          >
            Low Attendance Warning (&lt;75%)
          </p>
          <h3 className="text-3xl font-extrabold text-rose-500 mt-2">
            {defaulters.length} Students
          </h3>
        </div>
      </div>

      <div
        className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200 shadow-xl"} rounded-2xl border p-6`}
      >
        <h3 className="text-lg font-bold mb-4">
          Defaulter Alert List (&lt;75% overall average)
        </h3>
        <div className="space-y-3">
          {defaulters.length === 0 ? (
            <p className="text-emerald-500 text-sm">
              No defaulters found! All students have safe attendance.
            </p>
          ) : (
            defaulters.map((student) => (
              <div
                key={student.id}
                className="flex justify-between items-center bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl"
              >
                <div>
                  <span className="font-bold">{student.name}</span>
                  <span
                    className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} ml-2`}
                  >
                    ({student.roll}) - {student.department}
                  </span>
                </div>
                <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {student.percentage}% (Defaulter)
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
