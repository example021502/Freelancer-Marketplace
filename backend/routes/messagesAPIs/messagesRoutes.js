const express = require("express");
const {
  load_chat_profiles,
  load_chat_messages,
} = require("../../controllers/messagesAPIs/messagesController");
const router = express.router;

router.get("/get/chat_profiles/:user_id", load_chat_profiles);
router.get("/get/chat_messages", load_chat_messages);

module.exports = router;
