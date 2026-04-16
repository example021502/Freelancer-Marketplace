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
    if (role === "client") {
      const [exist] = await pool.query(
        "SELECT email FROM clients WHERE email = ?",
        [email],
      );
      if (exist.length > 0) {
        return res.status(409).json({ message: "Email already exists" });
      }
    }
    if (role === "freelancer") {
      const [exist] = await pool.query(
        "SELECT email FROM freelancers WHERE email = ?",
        [email],
      );
      if (exist.length > 0) {
        return res.status(409).json({ message: "Email already exists" });
      }
    } else if (role === "admin") {
      const [exist] = await pool.query(
        "SELECT email FROM admins WHERE email = ?",
        [email],
      );
      if (exist.length > 0) {
        return res.status(409).json({ message: "Email already exists" });
      }
    }
    if (role !== "client" && role !== "freelancer" && role !== "admin")
      return res.status(400).json({ message: "Invalid role" });

    if (role === "client") {
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

      // Insert into passwords table using client_id
      const hash = await bcrypt.hash(password, 10);
      await pool.query(
        "INSERT INTO passwords(client_id, password_hash) VALUES(?,?)",
        [user_id, hash],
      );

      // Insert into roles table using client_id
      await pool.query("INSERT INTO roles(client_id, role) VALUES(?,?)", [
        user_id,
        role,
      ]);
    } else if (role === "freelancer") {
      await pool.query(
        "INSERT INTO freelancers(freelancer_id, first_name, last_name, bio, email, mobile_number, country, profile_picture, create_at) VALUES(?,?,?,?,?,?,?,?,NOW())",
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
      await pool.query(
        "INSERT INTO passwords(freelancer_id, password_hash) VALUES(?,?)",
        [user_id, hash],
      );

      // Insert into roles table using freelancer_id
      await pool.query("INSERT INTO roles(freelancer_id, role) VALUES(?,?)", [
        user_id,
        role,
      ]);
    } else if (role === "admin") {
      await pool.query(
        "INSERT INTO admins(admin_id, first_name, last_name, bio, email, mobile_number, country, profile_picture, create_at) VALUES(?,?,?,?,?,?,?,?,NOW())",
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

      // Insert into passwords table using admin_id
      const hash = await bcrypt.hash(password, 10);
      await pool.query(
        "INSERT INTO passwords(admin_id, password_hash) VALUES(?,?)",
        [user_id, hash],
      );

      // Insert into roles table using admin_id
      await pool.query("INSERT INTO roles(admin_id, role) VALUES(?,?)", [
        user_id,
        role,
      ]);
    }
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
    let user = null;
    let userId = null;
    let role = null;

    // Check clients table
    const [clients] = await pool.query(
      "SELECT client_id, first_name, last_name FROM clients WHERE email = ?",
      [email],
    );
    if (clients.length > 0) {
      user = clients[0];
      userId = user.client_id;
      role = "client";
    }

    // Check freelancers table if not found in clients
    if (!user) {
      const [freelancers] = await pool.query(
        "SELECT freelancer_id, first_name, last_name FROM freelancers WHERE email = ?",
        [email],
      );
      if (freelancers.length > 0) {
        user = freelancers[0];
        userId = user.freelancer_id;
        role = "freelancer";
      }
    }

    // Check admins table if not found yet
    if (!user) {
      const [admins] = await pool.query(
        "SELECT admin_id, first_name, last_name FROM admins WHERE email = ?",
        [email],
      );
      if (admins.length > 0) {
        user = admins[0];
        userId = user.admin_id;
        role = "admin";
      }
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password from passwords table
    const [passRows] = await pool.query(
      "SELECT password_hash FROM passwords WHERE client_id = ? OR freelancer_id = ? OR admin_id = ?",
      [userId, userId, userId],
    );

    if (!passRows || passRows.length === 0) {
      return res.status(404).json({ message: "Invalid Password!" });
    }

    const isValid = await bcrypt.compare(password, passRows[0].password_hash);
    if (!isValid) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        user_id: userId,
        first_name: user.first_name,
        last_name: user.last_name,
        email: email,
        role: role,
      },
      jwt_secret,
      { expiresIn: "24h" },
    );

    res.status(200).json({
      message: "Welcome back!",
      token: token,
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: email,
        role: role,
      },
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
