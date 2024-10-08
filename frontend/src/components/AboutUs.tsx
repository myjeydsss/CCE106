import { Image, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import "icofont/dist/icofont.min.css";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  const location = useLocation();

  return (
    <>

<Helmet>
        <title>About Us</title>
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
                <span className="text-white">About Us</span>
                <h1 className="text-capitalize mb-5 text-lg">About Us</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section about-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h2 className="title-color">
                Personal care for your healthy living
              </h2>
            </div>
            <div className="col-lg-8">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Incidunt, quod laborum alias. Vitae dolorum, officia sit! Saepe
                ullam facere at, consequatur incidunt, quae esse, quis ut
                reprehenderit dignissimos, libero delectus.
              </p>

              <Image
                src="images/about/sign.png"
                alt=""
                fluid
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="fetaure-page ">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="about-block-item mb-5 mb-lg-0">
                <Image
                  src="images/about/about-1.jpg"
                  alt=""
                  fluid
                  className="img-fluid"
                />
                <h4 className="mt-3">Healthcare for Kids</h4>
                <p>
                  Voluptate aperiam esse possimus maxime repellendus, nihil quod
                  accusantium .
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="about-block-item mb-5 mb-lg-0">
                <Image
                  src="images/about/about-2.jpg"
                  alt=""
                  fluid
                  className="img-fluid"
                />
                <h4 className="mt-3">Medical Counseling</h4>
                <p>
                  Voluptate aperiam esse possimus maxime repellendus, nihil quod
                  accusantium .
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="about-block-item mb-5 mb-lg-0">
                <Image
                  src="images/about/about-3.jpg"
                  alt=""
                  fluid
                  className="img-fluid"
                />
                <h4 className="mt-3">Modern Equipments</h4>
                <p>
                  Voluptate aperiam esse possimus maxime repellendus, nihil quod
                  accusantium .
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="about-block-item">
                <Image
                  src="images/about/about-4.jpg"
                  alt=""
                  fluid
                  className="img-fluid"
                />
                <h4 className="mt-3">Qualified Doctors</h4>
                <p>
                  Voluptate aperiam esse possimus maxime repellendus, nihil quod
                  accusantium .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section team gray-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center">
                <h2 className="mb-4">Meet Our Programmers</h2>
                <div className="divider mx-auto my-4"></div>
                <p>
                  Today’s users expect effortless experiences. Don’t let
                  essential people and processes stay stuck in the past. Speed
                  it up, skip the hassles
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="team-block mb-5 mb-lg-0">
                <Image
                  src="images/team/ron.jpg"
                  alt=""
                  fluid
                  className="img-fluid"
                  style={{ width: "250px", height: "300px" }}
                />

                <div className="content">
                  <h4 className="mt-4 mb-0">
                    <a href="doctor-single.html">Ronbryll Jhan Rendon</a>
                  </h4>
                  <p>Software Engineer</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="team-block mb-5 mb-lg-0">
                <Image
                  src="images/team/jaydie.jpg"
                  alt=""
                  fluid
                  className="img-fluid"
                  style={{ width: "250px", height: "300px" }}
                />

                <div className="content">
                  <h4 className="mt-4 mb-0">
                    <a href="doctor-single.html">Jaydie Ranes</a>
                  </h4>
                  <p>Full-Stack Engineer</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="team-block mb-5 mb-lg-0">
                <Image
                  src="images/team/tristan.jpg"
                  alt=""
                  fluid
                  className="img-fluid"
                  style={{ width: "250px", height: "300px" }}
                />

                <div className="content">
                  <h4 className="mt-4 mb-0">
                    <a href="doctor-single.html">Trsitan Anthony Cancino</a>
                  </h4>
                  <p>Director of Engineering</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section testimonial">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-6">
              <div className="section-title">
                <h2 className="mb-4">What they say about us</h2>
                <div className="divider my-4"></div>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6 testimonial-wrap offset-lg-6">
              <div className="testimonial-block">
                <div className="client-info ">
                  <h4>Amazing service!</h4>
                  <span>Alexander Tabaranza</span>
                </div>
                <p>
                  They provide great service facilty consectetur adipisicing
                  elit. Itaque rem, praesentium, iure, ipsum magnam deleniti a
                  vel eos adipisci suscipit fugit placeat. Quibusdam laboriosam
                  eveniet nostrum nemo commodi numquam quod.
                </p>
                <span>&ldquo;</span> {/* Unicode Left double quotation mark */}
              </div>

              <div className="testimonial-block">
                <div className="client-info">
                  <h4>Expert doctors!</h4>
                  <span>Dane Cinco</span>
                </div>
                <p>
                  They provide great service facilty consectetur adipisicing
                  elit. Itaque rem, praesentium, iure, ipsum magnam deleniti a
                  vel eos adipisci suscipit fugit placeat. Quibusdam laboriosam
                  eveniet nostrum nemo commodi numquam quod.
                </p>
                <span>&ldquo;</span> {/* Unicode Left double quotation mark */}
              </div>

              <div className="testimonial-block">
                <div className="client-info">
                  <h4>Good Support!</h4>
                  <span>Patrick Onita</span>
                </div>
                <p>
                  They provide great service facilty consectetur adipisicing
                  elit. Itaque rem, praesentium, iure, ipsum magnam deleniti a
                  vel eos adipisci suscipit fugit placeat. Quibusdam laboriosam
                  eveniet nostrum nemo commodi numquam quod.
                </p>
                <span>&ldquo;</span> {/* Unicode Left double quotation mark */}
              </div>

              <div className="testimonial-block">
                <div className="client-info">
                  <h4>Nice Environment!</h4>
                  <span>Joshmar Ardepolla</span>
                </div>
                <p>
                  They provide great service facilty consectetur adipisicing
                  elit. Itaque rem, praesentium, iure, ipsum magnam deleniti a
                  vel eos adipisci suscipit fugit placeat. Quibusdam laboriosam
                  eveniet nostrum nemo commodi numquam quod.
                </p>
                <span>&ldquo;</span> {/* Unicode Left double quotation mark */}
              </div>

              <div className="testimonial-block">
                <div className="client-info">
                  <h4>Modern Service!</h4>
                  <span>Marc Cagatin</span>
                </div>
                <p>
                  They provide great service facilty consectetur adipisicing
                  elit. Itaque rem, praesentium, iure, ipsum magnam deleniti a
                  vel eos adipisci suscipit fugit placeat. Quibusdam laboriosam
                  eveniet nostrum nemo commodi numquam quod.
                </p>
                <span>&ldquo;</span> {/* Unicode Left double quotation mark */}
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

export default AboutUs;
