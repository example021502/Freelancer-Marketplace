const { useParams } = require("react-router-dom");
const { pool } = require("../../config/db");

const load_chat_messages = async (req, res) => {
  const { sender_id, receiver_id } = req.query;
  try {
    const [messages] = pool.query(
      "SELECT * FROM chat_messages WHERE (sender_id = ? AND receiver_id = ?) OR WHERE (sender_id = ? AND receiver_id = ?)",
      [sender_id, receiver_id, receiver_id, sender_id],
    );
    if (messages.length === 0)
      return res.status(200).json({ message: "No Messages" });

    res.status(200).json({ result: messages });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Database Error!" });
  }
};

const load_chat_profiles = async (req, res) => {
  const { user_id } = req.body;
  try {
    const [chat_profiles] = pool.query(
      "SELECT * FROM chat_profiles WHERE chat_id = ?",
      [user_id],
    );
    if (chat_profiles.length === 0)
      return res.status(200).json({ message: "No Messages" });

    res.status(200).json({ result: chat_profiles });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Database Error!" });
  }
};

module.exports = { load_chat_messages, load_chat_profiles };
