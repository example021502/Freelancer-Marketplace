const get_table = (table) => {
  const TABLE_MAP = {
    freelancer_profiles: {
      joinTable: "users",
      joinCondition: "freelancer_profiles.user_id = users.user_id",
      forbidden_fields: ["u.password_hash"],
    },
    projects: {
      joinTable: "users",
      joinCondition: "projects.user_id = users.user_id",
      forbidden_fields: ["p.title", "u.name", "u.email"],
    },
  };

  if (!TABLE_MAP[table]) return null;
  return TABLE_MAP[table];
};

module.exports = { get_table };
