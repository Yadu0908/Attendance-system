export const subjects = [
  "Java",
  "Cloud computing",
  "Data Structures",
  "Machine learning",
];

// Helper to get today's date string in YYYY-MM-DD format
export const getTodayDate = () => {
  const d = new Date();
  return d.toISOString().split("T")[0];
};

export const initialStudents = [
  {
    id: 1,
    roll: "CS001",
    name: "Aarav Sharma",
    department: "Computer Science",
    section: "A",
    attendanceHistory: {
      "2026-09-20": { Java: "Present", "Cloud computing": "Present" },
      "2026-09-21": { Java: "Present", "Cloud computing": "Absent" },
      "2026-09-22": { Java: "Present", "Cloud computing": "Present" },
    },
  },
  {
    id: 2,
    roll: "CS002",
    name: "Priya Verma",
    department: "Computer Science",
    section: "A",
    attendanceHistory: {
      "2026-09-20": { Java: "Present", "Cloud computing": "Present" },
      "2026-09-21": { Java: "Absent", "Cloud computing": "Absent" },
      "2026-09-22": { Java: "Present", "Cloud computing": "Present" },
    },
  },
  {
    id: 3,
    roll: "CS003",
    name: "Rahul Singh",
    department: "Computer Science",
    section: "B",
    attendanceHistory: {
      "2026-09-20": { Java: "Present", "Cloud computing": "Present" },
      "2026-09-21": { Java: "Present", "Cloud computing": "Present" },
      "2026-09-22": { Java: "Present", "Cloud computing": "Present" },
    },
  },
  {
    id: 4,
    roll: "EC001",
    name: "Neha Gupta",
    department: "Electronics",
    section: "A",
    attendanceHistory: {
      "2026-09-20": { Java: "Present", "Cloud computing": "Absent" },
      "2026-09-21": { Java: "Absent", "Cloud computing": "Present" },
      "2026-09-22": { Java: "Present", "Cloud computing": "Present" },
    },
  },
  {
    id: 5,
    roll: "EC002",
    name: "Amit Kumar",
    department: "Electronics",
    section: "A",
    attendanceHistory: {
      "2026-09-20": { Java: "Absent", "Cloud computing": "Absent" },
      "2026-09-21": { Java: "Present", "Cloud computing": "Absent" },
      "2026-09-22": { Java: "Absent", "Cloud computing": "Present" },
    },
  },
  {
    id: 6,
    roll: "ME001",
    name: "Vikram Rathore",
    department: "Mechanical",
    section: "A",
    attendanceHistory: {
      "2026-09-20": { Java: "Present", "Cloud computing": "Present" },
      "2026-09-21": { Java: "Present", "Cloud computing": "Present" },
    },
  },
  {
    id: 7,
    roll: "ME002",
    name: "Sneha Reddy",
    department: "Mechanical",
    section: "B",
    attendanceHistory: {
      "2026-09-20": { Java: "Absent", "Cloud computing": "Present" },
      "2026-09-21": { Java: "Present", "Cloud computing": "Present" },
    },
  },
  {
    id: 8,
    roll: "CE001",
    name: "Rohit Sharma",
    department: "Civil",
    section: "A",
    attendanceHistory: {
      "2026-09-20": { Java: "Present", "Cloud computing": "Present" },
      "2026-09-21": { Java: "Absent", "Cloud computing": "Absent" },
    },
  },
];

const STORAGE_KEY = "edumerge_attendance_data_v4";

export function getStoredStudents() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return initialStudents;
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStudents));
  return initialStudents;
}

export function saveStoredStudents(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

// Dynamic calculator for subject attendance from date-wise history
export function calculateSubjectAttendance(student, subjectName) {
  let total = 0;
  let attended = 0;
  const history = student.attendanceHistory || {};

  Object.values(history).forEach((dayRecord) => {
    if (dayRecord && dayRecord[subjectName]) {
      total += 1;
      if (dayRecord[subjectName] === "Present") {
        attended += 1;
      }
    }
  });
  return { total, attended };
}
