import { GenericController } from "./genericController";

export async function genericHandler(req, res) {
  const { model, id } = req.params;

  const action = {
    GET: id ? "get" : "list",
    POST: "create",
    PUT: "putUpdate",
    PATCH: "update",
    DELETE: id ? "delete" : "deleteAll",
  }[req.method];

  const payload = req.method === "GET" || req.method === "DELETE" ? undefined : req.body;

  const result = await GenericController.handle({
    model,
    action,
    id,
    payload,
  });

  res.json(result);
}
