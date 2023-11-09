import express from "express";
import connect from "./utils/connect";
import logger from './utils/logger';
import routes from './routes';
import deserializeUser from './middlewares/deserializeUser';
require('dotenv').config()


const app = express();
app.use(express.json());
app.use(deserializeUser);
const port = process.env.PORT;

app.listen(port, async () => {
    logger.info(`App running on port ${port}`)
    await connect();
    routes(app);
});