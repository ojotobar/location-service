import { Request, Response } from "express";
import logger from '../utils/logger';
import { createUser } from "../services/user.service";
import { CreateUserInput } from "../schema/user.schema";

export const createUserHandler = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    try{
        const user = await createUser(req.body);
        return res.status(200).send({ message: "User successfully added. Awaiting confirmation.", user: user?._id });
    } catch (e: any){
        logger.error(e);
        return res.status(409).send(e.message);
    }
};