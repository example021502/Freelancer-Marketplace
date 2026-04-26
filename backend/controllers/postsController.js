const { image } = require("framer-motion/client");
const pool = require("../config/db");
// posting a new post
const newPost = async (req, res) => {
  const { creator_id, title, description, budget, discount, images } = req.body;
  try {
    await pool.query(
      "INSERT INTO posts(creator_id, title, description, budget, created_at, discounts) VALUES(?,?,?,?,NOW(),?)",
      [creator_id, title, description, budget, discount],
    );
    // only add the images if there are any
    if (images.length > 0) {
      const totalRows = await pool.query(
        "SELECT COUNT(*) AS total_rows FROM posts",
      );
      const alt_text = [];
      const image_url = [];
      for (let i = 0; i < images.length; i++) {
        alt_text.push(images[i].alt_text);
        image_url.push(images[i].image_url);
      }
      await pool.query(
        "INSERT INTO images(post_id, image_url, alt_text, uploaded_at) VALUES (?,?,?,NOW())",
        [totalRows, image_url, alt_text],
      );
    }
    res
      .status(200)
      .json({ message: "Post created successfully", success: true });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).json({ message: "Database Error!", success: false });
  }
};
// getting all the posts
const getPosts = async (req, res) => {
  try {
    const [posts] = await pool.query(
      "SELECT p.*, i.* FROM posts p LEFT JOIN images i ON p.post_id = i.post_id",
    );
    if (!posts[0] || posts[0]?.length === 0)
      return res.status(400).json({ message: "No posts", success: true });
    res.status(200).json({ result: posts, success: true });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).json({ message: "Database Error!", success: false });
  }
};

// getting post creator information
const getPostUserInformation = async (req, res) => {
  const { user_id } = req.params;
  if (!user_id)
    return res.status(400).json({ message: "Missing user_id", success: false });
  try {
    const [userInfo] = await pool.query(
      "SELECT * FROM freelancers WHERE freelancer_id = ?",
      [user_id],
    );
    res.status(200).json({ result: post, success: true });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).json({ message: "Database Error!", success: false });
  }
};

module.exports = { newPost, getPosts, getPostUserInformation };
