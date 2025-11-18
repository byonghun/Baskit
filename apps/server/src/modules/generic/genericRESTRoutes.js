import { Router } from "express";
import { genericHandler } from "./genericHandler";

export const genericRESTRoutes = Router();

genericRESTRoutes.get("/:model", genericHandler);
genericRESTRoutes.get("/:model/:id", genericHandler);
genericRESTRoutes.post("/:model", genericHandler);
genericRESTRoutes.put("/:model/:id", genericHandler);
genericRESTRoutes.patch("/:model/:id", genericHandler);
genericRESTRoutes.delete("/:model/:id", genericHandler);
genericRESTRoutes.delete("/:model", genericHandler);