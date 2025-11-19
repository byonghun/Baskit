const assets = {
  table: "assets",
  fields: {
    id: "number",
    name: "string",
    description: "string",
  },
  hooks: {
    beforeCreate(data) {
      if (!data.name) throw new Error("Name is required");
    },
  },
};

export default assets;