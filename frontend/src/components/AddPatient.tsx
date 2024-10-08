import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Navbar } from "react-bootstrap";

const AddPatient = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      gender: "",
      civilstatus: "",
      address: "",
      contact: "",
      email: "",
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
      password: Yup.string()
        .min(6, "Password must be at least 6 characters.")
        .required("Password is required."),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8081/add_patient",
          values
        );

        if (response.data.success) {
          console.log("Adding Patient successful!");
          formik.resetForm();
          navigate("/patient_list");
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
        <h2>Register</h2>
        <form onSubmit={formik.handleSubmit}>
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
          <button className="btn btn-primary" type="submit">
            Add Patient
          </button>
          <p>
            <Link to="/patient_list">Get Back</Link>.
          </p>

          {error && <div className="text-danger">{error}</div>}
        </form>
      </div>
    </>
  );
};

export default AddPatient;
