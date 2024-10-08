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

const PatientList = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      navigate("/admin");
    }

    fetch("http://localhost:8081/patient_list")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));

    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, [navigate]);

  const handleDeleteItem = (patient_id: string) => {
    axios
      .delete(`http://localhost:8081/patient_list/${patient_id}`)
      .then((response) => {
        console.log("response: " + response.data);
        window.location.reload();
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
                Patients
              </NavLink>
              <NavLink
                to="/doctor_list"
                className={`nav-link mx-2 ${
                  location.pathname === "/doctor_list" && "active"
                }`}
              >
                Doctors
              </NavLink>
              <NavLink
                to="/appointment_list"
                className={`nav-link mx-2 ${
                  location.pathname === "/appointment_list" && "active"
                }`}
              >
                Appointments
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
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {data.map((patientData, key) => (
                  <tr key={key}>
                    <td>{patientData["patient_id"]}</td>
                    <td>{patientData["name"]}</td>
                    <td>{patientData["age"]}</td>
                    <td>{patientData["gender"]}</td>
                    <td>{patientData["civilstatus"]}</td>
                    <td>{patientData["address"]}</td>
                    <td>{patientData["contact"]}</td>
                    <td>{patientData["email"]}</td>
                    <td>{patientData["password"]}</td>
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

export default PatientList;
