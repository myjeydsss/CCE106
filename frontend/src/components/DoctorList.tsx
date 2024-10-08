import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencil,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, Table, Modal, Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const DoctorList = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      navigate("/admin");
    }

    fetch("http://localhost:8081/doctor_list")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));

    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, [navigate]);

  const handleDeleteItem = (doctor_id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this doctor!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:8081/doctor_list/${doctor_id}`
          );
          if (response.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "The doctor has been deleted.",
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
        Swal.fire("Cancelled", "The doctor is safe :)", "error");
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/home");
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
      password: "",
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
      password: Yup.string()
        .min(6, "Password must be at least 6 characters.")
        .required("Password is required."),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:8081/add_doctor",
          values
        );

        if (response.data.success) {
          console.log("Adding Doctor successful!");

          // Display SweetAlert for success
          await Swal.fire({
            title: "Success!",
            text: "Doctor has been added successfully.",
            icon: "success",
          });

          resetForm();
          handleCloseModal();
          window.location.reload();
        } else {
          console.error(
            response.data.error || "An error occurred. Please try again later."
          );
        }
      } catch (error) {
        console.error("Error during adding doctor:", error);
        // Handle error appropriately
      } finally {
        setSubmitting(false);
      }
    },
  });
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
            <Button className="btn btn-dark btn mb-3" onClick={handleShowModal}>
              Add Doctor &nbsp;
              <FontAwesomeIcon icon={faPlusCircle} />
            </Button>

            <Table striped bordered hover>
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
                  <th>Specialize</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((doctorData, key) => (
                  <tr key={key}>
                    <td>{doctorData["doctor_id"]}</td>
                    <td>{doctorData["name"]}</td>
                    <td>{doctorData["age"]}</td>
                    <td>{doctorData["gender"]}</td>
                    <td>{doctorData["civilstatus"]}</td>
                    <td>{doctorData["address"]}</td>
                    <td>{doctorData["contact"]}</td>
                    <td>{doctorData["email"]}</td>
                    <td>{doctorData["specialist"]}</td>
                    <td>{doctorData["password"]}</td>
                    <td>
                      <button
                        className="btn btn-black btn"
                        onClick={() =>
                          handleDeleteItem(doctorData["doctor_id"])
                        }
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        &nbsp;
                      </button>
                      &nbsp;
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Add Doctor Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Doctor Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            {/* Add form fields for adding a doctor */}
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger">{formik.errors.name}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAge">
              <Form.Control
                type="text"
                placeholder="Enter Age"
                name="age"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
              />
              {formik.touched.age && formik.errors.age && (
                <div className="text-danger">{formik.errors.age}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGender">
              <Form.Select
                className="form-control-login"
                {...formik.getFieldProps("gender")}
                aria-label="Select Gender"
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
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCivilStatus">
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
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Control
                type="text"
                placeholder="Enter Address"
                name="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-danger">{formik.errors.address}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContact">
              <Form.Control
                type="text"
                placeholder="Enter Contact"
                name="contact"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contact}
              />
              {formik.touched.contact && formik.errors.contact && (
                <div className="text-danger">{formik.errors.contact}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSpecialist">
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
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              disabled={formik.isSubmitting}
            >
              SUBMIT
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorList;
