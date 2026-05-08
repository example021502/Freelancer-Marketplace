const { image } = require("framer-motion/client");
const pool = require("../config/db");
const v4 = require("uuid").v4;

// posting a new post
const newPost = async (req, res) => {
  const post_id = v4();
  const { creator_id, title, description, budget, discount, images } = req.body;
  console.log(creator_id);
  try {
    // uploading post
    await pool.query(
      "INSERT INTO posts(post_id, creator_id, title, description, budget, created_at, discounts) VALUES(?,?,?,?,?,NOW(),?)",
      [post_id, creator_id, title, description, budget, discount],
    );
    // only add the images if there are any
    if (images.length > 0) {
      //  mapping the images from array
      const values = images.map((image) => [post_id, image, title]);
      // uploading images
      await pool.query(
        "INSERT INTO images(post_id, image_url, alt_text) VALUES ?",
        [values],
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
