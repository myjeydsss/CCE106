import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import EditPatient from "./components/EditPatient";
import AddPatient from "./components/AddPatient";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Register from "./components/Register";
import PatientList from "./components/PatientList";
import DoctorList from "./components/DoctorList";
import AddDoctor from "./components/AddDoctor";
import EditDoctor from "./components/EditDoctor";
import PatientDashboard from "./components/PatientDashboard";
import AppointmentList from "./components/AppointmentList";
import PatientProfile from "./components/PatientProfile";
import EditAppointment from "./components/EditAppointment";
import AddAppointment from "./components/AddAppointment";
import DoctorDashboard from "./components/DoctorDashboard";
import Doctor from "./components/Doctor";
import Bookings from "./components/Bookings";
import Appointment from "./components/Appointment";
import DoctorProfile from "./components/DoctorProfile";
import Contact from "./components/Contact";
import History from "./components/History";
import Archive from "./components/Archive";

const App = () => {
  return (
    <>
      <Routes>
        {/* Main Dashboard */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/service" element={<Services />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/edit_doctor/:doctor_id" element={<EditDoctor />} />
        <Route path="/edit_patient/:patient_id" element={<EditPatient />} />
        <Route path="/add_doctor" element={<AddDoctor />} />
        <Route path="/add_patient" element={<AddPatient />} />
        <Route path="/patient_list" element={<PatientList />} />
        <Route path="/doctor_list" element={<DoctorList />} />
        <Route path="/appointment_list" element={<AppointmentList />} />
        <Route path="/archive" element={<Archive />} />
      

        {/* Patient */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient_dashboard" element={<PatientDashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/patient_profile" element={<PatientProfile />} />
        <Route path="/add_appointment" element={<AddAppointment />} />
        <Route
          path="/edit_bookings/:appointment_id"
          element={<EditAppointment />}
        />

        {/* Doctor */}
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/doctor_dashboard" element={<DoctorDashboard />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/doctor_profile" element={<DoctorProfile />} />
        <Route path="/history" element={<History />} />


        <Route />
      </Routes>
    </>
  );
};

export default App;
