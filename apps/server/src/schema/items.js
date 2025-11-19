import { sseBroadcastItems } from "../sse";

const items = {
  table: "items",
  fields: {
    id: "number",
    itemName: "string",
    description: "string",
    quantity: "number",
    purchased: "boolean",
    createdAt: "date",
    updatedAt: "date",
  },
  hooks: {
    beforeCreate(data) {
      if (!data.itemName) throw new Error("Item Name is required");
      if (!data.quantity) {
        data.quantity = 1;
      }
      if (!data.purchased) {
        data.purchased = false;
      }
      data.createdAt = new Date();
      data.updatedAt = new Date();
    },
    async afterCreate(repo) {
      const { data } = await repo.list();
      sseBroadcastItems({ items: data });
    },
    async beforeUpdate(data) {
      if (data.quantity != null && data.quantity < 0) {
        throw new Error("quantity cannot be negative");
      }

      data.updatedAt = new Date();
    },
    async afterUpdate(repo) {
      const { data } = await repo.list();
      sseBroadcastItems({ items: data });
    },
    async afterDelete(repo) {
      const { data } = await repo.list();
      sseBroadcastItems({ items: data });
    },
  },
};

export default items;
