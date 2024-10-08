require('dotenv').config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require('crypto');


app.use(cors());
app.use(bodyParser.json());

// database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react_appointment",
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify(function(error, success) {
  if (error) {
    console.error(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});





transporter.verify(function(error, success) {
  if (error) {
    console.error("Error verifying SMTP connection:", error);
  } else {
    console.log("SMTP connection is ready to send emails");
  }
});

// Endpoint to check if email already exists
app.get("/check-email", async (request, response) => {
  const { email } = request.query;
  const checkUserExistsSql = "SELECT * FROM patient WHERE email = ?";

  try {
    // Check if email already exists in the database
    db.query(checkUserExistsSql, [email], (error, data) => {
      if (error) {
        console.error("Error checking user existence:", error);
        return response.status(500).json({
          success: false,
          error: "An error occurred. Please try again later.",
        });
      }

      if (data.length > 0) {
        // Email already exists
        return response.json({ isValid: false });
      } else {
        // Email is valid (not exists)
        return response.json({ isValid: true });
      }
    });
  } catch (error) {
    console.error("Error checking user existence:", error);
    return response.status(500).json({
      success: false,
      error: "An error occurred. Please try again later.",
    });
  }
});


// Endpoint to handle user registration
app.post("/register", async (request, response) => {
  const { name, age, gender, civilstatus, address, contact, email, password } = request.body;
  const checkUserExistsSql = "SELECT * FROM patient WHERE email = ?";

  try {
    // Check if email already exists
    db.query(checkUserExistsSql, [email], async (error, data) => {
      if (error) {
        console.error("Error checking user existence:", error);
        return response.status(500).json({
          success: false,
          error: "An error occurred. Please try again later.",
        });
      }

      if (data.length > 0) {
        // Email already exists
        return response.status(400).json({
          success: false,
          error: "Email already exists. Please choose another email.",
        });
      }

      // Email is valid, proceed with registration
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        const addUserSql = `
          INSERT INTO patient (name, age, gender, civilstatus, address, contact, email, password, verificationToken, verified)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(addUserSql, [name, age, gender, civilstatus, address, contact, email, hashedPassword, verificationToken, false], (error) => {
          if (error) {
            console.error("Error inserting new user:", error);
            return response.status(500).json({
              success: false,
              error: "An error occurred. Please try again later.",
            });
          }

          const verificationLink = `http://localhost:5173/verify?token=${verificationToken}`;
          const loginLink = 'http://localhost:5173/login'; // Replace with your actual login page URL

          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            html: `
              <p>Please verify your email by clicking the following link:</p>
              <p><a href="${verificationLink}">Verify Email</a></p>
              <p>After verification, you can <a href="${loginLink}">log in here</a>.</p>
            `,
          };


          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending verification email:", error);
              return response.status(500).json({
                success: false,
                error: "An error occurred while sending the verification email. Please try again later.",
              });
            }
            return response.json({ success: true });
          });
          
        });
      } catch (error) {
        console.error("Error hashing password or sending verification email:", error);
        response.status(500).json({
          success: false,
          error: "An error occurred. Please try again later.",
        });
      }
    });
  } catch (error) {
    console.error("Error checking user existence:", error);
    response.status(500).json({
      success: false,
      error: "An error occurred. Please try again later.",
    });
  }
});




app.get('/verify', (request, response) => {
  const { token } = request.query;
  const verifyUserSql = "UPDATE patient SET verified = true WHERE verificationToken = ?";

  db.query(verifyUserSql, [token], (error, result) => {
    if (error) {
      console.error("Error verifying email:", error);
      return response.send("An error occurred. Please try again later.");
    }

    if (result.affectedRows === 0) {
      return response.send("Invalid verification token.");
    }

    response.send("Email successfully verified. You can now log in.");
  });
});


// Fetch Patient Table
app.get("/patient_list", (request, response) => {
  const sql = "SELECT * FROM patient";
  db.query(sql, (error, data) => {
    if (error) return response.json(error);
    return response.json(data);
  });
});

// Fetch Doctor Table
app.get("/doctor_list", (request, response) => {
  const sql = "SELECT * FROM doctor";
  db.query(sql, (error, data) => {
    if (error) return response.json(error);
    return response.json(data);
  });
});

// Fetch Appointment Table
app.get("/appointment_list", (request, response) => {
  const sql = "SELECT * FROM appointment";
  db.query(sql, (error, data) => {
    if (error) return response.json(error);
    return response.json(data);
  });
});

