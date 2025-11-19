import GenericRepo from "./genericRepo";
import { schema } from "../../schema";

export const GenericController = {
  async handle({ model, action, id, payload }) {
    const { hooks } = schema[model];
    const repo = new GenericRepo(model);

    let result;

    switch (action) {
      case "list":
        result = repo.list();
        break;

      case "get":
        result = repo.get(id);
        break;

      case "create":
        if (hooks?.beforeCreate) {
          await hooks.beforeCreate(payload);
        }

        result = repo.create(payload);

        if (hooks?.afterCreate) {
          await hooks.afterCreate(repo);
        }
        break;

      case "update":
        if (hooks?.beforeUpdate) {
          await hooks.beforeUpdate(payload);
        }

        result = repo.update(id, payload);

        if (hooks?.afterUpdate) {
          await hooks.afterUpdate(repo);
        }
        break;

      case "delete":
        result = repo.delete(id);

        if (hooks?.afterDelete) {
          await hooks.afterDelete(repo);
        }

        break;

      case "deleteAll":
        result = repo.deleteAll();

        if (hooks?.afterDelete) {
          await hooks.afterDelete(repo);
        }
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return result;
  },
};
