import { useState, useEffect, ElementType, ChangeEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Swal from "sweetalert2";

const ImgStyled = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)<
  ButtonProps & { component?: ElementType; htmlFor?: string }
>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));

const DoctorProfile = () => {
  const [doctorData, setDoctorData] = useState({
    name: "",
    email: "",
    contact: "",
    age: "",
    gender: "",
    civilstatus: "",
    address: "",
    specialist: "",
    profileImage: "", // added profileImage field
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [imgSrc, setImgSrc] = useState<string>("/images/avatar.png");

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);

      reader.readAsDataURL(files[0]);
    }
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      navigate("/login");
    }

    const doctor_id = localStorage.getItem("doctor_id");
    if (doctor_id) {
      // Fetch the profile information of the logged-in doctor
      axios
        .post("http://localhost:8081/doctor_profile", null, {
          headers: {
            Authorization: doctor_id,
          },
        })
        .then((response) => {
          const { success, doctorInfo } = response.data;
          if (success) {
            setDoctorData(doctorInfo);

            // If the doctor has a custom profile image, use it; otherwise, use the default image
            const profileImage =
              doctorInfo.profileImage || "/images/avatar.png";
            setImgSrc(profileImage);
          } else {
            console.error("Error fetching doctor profile");
            setError("Error fetching doctor profile");
          }
        })
        .catch((err) => {
          console.log(err);
          setError("Error fetching doctor profile");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/home");
  };

  const handleSaveChanges = () => {
    // Perform any necessary actions to save changes here

    // Show SweetAlert on successful save
    Swal.fire({
      icon: "success",
      title: "Changes Saved",
      text: "Your profile changes have been saved successfully.",
    });
  };

  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark" className="p-3">
        <div className="container-fluid">
          <Navbar.Brand href="#">Welcome, {doctorData.name}!</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNavDropdown" />
          <Navbar.Collapse id="navbarNavDropdown">
            <Nav className="ms-auto">
              <NavLink
                to="/doctor_dashboard"
                className={`nav-link mx-2 ${
                  location.pathname === "/doctor_dashboard" && "active"
                }`}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/appointment"
                className={`nav-link mx-2 ${
                  location.pathname === "/appointment" && "active"
                }`}
              >
                Appointment
              </NavLink>
              <NavLink
                to="/history"
                className={`nav-link mx-2 ${
                  location.pathname === "/history" && "active"
                }`}
              >
                History
              </NavLink>
              <NavLink
                to="/doctor_profile"
                className={`nav-link mx-2 ${
                  location.pathname === "/doctor_profile" && "active"
                }`}
              >
                My Profile
              </NavLink>
              <li className="nav-item">
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <br />
            <div>
              <h2>Doctor's Profile</h2>
              <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ImgStyled src={imgSrc} alt="Profile Pic" />
                  <Box>
                    <ButtonStyled
                      component="label"
                      variant="contained"
                      htmlFor="account-settings-upload-image"
                    >
                      Upload New Photo
                      <input
                        hidden
                        type="file"
                        onChange={onChange}
                        accept="image/png, image/jpeg"
                        id="account-settings-upload-image"
                      />
                    </ButtonStyled>
                    <ResetButtonStyled
                      color="error"
                      variant="outlined"
                      onClick={() => setImgSrc("/images/avatar.png")}
                    >
                      Reset
                    </ResetButtonStyled>
                  </Box>
                </Box>
              </Grid>
              <p>Email: {doctorData.email}</p>
              <p>Phone: {doctorData.contact}</p>
              <p>Age: {doctorData.age}</p>
              <p>Gender: {doctorData.gender}</p>
              <p>Civil Status: {doctorData.civilstatus}</p>
              <p>Address: {doctorData.address}</p>
              <p>Specialist: {doctorData.specialist}</p>
              <Grid item xs={12} sm={6}>
                {/* Edit button */}
                <Link to={`/edit_doctor/${localStorage.getItem("doctor_id")}`}>
                  <button className="btn btn-primary">Edit Profile</button>
                </Link>
                <Button
                  className="bg-success"
                  variant="contained"
                  sx={{ marginLeft: 3.5 }}
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </Grid>
              {error && <div className="text-danger">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
