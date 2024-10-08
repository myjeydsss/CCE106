import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Navbar, Nav, Image, NavDropdown } from "react-bootstrap";
import Swal from "sweetalert2";

const Register = () => {
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
        .email("Invalid Username/Email.")
        .required("Username/Email is required."),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters.")
        .required("Password is required."),
    }),
    onSubmit: (values) => {
      handleRegister(values);
    },
  });
  

  const handleRegister = async (values: {
    name: string;
    age: string;
    gender: string;
    civilstatus: string;
    address: string;
    contact: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/register",
        values
      );
  
      if (response.data.success) {
        console.log("Registration successful!");
        formik.resetForm();
        navigate("/login");
  
        // SweetAlert for success
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You can now log in with your credentials.",
        });
      } else {
        setError(
          response.data.error || "An error occurred. Please try again later."
        );
  
        // SweetAlert for error
        Swal.fire({
          icon: "error",
          title: "Registration Error",
          text:
            response.data.error || "An error occurred. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error); // Log the error for debugging
      setError("An error occurred. Please try again later.");
  
      // SweetAlert for error
      Swal.fire({
        icon: "error",
        title: "Registration Error",
        text: "An error occurred. Please try again later.",
      });
    }
  };
  

  const location = useLocation();

  return (
    <>
      <header>
        <Navbar bg="white" variant="white" style={{ height: "80px" }}>
          <div className="container">
            <Navbar.Brand href="#">
              <Image
                src="images/logo1.png"
                alt=""
                fluid
                className="img-fluid"
                style={{ width: "60px", height: "auto" }}
              />
              Flyndr Hospital
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNavDropdown" />
            <Navbar.Collapse id="navbarNavDropdown">
              <Nav className="ms-auto">
                <NavLink
                  to="/home"
                  className={`nav-link mx-2 ${
                    location.pathname === "/home" ? "active" : ""
                  }`}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/service"
                  className={`nav-link mx-2 ${
                    location.pathname === "/service" ? "active" : ""
                  }`}
                >
                  Services
                </NavLink>
                <NavLink
                  to="/about"
                  className={`nav-link mx-2 ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/contact"
                  className={`nav-link mx-2 ${
                    location.pathname === "/contact" ? "active" : ""
                  }`}
                >
                  Contact Us
                </NavLink>
                <NavDropdown
                  title="Company"
                  id="navbarDropdownMenuLink"
                  className="mx-2"
                >
                  <NavDropdown.Item href="/admin">Admin</NavDropdown.Item>
                  <NavDropdown.Item href="/doctor">Doctor</NavDropdown.Item>
                  <NavDropdown.Item href="/login">Patient</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </header>
      <section>
        <br />
        <br />
        <div className="row justify-content-center">
          <div className="screen_register">
            <div className="screen__content_register">
              <form className="register" onSubmit={formik.handleSubmit}>
                <h1>Register</h1>

                <div className="register__field">
                  <i className="register__icon fas fa-user"></i>
                  <input
                    type="text"
                    className="register__input"
                    placeholder="Name"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-danger">{formik.errors.name}</div>
                  ) : null}
                </div>

                <div className="register__field">
                  <i className="register__icon fas fa-user"></i>
                  <input
                    type="text"
                    className="register__input"
                    placeholder="Age"
                    {...formik.getFieldProps("age")}
                  />
                  {formik.touched.age && formik.errors.age ? (
                    <div className="text-danger">{formik.errors.age}</div>
                  ) : null}
                </div>

                <div className="register__field">
                  <i className="register__icon fas fa-user"></i>
                  <select
                    className="register__input"
                    {...formik.getFieldProps("gender")}
                  >
                    <option value="" label="Select Gender" />
                    <option value="Male" label="Male" />
                    <option value="Female" label="Female" />
                    <option value="NonBinary" label="Non-Binary" />
                    <option value="Others" label="Others" />
                  </select>
                  {formik.touched.gender && formik.errors.gender ? (
                    <div className="text-danger">{formik.errors.gender}</div>
                  ) : null}
                </div>

                <div className="register__field">
                  <i className="register__icon fas fa-user"></i>
                  <select
                    className="register__input"
                    {...formik.getFieldProps("civilstatus")}
                  >
                    <option value="" label="Select Civil Status" />
                    <option value="Married" label="Married" />
                    <option value="Single" label="Single" />
                    <option value="Divorced" label="Divorced" />
                    <option value="Widowed" label="Widowed" />
                  </select>
                  {formik.touched.civilstatus && formik.errors.civilstatus ? (
                    <div className="text-danger">
                      {formik.errors.civilstatus}
                    </div>
                  ) : null}
                </div>

                <div className="register__field">
                  <i className="register__icon fas fa-user"></i>
                  <input
                    type="text"
                    className="register__input"
                    placeholder="Address"
                    {...formik.getFieldProps("address")}
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <div className="text-danger">{formik.errors.address}</div>
                  ) : null}
                </div>

                <div className="register__field">
                  <i className="register__icon fas fa-user"></i>
                  <input
                    type="text"
                    className="register__input"
                    placeholder="Contact"
                    {...formik.getFieldProps("contact")}
                  />
                  {formik.touched.contact && formik.errors.contact ? (
                    <div className="text-danger">{formik.errors.contact}</div>
                  ) : null}
                </div>

                <div className="register__field">
                  <i className="register__icon fas fa-envelope"></i>
                  <input
                    type="email"
                    className="register__input"
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}
                </div>

                <div className="register__field">
                  <i className="register__icon fas fa-lock"></i>
                  <input
                    type="password"
                    className="register__input"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : null}
                </div>

                <button className="button register__submit" type="submit">
                  <span className="button__text">Register Now</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
                <br />
                <p>
                  Already have an account? <Link to="/login">Login Here!</Link>.
                </p>
              </form>
            </div>
            <div className="screen__background_register">
              <span className="screen__background__shape screen__background__shape4_register"></span>
              <span className="screen__background__shape screen__background__shape3_register"></span>
              <span className="screen__background__shape screen__background__shape2_register"></span>
              <span className="screen__background__shape screen__background__shape1_register"></span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