// Fetch Bookings Table
app.get("/bookings", (request, response) => {
  const sql = "SELECT * FROM appointment";
  db.query(sql, (error, data) => {
    if (error) return response.json(error);
    return response.json(data);
  });
});

// Fetch Archive Table
app.get("/archive", (request, response) => {
  const sql = "SELECT * FROM archive";
  db.query(sql, (error, data) => {
    if (error) return response.json(error);
    return response.json(data);
  });
});

// Fetch Bookings Table with Approved, Rejected, and Pending statuses
app.get("/appointment", (request, response) => {
  const sql = "SELECT * FROM appointment WHERE status IN ('Approved', 'Rejected', 'Pending')";
  db.query(sql, (error, data) => {
    if (error) {
      return response.json(error);
    }
    return response.json(data);
  });
});
// Fetch Bookings Table where Status = Done
app.get("/history", (request, response) => {
  const sql = "SELECT * FROM appointment WHERE status = 'Done' ";
  db.query(sql, (error, data) => {
    if (error) return response.json(error);
    return response.json(data);
  });
});

//localhost:8081
app.get("/", (request, response) => {
  return response.json("Starting the NODE SERVER.");
});
//localhost:8081
app.listen(8081, () => {
  console.log("Listening");
});

// Adding New Patient
app.post("/add_patient", (request, response) => {
  const { name, age, gender, civilstatus, address, contact, email, password } =
    request.body;
  const sql =
    "INSERT INTO patient (name, age, gender, civilstatus, address, contact, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [name, age, gender, civilstatus, address, contact, email, password],
    (error, result) => {
      if (error) {
        console.error("Error adding patient:", error);
        return response.json({
          success: false,
          error: "An error occurred. Please try again later.",
        });
      }
      response.json({ success: true });
    }
  );
});

// Add profile picture
app.post("/add_profile", (request, response) => {
  const { profile } = request.body;
  const sql = "INSERT INTO patient (profile_img) VALUES (?)";
  db.query(sql, [profile], (error, result) => {
    if (error) {
      console.error("Error adding patient:", error);
      return response.json({
        success: false,
        error: "An error occurred. Please try again later.",
      });
    }
    response.json({ success: true });
  });
});

// Adding New Appointment
app.post("/add_appointment", (request, response) => {
  const {
    name,
    age,
    gender,
    civilstatus,
    address,
    contact,
    email,
    specialist,
    comment,
    date,
    time,
    status,
  } = request.body;
  const sql =
    "INSERT INTO appointment (name, age, gender, civilstatus, address, contact, email, specialist, comment, date, time, status ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      name,
      age,
      gender,
      civilstatus,
      address,
      contact,
      email,
      specialist,
      comment,
      date,
      time,
      status,
    ],
    (error, result) => {
      if (error) {
        console.error("Error adding appointment:", error);
        return response.json({
          success: false,
          error: "An error occurred. Please try again later.",
        });
      }
      response.json({ success: true });
    }
  );
});

app.post("/add_doctor", (request, response) => {
  const {
    name,
    age,
    gender,
    civilstatus,
    address,
    contact,
    email,
    specialist,
    password,
  } = request.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return response.json({
        success: false,
        error: "An error occurred. Please try again later.",
      });
    }

    const sql =
      "INSERT INTO doctor (name, age, gender, civilstatus, address, contact, email, specialist, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        name,
        age,
        gender,
        civilstatus,
        address,
        contact,
        email,
        specialist,
        hashedPassword,  // Use the hashed password
      ],
      (error, result) => {
        if (error) {
          console.error("Error adding doctor:", error);
          return response.json({
            success: false,
            error: "An error occurred. Please try again later.",
          });
        }
        response.json({ success: true });
      }
    );
  });
});

// Deleting Patient
app.delete("/patient_list/:patient_id", (request, response) => {
  const patient_id = request.params.patient_id;
  const sql = "DELETE FROM patient WHERE patient_id = ?";
  db.query(sql, [patient_id], (error, result) => {
    if (error) throw error;
    response.send("Successfully deleted patient...");
  });
});

// Deleting Doctor
app.delete("/doctor_list/:doctor_id", (request, response) => {
  const doctor_id = request.params.doctor_id;
  const sql = "DELETE FROM doctor WHERE doctor_id = ?";
  db.query(sql, [doctor_id], (error, result) => {
    if (error) {
      console.error("Error deleting doctor:", error);
      response
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    } else {
      console.log("Successfully deleted doctor...");
      response.json({ success: true });
    }
  });
});

