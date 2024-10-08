import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Form, Button, Nav, Navbar } from "react-bootstrap";
import Swal from "sweetalert2";

const EditPatient = () => {
  const { patient_id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8081/patient_list/${patient_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data === "object" && data !== null) {
          setPatient(data);
        } else {
          console.error("Invalid data format:", data);
          setError("An error occurred. Please try again later.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred. Please try again later.");
      });
  }, [patient_id]);

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
      name: Yup.string().required("Name is required."),
      age: Yup.string().required("Age is required."),
      gender: Yup.string().required("Gender is required."),
      civilstatus: Yup.string().required("Civil Status is required."),
      address: Yup.string().required("Address is required."),
      contact: Yup.string().required("Contact is required."),
      email: Yup.string()
        .email("Invalid Email.")
        .required("Email is required."),
      password: Yup.string().min(6, "Password must be at least 6 characters."),
    }),
    onSubmit: (values) => {
      handleUpdateItem(values);
    },
  });

  const handleUpdateItem = (values: any) => {
    axios
      .put(`http://localhost:8081/patient_list/${patient_id}`, values)
      .then((response) => {
        console.log("response: " + response.data);
        showSuccessAlert(); // Call the success alert
        navigate("/patient_profile");
      })
      .catch((error) => {
        console.error("Error updating patient: ", error);
        setError("An error occurred. Please try again later.");
      });
  };

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Patient Updated",
      text: "Patient information has been updated successfully!",
    });
  };

  // Render loading state or return null if patient data is still being fetched
  if (patient === null) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    navigate("/patient_profile");
  };

  const handleDeleteAccount = async () => {
    console.log("Delete button clicked");

    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      console.log("User's choice:", result);

      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:8081/patient_list/${patient_id}`
          );
          console.log("Delete response:", response);

          if (response.status === 200) {
            // Successfully deleted
            Swal.fire({
              title: "Deleted!",
              text: "The patient account has been deleted.",
              icon: "success",
            }).then(() => {
              console.log("Navigating to /home");
              navigate("/home");
            });
          } else {
            setError("An error occurred. Please try again later.");
          }
        } catch (error) {
          console.error("Error during delete:", error);
          setError("An error occurred. Please try again later.");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "The account is safe :)", "error");
      }
    });
  };

  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark" className="p-3">
        <div className="container-fluid">
          <Navbar.Brand href="#">Flyndr Hospital</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNavDropdown" />
          <Navbar.Collapse id="navbarNavDropdown">
            <Nav className="ms-auto">
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleBack}>
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
        <h2>Edit Patient</h2>
        <Form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter Name"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-danger">{formik.errors.name}</div>
            )}
          </Form.Group>

          {/* Age */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter Age"
              {...formik.getFieldProps("age")}
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

          {/* Civil Status */}
          <Form.Group className="mb-3">
            <Form.Select {...formik.getFieldProps("civilstatus")}>
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

          {/* Address */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter Address"
              {...formik.getFieldProps("address")}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-danger">{formik.errors.address}</div>
            )}
          </Form.Group>

          {/* Contact */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter Contact"
              {...formik.getFieldProps("contact")}
            />
            {formik.touched.contact && formik.errors.contact && (
              <div className="text-danger">{formik.errors.contact}</div>
            )}
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter Email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Enter New Password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-danger">{formik.errors.password}</div>
            )}
          </Form.Group>

          <Button variant="success" type="submit">
            Update
          </Button>
          <p></p>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </Form>
        {error && <div className="text-danger">{error}</div>}
      </div>
    </div>
  );
};

export default EditPatient;
