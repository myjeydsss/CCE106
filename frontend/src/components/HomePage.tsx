import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import "icofont/dist/icofont.min.css";
import "./style.css";

const HomePage = () => {
  const location = useLocation();

  return (
    <>
      <Helmet>
        <title>Home</title>
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

      <section className="banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-xl-7">
              <div className="block">
                <div className="divider mb-3"></div>
                <br />
                <span className="text-uppercase text-sm letter-spacing ">
                  Total Health care solution
                </span>
                <h1 className="mb-3 mt-3">Your most trusted health partner</h1>

                <p className="mb-4 pr-5">
                  A repudiandae ipsam labore ipsa voluptatum quidem quae
                  laudantium quisquam aperiam maiores sunt fugit, deserunt rem
                  suscipit placeat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="features"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="feature-block d-lg-flex">
                <div className="feature-item mb-5 mb-lg-0">
                  <div className="feature-icon mb-4">
                    <i className="icofont-surgeon-alt"></i>
                  </div>
                  <span>24 Hours Service</span>
                  <h4 className="mb-3">Online Appoinment</h4>
                  <p className="mb-4">
                    Get ALl time support for emergency.We have introduced the
                    principle of family medicine.
                  </p>
                  <a
                    href="/bookings"
                    className="btn btn-main-2 btn-round-full btn-icon"
                  >
                    Book Now<i className="icofont-simple-right ml-3"></i>
                  </a>
                </div>

                <div className="feature-item mb-5 mb-lg-0">
                  <div className="feature-icon mb-4">
                    <i className="icofont-ui-clock"></i>
                  </div>
                  <span>Timing schedule</span>
                  <h4 className="mb-3">Working Hours</h4>
                  <ul className="w-hours list-unstyled">
                    <li className="d-flex justify-content-between">
                      Sun - Wed : <span>8:00 - 17:00</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      Thu - Fri : <span>9:00 - 17:00</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      Sat - sun : <span>10:00 - 17:00</span>
                    </li>
                  </ul>
                </div>

                <div className="feature-item mb-5 mb-lg-0">
                  <div className="feature-icon mb-4">
                    <i className="icofont-support"></i>
                  </div>
                  <span>Emegency Cases</span>
                  <h4 className="mb-3">1-800-700-6200</h4>
                  <p>
                    Get ALl time support for emergency.We have introduced the
                    principle of family medicine.Get Conneted with us for any
                    urgency .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section about">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 col-sm-6">
              <div className="about-img">
                <Image
                  src="images/about/img-1.jpg"
                  alt=""
                  fluid
                  className="img-fluid"
                />
                <Image
                  src="images/about/img-2.jpg"
                  alt=""
                  fluid
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="about-img mt-4 mt-lg-0">
                <Image
                  src="images/about/img-3.jpg"
                  alt=""
                  fluid
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="about-content pl-4 mt-4 mt-lg-0">
                <h2 className="title-color">Personal care & healthy living</h2>
                <p className="mt-4 mb-5">
                  We provide best leading medicle service Nulla perferendis
                  veniam deleniti ipsum officia dolores repellat laudantium
                  obcaecati neque.
                </p>

                <a
                  href="/service"
                  className="btn btn-main-2 btn-round-full btn-icon"
                >
                  Services<i className="icofont-simple-right ml-3"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-section ">
        <div className="container">
          <div className="cta position-relative">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="counter-stat">
                  <i className="icofont-doctor"></i>
                  <span className="h3">58</span>k<p>Happy People</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="counter-stat">
                  <i className="icofont-flag"></i>
                  <span className="h3">700</span>+<p>Surgery Comepleted</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="counter-stat">
                  <i className="icofont-badge"></i>
                  <span className="h3">40</span>+<p>Expert Doctors</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="counter-stat">
                  <i className="icofont-globe"></i>
                  <span className="h3">20</span>
                  <p>Worldwide Branch</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section service gray-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 text-center">
              <div className="section-title">
                <h2>Award winning patient care</h2>
                <div className="divider mx-auto my-4"></div>
                <p>
                  Lets know moreel necessitatibus dolor asperiores illum
                  possimus sint voluptates incidunt molestias nostrum
                  laudantium. Maiores porro cumque quaerat.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-item mb-4">
                <div className="icon d-flex align-items-center">
                  <i className="icofont-laboratory text-lg"></i>
                  <h4 className="mt-3 mb-3">Laboratory services</h4>
                </div>

                <div className="content">
                  <p className="mb-4">
                    Saepe nulla praesentium eaque omnis perferendis a
                    doloremque.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-item mb-4">
                <div className="icon d-flex align-items-center">
                  <i className="icofont-heart-beat-alt text-lg"></i>
                  <h4 className="mt-3 mb-3">Heart Disease</h4>
                </div>
                <div className="content">
                  <p className="mb-4">
                    Saepe nulla praesentium eaque omnis perferendis a
                    doloremque.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-item mb-4">
                <div className="icon d-flex align-items-center">
                  <i className="icofont-tooth text-lg"></i>
                  <h4 className="mt-3 mb-3">Dental Care</h4>
                </div>
                <div className="content">
                  <p className="mb-4">
                    Saepe nulla praesentium eaque omnis perferendis a
                    doloremque.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-item mb-4">
                <div className="icon d-flex align-items-center">
                  <i className="icofont-crutch text-lg"></i>
                  <h4 className="mt-3 mb-3">Body Surgery</h4>
                </div>

                <div className="content">
                  <p className="mb-4">
                    Saepe nulla praesentium eaque omnis perferendis a
                    doloremque.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-item mb-4">
                <div className="icon d-flex align-items-center">
                  <i className="icofont-brain-alt text-lg"></i>
                  <h4 className="mt-3 mb-3">Neurology Sargery</h4>
                </div>
                <div className="content">
                  <p className="mb-4">
                    Saepe nulla praesentium eaque omnis perferendis a
                    doloremque.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-item mb-4">
                <div className="icon d-flex align-items-center">
                  <i className="icofont-dna-alt-1 text-lg"></i>
                  <h4 className="mt-3 mb-3">Gynecology</h4>
                </div>
                <div className="content">
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
      <section className="section testimonial-2 bg-white">
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="section-title text-center">
                <h2>We served over 5000+ Patients</h2>
                <div className="divider mx-auto my-4"></div>
                <p>
                  Lets know moreel necessitatibus dolor asperiores illum
                  possimus sint voluptates incidunt molestias nostrum
                  laudantium. Maiores porro cumque quaerat.
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

export default HomePage;