// Deleting Bookings/Appointment and Archiving
app.delete("/bookings/:appointment_id", (request, response) => {
  const appointment_id = request.params.appointment_id;
  const deleteSQL = "DELETE FROM appointment WHERE appointment_id = ?";
  const selectSQL = "SELECT * FROM appointment WHERE appointment_id = ?";
  
  // First, select the appointment data before deleting
  db.query(selectSQL, [appointment_id], (error, data) => {
    if (error) {
      console.error("Error selecting appointment for deletion:", error);
      return response.status(500).json({ success: false, error: "Internal Server Error" });
    }
    
    const appointmentData = data[0]; // Assuming only one result is expected
    
    // Delete the appointment
    db.query(deleteSQL, [appointment_id], (error, result) => {
      if (error) {
        console.error("Error deleting appointment:", error);
        return response.status(500).json({ success: false, error: "Internal Server Error" });
      }
      
      // Archive the appointment data
      const {
        name,
        age,
        gender,
        civilstatus,
        address,
        contact,
        email,
        specialist,
        comment,
        date,
        time,
        status,
      } = appointmentData;
      
      const archiveSQL = "INSERT INTO archive (name, age, gender, civilstatus, address, contact, email, specialist, comment, date, time, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      
      db.query(
        archiveSQL,
        [
          name,
          age,
          gender,
          civilstatus,
          address,
          contact,
          email,
          specialist,
          comment,
          date,
          time,
          status,
        ],
        (error, result) => {
          if (error) {
            console.error("Error archiving appointment:", error);
            return response.status(500).json({ success: false, error: "Internal Server Error" });
          }
          console.log("Successfully deleted and archived appointment...");
          response.json({ success: true });
        }
      );
    });
  });
});

// Deleting Appointment from archive
app.delete("/archive/:appointment_id", (request, response) => {
  const appointment_id = request.params.appointment_id;
  const sql = "DELETE FROM archive WHERE appointment_id = ?";
  db.query(sql, [appointment_id], (error, result) => {
    if (error) {
      console.error("Error deleting appointment:", error);
      response
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    } else {
      console.log("Successfully deleted appointment...");
      response.json({ success: true });
    }
  });
});

// Restoring Bookings/Appointment from Archive
app.post("/archive/restore/:appointment_id", (request, response) => {
  const appointment_id = request.params.appointment_id;
  const selectSQL = "SELECT * FROM archive WHERE appointment_id = ?";
  const deleteSQL = "DELETE FROM archive WHERE appointment_id = ?";
  
  // First, select the appointment data before deleting from archive
  db.query(selectSQL, [appointment_id], (error, data) => {
    if (error) {
      console.error("Error selecting appointment for restoration:", error);
      return response.status(500).json({ success: false, error: "Internal Server Error" });
    }
    
    const appointmentData = data[0]; // Assuming only one result is expected
    
    // Insert the appointment back into the appointment table
    const {
      name,
      age,
      gender,
      civilstatus,
      address,
      contact,
      email,
      specialist,
      comment,
      date,
      time,
      status,
    } = appointmentData;
    
    const restoreSQL = "INSERT INTO appointment (appointment_id, name, age, gender, civilstatus, address, contact, email, specialist, comment, date, time, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(
      restoreSQL,
      [
        appointment_id,
        name,
        age,
        gender,
        civilstatus,
        address,
        contact,
        email,
        specialist,
        comment,
        date,
        time,
        status,
      ],
      (error, result) => {
        if (error) {
          console.error("Error restoring appointment:", error);
          return response.status(500).json({ success: false, error: "Internal Server Error" });
        }
        
        // Delete the appointment from the archive
        db.query(deleteSQL, [appointment_id], (error, result) => {
          if (error) {
            console.error("Error deleting from archive:", error);
            return response.status(500).json({ success: false, error: "Internal Server Error" });
          }
          console.log("Successfully restored and deleted appointment from archive...");
          response.json({ success: true });
        });
      }
    );
  });
});


// Fetch Specific Patient ID
app.get("/patient_list/:patient_id", (request, response) => {
  const patient_id = request.params.patient_id;
  const sql = "SELECT * FROM patient WHERE patient_id=?";
  db.query(sql, [patient_id], (error, data) => {
    if (error) return response.json(error);
    if (data.length > 0) {
      return response.json(data[0]);
    } else {
      return response.json({}); // Return an empty object if no data found
    }
  });
});

