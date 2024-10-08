import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, NavLink, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Image, Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./style1.css";
import Swal from "sweetalert2";

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Import useLocation
  const { admin_id } = useParams();
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState({
    name: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8081/admin/${admin_id}`)
      .then((res) => res.json())
      .then((data) => {
        setAdmin(data);
      })
      .catch((err) => console.log(err));
  }, [admin_id]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required."),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleLogin = async (values: { username: any; password: any }) => {
    try {
      const response = await axios.post("http://localhost:8081/admin", values);
      if (response.data.success) {
        console.log("Login successful!");
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("name", response.data.name);

        // Show SweetAlert for successful login
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });

        navigate("/patient_list");
      } else {
        // Display SweetAlert for invalid login credentials
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid credentials. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again later.");
    }
  };

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
          <div className="screen">
            <div className="screen__content">
              <form className="login" onSubmit={formik.handleSubmit}>
                <h1>Login</h1>
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>
                  <input
                    type="text"
                    className="login__input"
                    placeholder="Username"
                    {...formik.getFieldProps("username")}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-danger">{formik.errors.username}</div>
                  ) : null}

                  <div className="login__field">
                    <i className="login__icon fas fa-lock"></i>
                    <input
                      type="password"
                      className="login__input"
                      placeholder="Password"
                      {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-danger">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>

                  <button className="button login__submit" type="submit">
                    <span className="button__text">Log In Now</span>
                    <i className="button__icon fas fa-chevron-right"></i>
                  </button>
                </div>
              </form>
              {error && <div className="text-danger">{error}</div>}
            </div>
            <div className="screen__background">
              <span className="screen__background__shape screen__background__shape4"></span>
              <span className="screen__background__shape screen__background__shape3"></span>
              <span className="screen__background__shape screen__background__shape2"></span>
              <span className="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Admin;
