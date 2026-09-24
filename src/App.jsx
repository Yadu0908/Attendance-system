import { useState, useEffect } from "react";
import {
  getStoredStudents,
  saveStoredStudents,
  subjects,
  getTodayDate,
} from "./data/mockData";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import FacultyView from "./components/FacultyView";
import AdminDashboard from "./components/AdminDashboard";
import StudentView from "./components/StudentView";

function MainApp() {
  const [role, setRole] = useState("faculty");
  const [students, setStudents] = useState(getStoredStudents);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [attendanceState, setAttendanceState] = useState({});
  const { darkMode } = useTheme();

  useEffect(() => {
    saveStoredStudents(students);
  }, [students]);

  const handleToggle = (studentId) => {
    setAttendanceState((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === "Absent" ? "Present" : "Absent",
    }));
  };

  const saveAttendance = () => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        const status = attendanceState[student.id] || "Present";
        const existingHistory = student.attendanceHistory || {};
        const dayRecord = existingHistory[selectedDate] || {};

        return {
          ...student,
          attendanceHistory: {
            ...existingHistory,
            [selectedDate]: {
              ...dayRecord,
              [selectedSubject]: status,
            },
          },
        };
      }),
    );
    alert(
      `Attendance for ${selectedSubject} on ${selectedDate} successfully saved to cache!`,
    );
    setAttendanceState({});
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} font-sans transition-colors duration-300`}
    >
      <Navbar role={role} setRole={setRole} />

      <main className="max-w-7xl mx-auto p-6">
        {role === "faculty" && (
          <FacultyView
            students={students}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            attendanceState={attendanceState}
            handleToggle={handleToggle}
            saveAttendance={saveAttendance}
          />
        )}

        {role === "admin" && <AdminDashboard students={students} />}

        {role === "student" && <StudentView students={students} />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
