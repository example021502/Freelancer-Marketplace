const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const transporter = require("nodemailer");
const { text } = require("body-parser");

const jwt_secret = "my_super_secret_key_021502";

// User Registration Controller
const registerUser = async (req, res) => {
  const {
    name,
    email,
    role,
    mobile_number,
    country,
    profile_picture,
    password,
  } = req.body;

  try {
    // 1. Check if email is already taken
    const [exist] = await pool
      .promise()
      .query("SELECT email FROM users WHERE email = ?", [email]);
    if (exist.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // 2. Hash the incoming plain-text password
    const hash = await bcrypt.hash(password, 10);

    // 3. Insert into database using 'password_hash' column
    const sql =
      "INSERT INTO users(name, email, role, mobile_number, country, profile_picture, created_at, password_hash) VALUES(?,?,?,?,?,?,NOW(),?)";

    await pool
      .promise()
      .query(sql, [
        name,
        email,
        role,
        mobile_number,
        country,
        profile_picture,
        hash,
      ]);

    res.status(201).json({ message: "Account created successfully!" });
  } catch (e) {
    console.error(`Database Error: ${e.message}`);
    res
      .status(500)
      .json({ message: "Internal server error during registration" });
  }
};

// User Login Controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Look for the hashed password in the 'password_hash' column
  const sql = "SELECT name, role, password_hash FROM users WHERE email = ?";

  pool.query(sql, [email], async (error, result) => {
    if (error) return res.status(500).json({ message: "Database error" });
    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });

    // Compare plain-text password with the stored hash
    const user = result[0];
    try {
      const isValid = await bcrypt.compare(password, user.password_hash);
      if (!isValid) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = jwt.sign(
        {
          name: user.name,
          email: email,
          role: user.role,
        },
        jwt_secret,
        { expiresIn: "24h" },
      );

      res.status(200).json({
        message: "Welcome back!",
        token: token,
      });
    } catch (e) {
      return res.json({ message: "Error processing login" });
    }
  });
};

// Get User Data from Token Controller
const getUserData = (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied!" });
  jwt.verify(token, jwt_secret, (err, decode) => {
    if (err) return res.status(403).json({ message: "Invalid Token!" });
    res.status(200).json({ user: decode });
  });
};

const sendOTPEmail = (req, res) => {
  const { email, to_email, from_email, from_password } = req.body;
  if (!email) return res.status(400).json({ message: "Missing email!" });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: from_email,
      pass: from_password,
    },
  });
  const mailOptions = {
    from: from_email,
    to: to_email,
    subject: 1`reelance Marketplace: OTP is:`,
    text: email,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return res.status(400).json({ message: "Bad request!" });
    res.status(200).json({ message: "OTP sent successfully" });
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserData,
  sendOTPEmail,
};
