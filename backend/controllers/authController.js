const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const jwt_secret = "my_super_secret_key_021502";
const v4 = require("uuid").v4;

// User Registration Controller
const registerUser = async (req, res) => {
  const {
    first_name,
    last_name,
    bio,
    email,
    role,
    mobile_number,
    country,
    profile_picture,
    password,
  } = req.body;

  try {
    const user_id = v4();

    // Check email based on role and insert into appropriate table
    if (role !== "client" && role !== "freelancer" && role !== "admin")
      return res.status(400).json({ message: "Invalid role" });

    const checking_sql = `SELECT email FROM clients WHERE email = ? UNION ALL SELECT email FROM freelancers WHERE email = ? UNION ALL SELECT email FROM admins WHERE email = ?`;
    const [exist] = pool.query(checking_sql, [email, email, email]);
    if (exist.length > 0)
      return res.status(400).json({ message: "Email already exists" });

    const sql =
      role === "client"
        ? `INSERT INTO clients(client_id, first_name, last_name, bio,  email, mobile_number, country, profile_picture, created_at) VALUES(?,?,?,?,?,?,?,?,NOW())`
        : role === "freelancer"
          ? `INSERT INTO freelancers(freelancer_id, first_name, last_name, bio, email, mobile_number, country, profile_picture, create_at) VALUES(?,?,?,?,?,?,?,?,NOW())`
          : `INSERT INTO admins(admin_id, first_name, last_name, bio, email, mobile_number, country, profile_picture, create_at) VALUES(?,?,?,?,?,?,?,?,NOW())`;

    await pool.query(
      "INSERT INTO clients(client_id, first_name, last_name, bio, email, mobile_number, country, profile_picture, create_at) VALUES(?,?,?,?,?,?,?,?,NOW())",
      [
        user_id,
        first_name,
        last_name,
        bio,
        email,
        mobile_number,
        country,
        profile_picture,
      ],
    );

    // Insert into passwords table using freelancer_id
    const hash = await bcrypt.hash(password, 10);
    const column = `${role}_id`;
    await pool.query("INSERT INTO passwords( ??, password_hash) VALUES(?,?)", [
      column,
      user_id,
      hash,
    ]);

    // Insert into roles table using freelancer_id
    await pool.query("INSERT INTO roles(??, role) VALUES(?,?)", [
      column,
      user_id,
      role,
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
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const { email, password } = req.body;

  try {
    const sql = `
    SELECT c.client_id, c.first_name, c.last_name, r.role, p.password_hash FROM clients c LEFT JOIN roles r ON c.client_id = r.client_id LEFT JOIN passwords p ON c.client_id = p.client_id WHERE c.email = ? 
    UNION ALL 
    SELECT f.freelancer_id, f.first_name, f.last_name, r.role, p.password_hash FROM freelancers f LEFT JOIN roles r ON f.freelancer_id = r.freelancer_id LEFT JOIN passwords p ON f.freelancer_id = p.freelancer_id WHERE f.email = ? 
    UNION ALL 
    SELECT a.admin_id, a.first_name, a.last_name, r.role, p.password_hash FROM admins a LEFT JOIN roles r ON a.admin_id = r.admin_id LEFT JOIN passwords p ON a.admin_id = p.admin_id WHERE a.email = ? 
    `;
    const [user] = await pool.query(sql, [email, email, email]);
    if (!user.length > 0)
      return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(
      password,
      user[0].password_hash,
    );
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Password" });

    const getUserId = (user) => {
      const role = user[0]?.role;
      const custom_id = `${role}_id`;
      return (user_id = user[0]?.custom_id);
    };

    // Generate JWT token
    const token = await jwt.sign(
      {
        user_id: getUserId(user),
        first_name: user[0]?.first_name,
        last_name: user[0]?.last_name,
        email: email,
        role: user[0]?.role,
      },
      jwt_secret,
      { expiresIn: "24h" },
    );

    res.status(200).json({
      message: "Welcome back!",
      token: token,
    });
  } catch (e) {
    console.error(`Error: ${e}`);
    return res.status(500).json({ message: "Database error" });
  }
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

// Sending an OTP to email (not yet implemented)
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
    subject: "Freelance Marketplace: OTP is:",
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