//Fetch Specific Doctor ID
app.get("/doctor_list/:doctor_id", (request, response) => {
  const doctor_id = request.params.doctor_id;
  console.log("doctor_id:" + doctor_id);
  const sql = "SELECT * FROM doctor WHERE doctor_id=?";
  db.query(sql, [doctor_id], (error, data) => {
    if (error) return response.json(error);
    return response.json(data);
  });
});

//Fetch Specific Patient ID
app.get("/patient_list/:patient_id", (request, response) => {
  const patient_id = request.params.patient_id;
  console.log("patient_id:" + doctor_id);
  const sql = "SELECT * FROM patient WHERE patient_id=?";
  db.query(sql, [patient_id], (error, data) => {
    if (error) return response.json(error);
    return response.json(data);
  });
});

//Fetch Specific Appointment ID
app.get("/bookings/:appointment_id", (request, response) => {
  const appointment_id = request.params.appointment_id;
  console.log("appointment_id:" + appointment_id);
  const sql = "SELECT * FROM appointment WHERE appointment_id=?";
  db.query(sql, [appointment_id], (error, data) => {
    if (error) return response.json(error);
    return response.json(data);
  });
});

// Edit Specific Patient ID
app.put("/patient_list/:patient_id", (request, response) => {
  const patient_id = request.params.patient_id;
  const { name, age, gender, civilstatus, address, contact, email, password } =
    request.body; // Include password in the destructuring
  const sql =
    "UPDATE patient SET name = ?, age = ?, gender = ?, civilstatus = ?, address = ?, contact = ?, email = ?, password = ? WHERE patient_id = ?";
  db.query(
    sql,
    [
      name,
      age,
      gender,
      civilstatus,
      address,
      contact,
      email,
      password,
      patient_id,
    ],
    (error, result) => {
      if (error) throw error;
      response.send("Patient Updated...");
    }
  );
});

// Edit Specific Doctor ID
app.put("/doctor_list/:doctor_id", (request, response) => {
  const doctor_id = request.params.doctor_id;
  const {
    name,
    age,
    gender,
    civilstatus,
    address,
    contact,
    email,
    specialist,
    password,
  } = request.body; // Include password in the destructuring
  const sql =
    "UPDATE doctor SET name = ?, age = ?, gender = ?, civilstatus = ?, address = ?, contact = ?, email = ?, specialist = ?, password = ? WHERE doctor_id = ?";
  db.query(
    sql,
    [
      name,
      age,
      gender,
      civilstatus,
      address,
      contact,
      email,
      specialist,
      password,
      doctor_id,
    ],
    (error, result) => {
      if (error) throw error;
      response.send("Doctor Updated...");
    }
  );
});

// Edit Specific Appointment ID
app.put("/bookings/:appointment_id", (request, response) => {
  const appointment_id = request.params.appointment_id;
  const {
    name,
    age,
    gender,
    civilstatus,
    address,
    contact,
    email,
    specialist,
    comment,
    date,
    time,
  } = request.body;
  const sql =
    "UPDATE appointment SET name = ?, age = ?, gender = ?, civilstatus = ?, address = ?, contact = ?, email = ?, specialist = ?, comment = ?, date = ?, time = ? WHERE appointment_id = ?";
  db.query(
    sql,
    [
      name,
      age,
      gender,
      civilstatus,
      address,
      contact,
      email,
      specialist,
      comment,
      date,
      time,
      appointment_id,
    ],
    (error, result) => {
      if (error) throw error;
      response.send("Appointment Updated...");
    }
  );
});

// Add this new endpoint for updating appointment status
app.put("/appointment/:appointment_id", (request, response) => {
  const appointment_id = request.params.appointment_id;
  const { status } = request.body;

  const sql = "UPDATE appointment SET status = ? WHERE appointment_id = ?";
  db.query(sql, [status, appointment_id], (error, result) => {
    if (error) {
      console.error("Error updating appointment status:", error);
      return response.json({
        success: false,
        error: "An error occurred. Please try again later.",
      });
    }

    return response.json({ success: true });
  });
});

// Patient Login
app.post("/login", (request, response) => {
  const { email, password } = request.body;
  const sql =
    "SELECT patient_id, name, password FROM patient WHERE email = ?";
  
  db.query(sql, [email], async (error, data) => {
    if (error) {
      console.error("Error during login:", error);
      return response.json({
        success: false,
        error: "An error occurred. Please try again later.",
      });
    }

    if (data.length > 0) {
      const { patient_id, name, password: hashedPassword } = data[0];
      // Compare hashed password
      const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

      if (isPasswordMatch) {
        return response.json({ success: true, patient_id, name });
      } else {
        return response.json({
          success: false,
          error: "Invalid credentials. Please try again.",
        });
      }
    } else {
      return response.json({
        success: false,
        error: "Invalid credentials. Please try again.",
      });
    }
  });
})

