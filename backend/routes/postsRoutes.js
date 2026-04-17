const express = require("express");
const router = express.Router();
const { newPost } = require("../controllers/newPostController");

router.post("/post/posts", newPost);

module.exports = router;
