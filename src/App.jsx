import { useState } from "react";
import { initialStudents, subjects } from "./data/mockData";

function App() {
  const [role, setRole] = useState("faculty"); // 'faculty', 'admin', 'student'
  const [students, setStudents] = useState(initialStudents);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [attendanceState, setAttendanceState] = useState({});

  // Helper to calculate percentage
  const getPercentage = (attended, total) => {
    if (total === 0) return 100;
    return Math.round((attended / total) * 100);
  };

  // Toggle attendance for Faculty view
  const handleToggle = (studentId) => {
    setAttendanceState((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === "Absent" ? "Present" : "Absent",
    }));
  };

  // Save attendance
  const saveAttendance = () => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        const status = attendanceState[student.id] || "Present";
        const subData = student.attendance[selectedSubject] || {
          total: 0,
          attended: 0,
        };
        const newTotal = subData.total + 1;
        const newAttended =
          status === "Present" ? subData.attended + 1 : subData.attended;

        return {
          ...student,
          attendance: {
            ...student.attendance,
            [selectedSubject]: { total: newTotal, attended: newAttended },
          },
        };
      }),
    );
    alert(`Attendance successfully submitted for ${selectedSubject}!`);
    setAttendanceState({});
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Top Navbar / Role Switcher */}
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <span className="bg-indigo-600 text-white p-2 rounded-lg font-bold text-lg">
            Edumerge
          </span>
          <h1 className="text-xl font-bold tracking-wide">
            Smart Attendance Management System
          </h1>
        </div>
        <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-700">
          <button
            onClick={() => setRole("faculty")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${role === "faculty" ? "bg-indigo-600 text-white shadow" : "text-gray-400 hover:text-white"}`}
          >
            👨‍🏫 Faculty Portal
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${role === "admin" ? "bg-indigo-600 text-white shadow" : "text-gray-400 hover:text-white"}`}
          >
            📊 Admin Analytics
          </button>
          <button
            onClick={() => setRole("student")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${role === "student" ? "bg-indigo-600 text-white shadow" : "text-gray-400 hover:text-white"}`}
          >
            🎓 Student Portal
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        {/* ================= FACULTY VIEW ================= */}
        {role === "faculty" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-800 p-6 rounded-2xl border border-gray-700 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Daily Attendance Sheet
                </h2>
                <p className="text-gray-400 text-sm">
                  Mark and submit attendance for your assigned lectures.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <label className="text-sm font-medium text-gray-300">
                  Select Subject:
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="bg-gray-900 border border-gray-700 text-white text-sm rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {subjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-900/50 border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                    <th className="p-4">Roll No</th>
                    <th className="p-4">Student Name</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {students.map((student) => {
                    const status = attendanceState[student.id] || "Present";
                    return (
                      <tr
                        key={student.id}
                        className="hover:bg-gray-750 transition"
                      >
                        <td className="p-4 font-mono text-indigo-400">
                          {student.roll}
                        </td>
                        <td className="p-4 font-semibold text-white">
                          {student.name}
                        </td>
                        <td className="p-4 text-gray-400">
                          {student.department} (Sec {student.section})
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${status === "Present" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`}
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
              <div className="p-6 bg-gray-900/40 border-t border-gray-700 flex justify-end">
                <button
                  onClick={saveAttendance}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg transition transform active:scale-95"
                >
                  Submit Attendance 🚀
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= ADMIN VIEW ================= */}
        {role === "admin" && (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                Institution Analytics & Defaulters
              </h2>
              <p className="text-gray-400 text-sm">
                Students falling below the mandatory 75% attendance threshold
                are automatically flagged.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                <p className="text-gray-400 text-sm">Total Enrolled Students</p>
                <h3 className="text-3xl font-extrabold text-white mt-2">
                  {students.length}
                </h3>
              </div>
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                <p className="text-gray-400 text-sm">
                  Average Institution Attendance
                </p>
                <h3 className="text-3xl font-extrabold text-emerald-400 mt-2">
                  78%
                </h3>
              </div>
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                <p className="text-gray-400 text-sm">
                  Low Attendance Warning (&lt;75%)
                </p>
                <h3 className="text-3xl font-extrabold text-rose-500 mt-2">
                  {
                    students.filter((s) => {
                      const math = s.attendance["Mathematics"];
                      return getPercentage(math.attended, math.total) < 75;
                    }).length
                  }{" "}
                  Students
                </h3>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-xl p-6">
              <h3 className="text-lg font-bold mb-4 text-white">
                Low Attendance Alert List (Mathematics)
              </h3>
              <div className="space-y-3">
                {students.map((student) => {
                  const math = student.attendance["Mathematics"];
                  const pct = getPercentage(math.attended, math.total);
                  const isLow = pct < 75;
                  if (!isLow) return null;
                  return (
                    <div
                      key={student.id}
                      className="flex justify-between items-center bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl"
                    >
                      <div>
                        <span className="font-bold text-white">
                          {student.name}
                        </span>
                        <span className="text-xs text-gray-400 ml-2">
                          ({student.roll})
                        </span>
                      </div>
                      <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {pct}% (Defaulter)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= STUDENT VIEW ================= */}
        {role === "student" && (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Welcome, Aarav Sharma 👋
                </h2>
                <p className="text-gray-400 text-sm">
                  Roll No: CS001 | Department: Computer Science (Sec A)
                </p>
              </div>
              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-4 py-2 rounded-xl font-bold">
                Status: Regular
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(students[0].attendance).map(([sub, data]) => {
                const pct = getPercentage(data.attended, data.total);
                const isWarning = pct < 75;
                return (
                  <div
                    key={sub}
                    className="bg-gray-800 p-6 rounded-2xl border border-gray-700 space-y-4"
                  >
                    <h3 className="font-bold text-white text-lg">{sub}</h3>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>
                        Attended: {data.attended}/{data.total}
                      </span>
                      <span
                        className={`font-bold ${isWarning ? "text-rose-400" : "text-emerald-400"}`}
                      >
                        {pct}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isWarning ? "bg-rose-500" : "bg-emerald-500"}`}
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                    {isWarning && (
                      <p className="text-xs text-rose-400 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                        ⚠️ Warning: Attendance is below 75% threshold!
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
export default App;
