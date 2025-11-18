const users = {
  table: "users",
  fields: {
    id: "number",
    email: "string",
    role: "string",
  },
  hooks: {
    beforeCreate(data) {
      if (!data.email) throw new Error("Email is required");
    },
  },
};

export default users;