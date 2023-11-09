import { Express, Request, Response } from "express";
import { createUserHandler } from "./controllers/user.controller";
import validateResource from './middlewares/validateResource'
import { createUserSchema } from "./schema/user.schema";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "./controllers/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middlewares/requireUser";

const routes = (app: Express) => {
    app.get('/ping', (req: Request, res: Response) => 
        res.sendStatus(200));

    app.post("/api/users", validateResource(createUserSchema), createUserHandler);

    //Session Login
    app.post("/api/sessions", validateResource(createSessionSchema), createUserSessionHandler);

    app.get("/api/sessions", requireUser, getUserSessionsHandler);

    app.delete("/api/sessions", requireUser, deleteSessionHandler);
}

export default routes;