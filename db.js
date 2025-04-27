const Database = require("better-sqlite3");
const db = new Database("users.db");

// In db.js, modify your CREATE TABLE statement to include the 'exam_date' column
db.prepare(
    `
      CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          Fname TEXT NOT NULL,
          Lname TEXT NOT NULL,
          Mname TEXT NOT NULL,
          Sname TEXT NOT NULL,
          contact_number TEXT NOT NULL,
          gender TEXT NOT NULL,
          birthdate DATE NOT NULL,
          nationality TEXT NOT NULL,
          country TEXT NOT NULL,
          address TEXT NOT NULL,
          school_name TEXT NOT NULL,
          academic_track TEXT NOT NULL,
          academic_strand TEXT NOT NULL,
          year_graduated TEXT NOT NULL,
          email TEXT NOT NULL,
          program TEXT NOT NULL,
          school_year TEXT NOT NULL,
          semester TEXT NOT NULL,
          proof_of_payment TEXT NOT NULL
      )
  `
  ).run();
module.exports = db;
