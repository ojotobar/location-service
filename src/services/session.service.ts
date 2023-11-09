import { Request } from "express";
import Session, { SessionDocument } from "../models/session.model";
import { FilterQuery, UpdateQuery } from "mongoose";

export const createSession = async (userId: string, userAgent: string) => {
    const session = await Session.create({user: userId, userAgent });

    return session.toJSON();
};

export const findSessions = (query: FilterQuery<SessionDocument>) => {
    return Session.find(query)
                .sort({ createdAt: -1 })
                .lean();
}

export const updateSession = async (query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) => {
    return await Session.updateOne(query, update);
}