import React, { useState, useEffect, ElementType, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
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

const PatientProfile = () => {
  const [patientData, setPatientData] = useState({
    name: "",
    email: "",
    contact: "",
    age: "",
    gender: "",
    civilstatus: "",
    address: "",
  });
  const [imgSrc, setImgSrc] = useState<string>("/images/avatar.png");
  const navigate = useNavigate();
  const location = useLocation();

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

    const storedPatientData = localStorage.getItem("patientData");
    if (storedPatientData) {
      setPatientData(JSON.parse(storedPatientData));
      const storedProfileImage =
        localStorage.getItem("profileImage") || "/images/avatar.png";
      setImgSrc(storedProfileImage);
    } else {
      const patient_id = localStorage.getItem("patient_id");
      if (patient_id) {
        axios
          .post(`http://localhost:8081/patient_profile`, { patient_id })
          .then((response) => {
            const { success, patientInfo } = response.data;
            if (success) {
              setPatientData(patientInfo);
              const profileImage =
                patientInfo.profileImage || "/images/avatar.png";
              setImgSrc(profileImage);
              // Store the data in local storage
              localStorage.setItem("patientData", JSON.stringify(patientInfo));
              localStorage.setItem("profileImage", profileImage);
            } else {
              console.error("Error fetching patient profile");
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("patientData");
    localStorage.removeItem("profileImage");
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
          <Navbar.Brand href="#">Welcome, {patientData.name}!</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNavDropdown" />
          <Navbar.Collapse id="navbarNavDropdown">
            <Nav className="ms-auto">
              <NavLink
                to="/patient_dashboard"
                className={`nav-link mx-2 ${
                  location.pathname === "/patient_dashboard" && "active"
                }`}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/bookings"
                className={`nav-link mx-2 ${
                  location.pathname === "/bookings" && "active"
                }`}
              >
                My Bookings
              </NavLink>
              <NavLink
                to="/patient_profile"
                className={`nav-link mx-2 ${
                  location.pathname === "/patient_profile" && "active"
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
              <h2>My Profile</h2>
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
              <p>Name: {patientData.name}</p>
              <p>Email: {patientData.email}</p>
              <p>Phone: {patientData.contact}</p>
              <p>Age: {patientData.age}</p>
              <p>Gender: {patientData.gender}</p>
              <p>Civil Status: {patientData.civilstatus}</p>
              <p>Address: {patientData.address}</p>
              <Grid item xs={12} sm={6}>
                <Link
                  to={`/edit_patient/${localStorage.getItem("patient_id")}`}
                >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
