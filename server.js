const express = require("express");
const app = express();
const port = 4002;
const db = require("./db"); // Your better-sqlite3 db connection

// Set EJS as the templating engine
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.json()); // Parse JSON
app.set("view engine", "ejs");
app.use(express.static("public")); // For serving static files if needed

// ROUTES

// Homepage
app.get("/", (req, res) => {
  res.render("home");
});

// GET: All users
app.get("/users", (req, res) => {
  const users = db.prepare("SELECT * FROM users").all();
  res.render("index", { users }); // Make sure you have views/index.ejs
});

// GET: Admission Application Form
app.get("/users/new", (req, res) => {
  res.render("admissionForm"); // This should match the EJS file name you created
});

// POST: Create new admission application
app.post("/users", (req, res) => {
  const {
    Fname,
    Lname,
    Mname,
    Sname,
    contact_number,
    gender,
    birthdate,
    nationality,
    country,
    address,
    school_name,
    academic_track,
    academic_strand,
    year_graduated,
    email,
    program,
    school_year,
    semester,
    proof_of_payment,
  } = req.body;

  db.prepare(
    `
    INSERT INTO users (
      Fname, Lname, Mname, Sname,
      contact_number, gender, birthdate, nationality,
      country, address, school_name, academic_track,
      academic_strand, year_graduated, email, program,
      school_year, semester, proof_of_payment
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    Fname,
    Lname,
    Mname,
    Sname,
    contact_number,
    gender,
    birthdate,
    nationality,
    country,
    address,
    school_name,
    academic_track,
    academic_strand,
    year_graduated,
    email,
    program,
    school_year,
    semester,
    proof_of_payment,
  );

  res.redirect("/users");
});

// GET: Edit user form (optional: if you want to edit applications)
app.get("/users/:id/edit", (req, res) => {
  const user = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(req.params.id);
  if (user) {
    res.render("edit", { user }); // Create edit.ejs if you want editing
  } else {
    res.status(404).send("User not found");
  }
});

// POST: Update user (optional)
app.post("/users/:id/edit", (req, res) => {
  const {
    Fname,
    Lname,
    Mname,
    Sname,
    contact_number,
    gender,
    birthdate,
    nationality,
    country,
    address,
    school_name,
    academic_track,
    academic_strand,
    year_graduated,
    email,
    program,
    school_year,
    semester,
    proof_of_payment,
  } = req.body;

  db.prepare(
    `
      UPDATE users SET 
        Fname = ?, Lname = ?, Mname = ?, Sname = ?,contact_number = ?, gender = ?, birthdate = ?, nationality = ?,country = ?, address = ?, school_name = ?, academic_track = ?,academic_strand = ?, year_graduated = ?, email = ?, program = ?,school_year = ?, semester = ?, proof_of_payment = ? 
      WHERE id = ?
    `
  ).run(
    Fname,
    Lname,
    Mname,
    Sname,
    contact_number,
    gender,
    birthdate,
    nationality,
    country,
    address,
    school_name,
    academic_track,
    academic_strand,
    year_graduated,
    email,
    program,
    school_year,
    semester,
    proof_of_payment,
    req.params.id
  );

  res.redirect("/users");
});

// POST: Delete user (optional)
app.post("/users/:id/delete", (req, res) => {
  db.prepare("DELETE FROM users WHERE id = ?").run(req.params.id);
  res.redirect("/users");
});

// Debug: See all users as JSON
app.get("/debug", (req, res) => {
  const users = db.prepare("SELECT * FROM users").all();
  res.json(users);
});

// Start server
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
