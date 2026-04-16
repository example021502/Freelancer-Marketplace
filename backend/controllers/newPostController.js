import { pool } from "../config/db";

export const newPost = (req, res) => {
  const { form } = req.body;
  const { creator_id, title, description, budget, discount } = form;

  pool.query(
    "INSERT INTO posts(creator_id, title, description, budget, created_at, discount) VALUES(?,?,?,?,NOW(),?)",
    [creator_id, title, description, budget, discount],
  );
};
a;
