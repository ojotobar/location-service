import { Request, Response } from "express";
import { validatePassword } from "../services/user.service";
import { createSession, findSessions, updateSession } from "../services/session.service";
import { signInJwt } from "../utils/jwt.utils";

export const createUserSessionHandler = async (req: Request, res: Response) => {
    //Validate user password
    const user = await validatePassword(req.body.email, req.body.password);
    if(!user) return res.status(401).send({message: "Invalid email or password."});

    //Create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    //Create access token
    const expiresAt = process.env.EXPIRES as string;
    const accessToken = signInJwt(
        { ...user, session: session._id },
        { expiresIn: expiresAt }
    );

    //Create refresh token
    const refreshToken = signInJwt(
        { ...user, session: session._id },
        { expiresIn: expiresAt }
    );

    //Return access and refresh tokens
    return res.send({ accessToken, refreshToken });
}

export const getUserSessionsHandler = async (req: Request, res: Response) => {
    const userId = res.locals.user._id;

    const sessions = await findSessions({ user: userId, valid: true });

    return res.send(sessions);
};

export const deleteSessionHandler = async (req: Request, res: Response) => {
    const sessionId = res.locals.user.session;

    await updateSession({_id: sessionId }, { valid: false });
    return res.send({
        accessToken: null,
        refreshToken: null
    });
};