// Admin Login
app.post("/admin", (request, response) => {
  const { username, password } = request.body;
  const sql =
    "SELECT admin_id, name FROM admin WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (error, data) => {
    if (error) {
      console.error("Error during login:", error);
      return response.json({
        success: false,
        error: "An error occurred. Please try again later.",
      });
    }

    if (data.length > 0) {
      const { admin_id, name } = data[0];
      return response.json({ success: true, admin_id, name });
    } else {
      return response.json({
        success: false,
        error: "Invalid credentials. Please try again.",
      });
    }
  });
});

// Doctor Login
app.post("/doctor", (request, response) => {
  const { email, password } = request.body;
  const sql =
    "SELECT doctor_id, name, password FROM doctor WHERE email = ?";
  
  db.query(sql, [email], async (error, data) => {
    if (error) {
      console.error("Error during login:", error);
      return response.json({
        success: false,
        error: "An error occurred. Please try again later.",
      });
    }

    if (data.length > 0) {
      const { doctor_id, name, password: hashedPassword } = data[0];
      // Compare hashed password
      const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

      if (isPasswordMatch) {
        return response.json({ success: true, doctor_id, name });
      } else {
        return response.json({
          success: false,
          error: "Invalid credentials. Please try again.",
        });
      }
    } else {
      return response.json({
        success: false,
        error: "Invalid credentials. Please try again.",
      });
    }
  });
});

// Patient Registration
app.post("/register", async (request, response) => {
  const { name, age, gender, civilstatus, address, contact, email, password } =
    request.body;
  const checkUserExistsSql = "SELECT * FROM patient WHERE email = ?";

  try {
    // Check if the user already exists
    db.query(checkUserExistsSql, [email], async (error, data) => {
      if (error) {
        console.error("Error checking user existence:", error);
        return response.json({
          success: false,
          error: "An error occurred. Please try again later.",
        });
      }

      if (data.length > 0) {
        // Email already exists
        return response.json({
          success: false,
          error: "Email already exists. Please choose another email.",
        });
      } else {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

        // Insert new user with hashed password
        const addUserSql =
          "INSERT INTO patient (name, age, gender, civilstatus, address, contact, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(
          addUserSql,
          [name, age, gender, civilstatus, address, contact, email, hashedPassword],
          (error) => {
            if (error) {
              console.error("Error during registration:", error);
              return response.json({
                success: false,
                error: "An error occurred. Please try again later.",
              });
            }

            return response.json({ success: true });
          }
        );
      }
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    response.json({
      success: false,
      error: "An error occurred. Please try again later.",
    });
  }
});

// Fetch Logged-in Patient Profile
app.post("/patient_profile", (request, response) => {
  const loggedInPatientId = request.headers.authorization;

  if (!loggedInPatientId) {
    return response.json({
      success: false,
      error: "Patient not logged in.",
    });
  }

  const sql = "SELECT * FROM patient WHERE patient_id = ?";

  db.query(sql, [loggedInPatientId], (error, data) => {
    if (error) {
      console.error("Error fetching patient profile:", error);
      return response.json({
        success: false,
        error: "An error occurred. Please try again later.",
      });
    }

    if (data.length > 0) {
      const patientInfo = data[0];
      return response.json({ success: true, patientInfo });
    } else {
      return response.json({
        success: false,
        error: "Patient not found.",
      });
    }
  });
});

// Fetch Logged-in Doctor Profile
app.post("/doctor_profile", (request, response) => {
  const loggedInDoctorId = request.headers.authorization;

  if (!loggedInDoctorId) {
    return response.json({
      success: false,
      error: "Doctor not logged in.",
    });
  }

  const sql = "SELECT * FROM doctor WHERE doctor_id = ?";

  db.query(sql, [loggedInDoctorId], (error, data) => {
    if (error) {
      console.error("Error fetching doctor profile:", error);
      return response.json({
        success: false,
        error: "An error occurred. Please try again later.",
      });
    }

    if (data.length > 0) {
      const doctorInfo = data[0];
      return response.json({ success: true, doctorInfo });
    } else {
      return response.json({
        success: false,
        error: "Doctor not found.",
      });
    }
  });
});
