import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState("");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔥 IF NO TOKEN → REDIRECT
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    API.get("/dashboard", {
      headers: { Authorization: token }
    })
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Unauthorized");
        navigate("/login");
      });
  }, []);

  // 🔥 LOADING STATE (PREVENT CRASH)
  if (!student) {
    return <h2>Loading...</h2>;
  }

  const updateCourse = async () => {
    try {
      await API.put(
        "/update-course",
        { course },
        { headers: { Authorization: token } }
      );
      alert("Course updated");
    } catch (err) {
      alert("Error updating course");
    }
  };

  const updatePassword = async () => {
    try {
      await API.put(
        "/update-password",
        passwords,
        { headers: { Authorization: token } }
      );
      alert("Password updated");
    } catch (err) {
      alert("Error updating password");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <p>Name: {student?.name}</p>
      <p>Email: {student?.email}</p>
      <p>Course: {student?.course}</p>

      <h3>Update Course</h3>
      <input onChange={(e) => setCourse(e.target.value)} />
      <button onClick={updateCourse}>Update</button>

      <h3>Update Password</h3>
      <input
        placeholder="Old Password"
        onChange={(e) =>
          setPasswords({ ...passwords, oldPassword: e.target.value })
        }
      />
      <input
        placeholder="New Password"
        onChange={(e) =>
          setPasswords({ ...passwords, newPassword: e.target.value })
        }
      />
      <button onClick={updatePassword}>Update</button>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;