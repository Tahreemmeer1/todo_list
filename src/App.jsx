
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import StudentForm from "./components/studentForm";
import StudentTable from "./components/studentTable";

function TodoPage() {

  // Local Storage se students ka data lena
  const [students, setStudents] = useState(() => {
    try {
      const savedStudents = localStorage.getItem("students");
      return savedStudents ? JSON.parse(savedStudents) : [];
    } catch {
      return [];
    }
  });

  // Form ki values
  const [formData, setFormData] = useState({
    rollNumber: "",
    name: "",
    age: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  // Students ka data Local Storage mein save karna
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Input fields ki values update karna
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Student add ya update karna
  const handleSubmit = (e) => {
    e.preventDefault();

    const rollNumber = formData.rollNumber.trim();
    const name = formData.name.trim();
    const age = Number(formData.age);

    if (!rollNumber || !name || !formData.age) {
      alert("Please fill all fields!");
      return;
    }

    if (!Number.isInteger(age) || age < 1 || age > 120) {
      alert("Please enter a valid age!");
      return;
    }

    // Duplicate roll number check
    const duplicate = students.some(
      (student) =>
        student.rollNumber.toLowerCase() === rollNumber.toLowerCase() &&
        student.id !== editingId
    );

    if (duplicate) {
      alert("This roll number already exists!");
      return;
    }

    if (editingId !== null) {

      // Existing student update
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === editingId
            ? { ...student, rollNumber, name, age }
            : student
        )
      );

      alert("Student updated successfully!");

    } else {

      // New student add
      const newStudent = {
        id: Date.now(),
        rollNumber,
        name,
        age,
      };

      setStudents((prevStudents) => [
        ...prevStudents,
        newStudent,
      ]);

      alert("Student added successfully!");
    }

    // Form reset
    setFormData({
      rollNumber: "",
      name: "",
      age: "",
    });

    setEditingId(null);
  };

  // Edit button ka function
  const handleEdit = (student) => {
    setFormData({
      rollNumber: student.rollNumber,
      name: student.name,
      age: String(student.age),
    });

    setEditingId(student.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete button ka function
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );

      if (editingId === id) {
        setEditingId(null);

        setFormData({
          rollNumber: "",
          name: "",
          age: "",
        });
      }

      alert("Student deleted successfully!");
    }
  };

  // Search functionality
  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(searchText) ||
      student.rollNumber.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="app-container">

      <StudentForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editingId={editingId}
      />

      <StudentTable
        students={filteredStudents}
        search={search}
        setSearch={setSearch}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <footer>
        Student Management System | React + Local Storage
      </footer>

    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/todo" element={<TodoPage />} />

      <Route
        path="*"
        element={<Navigate to="/todo" replace />}
      />
    </Routes>
  );
}

export default App;
