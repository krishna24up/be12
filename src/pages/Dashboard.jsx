import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [student, setStudent] = useState({});
  const [course, setCourse] = useState("");
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: token
    }
  };

  useEffect(() => {
    API.get("/dashboard", config)
      .then(res => setStudent(res.data))
      .catch(() => {
        alert("Unauthorized");
        navigate("/login");
      });
  }, []);

  const updateCourse = async () => {
    await API.put("/update-course", { course }, config);
    alert("Course updated");
  };

  const updatePassword = async () => {
    await API.put("/update-password", passwords, config);
    alert("Password updated");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <p>Name: {student.name}</p>
      <p>Email: {student.email}</p>
      <p>Course: {student.course}</p>

      <h3>Update Course</h3>
      <input onChange={e => setCourse(e.target.value)} />
      <button onClick={updateCourse}>Update</button>

      <h3>Update Password</h3>
      <input placeholder="Old Password" onChange={e => setPasswords({...passwords, oldPassword: e.target.value})} />
      <input placeholder="New Password" onChange={e => setPasswords({...passwords, newPassword: e.target.value})} />
      <button onClick={updatePassword}>Update</button>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;