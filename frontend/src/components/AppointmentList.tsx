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
import Swal from "sweetalert2";

const AppointmentList = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      navigate("/login");
    }

    fetch("http://localhost:8081/appointment_list")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));

    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, [navigate]);

  const handleDeleteItem = (appointment_id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this appointment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:8081/bookings/${appointment_id}`
          );
          if (response.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Your appointment has been deleted.",
              icon: "success",
            }).then(() => {
              window.location.reload();
            });
          } else {
            setError("An error occurred. Please try again later.");
          }
        } catch (error) {
          console.error("Error during delete:", error);
          setError("An error occurred. Please try again later.");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your appointment is safe :)", "error");
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
                to="/patient_list"
                className={`nav-link mx-2 ${
                  location.pathname === "/patient_list" && "active"
                }`}
              >
                Patient
              </NavLink>
              <NavLink
                to="/doctor_list"
                className={`nav-link mx-2 ${
                  location.pathname === "/doctor_list" && "active"
                }`}
              >
                Doctor
              </NavLink>
              <NavLink
                to="/appointment_list"
                className={`nav-link mx-2 ${
                  location.pathname === "/appointment_list" && "active"
                }`}
              >
                Appointment
              </NavLink>
              <NavLink
                to="/archive"
                className={`nav-link mx-2 ${
                  location.pathname === "/archive" && "active"
                }`}
              >
                Archive
              </NavLink>
              <li className="nav-item">
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
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
                            ? "#7FFF7F"
                            : userData["status"] === "Rejected"
                            ? "#FF7F7F"
                            : "inherit",
                      }}
                    >
                      {userData["status"]}
                    </td>
                    <td>
                      <button
                        className="btn btn-black btn"
                        style={{ backgroundColor: "white", color: "black" }}
                        onClick={() =>
                          handleDeleteItem(userData["appointment_id"])
                        }
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        &nbsp;
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

export default AppointmentList;
