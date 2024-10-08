// AddDoctor.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Button, Modal, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddDoctor = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

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
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8081/add_doctor",
          values
        );

        if (response.data.success) {
          console.log("Adding Doctor successful!");
          formik.resetForm();
          handleCloseModal();
          // Optionally, you can reload data or perform other actions after adding a doctor
        } else {
          setError(
            response.data.error || "An error occurred. Please try again later."
          );
        }
      } catch (error) {
        console.error("Error during adding doctor:", error);
        setError("An error occurred. Please try again later.");
      }
    },
  });

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" className="p-3">
        <div className="container-fluid">
          <Navbar.Brand href="#">Flyndr Hospital</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNavDropdown" />
          <Navbar.Collapse id="navbarNavDropdown"></Navbar.Collapse>
        </div>
      </Navbar>
      <div className="container">
        <h2>Add Doctor</h2>
        <Button className="btn btn-primary mb-3" onClick={handleShowModal}>
          Add Doctor
        </Button>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Doctor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={formik.handleSubmit}>
              <label className="form-label">Enter Name:</label>
              <input
                className="form-control"
                type="text"
                placeholder="Name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger">{formik.errors.name}</div>
              )}

              <label className="form-label">Enter Age:</label>
              <input
                className="form-control"
                type="text"
                placeholder="Age"
                {...formik.getFieldProps("age")}
              />
              {formik.touched.age && formik.errors.age && (
                <div className="text-danger">{formik.errors.age}</div>
              )}

              <label className="form-label">Enter Gender:</label>
              <input
                className="form-control"
                type="text"
                placeholder="Gender"
                {...formik.getFieldProps("gender")}
              />
              {formik.touched.gender && formik.errors.gender && (
                <div className="text-danger">{formik.errors.gender}</div>
              )}

              <label className="form-label">Enter Civil Status:</label>
              <input
                className="form-control"
                type="text"
                placeholder="Civil Status"
                {...formik.getFieldProps("civilstatus")}
              />
              {formik.touched.civilstatus && formik.errors.civilstatus && (
                <div className="text-danger">{formik.errors.civilstatus}</div>
              )}

              <label className="form-label">Enter Address:</label>
              <input
                className="form-control"
                type="text"
                placeholder="Address"
                {...formik.getFieldProps("address")}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-danger">{formik.errors.address}</div>
              )}

              <label className="form-label">Enter Contact:</label>
              <input
                className="form-control"
                type="text"
                placeholder="Contact"
                {...formik.getFieldProps("contact")}
              />
              {formik.touched.contact && formik.errors.contact && (
                <div className="text-danger">{formik.errors.contact}</div>
              )}

              <label className="form-label">Enter Email:</label>
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}

              <label className="form-label">Enter Specialist:</label>
              <input
                className="form-control"
                type="tet"
                placeholder="Specialist"
                {...formik.getFieldProps("specialist")}
              />
              {formik.touched.specialist && formik.errors.specialist && (
                <div className="text-danger">{formik.errors.specialist}</div>
              )}

              <label className="form-label">Enter Password:</label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}

              <br />
              <Button variant="primary" type="submit">
                Add Doctor
              </Button>
            </Form>
            {error && <div className="text-danger">{error}</div>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ... (unchanged) */}
      </div>
    </>
  );
};

export default AddDoctor;
