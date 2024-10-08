import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Form, Button, Navbar, Nav } from "react-bootstrap";

const EditDoctor = () => {
  const { doctor_id } = useParams();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8081/doctor_list/${doctor_id}`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      })
      .catch((err) => console.log(err));
  }, [doctor_id]);

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
      password: Yup.string().min(6, "Password must be at least 6 characters."),
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
    password: string;
  }) => {
    axios
      .put(`http://localhost:8081/doctor_list/${doctor_id}`, values)
      .then((response) => {
        console.log("response: " + response.data);
        navigate("/doctor_list");
      })
      .catch((error) => {
        console.error("Error updating doctor: ", error);
        setError("An error occurred. Please try again later.");
      });
  };

  const handleBack = () => {
    navigate("/doctor_profile");
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
          {doctors.map((doctor, key) => (
            <div className="container m-3" key={key}>
              <h2>Edit Doctor</h2>
              <Form onSubmit={formik.handleSubmit}>
                {/* Name */}
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    {...formik.getFieldProps("name")}
                    value={formik.values.name}
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
                    value={formik.values.age}
                  />
                  {formik.touched.age && formik.errors.age && (
                    <div className="text-danger">{formik.errors.age}</div>
                  )}
                </Form.Group>

                {/* Gender */}
                <Form.Group className="mb-3">
                  <Form.Control
                    as="select"
                    {...formik.getFieldProps("gender")}
                    value={formik.values.gender}
                  >
                    <option value="" label="Select Gender" />
                    <option value="Male" label="Male" />
                    <option value="Female" label="Female" />
                    <option value="NonBinary" label="Non-Binary" />
                    <option value="Others" label="Others" />
                  </Form.Control>
                  {formik.touched.gender && formik.errors.gender && (
                    <div className="text-danger">{formik.errors.gender}</div>
                  )}
                </Form.Group>

                {/* Civil Status */}
                <Form.Group className="mb-3">
                  <Form.Control
                    as="select"
                    {...formik.getFieldProps("civilstatus")}
                    value={formik.values.civilstatus}
                  >
                    <option value="" label="Select Civil Status" />
                    <option value="Married" label="Married" />
                    <option value="Single" label="Single" />
                    <option value="Divorced" label="Divorced" />
                    <option value="Widowed" label="Widowed" />
                  </Form.Control>
                  {formik.touched.civilstatus && formik.errors.civilstatus && (
                    <div className="text-danger">
                      {formik.errors.civilstatus}
                    </div>
                  )}
                </Form.Group>

                {/* Address */}
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    {...formik.getFieldProps("address")}
                    value={formik.values.address}
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
                    value={formik.values.contact}
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
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger">{formik.errors.email}</div>
                  )}
                </Form.Group>

                {/* Specialist */}
                <Form.Group className="mb-3">
                  <Form.Control
                    as="select"
                    {...formik.getFieldProps("specialist")}
                    value={formik.values.specialist}
                  >
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

                {/* New Password */}
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
              </Form>
              {error && <div className="text-danger">{error}</div>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EditDoctor;
