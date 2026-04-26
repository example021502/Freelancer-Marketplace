const express = require("express");
const router = express.Router();
const {
  newPost,
  getPosts,
  getPostUserInformation,
} = require("../controllers/postsController");

router.post("/post", newPost);
router.get("/get/posts", getPosts);
router.get("/get/post/userInformation/:user_id", getPostUserInformation);

module.exports = router;
