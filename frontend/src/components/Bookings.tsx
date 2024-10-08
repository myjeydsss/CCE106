import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencil,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const Bookings = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      navigate("/login");
    }

    fetch("http://localhost:8081/bookings")
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

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      gender: "",
      civilstatus: "",
      address: "",
      contact: "",
      email: "",
      specialist: "",
      comment: "",
      date: "",
      time: "",
      status: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters.")
        .required("Name is required."),
      age: Yup.string().required("Age is required."),
      gender: Yup.string().required("Gender is required."),
      civilstatus: Yup.string().required("Civil Status is required."),
      address: Yup.string().required("Address is required."),
      contact: Yup.string()
        .min(11, "Phone must be at least 11 characters.")
        .required("Phone is required."),
      email: Yup.string()
        .email("Invalid Email.")
        .required("Email is required."),
      specialist: Yup.string().required("Specialist is required."),
      comment: Yup.string().required("Comment is required."),
      date: Yup.string().required("Date is required."),
      time: Yup.string().required("Time is required."),
    }),

    onSubmit: async (values) => {
      try {
        values.status = "Pending";
        const response = await axios.post(
          "http://localhost:8081/add_appointment",
          values
        );

        if (response.data.success) {
          console.log("Adding Appointment successful!");
          formik.resetForm();
          setShowModal(false);

          // Fetch updated data after successful addition
          const fetchData = async () => {
            try {
              const res = await fetch("http://localhost:8081/bookings");
              const newData = await res.json();
              setData(newData);
            } catch (fetchError) {
              console.error("Error during data fetch:", fetchError);
            }
          };

          // Fetch updated data and handle success
          fetchData().then(() => {
            // SweetAlert for success
            Swal.fire({
              title: "Success!",
              text: "Your appointment has been added successfully.",
              icon: "success",
            });
          });
        } else {
          setError(
            response.data.error || "An error occurred. Please try again later."
          );
        }
      } catch (error) {
        console.error("Error during adding patient:", error);
        setError("An error occurred. Please try again later.");
      }
    },
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    formik.resetForm();
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 8; hour <= 17; hour++) {
      const formattedHour = hour.toString().padStart(2, "0");
      options.push(
        <option key={`${formattedHour}:00`} value={`${formattedHour}:00`}>
          {`${formattedHour}:00`}
        </option>
      );
    }
    return options;
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
                to="/patient_dashboard"
                className={`nav-link mx-2 ${
                  location.pathname === "/patient_dashboard" && "active"
                }`}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/bookings"
                className={`nav-link mx-2 ${
                  location.pathname === "/bookings" && "active"
                }`}
              >
                My Bookings
              </NavLink>
              <NavLink
                to="/patient_profile"
                className={`nav-link mx-2 ${
                  location.pathname === "/patient_profile" && "active"
                }`}
              >
                My Profile
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
            <Button
              className="btn btn-success btn mb-3"
              onClick={handleShowModal}
            >
              Book Here! &nbsp;
              <FontAwesomeIcon icon={faPlusCircle} />
            </Button>

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
                      &nbsp;
                      <Link
                        className="btn btn-black btn"
                        to={`/edit_bookings/${userData["appointment_id"]}`}
                      >
                        <FontAwesomeIcon icon={faPencil} />
                        &nbsp;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Appointment Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <input
                className="form-control-login"
                type="text"
                placeholder="Name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger">{formik.errors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <input
                className="form-control-login"
                type="text"
                placeholder="Age"
                {...formik.getFieldProps("age")}
              />
              {formik.touched.age && formik.errors.age && (
                <div className="text-danger">{formik.errors.age}</div>
              )}
            </div>

            <div className="mb-3">
              <Form.Select
                className="form-control-login"
                {...formik.getFieldProps("gender")}
              >
                <option value="" label="Select Gender" />
                <option value="Male" label="Male" />
                <option value="Female" label="Female" />
                <option value="NonBinary" label="Non-Binary" />
                <option value="Others" label="Others" />
              </Form.Select>
              {formik.touched.gender && formik.errors.gender && (
                <div className="text-danger">{formik.errors.gender}</div>
              )}
            </div>

            <div className="mb-3">
              <Form.Select
                className="form-control-login"
                {...formik.getFieldProps("civilstatus")}
                aria-label="Select Civil Status"
              >
                <option value="" label="Select Civil Status" />
                <option value="Married" label="Married" />
                <option value="Single" label="Single" />
                <option value="Divorced" label="Divorced" />
                <option value="Widowed" label="Widowed" />
              </Form.Select>
              {formik.touched.civilstatus && formik.errors.civilstatus && (
                <div className="text-danger">{formik.errors.civilstatus}</div>
              )}
            </div>

            <div className="mb-3">
              <input
                className="form-control-login"
                type="text"
                placeholder="Address"
                {...formik.getFieldProps("address")}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-danger">{formik.errors.address}</div>
              )}
            </div>

            <div className="mb-3">
              <input
                className="form-control-login"
                type="text"
                placeholder="Contact"
                {...formik.getFieldProps("contact")}
              />
              {formik.touched.contact && formik.errors.contact && (
                <div className="text-danger">{formik.errors.contact}</div>
              )}
            </div>

            <div className="mb-3">
              <input
                className="form-control-login"
                type="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <Form.Select
                className="form-control-login"
                {...formik.getFieldProps("specialist")}
                aria-label="Select Specialist"
              >
                <option value="" label="Select Specialist" />
                <option value="Cardiologist" label="Cardiologist" />
                <option value="Dermatologist" label="Dermatologist" />
                <option value="Orthopedic Surgeon" label="Orthopedic Surgeon" />
                <option value="Regular Check-up" label="Regular Check-up" />
                <option value="Ophthalmologist" label="Ophthalmologist" />
                <option value="Gastroenterologist" label="Gastroenterologist" />
                <option value="Neurologist" label="Neurologist" />
              </Form.Select>
              {formik.touched.specialist && formik.errors.specialist && (
                <div className="text-danger">{formik.errors.specialist}</div>
              )}
            </div>

            <div className="mb-3">
              <input
                className="form-control-login"
                type="text"
                placeholder="Comment"
                {...formik.getFieldProps("comment")}
              />
              {formik.touched.comment && formik.errors.comment && (
                <div className="text-danger">{formik.errors.comment}</div>
              )}
            </div>

            <div className="mb-3">
              <input
                className="form-control-login"
                type="date"
                placeholder="Date"
                {...formik.getFieldProps("date")}
              />
              {formik.touched.date && formik.errors.date && (
                <div className="text-danger">{formik.errors.date}</div>
              )}
            </div>

            <div className="mb-3">
              <Form.Select
                className="form-control-login"
                {...formik.getFieldProps("time")}
                aria-label="Select Time"
              >
                <option value="" label="Select Time" />
                {generateTimeOptions()}
              </Form.Select>
              {formik.touched.time && formik.errors.time && (
                <div className="text-danger">{formik.errors.time}</div>
              )}
            </div>

            <Button variant="success" type="submit">
              Submit Appointment
            </Button>
          </Form>

          {error && <div className="text-danger">{error}</div>}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Bookings;
