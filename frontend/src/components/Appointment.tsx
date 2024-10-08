import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencil,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Appointment = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      navigate("/login");
    }

    fetch("http://localhost:8081/appointment")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));

    const storedDoctorName = localStorage.getItem("doctorName"); // Unique key for doctor's name
    if (storedDoctorName) {
      setName(storedDoctorName);
    }
  }, [navigate]);

  const handleUpdateStatus = (appointment_id: any, status: any) => {
    const appointmentIdString = String(appointment_id);

    axios
      .put(`http://localhost:8081/appointment/${appointmentIdString}`, { status })
      .then((response) => {
        console.log("Response:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating appointment status: ", error.message);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/home");
  };

  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark" className="p-3">
        <div className="container-fluid">
          <Navbar.Brand href="#">Welcome, {name}!</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNavDropdown" />
          <Navbar.Collapse id="navbarNavDropdown">
            <Nav className="ms-auto">
              <NavLink
                to="/doctor_dashboard"
                className={`nav-link mx-2 ${
                  location.pathname === "/doctor_dashboard" && "active"
                }`}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/appointment"
                className={`nav-link mx-2 ${
                  location.pathname === "/appointment" && "active"
                }`}
              >
                Appointment
              </NavLink>
              <NavLink
                to="/history"
                className={`nav-link mx-2 ${
                  location.pathname === "/history" && "active"
                }`}
              >
                History
              </NavLink>
              <NavLink
                to="/doctor_profile"
                className={`nav-link mx-2 ${
                  location.pathname === "/doctor_profile" && "active"
                }`}
              >
                My Profile
              </NavLink>
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <br />

            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Civil Status</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Specialist</th>
                  <th>Comment</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((userData, key) => (
                  <tr key={key}>
                    <td>{userData["appointment_id"]}</td>
                    <td>{userData["name"]}</td>
                    <td>{userData["age"]}</td>
                    <td>{userData["gender"]}</td>
                    <td>{userData["civilstatus"]}</td>
                    <td>{userData["address"]}</td>
                    <td>{userData["contact"]}</td>
                    <td>{userData["email"]}</td>
                    <td>{userData["specialist"]}</td>
                    <td>{userData["comment"]}</td>
                    <td>{userData["date"]}</td>
                    <td>
                      {userData["time"]
                        ? new Date(
                            `2000-01-01T${userData["time"]}`
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : ""}
                    </td>
                    <td
                      style={{
                        backgroundColor:
                          userData["status"] === "Approved"
                            ? "#7FFF7F" // Light green background color
                            : userData["status"] === "Rejected"
                            ? "#FF7F7F" // Light red background color
                            : userData["status"] === "Done"
                            ? "#87CEFA" // Light blue background color
                            : "inherit", // Use the default background color
                      }}
                    >
                      {userData["status"]}
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn"
                        onClick={() =>
                          handleUpdateStatus(userData["appointment_id"], "Rejected")
                        }
                      >
                        Reject
                      </button>
                      <button
                        className="btn btn-outline-warning btn"
                        onClick={() =>
                          handleUpdateStatus(userData["appointment_id"], "Approved")
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-outline-primary btn"
                        onClick={() =>
                          handleUpdateStatus(userData["appointment_id"], "Done")
                        }
                      >
                        Done
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
