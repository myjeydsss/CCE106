import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Form, Button, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const EditAppointment = () => {
  const { appointment_id } = useParams();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8081/bookings/${appointment_id}`)
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
      })
      .catch((err) => console.log(err));
  }, [appointment_id]);

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
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required."),
      age: Yup.string().required("Age is required."),
      gender: Yup.string().required("Gender is required."),
      civilstatus: Yup.string().required("Civil Status is required."),
      address: Yup.string().required("Address is required."),
      contact: Yup.string().required("Contact is required."),
      email: Yup.string()
        .email("Invalid Email.")
        .required("Email is required."),
      specialist: Yup.string().required("Specialist is required."),
      comment: Yup.string().required("Comment is required."),
      date: Yup.string().required("Date is required."),
      time: Yup.string().required("Date is required."),
    }),
    onSubmit: (values) => {
      handleUpdateItem(values);
    },
  });

  const handleUpdateItem = (values: {
    name: string;
    age: string;
    gender: string;
    civilstatus: string;
    address: string;
    contact: string;
    email: string;
    specialist: string;
    comment: string;
    date: string;
    time: string;
  }) => {
    axios
      .put(`http://localhost:8081/bookings/${appointment_id}`, values)
      .then((response) => {
        console.log("response: " + response.data);
        Swal.fire({
          icon: "success",
          title: "Appointment Updated",
          text: "The appointment has been updated successfully!",
        }).then(() => {
          navigate("/bookings");
        });
      })
      .catch((error) => {
        console.error("Error updating appointment: ", error);
        setError("An error occurred. Please try again later.");
      });
  };
  const handleBack = () => {
    navigate("/bookings");
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
    <>
      <div>
        <Navbar bg="dark" expand="lg" variant="dark" className="p-3">
          <div className="container-fluid">
            <Navbar.Brand href="#">Flyndr Hospital</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNavDropdown" />
            <Navbar.Collapse id="navbarNavDropdown">
              <Nav className="ms-auto">
                <NavLink
                  to="/edit_bookings"
                  className={`nav-link mx-2 ${
                    location.pathname === "/edit_bookings" && "active"
                  }`}
                >
                  Edit Booking
                </NavLink>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-light"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                </li>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
        <div
          style={{
            paddingLeft: "300px",
            paddingRight: "300px",
            paddingTop: "30px",
          }}
        >
          {appointments.map((appointment, key) => (
            <div className="container m-3" key={key}>
              <h2>Edit Doctor</h2>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    defaultValue={appointment["name"]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-danger">{formik.errors.name}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Age"
                    defaultValue={appointment["age"]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="age"
                  />
                  {formik.touched.age && formik.errors.age && (
                    <div className="text-danger">{formik.errors.age}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Select {...formik.getFieldProps("gender")}>
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

                <Form.Group className="mb-3">
                  <Form.Select {...formik.getFieldProps("civilstatus")}>
                    <option value="" label="Select Civil Status" />

                    <option value="Married" label="Married" />
                    <option value="Single" label="Single" />
                    <option value="Divorced" label="Divorced" />
                    <option value="Widowed" label="Widowed" />
                  </Form.Select>
                  {formik.touched.civilstatus && formik.errors.civilstatus && (
                    <div className="text-danger">
                      {formik.errors.civilstatus}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    defaultValue={appointment["address"]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="address"
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div className="text-danger">{formik.errors.address}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Contact"
                    defaultValue={appointment["contact"]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="contact"
                  />
                  {formik.touched.contact && formik.errors.contact && (
                    <div className="text-danger">{formik.errors.contact}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    defaultValue={appointment["email"]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger">{formik.errors.email}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    as="select"
                    value={formik.values.specialist}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="specialist"
                  >
                    <option value="" label="Select Specialist" />
                    <option value="" label="Select Specialist" />
                    <option value="Cardiologist" label="Cardiologist" />
                    <option value="Dermatologist" label="Dermatologist" />
                    <option
                      value="Orthopedic Surgeon"
                      label="Orthopedic Surgeon"
                    />
                    <option value="Regular Check-up" label="Regular Check-up" />
                    <option value="Ophthalmologist" label="Ophthalmologist" />
                    <option
                      value="Gastroenterologist"
                      label="Gastroenterologist"
                    />
                    <option value="Neurologist" label="Neurologist" />
                  </Form.Control>
                  {formik.touched.specialist && formik.errors.specialist && (
                    <div className="text-danger">
                      {formik.errors.specialist}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Comment"
                    defaultValue={appointment["comment"]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="comment"
                  />
                  {formik.touched.comment && formik.errors.comment && (
                    <div className="text-danger">{formik.errors.comment}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="date"
                    placeholder="Date"
                    defaultValue={appointment["date"]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="date"
                  />
                  {formik.touched.date && formik.errors.date && (
                    <div className="text-danger">{formik.errors.date}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    as="select"
                    value={formik.values.time}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="time"
                  >
                    <option value="" label="Select Time" />
                    {generateTimeOptions()}
                  </Form.Control>
                  {formik.touched.time && formik.errors.time && (
                    <div className="text-danger">{formik.errors.time}</div>
                  )}
                </Form.Group>

                <br />
                <Button variant="success" type="submit">
                  Update
                </Button>
              </Form>
              {error && <div className="text-danger">{error}</div>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EditAppointment;
