import { newPost } from "../controllers/newPostController";

router.post("/post/posts", newPost);

module.exports = router;
