import { Express, Request, Response } from "express";
import { createUserHandler } from "./controllers/user.controller";
import validateResource from './middlewares/validateResource'
import { createUserSchema } from "./schema/user.schema";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "./controllers/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middlewares/requireUser";
import { createCountryHandler, deleteCountryHandler, getAllCountriesHandler, getCountryHandler, updateCountryHandler } from "./controllers/country.controller";
import { createCountrySchema, deleteCountrySchema, findCountrySchema, updateCountrySchema } from "./schema/country.schema";
import { createStateSchema, deleteStateSchema, findByCountrySchema, findStateSchema, updateStateSchema } from "./schema/state.schema";
import { createStateHandler, deleteStateHandler, getByCountryHandler, getStateHandler, updateStateHandler } from "./controllers/state.controller";

const routes = (app: Express) => {
    app.get('/ping', (req: Request, res: Response) => 
        res.sendStatus(200));

    app.post("/api/users", [requireUser, validateResource(createUserSchema)], createUserHandler);

    //Session Login
    app.post("/api/sessions", validateResource(createSessionSchema), createUserSessionHandler);

    app.get("/api/sessions", requireUser, getUserSessionsHandler);

    app.delete("/api/sessions", requireUser, deleteSessionHandler);

    //Country Routes
    app.post("/api/countries", [requireUser, validateResource(createCountrySchema)], createCountryHandler);

    app.get("/api/countries", getAllCountriesHandler);

    app.get("/api/countries/:countryId", validateResource(findCountrySchema), getCountryHandler);

    app.put("/api/countries/:countryId", [requireUser, validateResource(updateCountrySchema)], updateCountryHandler)

    app.delete("/api/countries/:countryId", [requireUser, validateResource(deleteCountrySchema)], deleteCountryHandler)

    //State Routes
    app.post("/api/states/:countryId", [requireUser, validateResource(createStateSchema)], createStateHandler);

    app.get("/api/states", validateResource(findByCountrySchema), getByCountryHandler);

    app.get("/api/states/:id", validateResource(findStateSchema), getStateHandler);

    app.put("/api/states/:id", [requireUser, validateResource(updateStateSchema)], updateStateHandler)

    app.delete("/api/states/:id", [requireUser, validateResource(deleteStateSchema)], deleteStateHandler)
}

export default routes;