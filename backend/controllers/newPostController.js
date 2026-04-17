const pool = require("../config/db");

const newPost = (req, res) => {
  const { form } = req.body;
  const { creator_id, title, description, budget, discount } = form;
  try {
    const result = pool.query(
      "INSERT INTO posts(creator_id, title, description, budget, created_at, discounts) VALUES(?,?,?,?,NOW(),?)",
      [creator_id, title, description, budget, discount],
    );
    res.status(200).json({ message: "Post created successfully" });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).json({ message: "Database Error!" });
  }
};

module.exports = { newPost };
