import { Image, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import "icofont/dist/icofont.min.css";
import { Helmet } from "react-helmet";

const Contact = () => {
  const location = useLocation();

  return (
    <>
    <Helmet>
        <title>Contact Us</title>
      </Helmet>
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
      <section className="page-title bg-1">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block text-center">
                <span className="text-white">Contact Us</span>
                <h1 className="text-capitalize mb-5 text-lg">Get in Touch</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section contact-info pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="contact-block mb-4 mb-lg-0">
                <i className="icofont-live-support"></i>
                <h5>Call Us</h5>
                +823-4565-13456
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="contact-block mb-4 mb-lg-0">
                <i className="icofont-support-faq"></i>
                <h5>Email Us</h5>
                contact@mail.com
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="contact-block mb-4 mb-lg-0">
                <i className="icofont-location-pin"></i>
                <h5>Location</h5>
                North Main Street,Brooklyn Australia
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form-wrap section ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center">
                <h2 className="text-md mb-2">Contact us</h2>
                <div className="divider mx-auto my-4"></div>
                <p className="mb-5">
                  Laboriosam exercitationem molestias beatae eos pariatur,
                  similique, excepturi mollitia sit perferendis maiores ratione
                  aliquam?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer section gray-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mr-auto col-sm-6">
              <div className="widget mb-5 mb-lg-0">
                <div className="logo mb-4">
                  <Image
                    src="images/logo1.png"
                    alt=""
                    fluid
                    className="img-fluid"
                    style={{ width: "60px", height: "auto" }}
                  />
                </div>
                <p>
                  Tempora dolorem voluptatum nam vero assumenda voluptate,
                  facilis ad eos obcaecati tenetur veritatis eveniet distinctio
                  possimus.
                </p>

                <ul className="list-inline footer-socials mt-4">
                  <li className="list-inline-item">
                    <a href="https://www.facebook.com/ronbryll">
                      <i className="icofont-facebook"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://twitter.com/ronbryll">
                      <i className="icofont-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://www.instagram.com/chiiiiik__/">
                      <i className="icofont-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-btm py-4 mt-5">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-6">
                <div className="copyright">
                  &copy; Copyright Reserved{" "}
                  <span className="text-color">2023</span>
                </div>
              </div>
              <div className="col-lg-6"></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
