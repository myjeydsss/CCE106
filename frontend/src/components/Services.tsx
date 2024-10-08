import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import "./style.css";
import { Helmet } from "react-helmet";

const Services = () => {
  const location = useLocation();

  return (
    <>
    <Helmet>
        <title>Services</title>
        
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
                <span className="text-white">Our services</span>
                <h1 className="text-capitalize mb-5 text-lg">What We Do</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section service-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-block mb-5">
                <Image
                  src="images/service/service-1.jpg"
                  alt=""
                  fluid
                  className="img-fluid"
                />
                <div className="content">
                  <h4 className="mt-4 mb-2 title-color">Child care</h4>
                  <p className="mb-4">
                    Saepe nulla praesentium eaque omnis perferendis a
                    doloremque.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-block mb-5">
                <Image
                  src="images/service/service-2.jpg"
                  alt=""
                  fluid
                  className="img-fluid"
                />
                <div className="content">
                  <h4 className="mt-4 mb-2  title-color">Personal Care</h4>
                  <p className="mb-4">
                    Saepe nulla praesentium eaque omnis perferendis a
                    doloremque.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-block mb-5">
                <Image
                  src="images/service/service-3.jpg"
                  alt=""
                  fluid
                  className="img-fluid"
                />
                <div className="content">
                  <h4 className="mt-4 mb-2 title-color">CT scan</h4>
                  <p className="mb-4">
                    Saepe nulla praesentium eaque omnis perferendis a
                    doloremque.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-block mb-5 mb-lg-0">
                <Image
                  src="images/service/service-4.jpg"
                  alt=""
                  fluid
                  className="img-fluid"
                />
                <div className="content">
                  <h4 className="mt-4 mb-2 title-color">Joint replacement</h4>
                  <p className="mb-4">
                    Saepe nulla praesentium eaque omnis perferendis a
                    doloremque.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-block mb-5 mb-lg-0">
                <Image
                  src="images/service/service-6.jpg"
                  alt=""
                  fluid
                  className="img-fluid"
                />
                <div className="content">
                  <h4 className="mt-4 mb-2 title-color">
                    Examination & Diagnosis
                  </h4>
                  <p className="mb-4">
                    Saepe nulla praesentium eaque omnis perferendis a
                    doloremque.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-block mb-5 mb-lg-0">
                <Image
                  src="images/service/service-8.jpg"
                  alt=""
                  fluid
                  className="img-fluid"
                />
                <div className="content">
                  <h4 className="mt-4 mb-2 title-color">Alzheimer's disease</h4>
                  <p className="mb-4">
                    Saepe nulla praesentium eaque omnis perferendis a
                    doloremque.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section cta-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="cta-content">
                <div className="divider mb-4"></div>
                <h2 className="mb-5 text-lg">
                  We are pleased to offer you the{" "}
                  <span className="title-color">
                    chance to have the healthy
                  </span>
                </h2>
                <a
                  href="/bookings"
                  className="btn btn-main-2 btn-round-full btn-icon"
                >
                  Book Now<i className="icofont-simple-right ml-3"></i>
                </a>
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

export default Services;
